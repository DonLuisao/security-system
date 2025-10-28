# Stark Industries - Sistema de Seguridad Concurrente

## Miembros del grupo:
- Luis Sánchez Elvira
- Pablo Lobato Gónzalez
- Jiachen Ye

---

## Descripción del proyecto
Este proyecto implementa un sistema de seguridad avanzado y concurrente para Stark Industries, desarrollado con **Spring Boot**. El sistema está diseñado para procesar datos de múltiples sensores en tiempo real, generar alertas inmediatas y visualizarlas en un dashboard dinámico.

---

## 📂 Estructura del Proyecto

### Archivos de Configuración
- **pom.xml**: dependencias necesarias para la seguridad y dependencias, hemos utilizado Spring Boot y Loombok
- **Aplication.properties**:

### Modelos (model/)

### Servicios (service/)

### Controladores (controller/)

### Configuración (config/)

---

## Lógica de Solución
### Gestión de sensores
### Procesamiento concurrente
### Spring Security
### Notificaciones en tiempo real
### Monitorización

---

## Cómo Ejeuctar
1. Debe tener Java 17+ en su dispositivo
2. Navega al directorio del proyecto
3. Ejecuta: 'mvn spring-boot:run'
4. El sistema estara disponible en el puerto 8080 (hhtps://localhost:8080), siempre y cuando este vacío. 
5. Inicia sesion con las siguientes credenciales:  Usuario=Persona1    Contraseña=Password1234
---

## 📜 Resumen



El sistema simula la recepción de datos de diferentes tipos de sensores (movimiento, temperatura, acceso) a través de una API REST. Utiliza el poder de la concurrencia en Spring (`@Async`) para procesar estos eventos de manera eficiente sin bloquear el sistema. Las alertas críticas se guardan en una base de datos y se envían instantáneamente a una interfaz de usuario a través de \*\*WebSockets\*\*, proporcionando una monitorización en tiempo real.



---



## ✨ Características Principales



* **Procesamiento Concurrente**: Maneja múltiples flujos de datos de sensores simultáneamente gracias a la ejecución asíncrona.

* **Dashboard en Tiempo Real**: Una interfaz web dinámica que muestra alertas, métricas y un historial de eventos sin necesidad de recargar la página.

* **Notificaciones Instantáneas**: Utiliza WebSockets (con STOMP sobre SockJS) para enviar alertas al dashboard en el momento en que ocurren.

* **Persistencia de Datos**: Almacena todos los eventos de los sensores en una base de datos en memoria (H2) para su posterior consulta y auditoría.

* **API REST para Sensores**: Un endpoint `POST /api/events` para que los sensores (simulados) envíen sus datos.

* **Métricas y Gráficos**: Visualización del estado del sistema, contadores de eventos y un gráfico de distribución de actividad por tipo de sensor.



---



## 🛠️ Tecnologías Utilizadas



### Backend

* **Java 17**

* **Spring Boot**

* **Spring Web**: Para la creación de la API REST.

* **Spring Data JPA**: Para la persistencia de datos.

* **Spring Security**: Para la estructura de seguridad.

* **WebSocket**: Para la comunicación en tiempo real.

* **Maven**: Como gestor de dependencias y construcción.

* **H2 Database**: Como base de datos en memoria.



### Frontend

* **HTML5**

* **CSS3**

* **JavaScript (Vanilla)**

* **Bootstrap 5**: Para el diseño responsive.

* **Chart.js**: Para la visualización de gráficos.

* **SockJS \& STOMP.js**: Para la conexión con el servidor WebSocket.



---




