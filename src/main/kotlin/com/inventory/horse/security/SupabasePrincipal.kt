package com.inventory.horse.security

import java.util.UUID

data class SupabasePrincipal(
    val id: UUID,
    val email: String?,
    val displayName: String?,
    val role: String,
)
