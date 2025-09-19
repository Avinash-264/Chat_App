const express = require("express");
const { WebSocket, WebSocketServer } = require("ws");
const app = express();

const httpServer = app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function(ws) {
    console.log("A new client has connected.");

    ws.on("error", console.error);

    ws.on("message", function(msg) {
        console.log(`Received message: ${msg}`);
        // Broadcast the message to all clients except the sender
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("A client has disconnected.");
    });
});