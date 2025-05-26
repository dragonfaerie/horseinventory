package com.inventory.horse.entity.requests

data class ModelRequest(
    val name: String,
    val moldId: Long,
    val runTypeId: Long,
    val finishId: Long,
    val scaleId: Long,
)
