package com.inventory.horse.repository

import com.inventory.horse.entity.Horse
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional
import java.util.UUID

interface HorseRepository : JpaRepository<Horse, Long> {
    fun findAllByOwnerId(ownerId: UUID): List<Horse>

    fun findByIdAndOwnerId(
        id: Long,
        ownerId: UUID,
    ): Optional<Horse>

    fun existsByIdAndOwnerId(
        id: Long,
        ownerId: UUID,
    ): Boolean
}
