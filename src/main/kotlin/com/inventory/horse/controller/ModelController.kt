package com.inventory.horse.controller

import com.inventory.horse.entity.Model
import com.inventory.horse.entity.requests.ModelRequest
import com.inventory.horse.repository.FinishRepository
import com.inventory.horse.repository.ModelRepository
import com.inventory.horse.repository.MoldRepository
import com.inventory.horse.repository.RunTypeRepository
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
@RequestMapping("/api/models")
class ModelController(
    private val repo: ModelRepository,
    private val moldRepository: MoldRepository,
    private val runTypeRepository: RunTypeRepository,
    private val finishRepository: FinishRepository,
    private val scaleRepository: ScaleRepository,
) {
    @GetMapping
    fun getAll(): List<Model> = repo.findAll()

    @PostMapping
    fun createModel(
        @RequestBody request: ModelRequest,
    ): ResponseEntity<Model> {
        val mold =
            moldRepository
                .findById(request.moldId)
                .orElseThrow { RuntimeException("Mold not found") }

        val runType = runTypeRepository.findById(request.runTypeId).orElseThrow { RuntimeException("Run Type not found") }

        val finish = finishRepository.findById(request.finishId).orElseThrow { RuntimeException("Finish not found") }

        val scale = scaleRepository.findById(request.scaleId).orElseThrow { RuntimeException("Scale not found") }

        val model = Model(name = request.name, mold = mold, runType = runType, finish = finish, scale = scale)
        return ResponseEntity.ok(repo.save(model))
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody updated: Model,
    ): ResponseEntity<Model> =
        repo
            .findById(id)
            .map {
                val newOne = updated.copy(id = id)
                ResponseEntity.ok(repo.save(newOne))
            }.orElse(ResponseEntity.notFound().build())
}
