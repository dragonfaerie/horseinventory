package com.inventory.horse.service

import com.inventory.horse.entity.Profile
import com.inventory.horse.repository.ProfileRepository
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class ProfileService(
    private val profileRepository: ProfileRepository,
) {
    fun ensureProfile(jwt: Jwt): Profile {
        val subject = jwt.subject ?: throw IllegalArgumentException("Token missing subject claim")
        val userId = UUID.fromString(subject)
        val displayName = resolveDisplayName(jwt)
        val role = resolveRole(jwt)
        val existing = profileRepository.findById(userId)

        if (existing.isPresent) {
            val profile = existing.get()
            val shouldUpdateDisplayName = displayName != null && displayName != profile.displayName
            val shouldUpdateRole = role != profile.role && profile.role == "user"
            return if (shouldUpdateDisplayName || shouldUpdateRole) {
                profileRepository.save(
                    profile.copy(
                        displayName = displayName ?: profile.displayName,
                        role = if (profile.role == "user") role else profile.role,
                    ),
                )
            } else {
                profile
            }
        }

        return profileRepository.save(
            Profile(
                id = userId,
                displayName = displayName,
                role = role,
            ),
        )
    }

    private fun resolveDisplayName(jwt: Jwt): String? {
        val metadata = jwt.getClaim<Map<String, Any?>>("user_metadata")
        return when {
            metadata?.get("display_name") is String -> metadata["display_name"] as String
            metadata?.get("full_name") is String -> metadata["full_name"] as String
            else -> jwt.getClaimAsString("email")
        }
    }

    private fun resolveRole(jwt: Jwt): String {
        val metadata = jwt.getClaim<Map<String, Any?>>("app_metadata")
        val rawRole = metadata?.get("role") as? String ?: "user"
        return if (rawRole.equals("admin", ignoreCase = true)) {
            "admin"
        } else {
            "user"
        }
    }
}
