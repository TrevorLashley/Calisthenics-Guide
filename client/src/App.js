import ExerciseInfo from "./components/ExerciseInfo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ExerciseList from "./components/ExerciseList";
import Navbar from "./components/NavBar";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import YourExercises from "./components/YourExercises";



function App() {
  return (
    <>
      <Router>
        <Navbar /> {/* Add Navbar here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises/:difficulty" element={<ExerciseList />} />
          <Route path="/exercise-info" element={<ExerciseInfo />} />
          <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
          <Route path="*" element={<h1>404 page not found</h1>} />
          <Route path="/your-exercises" element={<YourExercises />} /> {/* Add route for YourExercises */}
        </Routes>
      </Router>
    </>
  );
}

export default App;