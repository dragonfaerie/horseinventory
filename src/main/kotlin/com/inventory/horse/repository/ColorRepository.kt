package com.inventory.horse.repository

import com.inventory.horse.entity.Breed
import com.inventory.horse.entity.Color
import com.inventory.horse.entity.Finish
import org.springframework.data.jpa.repository.JpaRepository

interface ColorRepository : JpaRepository<Color, Long>
