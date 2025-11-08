package com.inventory.horse.service

import com.inventory.horse.entity.*
import com.inventory.horse.entity.requests.HorseRequest
import com.inventory.horse.repository.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.*
import java.util.Optional

class HorseServiceTest {
    private lateinit var horseRepository: HorseRepository
    private lateinit var manufacturerRepository: ManufacturerRepository
    private lateinit var moldRepository: MoldRepository
    private lateinit var scaleRepository: ScaleRepository
    private lateinit var modelRepository: ModelRepository
    private lateinit var breedRepository: BreedRepository
    private lateinit var breedTypeRepository: BreedTypeRepository
    private lateinit var colorRepository: ColorRepository
    private lateinit var patternRepository: PatternRepository
    private lateinit var genderRepository: GenderRepository
    private lateinit var conditionRepository: ConditionRepository
    private lateinit var locationRepository: LocationRepository
    private lateinit var trackingRepository: TrackingRepository

    private lateinit var service: HorseService

    @BeforeEach
    fun setUp() {
        horseRepository = mock(HorseRepository::class.java)
        manufacturerRepository = mock(ManufacturerRepository::class.java)
        moldRepository = mock(MoldRepository::class.java)
        scaleRepository = mock(ScaleRepository::class.java)
        modelRepository = mock(ModelRepository::class.java)
        breedRepository = mock(BreedRepository::class.java)
        breedTypeRepository = mock(BreedTypeRepository::class.java)
        colorRepository = mock(ColorRepository::class.java)
        patternRepository = mock(PatternRepository::class.java)
        genderRepository = mock(GenderRepository::class.java)
        conditionRepository = mock(ConditionRepository::class.java)
        locationRepository = mock(LocationRepository::class.java)
        trackingRepository = mock(TrackingRepository::class.java)

        service =
            HorseService(
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
                trackingRepository = trackingRepository,
                horseRepository = horseRepository,
            )
    }

    @Test
    fun getById_delegatesToRepository() {
        val horse = minimalHorse()
        `when`(horseRepository.findById(123L)).thenReturn(Optional.of(horse))

        val result = service.getById(123L)

        assertTrue(result.isPresent)
        assertEquals(horse, result.get())
        verify(horseRepository, times(1)).findById(123L)
    }

    @Test
    fun createHorse_buildsAndSavesHorseSuccessfully() {
        val manufacturer = Manufacturer(id = 1, name = "Breyer")
        val mold = Mold(id = 2, name = "Mold")
        val scale = Scale(id = 3, name = "1_12")
        val model = Model(id = 4, name = "Model")
        val breed = Breed(id = 5, name = "Arabian")
        val breedType = BreedType(id = 6, name = "Type")
        val color = Color(id = 7, name = "Bay")
        val pattern = Pattern(id = 8, name = "Solid")
        val gender = Gender(id = 9, name = "Mare")
        val condition = Condition(id = 10, name = "Mint")
        val location = Location(id = 11, name = "Shelf")
        val tracking = Tracking(id = 12, name = "Owned")

        stubLookups(
            manufacturer,
            mold,
            scale,
            model,
            breed,
            breedType,
            color,
            pattern,
            gender,
            condition,
            location,
            tracking,
        )

        val request =
            HorseRequest(
                tagged = true,
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
                trackingId = tracking.id,
                showName = "Star",
                officePony = "Yes",
            )

        val captor = ArgumentCaptor.forClass(Horse::class.java)
        `when`(horseRepository.save(captor.capture())).thenAnswer { captor.value }

        val response = service.createHorse(request)

        assertEquals(200, response.statusCode.value())
        val saved = response.body!!
        assertEquals(true, saved.tagged)
        assertEquals("Star", saved.showName)
        assertEquals("Yes", saved.officePony)
        assertEquals(manufacturer, saved.manufacturer)
        assertEquals(mold, saved.mold)
        assertEquals(scale, saved.scale)
        assertEquals(model, saved.model)
        assertEquals(breed, saved.breed)
        assertEquals(breedType, saved.breedType)
        assertEquals(color, saved.color)
        assertEquals(pattern, saved.pattern)
        assertEquals(gender, saved.gender)
        assertEquals(condition, saved.condition)
        assertEquals(location, saved.location)
        assertEquals(tracking, saved.tracking)
        verify(horseRepository, times(1)).save(any())
    }

    @Test
    fun createHorse_throwsWhenReferenceMissing() {
        `when`(manufacturerRepository.findById(1L)).thenReturn(Optional.empty())
        val request =
            HorseRequest(
                tagged = false,
                manufacturerId = 1,
                moldId = 2,
                scaleId = 3,
                modelId = 4,
                breedId = 5,
                breedTypeId = 6,
                colorId = 7,
                patternId = 8,
                genderId = 9,
                conditionId = 10,
                locationId = 11,
                trackingId = 12,
                showName = "",
                officePony = null,
            )
        val ex = assertThrows(RuntimeException::class.java) { service.createHorse(request) }
        assertTrue(ex.message!!.contains("Manufacturer"))
    }

    @Test
    fun updateHorse_updatesExistingAndSaves() {
        val existing = minimalHorse(id = 99)
        `when`(horseRepository.findById(99L)).thenReturn(Optional.of(existing))

        val manufacturer = Manufacturer(id = 1, name = "Breyer")
        val mold = Mold(id = 2, name = "Mold")
        val scale = Scale(id = 3, name = "1_12")
        val model = Model(id = 4, name = "Model")
        val breed = Breed(id = 5, name = "Arabian")
        val breedType = BreedType(id = 6, name = "Type")
        val color = Color(id = 7, name = "Bay")
        val pattern = Pattern(id = 8, name = "Solid")
        val gender = Gender(id = 9, name = "Mare")
        val condition = Condition(id = 10, name = "Mint")
        val location = Location(id = 11, name = "Shelf")
        val tracking = Tracking(id = 12, name = "Owned")

        stubLookups(
            manufacturer,
            mold,
            scale,
            model,
            breed,
            breedType,
            color,
            pattern,
            gender,
            condition,
            location,
            tracking,
        )

        val request =
            HorseRequest(
                tagged = true,
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
                trackingId = tracking.id,
                showName = "New Name",
                officePony = null,
            )

        val captor = ArgumentCaptor.forClass(Horse::class.java)
        `when`(horseRepository.save(captor.capture())).thenAnswer { captor.value }

        val response = service.updateHorse(99, request)

        assertEquals(200, response.statusCode.value())
        val saved = response.body!!
        assertEquals("New Name", saved.showName)
        assertNull(saved.officePony)
        assertEquals(manufacturer, saved.manufacturer)
        verify(horseRepository, times(1)).save(any())
    }

    @Test
    fun updateHorse_throwsWhenExistingNotFound() {
        `when`(horseRepository.findById(42L)).thenReturn(Optional.empty())
        val request =
            HorseRequest(
                tagged = false,
                manufacturerId = 1,
                moldId = 2,
                scaleId = 3,
                modelId = 4,
                breedId = 5,
                breedTypeId = 6,
                colorId = 7,
                patternId = 8,
                genderId = 9,
                conditionId = 10,
                locationId = 11,
                trackingId = 12,
                showName = "",
                officePony = null,
            )
        val ex = assertThrows(RuntimeException::class.java) { service.updateHorse(42, request) }
        assertTrue(ex.message!!.contains("Horse"))
    }

    // Helpers
    private fun stubLookups(
        manufacturer: Manufacturer,
        mold: Mold,
        scale: Scale,
        model: Model,
        breed: Breed,
        breedType: BreedType,
        color: Color,
        pattern: Pattern,
        gender: Gender,
        condition: Condition,
        location: Location,
        tracking: Tracking,
    ) {
        `when`(manufacturerRepository.findById(manufacturer.id)).thenReturn(Optional.of(manufacturer))
        `when`(moldRepository.findById(mold.id)).thenReturn(Optional.of(mold))
        `when`(scaleRepository.findById(scale.id)).thenReturn(Optional.of(scale))
        `when`(modelRepository.findById(model.id)).thenReturn(Optional.of(model))
        `when`(breedRepository.findById(breed.id)).thenReturn(Optional.of(breed))
        `when`(breedTypeRepository.findById(breedType.id)).thenReturn(Optional.of(breedType))
        `when`(colorRepository.findById(color.id)).thenReturn(Optional.of(color))
        `when`(patternRepository.findById(pattern.id)).thenReturn(Optional.of(pattern))
        `when`(genderRepository.findById(gender.id)).thenReturn(Optional.of(gender))
        `when`(conditionRepository.findById(condition.id)).thenReturn(Optional.of(condition))
        `when`(locationRepository.findById(location.id)).thenReturn(Optional.of(location))
        `when`(trackingRepository.findById(tracking.id)).thenReturn(Optional.of(tracking))
    }

    private fun minimalHorse(id: Long = 0): Horse =
        Horse(
            id = id,
            tagged = false,
            manufacturer = Manufacturer(id = 1, name = "M1"),
            mold = Mold(id = 2, name = "Mo"),
            scale = Scale(id = 3, name = "Sc"),
            model = Model(id = 4, name = "Md"),
            breed = Breed(id = 5, name = "Br"),
            breedType = BreedType(id = 6, name = "Bt"),
            color = Color(id = 7, name = "Co"),
            pattern = Pattern(id = 8, name = "Pa"),
            gender = Gender(id = 9, name = "Ge"),
            condition = Condition(id = 10, name = "Cn"),
            location = Location(id = 11, name = "Lo"),
            tracking = Tracking(id = 12, name = "Tr"),
            showName = "",
            officePony = null,
        )
}
