const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;
const express = require("express");

const path = require("path");
const { createServer } = require("http");
const { v4: uuidv4 } = require("uuid");

const app = express();

const server = createServer(app);

// ***************************
// Creating a websocket server
// ***************************
const wss = new WebSocketServer({ server });

// enhance the connection to the server with identification and logging:
let clients = [];

wss.on("connection", function (ws) {
  var client_uuid = uuidv4();

  clients.push({ id: client_uuid, ws });

  console.log(`Client connected: ${client_uuid}`);
  console.log(
    "Current connected clients:",
    clients.map((c) => c.id)
  );

  ws.on("message", (message) => {
    for (let i = 0; i < clients.length; i++) {
      let clientSocket = clients[i].ws;

      // The collection of connected clients needs to account for the possibility that
      // the client has gone away, and ensure that before you send a message, there is
      // still an open WebSocket connection.
      if (clientSocket.readyState === WebSocket.OPEN) {
        console.log("client [%s]: %s", clients[i].id, message);
        clientSocket.send(
          JSON.stringify({
            id: client_uuid,
            message: message,
          })
        );
      }
    }
  });

  // Handling the close event / client disconnected
  ws.on("close", function () {
    for (var i = 0; i < clients.length; i++) {
      if (clients[i].id == client_uuid) {
        console.log("client [%s] disconnected", client_uuid);

        // REMOVING that client_uuid from the array
        clients.splice(i, 1);
      }
    }
  });
});

// SERVER FOR LISTENING
server.listen(9000, function () {
  console.log("Listening on http://localhost:9000");
});
