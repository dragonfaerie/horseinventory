package com.inventory.horse.entity.requests

data class HorseRequest(
    val tagged: Boolean,
    val manufacturerId: Long,
    val moldId: Long,
    val scaleId: Long,
    val modelId: Long,
    val breedId: Long,
    val breedTypeId: Long,
    val colorId: Long,
    val patternId: Long,
    val genderId: Long,
    val conditionId: Long,
    val locationId: Long,
    val trackingId: Long,
    val showName: String,
    val officePony: String?,
)
