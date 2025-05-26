package com.inventory.horse.controller

import com.inventory.horse.entity.Breed
import com.inventory.horse.entity.Finish
import com.inventory.horse.repository.BreedRepository
import com.inventory.horse.repository.FinishRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/breeds")
class BreedController(
    private val repo: BreedRepository,
) {
    @GetMapping("/")
    fun getAll(): List<Breed> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody breed: Breed,
    ): Breed = repo.save(breed)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Breed,
    ): ResponseEntity<Breed> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
