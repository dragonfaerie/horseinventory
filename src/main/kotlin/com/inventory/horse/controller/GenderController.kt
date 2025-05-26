package com.inventory.horse.controller

import com.inventory.horse.entity.Gender
import com.inventory.horse.repository.GenderRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/genders")
class GenderController(
    private val repo: GenderRepository,
) {
    @GetMapping("/")
    fun getAll(): List<Gender> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody gender: Gender,
    ): Gender = repo.save(gender)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Gender,
    ): ResponseEntity<Gender> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
