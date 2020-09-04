const express = require("express");
const PORT = process.env.PORT || 8080;
const expressStaticGzip = require("express-static-gzip");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const uniqid = require("uniqid");

app.set("port", PORT);
app.use("/", expressStaticGzip("dist"));
app.get("/", (req, res) => {
  res.sendFile(__dirname, "/dist/index.html");
});

http.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

io.on("connection", (socket) => {
  console.log("someone connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
    socket.broadcast.emit("promptMsg", msg);
  });
  socket.on("disconnect", () => {
    socket.removeAllListeners();
  });
});
