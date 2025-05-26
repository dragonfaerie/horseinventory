package com.inventory.horse.controller

import com.inventory.horse.entity.Color
import com.inventory.horse.repository.ColorRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/colors")
class ColorController(
    private val repo: ColorRepository,
) {
    @GetMapping("/")
    fun getAll(): List<Color> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody color: Color,
    ): Color = repo.save(color)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Color,
    ): ResponseEntity<Color> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
