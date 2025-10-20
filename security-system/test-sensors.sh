#!/bin/bash

API_URL="http://localhost:8080/api/events"

echo "🛡️  Iniciando simulación de sensores de Stark Industries..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Función para enviar evento
send_event() {
    local sensor_type=$1
    local data=$2
    local location=$3

    response=$(curl -s -X POST $API_URL \
        -H "Content-Type: application/json" \
        -d "{\"sensorType\":\"$sensor_type\",\"data\":\"$data\",\"location\":\"$location\"}")

    echo "✅ Enviado: $sensor_type | Datos: $data | Ubicación: $location"
}

# ============================================
# ESCENARIO 1: Eventos Normales
# ============================================
echo "📋 ESCENARIO 1: Operación Normal"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

send_event "movement" "false" "Lobby Principal"
sleep 1

send_event "temperature" "22.5" "Oficina 101"
sleep 1

send_event "access" "granted" "Entrada Principal"
sleep 1

echo ""

# ============================================
# ESCENARIO 2: Alertas de Movimiento
# ============================================
echo "🚨 ESCENARIO 2: Detectando Intrusiones"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

send_event "movement" "true" "Almacén Restringido"
sleep 1

send_event "movement" "true" "Sector 7G - Zona Crítica"
sleep 1

send_event "movement" "true" "Laboratorio de Prototipos"
sleep 1

echo ""

# ============================================
# ESCENARIO 3: Alertas de Temperatura
# ============================================
echo "🔥 ESCENARIO 3: Temperaturas Críticas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

send_event "temperature" "55.7" "Reactor ARC"
sleep 1

send_event "temperature" "78.3" "Sala de Servidores"
sleep 1

send_event "temperature" "95.0" "Motor de Pruebas"
sleep 1

echo ""

# ============================================
# ESCENARIO 4: Accesos Denegados
# ============================================
echo "🚪 ESCENARIO 4: Intentos de Acceso No Autorizado"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

send_event "access" "denied" "Bóveda de Seguridad"
sleep 1

send_event "access" "denied" "Sala de Control Principal"
sleep 1

send_event "access" "denied" "Armería"
sleep 1

echo ""

# ============================================
# ESCENARIO 5: Eventos Concurrentes (Estrés)
# ============================================
echo "⚡ ESCENARIO 5: Procesamiento Concurrente"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Enviando 20 eventos simultáneos..."

for i in {1..20}; do
    # Mezcla aleatoria de tipos de sensores
    if [ $((i % 3)) -eq 0 ]; then
        send_event "movement" "true" "Zona-$i" &
    elif [ $((i % 3)) -eq 1 ]; then
        send_event "temperature" "$((RANDOM % 100))" "Sector-$i" &
    else
        send_event "access" "denied" "Punto-$i" &
    fi
done

wait

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Simulación completada. Revisa el dashboard en:"
echo "   👉 http://localhost:8080"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"