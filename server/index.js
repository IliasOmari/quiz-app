const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: "*",
});
let questioner = [];
io.on("connection", (socket) => {
  socket.on("sendQuestioner", (data) => {
    questioner.push(data);
    io.of("/player").emit("getQuestioner", questioner);
  });
});

io.of("/player").on("connection", (socket) => {
  socket.on("nameQuiz", (data) => {
    const party = questioner.find((el) => el.name == data);
    socket.join(data);
    if (party) {
      io.of("/player").to(data).emit("getQuestionerData", party);
    }
  });
  socket.on("quizlist", () => {
    io.of("/player").emit("getQuestioner", questioner);
  });
});

io.of("/player/party").on("connection", (socket) => {
  socket.on("nameQuiz", (data) => {
    const party = questioner.find((el) => el.name == data);
    if (party) {
      io.of("/player/party").emit("getQuestionerData", party);
    }
  });
});
server.listen(3001, () => {
  console.log("Server is running on port 3000");
});
