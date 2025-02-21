const express = require("express");
const router = express.Router();
const User = require("../models/User");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/user/signup", async (req, res) => {
  try {
    // const usernameEmpty = (await req.body.username) === "";
    if (!req.body.username || req.body.email || !req.body.password) {
      return res.status(400).json("missing parameters");
    }
    const existingMail = await User.findOne({ email: req.body.email });
    if (existingMail) {
      // ou if (existingMail !== null)
      return res.status(409).json("Login incorrect");
    }
    const token = uid2(64);
    const salt = uid2(16);
    // const passwordSalt = req.body.password + salt;
    // const hash = SHA256(passwordSalt).toString(encBase64);
    const hash = (req.body.password + salt).toString(encBase64);

    const newUser = await new User({
      email: req.body.email,
      account: {
        username: req.body.username,
        // avatar: Object, // nous verrons plus tard comment uploader une image
      },
      password: req.body.password,
      newsletter: req.body.newsletter,
      token: token,
      hash: hash,
      salt: salt,
    });

    await newUser.save();

    const userRes = {
      _id: newUser._id,
      token: newUser.token,
      account: {
        username: newUser.account.username,
      },
    };

    return res.status(201).json({
      message: "Votre compte a été créé. En voici les détails : ",
      info: userRes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({ email: req.body.email });
    // console.log(userLogin);

    if (!userLogin) {
      return res.status(401).json("Unauthorized");
    }

    const newHash = SHA256(req.body.password + userLogin.salt).toString(
      encBase64
    );
    if (newHash !== userLogin.hash) {
      return res.status(401).json("Unauthorized");
    }

    const userResLogin = {
      _id: userLogin._id,
      token: userLogin.token,
      account: {
        username: userLogin.account.username,
      },
    };
    return res.status(200).json({ userResLogin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
// const event = await Event.findById(req.body.eventId);
// if (event.seats[req.body.category] < req.body.seats)
