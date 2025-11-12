package com.inventory.horse.entity.requests

import java.math.BigDecimal

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
    val purchasePrice: BigDecimal,
    val sellPrice: BigDecimal,
    val nanQualified: Boolean,
    val firstPlace: Int,
    val secondPlace: Int,
    val thirdPlace: Int,
    val fourthPlace: Int,
    val fifthPlace: Int,
    val showName: String,
    val officePony: String?,
)
