const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, TOKEN_SECRET } = process.env;

const jwt = require("jsonwebtoken");

const addExercise = async (req, res) => {
  try {
    const { exercise } = req.body;

    const userId = verifyUser(req).id;

    const client = new MongoClient(MONGO_URI);
    await client.connect();

    const db = client.db("Calisthenics-Guide");
    const user = await db
      .collection("Users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const update = await db.collection("Users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: { exerciseList: new ObjectId(exercise._id) },
      }
    );

    if (update.modifiedCount === 0) {
      throw new Error("Error occurred while updating Exercise List");
    }
    res.status(201).json({ message: "Exercise added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserExercises = async (req, res) => {
  try {
    const userId = verifyUser(req).id;
    const client = new MongoClient(MONGO_URI);
    await client.connect();

    const db = client.db("Calisthenics-Guide");
    const user = await db
      .collection("Users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const exercises = await db
      .collection("Exercises")
      .find({ _id: { $in: user.exerciseList } })
      .toArray();

    res.status(200).json({ exercises });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const verifyUser = (req) => {
  const token = req.cookies.token;
  if (!token) {
    return null;
  }
  return jwt.verify(token, TOKEN_SECRET);
};

const removeExercise = async (req, res) => {
  try {
    const { exerciseId } = req.params;

    const userId = verifyUser(req).id;

    const client = new MongoClient(MONGO_URI);
    await client.connect();

    const db = client.db("Calisthenics-Guide");
    const user = await db
      .collection("Users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const update = await db.collection("Users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $pull: { exerciseList: new ObjectId(exerciseId) }
      }
    );

    if (update.modifiedCount === 0) {
      throw new Error("Error occurred while updating Exercise List");
    }
    res.status(201).json({ message: "Exercise removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = { addExercise, getUserExercises, removeExercise };
