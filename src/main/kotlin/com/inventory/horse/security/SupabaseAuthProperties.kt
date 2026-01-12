package com.inventory.horse.security

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties("supabase.auth")
data class SupabaseAuthProperties(
    val jwtSecret: String,
    val issuer: String,
    val audience: String,
)
