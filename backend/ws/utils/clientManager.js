let clients = [];

function addClient(client) {
  clients.push(client);
}

function removeClient(clientId) {
  clients = clients.filter((c) => c.id !== clientId);
}

function getClients() {
  return clients;
}

module.exports = { addClient, removeClient, getClients };
