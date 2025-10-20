package com.starkindustries.security_system.repository;

import com.starkindustries.security_system.dto.SensorEventDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SensorEventRepository extends JpaRepository<SensorEventDTO, Long> {

    List<SensorEventDTO> findBySensorType(String sensorType);

    List<SensorEventDTO> findByIsAlertTrue();

    List<SensorEventDTO> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    List<SensorEventDTO> findByLocationAndIsAlertTrue(String location);

    Long countByIsAlertTrue();

    Long countBySensorType(String sensorType);

    List<SensorEventDTO> findTop10ByOrderByTimestampDesc();

    @Query("SELECT e.sensorType, COUNT(e) FROM SensorEventDTO e GROUP BY e.sensorType")
    List<Object[]> countEventsBySensorType();
}