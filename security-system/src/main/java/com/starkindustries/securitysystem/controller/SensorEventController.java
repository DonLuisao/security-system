package com.starkindustries.securitysystem.controller;

import com.starkindustries.securitysystem.dto.SensorEventDTO;
import com.starkindustries.securitysystem.service.DataProcessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class SensorEventController {

    @Autowired
    private DataProcessingService dataProcessingService;

    @PostMapping
    public ResponseEntity<String> receiveSensorEvent(@RequestBody SensorEventDTO event) {
        dataProcessingService.processSensorData(event);
        return ResponseEntity.accepted().body("Evento del sensor '" + event.getSensorType() + "' recibido para procesamiento.");
    }
}
