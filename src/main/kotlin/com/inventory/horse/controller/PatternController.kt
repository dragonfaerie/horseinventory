package com.inventory.horse.controller

import com.inventory.horse.entity.Pattern
import com.inventory.horse.repository.PatternRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/patterns")
class PatternController(
    private val repo: PatternRepository,
) {
    @GetMapping
    fun getAll(): List<Pattern> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody pattern: Pattern,
    ): Pattern = repo.save(pattern)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Pattern,
    ): ResponseEntity<Pattern> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
