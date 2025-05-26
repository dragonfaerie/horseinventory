package com.inventory.horse.repository

import com.inventory.horse.entity.Horse
import org.springframework.data.jpa.repository.JpaRepository

interface HorseRepository : JpaRepository<Horse, Long>
