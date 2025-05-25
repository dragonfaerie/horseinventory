package com.inventory.horse.repository

import com.inventory.horse.entity.Mold
import org.springframework.data.jpa.repository.JpaRepository

interface MoldRepository : JpaRepository<Mold, Long>
