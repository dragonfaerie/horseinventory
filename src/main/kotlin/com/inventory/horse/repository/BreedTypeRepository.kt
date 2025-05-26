package com.inventory.horse.repository

import com.inventory.horse.entity.BreedType
import org.springframework.data.jpa.repository.JpaRepository

interface BreedTypeRepository : JpaRepository<BreedType, Long>
