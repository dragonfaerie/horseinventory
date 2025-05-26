package com.inventory.horse.controller

import com.inventory.horse.entity.Horse
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
import com.inventory.horse.repository.TrackingRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/horses")
class HorseController(
    private val repo: HorseRepository,
    private val manufacturerRepository: ManufacturerRepository,
    private val moldRepository: MoldRepository,
    private val scaleRepository: ScaleRepository,
    private val modelRepository: ModelRepository,
    private val breedRepository: BreedRepository,
    private val breedTypeRepository: BreedTypeRepository,
    private val colorRepository: ColorRepository,
    private val patternRepository: PatternRepository,
    private val genderRepository: GenderRepository,
    private val conditionRepository: ConditionRepository,
    private val locationRepository: LocationRepository,
    private val trackingRepository: TrackingRepository,
) {
    @GetMapping("/")
    fun getAll(): List<Horse> = repo.findAll()

    @PostMapping
    fun createHorse(
        @RequestBody request: HorseRequest,
    ): ResponseEntity<Horse> {
        val manufacturer =
            manufacturerRepository
                .findById(
                    request.manufacturerId,
                ).orElseThrow { RuntimeException("Manufacturer not Found") }

        val mold =
            moldRepository
                .findById(request.moldId)
                .orElseThrow { RuntimeException("Mold not found") }

        val scale = scaleRepository.findById(request.scaleId).orElseThrow { RuntimeException("Scale not found") }

        val model = modelRepository.findById(request.modelId).orElseThrow { RuntimeException("Model not found") }

        val breed = breedRepository.findById(request.breedId).orElseThrow { RuntimeException("Breed not found") }

        val breedType = breedTypeRepository.findById(request.breedTypeId).orElseThrow { RuntimeException("Breed Type not found") }

        val color = colorRepository.findById(request.colorId).orElseThrow { RuntimeException("Color not found") }

        val pattern = patternRepository.findById(request.patternId).orElseThrow { RuntimeException("Pattern not found") }

        val gender = genderRepository.findById(request.genderId).orElseThrow { RuntimeException("Gender not found") }

        val condition = conditionRepository.findById(request.conditionId).orElseThrow { RuntimeException("Condition not found") }

        val location = locationRepository.findById(request.locationId).orElseThrow { RuntimeException("Location not found") }

        val tracking = trackingRepository.findById(request.trackingId).orElseThrow { RuntimeException("Tracking not found") }

        val horse =
            Horse(
                tagged = request.tagged,
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
                tracking = tracking,
                showName = request.showName,
                officePony = request.officePony,
            )
        return ResponseEntity.ok(repo.save(horse))
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Horse,
    ): ResponseEntity<Horse> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
