package com.inventory.horse.controller

import com.inventory.horse.entity.Breed
import com.inventory.horse.entity.BreedType
import com.inventory.horse.entity.Color
import com.inventory.horse.entity.Condition
import com.inventory.horse.entity.Finish
import com.inventory.horse.entity.Gender
import com.inventory.horse.entity.Location
import com.inventory.horse.entity.Manufacturer
import com.inventory.horse.entity.Model
import com.inventory.horse.entity.Mold
import com.inventory.horse.entity.Pattern
import com.inventory.horse.entity.RunType
import com.inventory.horse.entity.Scale
import com.inventory.horse.entity.Tracking
import com.inventory.horse.entity.requests.ModelRequest
import com.inventory.horse.entity.requests.MoldRequest
import com.inventory.horse.repository.BreedRepository
import com.inventory.horse.repository.BreedTypeRepository
import com.inventory.horse.repository.ColorRepository
import com.inventory.horse.repository.ConditionRepository
import com.inventory.horse.repository.FinishRepository
import com.inventory.horse.repository.GenderRepository
import com.inventory.horse.repository.LocationRepository
import com.inventory.horse.repository.ManufacturerRepository
import com.inventory.horse.repository.ModelRepository
import com.inventory.horse.repository.MoldRepository
import com.inventory.horse.repository.PatternRepository
import com.inventory.horse.repository.RunTypeRepository
import com.inventory.horse.repository.ScaleRepository
import com.inventory.horse.repository.TrackingRepository
import io.mockk.clearMocks
import io.mockk.confirmVerified
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.math.BigDecimal
import java.util.Optional

data class CrudControllerBindings<T : Any>(
    val getAll: () -> List<T>,
    val create: (T) -> T,
    val update: (Long, T) -> ResponseEntity<T>,
)

abstract class SimpleLookupControllerContract<T : Any, Repo : JpaRepository<T, Long>> {
    protected abstract val repo: Repo
    protected abstract val controller: CrudControllerBindings<T>
    protected abstract val entity: T
    protected abstract val updatePayload: T

    protected abstract fun withId(
        entity: T,
        id: Long,
    ): T

    @BeforeEach
    fun resetMocks() {
        clearMocks(repo)
    }

    @Test
    fun `getAll returns repository payload`() {
        every { repo.findAll() } returns listOf(entity)

        val result = controller.getAll()

        assertEquals(listOf(entity), result)
        verify(exactly = 1) { repo.findAll() }
    }

    @Test
    fun `create saves and returns persisted entity`() {
        every { repo.save(entity) } returns entity

        val created = controller.create(entity)

        assertEquals(entity, created)
        verify(exactly = 1) { repo.save(entity) }
    }

    @Test
    fun `update returns updated entity when target exists`() {
        val id = 99L
        val expectedSaved = withId(updatePayload, id)
        every { repo.findById(id) } returns Optional.of(entity)
        every { repo.save(expectedSaved) } returns expectedSaved

        val response = controller.update(id, updatePayload)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(expectedSaved, response.body)
        verify(exactly = 1) { repo.findById(id) }
        verify(exactly = 1) { repo.save(expectedSaved) }
        confirmVerified(repo)
    }

    @Test
    fun `update returns 404 when target is missing`() {
        val missingId = 123L
        every { repo.findById(missingId) } returns Optional.empty()

        val response = controller.update(missingId, updatePayload)

        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertNull(response.body)
        verify(exactly = 1) { repo.findById(missingId) }
        confirmVerified(repo)
    }
}

class BreedControllerTest : SimpleLookupControllerContract<Breed, BreedRepository>() {
    private val repoMock = mockk<BreedRepository>()
    private val controllerInstance = BreedController(repoMock)

    override val repo: BreedRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Breed(id = 1, name = "Arabian")
    override val updatePayload = Breed(id = 0, name = "Stock Horse")

    override fun withId(
        entity: Breed,
        id: Long,
    ): Breed = entity.copy(id = id)
}

class BreedTypeControllerTest : SimpleLookupControllerContract<BreedType, BreedTypeRepository>() {
    private val repoMock = mockk<BreedTypeRepository>()
    private val controllerInstance = BreedTypeController(repoMock)

    override val repo: BreedTypeRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = BreedType(id = 1, name = "Draft")
    override val updatePayload = BreedType(id = 0, name = "Performance")

    override fun withId(
        entity: BreedType,
        id: Long,
    ): BreedType = entity.copy(id = id)
}

class ColorControllerTest : SimpleLookupControllerContract<Color, ColorRepository>() {
    private val repoMock = mockk<ColorRepository>()
    private val controllerInstance = ColorController(repoMock)

    override val repo: ColorRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Color(id = 1, name = "Bay")
    override val updatePayload = Color(id = 0, name = "Black")

    override fun withId(
        entity: Color,
        id: Long,
    ): Color = entity.copy(id = id)
}

class ConditionControllerTest : SimpleLookupControllerContract<Condition, ConditionRepository>() {
    private val repoMock = mockk<ConditionRepository>()
    private val controllerInstance = ConditionController(repoMock)

    override val repo: ConditionRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Condition(id = 1, name = "Mint")
    override val updatePayload = Condition(id = 0, name = "Playwear")

    override fun withId(
        entity: Condition,
        id: Long,
    ): Condition = entity.copy(id = id)
}

class FinishControllerTest : SimpleLookupControllerContract<Finish, FinishRepository>() {
    private val repoMock = mockk<FinishRepository>()
    private val controllerInstance = FinishController(repoMock)

    override val repo: FinishRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Finish(id = 1, name = "Gloss")
    override val updatePayload = Finish(id = 0, name = "Matte")

    override fun withId(
        entity: Finish,
        id: Long,
    ): Finish = entity.copy(id = id)
}

class GenderControllerTest : SimpleLookupControllerContract<Gender, GenderRepository>() {
    private val repoMock = mockk<GenderRepository>()
    private val controllerInstance = GenderController(repoMock)

    override val repo: GenderRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Gender(id = 1, name = "Mare")
    override val updatePayload = Gender(id = 0, name = "Stallion")

    override fun withId(
        entity: Gender,
        id: Long,
    ): Gender = entity.copy(id = id)
}

class LocationControllerTest : SimpleLookupControllerContract<Location, LocationRepository>() {
    private val repoMock = mockk<LocationRepository>()
    private val controllerInstance = LocationController(repoMock)

    override val repo: LocationRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Location(id = 1, name = "Show String")
    override val updatePayload = Location(id = 0, name = "Home Shelf")

    override fun withId(
        entity: Location,
        id: Long,
    ): Location = entity.copy(id = id)
}

class ManufacturerControllerTest : SimpleLookupControllerContract<Manufacturer, ManufacturerRepository>() {
    private val repoMock = mockk<ManufacturerRepository>()
    private val controllerInstance = ManufacturerController(repoMock)

    override val repo: ManufacturerRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Manufacturer(id = 1, name = "Breyer")
    override val updatePayload = Manufacturer(id = 0, name = "Stone")

    override fun withId(
        entity: Manufacturer,
        id: Long,
    ): Manufacturer = entity.copy(id = id)
}

class PatternControllerTest : SimpleLookupControllerContract<Pattern, PatternRepository>() {
    private val repoMock = mockk<PatternRepository>()
    private val controllerInstance = PatternController(repoMock)

    override val repo: PatternRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Pattern(id = 1, name = "Dapple")
    override val updatePayload = Pattern(id = 0, name = "Appaloosa")

    override fun withId(
        entity: Pattern,
        id: Long,
    ): Pattern = entity.copy(id = id)
}

class RunTypeControllerTest : SimpleLookupControllerContract<RunType, RunTypeRepository>() {
    private val repoMock = mockk<RunTypeRepository>()
    private val controllerInstance = RunTypeController(repoMock)

    override val repo: RunTypeRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = RunType(id = 1, name = "LE")
    override val updatePayload = RunType(id = 0, name = "SR")

    override fun withId(
        entity: RunType,
        id: Long,
    ): RunType = entity.copy(id = id)
}

class ScaleControllerTest : SimpleLookupControllerContract<Scale, ScaleRepository>() {
    private val repoMock = mockk<ScaleRepository>()
    private val controllerInstance = ScaleController(repoMock)

    override val repo: ScaleRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity = Scale(id = 1, name = "Traditional")
    override val updatePayload = Scale(id = 0, name = "Classic")

    override fun withId(
        entity: Scale,
        id: Long,
    ): Scale = entity.copy(id = id)
}

class TrackingControllerTest : SimpleLookupControllerContract<Tracking, TrackingRepository>() {
    private val repoMock = mockk<TrackingRepository>()
    private val controllerInstance = TrackingController(repoMock)

    override val repo: TrackingRepository = repoMock
    override val controller =
        CrudControllerBindings(
            getAll = controllerInstance::getAll,
            create = controllerInstance::create,
            update = controllerInstance::update,
        )
    override val entity =
        Tracking(
            id = 1,
            purchasePrice = BigDecimal("10.00"),
            sellPrice = BigDecimal("20.00"),
            nanQualified = true,
            firstPlace = 1,
            secondPlace = 0,
            thirdPlace = 0,
            fourthPlace = 0,
            fifthPlace = 0,
        )
    override val updatePayload =
        Tracking(
            id = 0,
            purchasePrice = BigDecimal("15.00"),
            sellPrice = BigDecimal("25.00"),
            nanQualified = false,
            firstPlace = 0,
            secondPlace = 1,
            thirdPlace = 0,
            fourthPlace = 0,
            fifthPlace = 0,
        )

    override fun withId(
        entity: Tracking,
        id: Long,
    ): Tracking = entity.copy(id = id)
}

class ModelControllerTest {
    private val modelRepository = mockk<ModelRepository>()
    private val moldRepository = mockk<MoldRepository>()
    private val runTypeRepository = mockk<RunTypeRepository>()
    private val finishRepository = mockk<FinishRepository>()
    private val scaleRepository = mockk<ScaleRepository>()
    private val controller =
        ModelController(
            repo = modelRepository,
            moldRepository = moldRepository,
            runTypeRepository = runTypeRepository,
            finishRepository = finishRepository,
            scaleRepository = scaleRepository,
        )

    private val manufacturer = Manufacturer(id = 10, name = "Breyer")
    private val mold = Mold(id = 20, name = "Othello", manufacturer = manufacturer)
    private val runType = RunType(id = 30, name = "LE")
    private val finish = Finish(id = 40, name = "Gloss")
    private val scale = Scale(id = 50, name = "Traditional")
    private val existing =
        Model(
            id = 60,
            name = "Sunny",
            mold = mold,
            runType = runType,
            finish = finish,
            scale = scale,
        )

    @BeforeEach
    fun resetModelMocks() {
        clearMocks(modelRepository, moldRepository, runTypeRepository, finishRepository, scaleRepository)
    }

    @Test
    fun `model getAll proxies repository`() {
        every { modelRepository.findAll() } returns listOf(existing)

        val response = controller.getAll()

        assertEquals(listOf(existing), response)
        verify(exactly = 1) { modelRepository.findAll() }
        confirmVerified(modelRepository)
    }

    @Test
    fun `createModel composes entity from request`() {
        val request =
            ModelRequest(
                name = "Stormy",
                moldId = mold.id,
                runTypeId = runType.id,
                finishId = finish.id,
                scaleId = scale.id,
            )
        every { moldRepository.findById(request.moldId) } returns Optional.of(mold)
        every { runTypeRepository.findById(request.runTypeId) } returns Optional.of(runType)
        every { finishRepository.findById(request.finishId) } returns Optional.of(finish)
        every { scaleRepository.findById(request.scaleId) } returns Optional.of(scale)
        val expectedNewModel = Model(name = request.name, mold = mold, runType = runType, finish = finish, scale = scale)
        val persisted = expectedNewModel.copy(id = 77)
        every { modelRepository.save(expectedNewModel) } returns persisted

        val response = controller.createModel(request)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(persisted, response.body)
        verify(exactly = 1) { moldRepository.findById(request.moldId) }
        verify(exactly = 1) { runTypeRepository.findById(request.runTypeId) }
        verify(exactly = 1) { finishRepository.findById(request.finishId) }
        verify(exactly = 1) { scaleRepository.findById(request.scaleId) }
        verify(exactly = 1) { modelRepository.save(expectedNewModel) }
        confirmVerified(modelRepository, moldRepository, runTypeRepository, finishRepository, scaleRepository)
    }

    @Test
    fun `createModel throws when mold is missing`() {
        val request =
            ModelRequest(
                name = "Stormy",
                moldId = mold.id,
                runTypeId = runType.id,
                finishId = finish.id,
                scaleId = scale.id,
            )
        every { moldRepository.findById(request.moldId) } returns Optional.empty()

        val error = assertThrows<RuntimeException> { controller.createModel(request) }

        assertEquals("Mold not found", error.message)
        verify(exactly = 1) { moldRepository.findById(request.moldId) }
        confirmVerified(modelRepository, moldRepository, runTypeRepository, finishRepository, scaleRepository)
    }

    @Test
    fun `model update saves merged entity when target exists`() {
        val payload = existing.copy(id = 0, name = "Updated")
        val expected = payload.copy(id = existing.id)
        every { modelRepository.findById(existing.id) } returns Optional.of(existing)
        every { modelRepository.save(expected) } returns expected

        val response = controller.update(existing.id, payload)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(expected, response.body)
        verify(exactly = 1) { modelRepository.findById(existing.id) }
        verify(exactly = 1) { modelRepository.save(expected) }
        confirmVerified(modelRepository)
    }

    @Test
    fun `model update returns 404 for missing entity`() {
        val payload = existing.copy(id = 0, name = "Updated")
        every { modelRepository.findById(existing.id) } returns Optional.empty()

        val response = controller.update(existing.id, payload)

        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertNull(response.body)
        verify(exactly = 1) { modelRepository.findById(existing.id) }
        confirmVerified(modelRepository)
    }
}

class MoldControllerTest {
    private val moldRepository = mockk<MoldRepository>()
    private val manufacturerRepository = mockk<ManufacturerRepository>()
    private val controller = MoldController(moldRepository, manufacturerRepository)

    private val manufacturer = Manufacturer(id = 100, name = "Breyer")
    private val existing = Mold(id = 200, name = "Othello", manufacturer = manufacturer)

    @BeforeEach
    fun resetMoldMocks() {
        clearMocks(moldRepository, manufacturerRepository)
    }

    @Test
    fun `mold getAll proxies repository`() {
        every { moldRepository.findAll() } returns listOf(existing)

        val response = controller.getAll()

        assertEquals(listOf(existing), response)
        verify(exactly = 1) { moldRepository.findAll() }
        confirmVerified(moldRepository)
    }

    @Test
    fun `createMold builds entity from request`() {
        val request = MoldRequest(name = "Newsworthy", manufacturerId = manufacturer.id)
        every { manufacturerRepository.findById(request.manufacturerId) } returns Optional.of(manufacturer)
        val expectedNew = Mold(name = request.name, manufacturer = manufacturer)
        val persisted = expectedNew.copy(id = 300)
        every { moldRepository.save(expectedNew) } returns persisted

        val response = controller.createMold(request)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(persisted, response.body)
        verify(exactly = 1) { manufacturerRepository.findById(request.manufacturerId) }
        verify(exactly = 1) { moldRepository.save(expectedNew) }
        confirmVerified(moldRepository, manufacturerRepository)
    }

    @Test
    fun `createMold throws when manufacturer is missing`() {
        val request = MoldRequest(name = "Newsworthy", manufacturerId = manufacturer.id)
        every { manufacturerRepository.findById(request.manufacturerId) } returns Optional.empty()

        val error = assertThrows<RuntimeException> { controller.createMold(request) }

        assertEquals("Manufacturer not found", error.message)
        verify(exactly = 1) { manufacturerRepository.findById(request.manufacturerId) }
        confirmVerified(moldRepository, manufacturerRepository)
    }

    @Test
    fun `mold update saves merged entity when target exists`() {
        val payload = existing.copy(id = 0, name = "Updated")
        val expected = payload.copy(id = existing.id, manufacturer = manufacturer)
        every { moldRepository.findById(existing.id) } returns Optional.of(existing)
        every { moldRepository.save(expected) } returns expected

        val response = controller.update(existing.id, payload)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(expected, response.body)
        verify(exactly = 1) { moldRepository.findById(existing.id) }
        verify(exactly = 1) { moldRepository.save(expected) }
        confirmVerified(moldRepository)
    }

    @Test
    fun `mold update returns 404 for missing entity`() {
        val payload = existing.copy(id = 0, name = "Updated")
        every { moldRepository.findById(existing.id) } returns Optional.empty()

        val response = controller.update(existing.id, payload)

        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertNull(response.body)
        verify(exactly = 1) { moldRepository.findById(existing.id) }
        confirmVerified(moldRepository)
    }
}
