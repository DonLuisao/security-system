# --- Etapa de Construcción (Build Stage) ---
# Usamos una imagen de Maven con JDK 17 para compilar el proyecto.
# 'AS builder' le da un nombre a esta etapa para referenciarla luego.
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copiamos solo el pom.xml para aprovechar la caché de Docker.
# Si las dependencias no cambian, Docker no las volverá a descargar.
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el resto del código fuente.
COPY src ./src

# Compilamos la aplicación, omitiendo las pruebas para agilizar la construcción.
# El resultado será un archivo .jar en el directorio /app/target/
RUN mvn clean package -DskipTests


# --- Etapa de Ejecución (Runtime Stage) ---
# Usamos una imagen de Java mucho más ligera, solo con lo necesario para ejecutar.
# Esto hace que nuestra imagen final sea pequeña y más segura.
FROM eclipse-temurin:17-jre-alpine

# Establecemos el directorio de trabajo.
WORKDIR /app

# Copiamos únicamente el archivo .jar compilado desde la etapa 'builder'.
# Renombramos el .jar a 'app.jar' para facilitar el comando de ejecución.
COPY --from=builder /app/target/*.jar app.jar

# Exponemos el puerto 8080, que es el que usa Spring Boot por defecto.
EXPOSE 8080

# El comando que se ejecutará cuando el contenedor se inicie.
ENTRYPOINT ["java", "-jar", "app.jar"]