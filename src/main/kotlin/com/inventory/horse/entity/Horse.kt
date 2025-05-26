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
@Table(name = "horses")
data class Horse(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column
    val tagged: Boolean,
    @ManyToOne
    @JoinColumn(name = "manufacturer_id", nullable = false)
    val manufacturer: Manufacturer,
    @ManyToOne
    @JoinColumn(name = "mold_id", nullable = false)
    val mold: Mold,
    @ManyToOne
    @JoinColumn(name = "scale_id", nullable = false)
    val scale: Scale,
    @ManyToOne
    @JoinColumn(name = "model_id", nullable = false)
    val model: Model,
    @ManyToOne
    @JoinColumn(name = "breed_id", nullable = false)
    val breed: Breed,
    @ManyToOne
    @JoinColumn(name = "breed_type_id", nullable = false)
    val breedType: BreedType,
    @ManyToOne
    @JoinColumn(name = "color_id", nullable = false)
    val color: Color,
    @ManyToOne
    @JoinColumn(name = "pattern_id", nullable = false)
    val pattern: Pattern,
    @ManyToOne
    @JoinColumn(name = "gender_id", nullable = false)
    val gender: Gender,
    @ManyToOne
    @JoinColumn(name = "condition_id", nullable = false)
    val condition: Condition,
    @ManyToOne
    @JoinColumn(name = "location", nullable = false)
    val location: Location,
    @ManyToOne
    @JoinColumn(name = "tracking", nullable = false)
    val tracking: Tracking,
    @Column
    val showName: String,
    @Column
    val officePony: String?,
) {
    constructor() : this(
        0,
        false,
        Manufacturer(),
        Mold(),
        Scale(),
        Model(),
        Breed(),
        BreedType(),
        Color(),
        Pattern(),
        Gender(),
        Condition(),
        Location(),
        Tracking(),
        "",
        "",
    )
}
