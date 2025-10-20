package com.starkindustries.security_system.controller;

import com.starkindustries.security_system.dto.SensorEventDTO;
import com.starkindustries.security_system.repository.SensorEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private SensorEventRepository sensorEventRepository;

    @GetMapping("/alerts")
    public ResponseEntity<List<SensorEventDTO>> getAllAlerts() {
        List<SensorEventDTO> alerts = sensorEventRepository.findByIsAlertTrue();
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/recent-events")
    public ResponseEntity<List<SensorEventDTO>> getRecentEvents() {
        List<SensorEventDTO> events = sensorEventRepository.findTop10ByOrderByTimestampDesc();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();

        long totalEvents = sensorEventRepository.count();
        metrics.put("totalEvents", totalEvents);

        Long totalAlerts = sensorEventRepository.countByIsAlertTrue();
        metrics.put("totalAlerts", totalAlerts);

        Map<String, Long> eventsBySensor = new HashMap<>();
        eventsBySensor.put("movement", sensorEventRepository.countBySensorType("movement"));
        eventsBySensor.put("temperature", sensorEventRepository.countBySensorType("temperature"));
        eventsBySensor.put("access", sensorEventRepository.countBySensorType("access"));
        metrics.put("eventsBySensorType", eventsBySensor);

        List<Object[]> distribution = sensorEventRepository.countEventsBySensorType();
        Map<String, Long> distributionMap = distribution.stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));
        metrics.put("distribution", distributionMap);

        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/events")
    public ResponseEntity<List<SensorEventDTO>> getAllEvents(
            @RequestParam(required = false, defaultValue = "100") int limit) {
        List<SensorEventDTO> events = sensorEventRepository.findAll();

        if (events.size() > limit) {
            events = events.subList(0, limit);
        }

        return ResponseEntity.ok(events);
    }

    @GetMapping("/events/{sensorType}")
    public ResponseEntity<List<SensorEventDTO>> getEventsBySensorType(@PathVariable String sensorType) {
        List<SensorEventDTO> events = sensorEventRepository.findBySensorType(sensorType);
        return ResponseEntity.ok(events);
    }
}