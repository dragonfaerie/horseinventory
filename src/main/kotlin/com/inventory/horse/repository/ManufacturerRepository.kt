package com.inventory.horse.repository

import com.inventory.horse.entity.Manufacturer
import org.springframework.data.jpa.repository.JpaRepository

interface ManufacturerRepository : JpaRepository<Manufacturer, Long>
