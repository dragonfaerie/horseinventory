package com.inventory.horse.controller

import com.inventory.horse.entity.Finish
import com.inventory.horse.entity.Manufacturer
import com.inventory.horse.repository.FinishRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/finishes")
class FinishController(
    private val repo: FinishRepository
) {
    @GetMapping("/")
    fun getAll(): List<Finish> = repo.findAll()

    @PostMapping
    fun create(@RequestBody finish: Finish): Finish =
        repo.save(finish)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Finish
    ): ResponseEntity<Finish> =
        repo.findById(id).map {
            val newOne = updated.copy(id = id)
            ResponseEntity.ok(repo.save(newOne))
        }.orElse(ResponseEntity.notFound().build())
}
