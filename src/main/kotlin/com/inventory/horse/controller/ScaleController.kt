package com.inventory.horse.controller

import com.inventory.horse.entity.Scale
import com.inventory.horse.repository.ScaleRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/scales")
class ScaleController(
    private val repo: ScaleRepository,
) {
    @GetMapping("/")
    fun getAll(): List<Scale> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody scale: Scale,
    ): Scale = repo.save(scale)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Scale,
    ): ResponseEntity<Scale> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
