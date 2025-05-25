package com.inventory.horse.repository

import com.inventory.horse.entity.Finish
import org.springframework.data.jpa.repository.JpaRepository

interface FinishRepository : JpaRepository<Finish, Long>
