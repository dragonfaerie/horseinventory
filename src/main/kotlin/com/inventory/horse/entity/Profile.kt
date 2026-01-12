package com.inventory.horse.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "profiles")
data class Profile(
    @Id
    val id: UUID = UUID.randomUUID(),
    @Column(name = "display_name")
    val displayName: String? = null,
    @Column(nullable = false)
    val role: String = "user",
) {
    constructor() : this(UUID.randomUUID(), null, "user")
}
