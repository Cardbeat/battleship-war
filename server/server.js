const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const api = require("./routes/api/index");
const user = require("./routes/user/index");
const app = express();
const mongoose = require("mongoose");
const Keys = require("../Keys");
const socket = require("socket.io");
require("./db/Users");

mongoose.connect(
  Keys.URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => console.log("connected to mongodb")
);

mongoose.set("debug", true);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/public/")));
app.use("/api", api);
app.use("/user", user);
const port = process.env.PORT || 5000;

const server = app.listen(port);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/404.html"));
});

console.log("App is listening on port " + port);

const io = socket(server);

io.on("connection", socket => {
  console.log("socket connected");
  //  socket.emit('request', /* … */); // emit an event to the socket
  //  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  //  socket.on('reply', () => { /* … */ }); // listen to the event
});
