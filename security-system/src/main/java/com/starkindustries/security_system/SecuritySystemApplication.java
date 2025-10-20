package com.starkindustries.security_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync // Activa la capacidad de ejecutar tareas en segundo plano
@EnableScheduling
public class SecuritySystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecuritySystemApplication.class, args);
    }

}
