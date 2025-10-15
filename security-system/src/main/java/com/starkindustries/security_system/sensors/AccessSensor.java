package com.starkindustries.security_system.sensors;

import org.springframework.stereotype.Component;

@Component("accessSensor")
public class AccessSensor implements Sensor {
    @Override
    public String processData(String rawData) {
        if ("denied".equalsIgnoreCase(rawData)) {
            return "ALERTA: Intento de acceso forzado en punto de control.";
        }
        return "OK: Acceso autorizado.";
    }
}
