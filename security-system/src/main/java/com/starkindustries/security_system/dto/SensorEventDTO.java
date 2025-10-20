package com.starkindustries.security_system.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

// DTO para recibir datos de sensores (sin anotaciones JPA)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SensorEventDTO {
    private String sensorType;
    private String data;
    private String location;
}