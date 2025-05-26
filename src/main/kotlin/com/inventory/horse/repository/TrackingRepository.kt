package com.inventory.horse.repository

import com.inventory.horse.entity.Tracking
import org.springframework.data.jpa.repository.JpaRepository

interface TrackingRepository : JpaRepository<Tracking, Long>
