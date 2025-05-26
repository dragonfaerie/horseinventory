package com.inventory.horse.repository

import com.inventory.horse.entity.Model
import org.springframework.data.jpa.repository.JpaRepository

interface ModelRepository : JpaRepository<Model, Long>
