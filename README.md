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
#### `-security-system\src\main\java\com\starkindustries\security_system\model\SensorEvent.java:`
 Se trata de una entidad de base de datos que se mapea a la tabla "sensor_events" y almacena información crucial como el tipo de sensor,los datos crudos capturados, el resultado después del procesamiento, un indicador booleano que señala si el evento constituye una alerta y una marca de tiempo que se genera automáticamente al momento de crear el registro.

### Servicios (service/)
#### `-security-system\src\main\java\com\starkindustries\security_system\service\DataProcessingService.java:`
 Clase de servicio en Spring que procesa datos de sensores de seguridad de forma asíncrona,guarda en base de datos y envía notificaciones en tiempo real si hay alertas.
#### `-security-system\src\main\java\com\starkindustries\security_system\service\SensorSimulatorService.java:`
 Servicio simulador que genera eventos aleatorios de sensores cada 5 segundos,crea datos ficticios de 3 tipos de sensores (Temperatura, Movimiento, Acceso) y los envía al sistema para procesamiento.

### Controladores (controller/)
#### `-security-system\src\main\java\com\starkindustries\security_system\controller\DashboardController.java:`
Controlador REST que proporciona endpoints para el dashboard del sistema,expone APIs para consultar alertas, eventos recientes, métricas y filtros por tipo de sensor.
#### `-security-system\src\main\java\com\starkindustries\security_system\controller\SensorEventController.java:`
Endpoint POST único para recibir datos de sensores y enviarlos al servicio de procesamiento.

### Configuración (config/)
#### `-security-system\src\main\java\com\starkindustries\security_system\config\ASyncConfig.java:`
Configura un pool de hilos para procesar eventos de sensores de forma concurrente.(hilos base,maximos...)
#### `-security-system\src\main\java\com\starkindustries\security_system\config\SecurutyConfig.java:`
Configuraciónes de seguridad para el desarrollo.
#### `-security-system\src\main\java\com\starkindustries\security_system\config\WebSocketConfig.java:`
Habilita conexiones WebSocket para enviar alertas y notificaciones en tiempo real.


---

## Lógica de Solución
### Gestión de sensores
El sistema implementa una gestión flexible de sensores mediante el patrón de diseño Strategy, donde cada tipo de sensor (movimiento, temperatura, acceso) se encapsula en beans que implementan una interfaz común. Esta arquitectura permite procesar datos específicos según el tipo de sensor, generando alertas inteligentes cuando se detectan condiciones anómalas como temperaturas elevadas, movimientos inesperados o intentos de acceso denegados. La simulación incorporada facilita las pruebas durante el desarrollo sin depender de hardware físico.
### Procesamiento concurrente:
Para garantizar escalabilidad y capacidad de respuesta, el sistema utiliza procesamiento asíncrono configurado mediante un ThreadPoolTaskExecutor personalizado. Este pool de hilos maneja hasta 50 hilos concurrentes con una cola de 100 tareas pendientes, permitiendo que múltiples eventos de sensores se procesen simultáneamente sin bloquear el hilo principal de la aplicación. Esta aproximación asegura que el sistema mantenga un alto rendimiento incluso bajo cargas elevadas de eventos.
### Spring Security
La seguridad se configura en modo abierto para facilitar el desarrollo y las pruebas, deshabilitando CSRF y permitiendo todas las peticiones sin autenticación. Aunque esta configuración es adecuada para entornos de desarrollo, en producción se recomendaría implementar mecanismos de autenticación robustos como OAuth2 o JWT para proteger los endpoints críticos del sistema de seguridad.
### Notificaciones en tiempo real
La comunicación bidireccional se implementa mediante WebSocket con STOMP, permitiendo que las alertas críticas se propaguen instantáneamente a todos los clientes conectados. Cuando un sensor genera una alerta, el sistema publica automáticamente una notificación en el topic "/topic/alerts", que los dashboards reciben y visualizan sin necesidad de realizar polling constante al servidor.
### Monitorización
El sistema proporciona un dashboard completo que muestra métricas en tiempo real, incluyendo el total de eventos, distribución por tipo de sensor, alertas activas y eventos recientes. Los endpoints REST permiten consultar información histórica y filtrar por tipos específicos de sensores, mientras que la integración con Chart.js facilita la visualización de datos mediante gráficos interactivos que ayudan en el análisis.

---

## Cómo Ejeuctar
1. Debe tener Java 17+ en su dispositivo
2. Navega al directorio del proyecto
3. Ejecuta: 'mvn spring-boot:run'
4. El sistema estara disponible en el puerto 8080 (hhtps://localhost:8080), siempre y cuando este vacío.
5. Se abre index.htm, una pagina de inicio de sesión
6. Inicia sesion con las siguientes credenciales:  Usuario=Persona1    Contraseña=Password1234
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




