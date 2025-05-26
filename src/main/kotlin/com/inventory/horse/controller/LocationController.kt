package com.inventory.horse.controller

import com.inventory.horse.entity.Location
import com.inventory.horse.repository.LocationRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/locations")
class LocationController(
    private val repo: LocationRepository,
) {
    @GetMapping("/")
    fun getAll(): List<Location> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody location: Location,
    ): Location = repo.save(location)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Location,
    ): ResponseEntity<Location> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
