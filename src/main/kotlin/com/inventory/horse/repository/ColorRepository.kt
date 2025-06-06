package com.inventory.horse.repository

import com.inventory.horse.entity.Color
import org.springframework.data.jpa.repository.JpaRepository

interface ColorRepository : JpaRepository<Color, Long>
