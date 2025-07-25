package com.inventory.horse.controller

import com.inventory.horse.entity.BreedType
import com.inventory.horse.repository.BreedTypeRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/breed-types")
class BreedTypeController(
    private val repo: BreedTypeRepository,
) {
    @GetMapping
    fun getAll(): List<BreedType> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody breedType: BreedType,
    ): BreedType = repo.save(breedType)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: BreedType,
    ): ResponseEntity<BreedType> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
