package com.inventory.horse.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal

@Entity
@Table(name = "tracking")
data class Tracking(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(precision = 8, scale = 2)
    val purchasePrice: BigDecimal,
    @Column(precision = 8, scale = 2)
    val sellPrice: BigDecimal,
    @Column
    val nanQualified: Boolean,
    @Column
    val firstPlace: Int,
    @Column
    val secondPlace: Int,
    @Column
    val thirdPlace: Int,
    @Column
    val fourthPlace: Int,
    @Column
    val fifthPlace: Int,
) {
    constructor() : this(0, BigDecimal("0.00"), BigDecimal("0.00"), false, 0, 0, 0, 0, 0)
}
