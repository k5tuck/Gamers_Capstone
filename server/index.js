require("dotenv").config();

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
const { Op } = require("sequelize");
const { User, Comment, Post, Game } = require("./models");
const { requireLogin, logout } = require("./auth");
const UPLOAD_URL = "/uploads/media/";
const multer = require("multer");
const upload = multer({ dest: "public" + UPLOAD_URL });

const Sequelize = require("sequelize");

const { layout } = require("./utils");

// Routes
const { homeRouter, userRouter, memberRouter } = require("./routers");

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

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.use("/", homeRouter); //Has all home items
app.use("/user", userRouter); // Has SignUp, LogIn, and logOut

app.use("/members", memberRouter);

//catch all if website doesn't
app.get("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
