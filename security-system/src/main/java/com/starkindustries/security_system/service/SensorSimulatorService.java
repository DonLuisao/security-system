package com.starkindustries.security_system.service;

import com.starkindustries.security_system.dto.SensorEventDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class SensorSimulatorService {

    private static final Logger logger = LoggerFactory.getLogger(SensorSimulatorService.class);
    private final DataProcessingService dataProcessingService;
    private final Random random = new Random();

    // Asegúrate de que estos nombres coincidan con los nombres de tus beans
    // AccessSensor -> "Access", MovementSensor -> "Movement", TemperatureSensor -> "Temperature"
    private final String[] SENSOR_TYPES = {"Access", "Movement", "Temperature"};
    private final String[] LOCATIONS = {"LAB_01", "HALLWAY_A", "SERVER_ROOM", "EXIT_DOOR"};

    public SensorSimulatorService(DataProcessingService dataProcessingService) {
        this.dataProcessingService = dataProcessingService;
    }

    /**
     * Simula la llegada de un evento de sensor cada 5 segundos (5000ms).
     * El procesamiento es asíncrono, liberando el hilo del scheduler.
     */
    @Scheduled(fixedRate = 5000)
    public void generateRandomSensorEvent() {
        String type = SENSOR_TYPES[random.nextInt(SENSOR_TYPES.length)];
        String location = LOCATIONS[random.nextInt(LOCATIONS.length)];
        String data = generateRandomData(type);

        SensorEventDTO event = new SensorEventDTO(type, data, location);

        logger.info("📡 Simulador enviando evento: {} en {}", type, location);

        // Llama al servicio de procesamiento asíncrono
        dataProcessingService.processSensorData(event);
    }

    private String generateRandomData(String type) {
        return switch (type) {
            case "Temperature" -> String.format("%.2f", 40.0 + random.nextDouble() * 15.0); // Entre 40.0 y 55.0
            case "Movement" -> random.nextBoolean() ? "true" : "false"; // 50% de movimiento (alerta en "true")
            case "Access" -> random.nextDouble() < 0.2 ? "denied" : "granted"; // 20% de acceso denegado (alerta en "denied")
            default -> "N/A";
        };
    }
}