package com.starkindustries.securitysystem.sensors;

import org.springframework.stereotype.Component;

@Component("movementSensor")
public class MovementSensor implements Sensor {
    @Override
    public String processData(String rawData) {
        if ("true".equalsIgnoreCase(rawData)) {
            return "ALERTA: Movimiento no autorizado detectado.";
        }
        return "OK: Perímetro asegurado.";
    }
}