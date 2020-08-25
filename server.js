const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const fs = require("fs");
const multer = require("multer");

dotenv.config({ path: "./config/config.env" });

require("./config/passport")(passport);

connectDB();
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// EXPRESS SESSION
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ msg: "hello 2200" });
});
app.use("/auth", require("./routes/auth"));
app.use("/resources/user", require("./routes/user"));
app.use("/resources/products", require("./routes/products"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 2200;

app.listen(
  PORT,
  console.log(
    `Server connected in ${process.env.NODE_ENV} mode running on Port ${PORT}`
  )
);
