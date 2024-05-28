"use strict";
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const {getExercisesByDifficulty} = require("./handlers/ExerciseHandlers")
const {signUp, login} = require("./handlers/UsersHandlers")
const cookieParser = require("cookie-parser")
const { addExercise, getUserExercises, removeExercise } = require("./handlers/UserExerciseHandlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(cookieParser())
  .use(cors())
  .get("/exercises/:difficulty", getExercisesByDifficulty)
  .post("/signup", signUp)
  .post("/login",  login)
  .post("/add-exercise", addExercise)
  .get("/exercise-list", getUserExercises)
  .delete("/remove-exercise/:exerciseId", removeExercise)



  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
