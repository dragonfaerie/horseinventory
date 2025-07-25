package com.inventory.horse.controller

import com.inventory.horse.entity.Tracking
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
@RequestMapping("/api/tracking")
class TrackingController(
    private val repo: TrackingRepository,
) {
    @GetMapping
    fun getAll(): List<Tracking> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody tracking: Tracking,
    ): Tracking = repo.save(tracking)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Tracking,
    ): ResponseEntity<Tracking> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
