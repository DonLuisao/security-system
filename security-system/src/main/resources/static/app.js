document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // CONFIGURACIÓN Y REFERENCIAS AL DOM
    // ======================================================
    const API_BASE_URL = 'http://localhost:8080';
    const WEBSOCKET_URL = `${API_BASE_URL}/stark-security-websocket`;
    const ALERTS_TOPIC = '/topic/alerts';

    let stompClient = null;
    let sensorActivityChart = null;

    const alertsFeed = document.getElementById('alerts-feed');
    const eventHistoryBody = document.getElementById('event-history-body');
    const totalEventsElement = document.getElementById('total-events');
    const criticalAlertsElement = document.getElementById('critical-alerts');
    const systemStatusElement = document.getElementById('system-status');

    // Datos para el gráfico
    const chartData = {
        labels: ['Movement', 'Temperature', 'Access'],
        datasets: [{
            label: 'Events Count',
            data: [0, 0, 0], // Inicia en cero
            backgroundColor: ['#dc3545', '#0d6efd', '#ffc107'],
            borderColor: '#444',
            borderWidth: 1
        }]
    };

    // ======================================================
    // INICIALIZACIÓN PRINCIPAL
    // ======================================================

    const initializeDashboard = () => {
        console.log("Initializing Dashboard...");
        initChart();
        loadDummyData(); // Carga los datos de prueba
        connectWebSocket();
        setInterval(fetchSystemHealth, 30000); // Revisa el estado del sistema periódicamente
    };

    // ======================================================
    // FUNCIONES DE INICIALIZACIÓN
    // ======================================================

    // Inicia el objeto del gráfico
    const initChart = () => {
        const ctx = document.getElementById('sensorActivityChart').getContext('2d');
        if (!ctx) {
            console.error("No se pudo encontrar el contexto del canvas para el gráfico.");
            return;
        }
        sensorActivityChart = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top', labels: { color: '#e0e0e0' } },
                    title: { display: true, text: 'Event Distribution', color: '#e0e0e0' }
                }
            }
        });
        console.log("Chart initialized successfully.");
    };

    // Carga los datos de prueba
    const loadDummyData = () => {
        console.log("Loading dummy data...");

        // 1. Métricas
        totalEventsElement.textContent = 137;
        criticalAlertsElement.textContent = 12;

        // 2. Gráfico
        if (sensorActivityChart) {
            sensorActivityChart.data.datasets[0].data = [5, 4, 3]; // Datos de prueba
            sensorActivityChart.update();
            console.log("Chart data updated.");
        }

        // 3. Historial
        const dummyHistory = [
            { id: 101, sensorType: 'Movement', location: 'Sector 7G', data: 'true', timestamp: '2025-10-16T18:30:00Z', alert: true },
            { id: 100, sensorType: 'Temperature', location: 'Reactor ARC', data: '95.5', timestamp: '2025-10-16T18:25:10Z', alert: true },
            { id: 99, sensorType: 'Access', location: 'Entrada Principal', data: 'granted', timestamp: '2025-10-16T18:22:05Z', alert: false },
            { id: 98, sensorType: 'Movement', location: 'Almacén B', data: 'false', timestamp: '2025-10-16T17:55:41Z', alert: false },
            { id: 97, sensorType: 'Temperature', location: 'Sala de Servidores', data: '35.1', timestamp: '2025-10-16T17:40:12Z', alert: false }
        ];
        eventHistoryBody.innerHTML = '';
        dummyHistory.forEach(addNewEventToHistory);
        console.log("Event history populated.");
    };

    // ======================================================
    // LÓGICA DE WEBSOCKET Y ACTUALIZACIONES
    // ======================================================

    const connectWebSocket = () => {
        const socket = new SockJS(WEBSOCKET_URL);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            console.log('WebSocket connection established.');
            updateSystemStatus(true);
            stompClient.subscribe(ALERTS_TOPIC, (message) => {
                const alert = JSON.parse(message.body);
                addAlertToFeed(alert);
                addNewEventToHistory(alert);
                updateMetricsAndChart(alert);
            });
        }, () => {
            console.error('WebSocket connection failed. Retrying...');
            updateSystemStatus(false);
            setTimeout(connectWebSocket, 5000);
        });
    };

    const addAlertToFeed = (alert) => {
        const placeholder = alertsFeed.querySelector('p.text-muted');
        if (placeholder) placeholder.remove();

        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-danger real-time p-2 mb-2';
        alertElement.innerHTML = `<strong>${alert.sensorType.toUpperCase()}</strong>: ${alert.message}<br><small class="text-white-50">${alert.location} at ${new Date(alert.timestamp).toLocaleTimeString()}</small>`;
        alertsFeed.prepend(alertElement);
        if (alertsFeed.children.length > 10) alertsFeed.lastChild.remove();
    };

    const fetchSystemHealth = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/actuator/health`);
            updateSystemStatus((await response.json()).status === 'UP');
        } catch (error) {
            updateSystemStatus(false);
        }
    };

    const addNewEventToHistory = (event) => {
        const row = eventHistoryBody.insertRow(0);
        row.style.backgroundColor = event.alert ? '#4d2d2d' : '';
        row.innerHTML = `
            <td>${event.id}</td>
            <td>${event.sensorType}</td>
            <td>${event.location}</td>
            <td>${event.data}</td>
            <td>${new Date(event.timestamp).toLocaleString()}</td>
        `;
        if (eventHistoryBody.rows.length > 50) eventHistoryBody.deleteRow(-1);
    };

    const updateSystemStatus = (isOnline) => {
        systemStatusElement.textContent = isOnline ? 'Online' : 'Offline';
        systemStatusElement.className = isOnline ? 'status-online' : 'status-offline';
    };

    const updateMetricsAndChart = (event) => {
        totalEventsElement.textContent = parseInt(totalEventsElement.textContent) + 1;
        if (event.alert) {
            criticalAlertsElement.textContent = parseInt(criticalAlertsElement.textContent) + 1;
        }

        const sensorIndex = chartData.labels.findIndex(label => label.toLowerCase() === event.sensorType.toLowerCase());
        if (sensorIndex !== -1 && sensorActivityChart) {
            sensorActivityChart.data.datasets[0].data[sensorIndex]++;
            sensorActivityChart.update();
        }
    };

    // ======================================================
    // INICIA TODO
    // ======================================================
    initializeDashboard();
});