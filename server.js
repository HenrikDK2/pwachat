const express = require("express");
const PORT = process.env.PORT || 8080;
const expressStaticGzip = require("express-static-gzip");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.set("port", PORT);
app.use("/", expressStaticGzip("dist"));
app.get("/", (req, res) => {
  res.sendFile(__dirname, "/dist/index.html");
});

http.listen(PORT);

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
  socket.on("disconnect", () => {
    socket.removeAllListeners();
  });
});
