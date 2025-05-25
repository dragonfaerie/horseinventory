package com.inventory.horse.repository

import com.inventory.horse.entity.Finish
import com.inventory.horse.entity.Mold
import com.inventory.horse.entity.Scale
import org.springframework.data.jpa.repository.JpaRepository

interface MoldRepository : JpaRepository<Mold, Long>
