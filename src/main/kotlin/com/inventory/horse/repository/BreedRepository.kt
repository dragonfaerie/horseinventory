package com.inventory.horse.repository

import com.inventory.horse.entity.Breed
import org.springframework.data.jpa.repository.JpaRepository

interface BreedRepository : JpaRepository<Breed, Long>
