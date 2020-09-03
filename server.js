const express = require("express");
const PORT = 8080;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const uniqid = require("uniqid");

app.set("port", PORT);
app.use(express.static(__dirname + "/dist"));
app.get("/", (req, res) => {
  res.sendFile(__dirname, "/dist/index.html");
});

http.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

io.on("connection", (socket) => {
  io.emit("foo", socket.id);
  console.log("someone connected");
  socket.on("message", (msg) => {
    io.emit("message", {
      content: msg.content,
      created: new Date(),
      id: uniqid(),
      userId: msg.userId,
    });
  });
});
