// Variables globales
let stompClient = null;
let sensorChart = null;

// Conectar al WebSocket
function connect() {
    const socket = new SockJS('/stark-security-websocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log('Conectado: ' + frame);
        updateConnectionStatus(true);

        // Suscribirse al topic de alertas
        stompClient.subscribe('/topic/alerts', function(message) {
            const alert = JSON.parse(message.body);
            showAlert(alert);
            loadMetrics();
            loadRecentEvents();
        });
    }, function(error) {
        console.log('Error de conexión: ' + error);
        updateConnectionStatus(false);
        setTimeout(connect, 5000);
    });
}

// Actualizar estado de conexión
function updateConnectionStatus(connected) {
    const statusEl = document.getElementById('connectionStatus');
    if (connected) {
        statusEl.className = 'connection-status status-connected';
        statusEl.innerHTML = '✅ Conectado';
    } else {
        statusEl.className = 'connection-status status-disconnected';
        statusEl.innerHTML = '⚠️ Desconectado';
    }
}

// Mostrar alerta en tiempo real
function showAlert(alert) {
    const container = document.getElementById('alertsContainer');

    // Limpiar mensaje de "no hay alertas"
    if (container.querySelector('p.text-muted')) {
        container.innerHTML = '';
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-item critical';
    alertDiv.innerHTML = `
        <strong>🚨 ${alert.sensorType.toUpperCase()}</strong> - ${alert.location}<br>
        <small>${alert.message}</small><br>
        <small class="text-muted">${new Date(alert.timestamp).toLocaleString()}</small>
    `;

    container.insertBefore(alertDiv, container.firstChild);

    // Limitar a 10 alertas visibles
    while (container.children.length > 10) {
        container.removeChild(container.lastChild);
    }
}

// Cargar métricas del sistema
async function loadMetrics() {
    try {
        const response = await fetch('/api/dashboard/metrics');
        const metrics = await response.json();

        document.getElementById('totalEvents').textContent = metrics.totalEvents;
        document.getElementById('totalAlerts').textContent = metrics.totalAlerts;
        document.getElementById('movementEvents').textContent = metrics.eventsBySensorType.movement || 0;
        document.getElementById('temperatureEvents').textContent = metrics.eventsBySensorType.temperature || 0;
        document.getElementById('accessEvents').textContent = metrics.eventsBySensorType.access || 0;

        updateChart(metrics.distribution);
    } catch (error) {
        console.error('Error cargando métricas:', error);
    }
}

// Cargar eventos recientes
async function loadRecentEvents() {
    try {
        const response = await fetch('/api/dashboard/recent-events');
        const events = await response.json();

        const tbody = document.getElementById('eventsTableBody');
        tbody.innerHTML = '';

        events.forEach(event => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>#${event.id}</td>
                <td>${event.sensorType}</td>
                <td>${event.location}</td>
                <td>${event.processedResult}</td>
                <td>${new Date(event.timestamp).toLocaleString()}</td>
                <td>
                    <span class="badge ${event.isAlert ? 'badge-alert' : 'badge-ok'}">
                        ${event.isAlert ? '🚨 ALERTA' : '✅ OK'}
                    </span>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error cargando eventos:', error);
    }
}

// Actualizar gráfico
function updateChart(distribution) {
    const ctx = document.getElementById('sensorChart');

    if (sensorChart) {
        sensorChart.destroy();
    }

    const labels = Object.keys(distribution);
    const data = Object.values(distribution);

    sensorChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
            datasets: [{
                label: 'Eventos',
                data: data,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Inicializar dashboard
window.onload = function() {
    connect();
    loadMetrics();
    loadRecentEvents();

    // Actualizar cada 10 segundos
    setInterval(() => {
        loadMetrics();
        loadRecentEvents();
    }, 10000);
};