package com.inventory.horse.repository

import com.inventory.horse.entity.Pattern
import org.springframework.data.jpa.repository.JpaRepository

interface PatternRepository : JpaRepository<Pattern, Long>
