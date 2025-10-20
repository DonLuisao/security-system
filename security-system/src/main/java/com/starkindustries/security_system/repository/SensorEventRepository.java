package com.starkindustries.security_system.repository;

import com.starkindustries.security_system.model.SensorEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SensorEventRepository extends JpaRepository<SensorEvent, Long> {

    List<SensorEvent> findBySensorType(String sensorType);

    List<SensorEvent> findByIsAlertTrue();

    List<SensorEvent> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    List<SensorEvent> findByLocationAndIsAlertTrue(String location);

    Long countByIsAlertTrue();

    Long countBySensorType(String sensorType);

    List<SensorEvent> findTop10ByOrderByTimestampDesc();

    @Query("SELECT e.sensorType, COUNT(e) FROM SensorEvent e GROUP BY e.sensorType")
    List<Object[]> countEventsBySensorType();
}