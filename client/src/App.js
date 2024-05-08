import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ExerciseList from "./components/ExerciseList"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises/:difficulty" element={<ExerciseList></ExerciseList>}/>
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>

      
      </Router>
    </>
  );
}

export default App;
