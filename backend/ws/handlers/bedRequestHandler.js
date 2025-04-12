const axios = require("axios");
const { broadcastToClients } = require("./../utils/broadcast");

async function handleBedRequest(clientId, data, clients, WebSocket) {
  console.log(
    `📢 [${data.eventType}] from client [${clientId}]: ${data.bedType} (${data.available} available)`
  );
  console.log(data);
  const slug = data.slug; // assuming the frontend includes slug in the data

  try {
    const response = await axios.get(
      `http://localhost:6010/api/v1/get-nearest-hospitals/distances/${data.hospitalSlug}`
    );

    const hospitalInfo = response.data;
    console.log(`🏥 Hospital Info for [${data.hospitalSlug}]:`, hospitalInfo);

    // RESPONSE
    const responsePayload = {
      eventType: "BED_REQUEST_ACK",
      patientName: data.patientName,
      cause: data.cause,
      bedType: data.bedType,
      slug: data.hospitalSlug,
    };

    broadcastToClients(clients, WebSocket, responsePayload);
  } catch (error) {
    console.error(
      `❌ Failed to fetch hospital info for slug: ${slug}`,
      error.message
    );
  }
}

module.exports = handleBedRequest;
