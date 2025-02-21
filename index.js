require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

const mongoose = require("mongoose");

const userRoutes = require("./routes/user"); //, "./routes/user/signup", "./routes/user/login"
const offerRoutes = require("./routes/offer"); //, "./routes/offers", "./routes/offer/publish", "./routes/offers/:id"

app.use(userRoutes);
app.use(offerRoutes);

const cloudinary = require("cloudinary").v2;

app.use(cors());
mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.listen(process.env.PORT, () => {
  console.log("Server started");
});

