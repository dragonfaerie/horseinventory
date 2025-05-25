package com.inventory.horse.controller

import com.inventory.horse.entity.Mold
import com.inventory.horse.repository.MoldRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/molds")
class MoldController(
    private val repo: MoldRepository,
) {
    @GetMapping("/")
    fun getAll(): List<Mold> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody mold: Mold,
    ): Mold = repo.save(mold)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Mold,
    ): ResponseEntity<Mold> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
