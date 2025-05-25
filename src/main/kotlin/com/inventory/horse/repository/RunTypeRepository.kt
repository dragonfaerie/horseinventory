package com.inventory.horse.repository

import com.inventory.horse.entity.Finish
import com.inventory.horse.entity.RunType
import org.springframework.data.jpa.repository.JpaRepository

interface RunTypeRepository : JpaRepository<RunType, Long>
