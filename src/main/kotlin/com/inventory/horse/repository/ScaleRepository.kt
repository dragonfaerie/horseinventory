package com.inventory.horse.repository

import com.inventory.horse.entity.Finish
import com.inventory.horse.entity.Scale
import org.springframework.data.jpa.repository.JpaRepository

interface ScaleRepository : JpaRepository<Scale, Long>
