
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;



const getExercisesByDifficulty = async (req, res) => {

    console.log(MONGO_URI)

    const difficulty = req.params.difficulty
    

    const client = new MongoClient(MONGO_URI);
  
    await client.connect();
  
    const db = client.db("Calisthenics-Guide");
 
    const query = {difficulty}
   
  
    const exercises = await db.collection("Exercises").find().toArray();
  
  
    if (exercises.length > 0) {
      res.status(200).json({ status: 200, data: exercises });
    } else {
      res.status(404).json({
        message: "Exercises not found",
      });
    }
  
    client.close();
  };
  

module.exports = { getExercisesByDifficulty };