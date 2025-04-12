const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const {
  addClient,
  removeClient,
  getClients,
} = require("./utils/clientManager");
const handleBedRequest = require("./handlers/bedRequestHandler");

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    const clientId = uuidv4();
    addClient({ id: clientId, ws });

    console.log(`Client connected: ${clientId}`);
    console.log(
      "Current connected clients:",
      getClients().map((c) => c.id)
    );

    ws.on("message", (message) => {
      getClients().forEach(({ id, ws: clientSocket }) => {
        if (clientSocket.readyState === WebSocket.OPEN) {
          try {
            const parsed = JSON.parse(message);

            console.log(parsed);

            switch (parsed.eventType) {
              case "BED_REQUEST":
                handleBedRequest(id, parsed, getClients(), WebSocket);
                break;
              default:
                console.log(`ℹ️ Unknown event from [${id}]:`, parsed);
            }

            clientSocket.send(
              JSON.stringify({ id: clientId, message: parsed })
            );
          } catch (err) {
            console.error("❌ Invalid message format:", message);
          }
        }
      });
    });

    ws.on("close", () => {
      removeClient(clientId);
      console.log(`Client [${clientId}] disconnected`);
    });
  });
}

module.exports = { setupWebSocketServer };
