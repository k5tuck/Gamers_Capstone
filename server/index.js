require("dotenv").config();

const path = require("path");
const http = require("http");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const es6Renderer = require("express-es6-template-engine");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const app = express();
const server = http.createServer(app);
const bcrypt = require("bcryptjs");
const UPLOAD_URL = "/uploads/media/";
const multer = require("multer");
var stream = require("getstream");

const { layout } = require("./utils");

// Routes
const { apiRouter } = require("./routers");

// Controllers
const { errorController } = require("./controllers");

const logger = morgan("dev");
const hostname = "0.0.0.0";
const port = 4000;

//Register Middleware
app.use(logger);
app.use(helmet());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    store: new FileStore(), // no options for now
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use("/api", apiRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

// ------------------- Socket IO Server ---------------------
const socket = require("socket.io");

// Socket Setup - Pass in Server for Socket to work with
const io = socket(server);

// Listen for Event called Connection - Each client
// has their own socket (connection) between the serve and client

io.on("connection", function (socket) {
  console.log("Made Socket Connection", socket.id);

  // Listen to Message From Client > take in data > Send to All Clients
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", () => {
    console.log("Socket Connection Terminated");
  });
});
