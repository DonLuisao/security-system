package com.starkindustries.security_system.service;

import com.starkindustries.security_system.dto.SensorEventDTO;
import com.starkindustries.security_system.sensors.Sensor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class DataProcessingService {

    private static final Logger logger = LoggerFactory.getLogger(DataProcessingService.class);

    @Autowired
    private ApplicationContext context;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Async("sensorTaskExecutor")
    public void processSensorData(SensorEventDTO event) {
        logger.info("Procesando datos para sensor '{}' en hilo: {}", event.getSensorType(), Thread.currentThread().getName());
        try {
            String beanName = event.getSensorType().toLowerCase() + "Sensor";
            Sensor sensor = context.getBean(beanName, Sensor.class);
            String result = sensor.processData(event.getData());

            if (result.startsWith("ALERTA")) {
                logger.warn("¡Alerta generada! Mensaje: {}", result);
                Map<String, String> notification = new HashMap<>();
                notification.put("sensorType", event.getSensorType());
                notification.put("location", event.getLocation());
                notification.put("message", result);
                notification.put("timestamp", java.time.LocalDateTime.now().toString());

                messagingTemplate.convertAndSend("/topic/alerts", notification);
            }
        } catch (Exception e) {
            logger.error("Error procesando evento del sensor {}: {}", event.getSensorType(), e.getMessage());
        }
    }
}