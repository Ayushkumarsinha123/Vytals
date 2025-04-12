function broadcastToClients(clients, WebSocket, payload) {
  clients.forEach(({ ws: clientSocket }) => {
    if (clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.send(JSON.stringify(payload));
    }
  });
}

module.exports = { broadcastToClients };
