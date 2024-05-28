import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const YourExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [message, setMessage] = useState("");

  const email = "user@example.com";

  const fetchExercises = async () => {
    try {
      const response = await fetch(`/exercise-list`);
      const data = await response.json();
      console.log(data);
      setExercises(data.exercises || []);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setMessage("Error fetching exercises");
    }
  };
  useEffect(() => {
    fetchExercises();
  }, []);

  const removeExercise = (e) => {
    const id = e.target.id;
    console.log(id)

    const remove = async () => {
      try {
        const response = await fetch(`/remove-exercise/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        console.log(data);
        fetchExercises();
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setMessage("Error fetching exercises");
      }
    };

    remove();
  };

  return (
    <YourExercisesContainer>
      <h2>Your Exercises</h2>
      {message && <p>{message}</p>}
      <h3>Exercise List</h3>
      <StyledList>
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <li key={index}>
              <StyledExercise>
               
                <Link to={`/exercise-info`} state={{ exercise }}>
                  {exercise.name}
                </Link>
              </StyledExercise>
              <InvisibleButton  onClick={removeExercise}>
                <img id={exercise._id}width="40px" src="remove-button.png"></img>
              </InvisibleButton>
            </li>
          ))
        ) : (
          <p>No exercises found</p>
        )}
      </StyledList>
    </YourExercisesContainer>
  );
};

const InvisibleButton = styled.button`
  background: none;
  border: none;
`;

const StyledList = styled.ul`
  list-style-type: none;
`;

const StyledExercise = styled.p`
  display: inline-block;
  font-size: 24px;
`;

const YourExercisesContainer = styled.div`
margin-left: 100px;
margin-top: 80px;`

export default YourExercises;
