package com.inventory.horse.repository

import com.inventory.horse.entity.Condition
import org.springframework.data.jpa.repository.JpaRepository

interface ConditionRepository : JpaRepository<Condition, Long>
