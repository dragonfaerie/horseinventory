package com.inventory.horse.controller

import com.inventory.horse.entity.RunType
import com.inventory.horse.repository.RunTypeRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/run-types")
class RunTypeController(
    private val repo: RunTypeRepository,
) {
    @GetMapping("/")
    fun getAll(): List<RunType> = repo.findAll()

    @PostMapping
    fun create(
        @RequestBody runType: RunType,
    ): RunType = repo.save(runType)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: RunType,
    ): ResponseEntity<RunType> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
