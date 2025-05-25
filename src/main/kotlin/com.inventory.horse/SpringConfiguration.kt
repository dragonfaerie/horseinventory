package com.inventory.horse

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@EnableJpaRepositories("com.inventory.horse.repository")
@EntityScan("com.inventory.horse.entity")
@ComponentScan
class SpringConfiguration
