const { setupWebSocketServer } = require("./server");
const { createServer } = require("http");
const express = require("express");

const app = express();
const server = createServer(app);

setupWebSocketServer(server);

server.listen(9000, () => {
  console.log("Listening on http://localhost:9000");
});
