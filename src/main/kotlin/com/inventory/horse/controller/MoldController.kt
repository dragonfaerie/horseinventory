package com.inventory.horse.controller

import com.inventory.horse.entity.Mold
import com.inventory.horse.entity.requests.MoldRequest
import com.inventory.horse.repository.ManufacturerRepository
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
    private val manufacturerRepository: ManufacturerRepository,
) {
    @GetMapping
    fun getAll(): List<Mold> = repo.findAll()

    @PostMapping
    fun createMold(
        @RequestBody request: MoldRequest,
    ): ResponseEntity<Mold> {
        println("Requested manuvacturer ID: ${request.manufacturerId}")

        val manufacturer =
            manufacturerRepository
                .findById(request.manufacturerId)
                .orElseThrow { RuntimeException("Manufacturer not found") }

        val mold = Mold(name = request.name, manufacturer = manufacturer)
        return ResponseEntity.ok(repo.save(mold))
    }

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
