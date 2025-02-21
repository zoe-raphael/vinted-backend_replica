require("dotenv").config();

const cors = require("cors");
app.use(cors());

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer", "./vinted/offers");

const cloudinary = require("cloudinary").v2;

mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(offerRoutes);

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

// Importe de mon middleware que j'ai délocalisé
const isAuthenticated = require("./middlewares/isAuthenticated");

// J'utilise mon middleware sur les route que je veux réserver aux users authentifiés
app.get("/", isAuthenticated, (req, res) => {
  // console.log(req.coucou);

  res.json({ message: "Welcome on my cours sur cloudinary server" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenue sur Vinted" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(3000, () => {
  console.log("Server started");
});

