const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  console.log("User is connected");

  socket.on("sendMessage", (data) => {
   socket.broadcast.emit("receiveMessage", data)
  });
});

server.listen(3001, () => {
  ``;
  console.log("Server is running on port 3001");
});
