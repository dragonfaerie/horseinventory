package com.inventory.horse.controller

import com.inventory.horse.entity.Breed
import com.inventory.horse.entity.BreedType
import com.inventory.horse.entity.Color
import com.inventory.horse.entity.Condition
import com.inventory.horse.entity.Finish
import com.inventory.horse.entity.Gender
import com.inventory.horse.entity.Horse
import com.inventory.horse.entity.Location
import com.inventory.horse.entity.Manufacturer
import com.inventory.horse.entity.Model
import com.inventory.horse.entity.Mold
import com.inventory.horse.entity.Pattern
import com.inventory.horse.entity.RunType
import com.inventory.horse.entity.Scale
import com.inventory.horse.entity.requests.HorseRequest
import com.inventory.horse.repository.BreedRepository
import com.inventory.horse.repository.BreedTypeRepository
import com.inventory.horse.repository.ColorRepository
import com.inventory.horse.repository.ConditionRepository
import com.inventory.horse.repository.GenderRepository
import com.inventory.horse.repository.HorseRepository
import com.inventory.horse.repository.LocationRepository
import com.inventory.horse.repository.ManufacturerRepository
import com.inventory.horse.repository.ModelRepository
import com.inventory.horse.repository.MoldRepository
import com.inventory.horse.repository.PatternRepository
import com.inventory.horse.repository.ScaleRepository
import io.mockk.MockKAnnotations
import io.mockk.confirmVerified
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.slot
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.http.HttpStatus
import java.math.BigDecimal
import java.util.Optional

@ExtendWith(MockKExtension::class)
class HorseControllerTest {
    @MockK
    lateinit var horseRepository: HorseRepository

    @MockK
    lateinit var manufacturerRepository: ManufacturerRepository

    @MockK
    lateinit var moldRepository: MoldRepository

    @MockK
    lateinit var scaleRepository: ScaleRepository

    @MockK
    lateinit var modelRepository: ModelRepository

    @MockK
    lateinit var breedRepository: BreedRepository

    @MockK
    lateinit var breedTypeRepository: BreedTypeRepository

    @MockK
    lateinit var colorRepository: ColorRepository

    @MockK
    lateinit var patternRepository: PatternRepository

    @MockK
    lateinit var genderRepository: GenderRepository

    @MockK
    lateinit var conditionRepository: ConditionRepository

    @MockK
    lateinit var locationRepository: LocationRepository

    private lateinit var controller: HorseController

    @BeforeEach
    fun setUp() {
        MockKAnnotations.init(this)
        controller =
            HorseController(
                repo = horseRepository,
                manufacturerRepository = manufacturerRepository,
                moldRepository = moldRepository,
                scaleRepository = scaleRepository,
                modelRepository = modelRepository,
                breedRepository = breedRepository,
                breedTypeRepository = breedTypeRepository,
                colorRepository = colorRepository,
                patternRepository = patternRepository,
                genderRepository = genderRepository,
                conditionRepository = conditionRepository,
                locationRepository = locationRepository,
            )
    }

    @Test
    fun `getAll returns repository payload`() {
        val horse = referenceData().toHorse(id = 7)
        every { horseRepository.findAll() } returns listOf(horse)

        val result = controller.getAll()

        assertEquals(listOf(horse), result)
        verify(exactly = 1) { horseRepository.findAll() }
    }

    @Test
    fun `getOne returns entity when present`() {
        val horse = referenceData().toHorse(id = 9)
        every { horseRepository.findById(9) } returns Optional.of(horse)

        val response = controller.getOne(9)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(horse, response.body)
        verify { horseRepository.findById(9) }
    }

    @Test
    fun `getOne returns 404 when entity missing`() {
        every { horseRepository.findById(5) } returns Optional.empty()

        val response = controller.getOne(5)

        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertNull(response.body)
        verify { horseRepository.findById(5) }
    }

    @Test
    fun `createHorse builds entity from request and saves it`() {
        val refs = referenceData()
        stubReferenceLookups(refs)

        val slot = slot<Horse>()
        every { horseRepository.save(capture(slot)) } answers { slot.captured.copy(id = 42) }

        val response = controller.createHorse(refs.toRequest())

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(42, response.body?.id)
        assertEquals(refs.toHorse(), slot.captured)
        verify { horseRepository.save(any()) }
        confirmVerified(horseRepository)
    }

    @Test
    fun `update returns 404 when target horse is missing`() {
        val refs = referenceData()
        every { horseRepository.existsById(99) } returns false

        val response = controller.update(99, refs.toRequest(tagged = false))

        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        verify { horseRepository.existsById(99) }
        verify(exactly = 0) { horseRepository.save(any()) }
    }

    @Test
    fun `update builds entity with provided id`() {
        val refs = referenceData()
        stubReferenceLookups(refs)
        every { horseRepository.existsById(88) } returns true
        val slot = slot<Horse>()
        every { horseRepository.save(capture(slot)) } answers { slot.captured }

        val response = controller.update(88, refs.toRequest(tagged = false))

        assertEquals(HttpStatus.OK, response.statusCode)
        val saved = slot.captured
        assertEquals(88, saved.id)
        assertFalse(saved.tagged)
        assertEquals(refs.toHorse(id = 88, tagged = false), saved)
        verify { horseRepository.existsById(88) }
        verify { horseRepository.save(any()) }
    }

    private fun stubReferenceLookups(refs: ReferenceData) {
        every { manufacturerRepository.findById(refs.manufacturer.id) } returns Optional.of(refs.manufacturer)
        every { moldRepository.findById(refs.mold.id) } returns Optional.of(refs.mold)
        every { scaleRepository.findById(refs.scale.id) } returns Optional.of(refs.scale)
        every { modelRepository.findById(refs.model.id) } returns Optional.of(refs.model)
        every { breedRepository.findById(refs.breed.id) } returns Optional.of(refs.breed)
        every { breedTypeRepository.findById(refs.breedType.id) } returns Optional.of(refs.breedType)
        every { colorRepository.findById(refs.color.id) } returns Optional.of(refs.color)
        every { patternRepository.findById(refs.pattern.id) } returns Optional.of(refs.pattern)
        every { genderRepository.findById(refs.gender.id) } returns Optional.of(refs.gender)
        every { conditionRepository.findById(refs.condition.id) } returns Optional.of(refs.condition)
        every { locationRepository.findById(refs.location.id) } returns Optional.of(refs.location)
    }

    private fun referenceData(): ReferenceData = ReferenceData()

    private class ReferenceData {
        val manufacturer = Manufacturer(id = 1, name = "Breyer")
        val scale = Scale(id = 2, name = "Traditional")
        val runType = RunType(id = 3, name = "LE")
        val finish = Finish(id = 4, name = "Gloss")
        val mold = Mold(id = 5, name = "Othello", manufacturer = manufacturer)
        val model =
            Model(
                id = 6,
                name = "Sunny",
                mold = mold,
                runType = runType,
                finish = finish,
                scale = scale,
            )
        val breed = Breed(id = 7, name = "Arabian")
        val breedType = BreedType(id = 8, name = "Stock")
        val color = Color(id = 9, name = "Bay")
        val pattern = Pattern(id = 10, name = "Dapple")
        val gender = Gender(id = 11, name = "Mare")
        val condition = Condition(id = 12, name = "Mint")
        val location = Location(id = 13, name = "Show String")
        val purchasePrice = BigDecimal("50.00")
        val sellPrice = BigDecimal("0.00")

        fun toRequest(tagged: Boolean = true): HorseRequest =
            HorseRequest(
                tagged = tagged,
                manufacturerId = manufacturer.id,
                moldId = mold.id,
                scaleId = scale.id,
                modelId = model.id,
                breedId = breed.id,
                breedTypeId = breedType.id,
                colorId = color.id,
                patternId = pattern.id,
                genderId = gender.id,
                conditionId = condition.id,
                locationId = location.id,
                purchasePrice = purchasePrice,
                sellPrice = sellPrice,
                nanQualified = false,
                firstPlace = 1,
                secondPlace = 0,
                thirdPlace = 0,
                fourthPlace = 0,
                fifthPlace = 0,
                showName = "Star",
                officePony = "Desk",
            )

        fun toHorse(
            id: Long = 0,
            tagged: Boolean = true,
        ): Horse =
            Horse(
                id = id,
                tagged = tagged,
                manufacturer = manufacturer,
                mold = mold,
                scale = scale,
                model = model,
                breed = breed,
                breedType = breedType,
                color = color,
                pattern = pattern,
                gender = gender,
                condition = condition,
                location = location,
                purchasePrice = purchasePrice,
                sellPrice = sellPrice,
                nanQualified = false,
                firstPlace = 1,
                secondPlace = 0,
                thirdPlace = 0,
                fourthPlace = 0,
                fifthPlace = 0,
                showName = "Star",
                officePony = "Desk",
            )
    }
}
