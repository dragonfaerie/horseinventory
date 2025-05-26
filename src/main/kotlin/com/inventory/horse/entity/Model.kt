package com.inventory.horse.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "models")
data class Model(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(nullable = false, unique = true)
    val name: String,
    @ManyToOne
    @JoinColumn(name = "mold_id", nullable = false)
    val mold: Mold,
    @ManyToOne
    @JoinColumn(name = "run_type_id", nullable = false)
    val runType: RunType,
    @ManyToOne
    @JoinColumn(name = "finish_id", nullable = false)
    val finish: Finish,
    @ManyToOne
    @JoinColumn(name = "scale_id", nullable = false)
    val scale: Scale,
) {
    constructor() : this(0, "", Mold(), RunType(), Finish(), Scale())
}
