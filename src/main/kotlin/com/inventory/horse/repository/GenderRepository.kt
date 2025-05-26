package com.inventory.horse.repository

import com.inventory.horse.entity.Gender
import org.springframework.data.jpa.repository.JpaRepository

interface GenderRepository : JpaRepository<Gender, Long>
