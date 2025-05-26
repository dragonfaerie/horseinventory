package com.inventory.horse.repository

import com.inventory.horse.entity.Location
import org.springframework.data.jpa.repository.JpaRepository

interface LocationRepository : JpaRepository<Location, Long>
