package com.inventory.horse.security

import com.inventory.horse.service.ProfileService
import org.springframework.core.convert.converter.Converter
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.stereotype.Component

@Component
class SupabaseJwtAuthenticationConverter(
    private val profileService: ProfileService,
) : Converter<Jwt, UsernamePasswordAuthenticationToken> {
    override fun convert(jwt: Jwt): UsernamePasswordAuthenticationToken {
        val profile = profileService.ensureProfile(jwt)
        val authorities: Collection<GrantedAuthority> =
            listOf(SimpleGrantedAuthority("ROLE_${profile.role.uppercase()}"))
        val principal =
            SupabasePrincipal(
                id = profile.id,
                email = jwt.getClaimAsString("email"),
                displayName = profile.displayName,
                role = profile.role,
            )

        return UsernamePasswordAuthenticationToken(principal, jwt.tokenValue, authorities)
    }
}
