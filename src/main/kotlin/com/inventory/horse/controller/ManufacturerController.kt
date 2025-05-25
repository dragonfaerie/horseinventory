package com.inventory.horse.controller

import com.inventory.horse.entity.Manufacturer
import com.inventory.horse.repository.ManufacturerRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/manufacturers")
class ManufacturerController(
    private val repo: ManufacturerRepository
) {
    @GetMapping("/")
    fun getAll(): List<Manufacturer> = repo.findAll()

    @PostMapping
    fun create(@RequestBody manufacturer: Manufacturer): Manufacturer =
        repo.save(manufacturer)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Manufacturer
    ): ResponseEntity<Manufacturer> =
        repo.findById(id).map {
            val newOne = updated.copy(id = id)
            ResponseEntity.ok(repo.save(newOne))
        }.orElse(ResponseEntity.notFound().build())
}
