package com.inventory.horse.controller

import com.inventory.horse.entity.Condition
import com.inventory.horse.repository.ConditionRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/conditions")
class ConditionController(
    private val repo: ConditionRepository,
) {
    @GetMapping("/")
    fun getAll(): List<Condition> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody condition: Condition,
    ): Condition = repo.save(condition)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Condition,
    ): ResponseEntity<Condition> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
