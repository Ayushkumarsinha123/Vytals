function handleBedRequest(clientId, data) {
  console.log(
    `📢 [${data.eventType}] from client [${clientId}]: ${data.bedType} (${data.available} available)`
  );

  // Further backend logic: DB interaction, etc.
}

module.exports = handleBedRequest;
