const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const mongoose = require("mongoose");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");
const { isLogin } = require("./middlewares/auth");
const { qrrouter } = require("./Routes/generateQR");
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(`mongodb://shortstime400:${process.env.mongoPassword}@ac-7lrmuae-shard-00-00.gxkdmzl.mongodb.net:27017,ac-7lrmuae-shard-00-01.gxkdmzl.mongodb.net:27017,ac-7lrmuae-shard-00-02.gxkdmzl.mongodb.net:27017/?ssl=true&replicaSet=atlas-kmbelt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=QR-Code-Generator`)
  .then((e) => console.log("connected to mongodb"))
  .catch((error) => {
    console.log(error);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT || 3000;

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.get("*", (req, res) => {
  return res.send("<h1>Bhai Back Chala ja ye route available nahi hai</h1>");
});

app.use("/generate-qr", qrrouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
