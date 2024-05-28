import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

const ExerciseInfo = () => {
  const [cookies, removeCookie] = useCookies();
  const { exercise } = useLocation().state;
  const [exerciseImage, setExerciseImage] = useState();
  const [message, setMessage] = useState("");

  const email = "user@example.com";

  useEffect(() => {
    const fetchData = async () => {
      const cleanedExerciseName = encodeURI(exercise.name.trim().toLowerCase());

      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises/name/${cleanedExerciseName}?limit=1`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      ).then((response) => response.json());

      if (response.length > 0) {
        setExerciseImage(response[0].gifUrl);
      }
    };

    if (exercise.name) {
      fetchData();
    }
  }, [exercise.name]);

  const handleAddExercise = async () => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/add-exercise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, exercise }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Failed to add exercise.");
      }
    } catch (error) {
      console.error("Error adding exercise:", error);
      setMessage("Error adding exercise.");
    }
  };

  return (
    <FlexBox>
      <div>
        <h1>{exercise.name}</h1>
        <h3>Muscle Group</h3>
        <p>{exercise.muscle_group}</p>
        <h3>Fitness Level</h3>
        <p>{exercise.difficulty}</p>
        <h3>Repetitions</h3>
        <p>{exercise.repetitions}</p>
        <h3>Equipment</h3>
        <p>{exercise.equipment}</p>
        <h3>Instructions</h3>
        <Instructions>{exercise.instructions}</Instructions>
      </div>

      <ImageContainer>
        <StyledImage src={exerciseImage} alt={exercise.name} />
        {cookies.token && (
          <InvisibleButton onClick={handleAddExercise}>
            <img width="40px" src="add_button.png"></img>
          </InvisibleButton>
        )}

        {message && <p>{message}</p>}
      </ImageContainer>
    </FlexBox>
  );
};

const InvisibleButton = styled.button`
  background: none;
  border: none;
`;

const StyledImage = styled.img`
  box-shadow: 19px 20px 20px 0px gray;
  border: outset gray;
`;

const ImageContainer = styled.div`
  margin: auto;
  width: 500px;
`;

const Instructions = styled.p`
  width: 500px;
`;

const FlexBox = styled.div`
  display: flex;
  gap: 100px;
  margin-left: 100px;
  margin-top: 80px;
`;

export default ExerciseInfo;
