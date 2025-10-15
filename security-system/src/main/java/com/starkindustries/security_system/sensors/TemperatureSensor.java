package com.starkindustries.security_system.sensors;

import org.springframework.stereotype.Component;

@Component("temperatureSensor")
public class TemperatureSensor implements Sensor {
    private static final double MAX_TEMP = 50.0;

    @Override
    public String processData(String rawData) {
        try {
            double temp = Double.parseDouble(rawData);
            if (temp > MAX_TEMP) {
                return "ALERTA: Temperatura crítica de " + temp + "°C. Posible incendio.";
            }
            return "OK: Temperatura estable a " + temp + "°C.";
        } catch (NumberFormatException e) {
            return "ERROR: Dato de temperatura inválido.";
        }
    }
}
