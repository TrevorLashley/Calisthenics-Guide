const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI, TOKEN_SECRET } = process.env;

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { validate } = require("uuid");
const e = require("express");

const createSecretToken = (id) => {
  return jwt.sign({ id }, TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!isValidEmail(email) || !password || !name) {
      res.status(400).json({ message: "Invalid parameter sent to server" });
    }

    const client = new MongoClient(MONGO_URI);

    await client.connect();

    const db = client.db("Calisthenics-Guide");

    const existingUser = await db.collection("Users").findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await db
      .collection("Users")
      .insertOne({ email, encryptedPassword, name, exerciseList:[], createdAt: new Date() });
    console.log(user);
    const token = createSecretToken(user.insertedId.toString());
    res
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      })

      .status(201)
      .json({
        message: "User signed in successfully",
        success: true,
        user: { email, name },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = new MongoClient(MONGO_URI);

    await client.connect();

    const db = client.db("Calisthenics-Guide");

    const user = await db.collection("Users").findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid E-mail or Password" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.encryptedPassword
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid E-mail or Password" });
    }

    const token = createSecretToken(user._id.toString());
    res
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        user: { email: user.email, name: user.name },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const isValidEmail = (email) => {
  if (email && typeof email === "string" && email.trim().length > 4) {
    const emailRegEx = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (emailRegEx.test(email)) {
      return true;
    }
  }

  return false;
};
module.exports = { signUp, login };
