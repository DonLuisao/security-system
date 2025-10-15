package com.starkindustries.security_system.dto;

import lombok.Data;

@Data // Anotación de Lombok para generar getters, setters, toString(), etc.
public class SensorEventDTO {
    private String sensorType;
    private String data;
    private String location;
}
