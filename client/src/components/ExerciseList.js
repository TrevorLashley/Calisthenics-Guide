import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ExerciseList = () => {
  const { difficulty } = useParams();

  const [exercises, setExercises] = useState([]);
  const difficultyParagraphMap = setDifficultyParagraphMap();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/exercises/${difficulty}`).then(
        (response) => response.json()
      );
      setExercises(response.data ?? []);
    };
    fetchData();
  }, []);

  return (
    <ExerciseListContainer>
      <h2>{difficulty}</h2>

      <StyledParagraph>{difficultyParagraphMap.get(difficulty)}</StyledParagraph>

      <StyledList>
        {exercises.map((exercise) => (
          <li key={exercise.name}>
            <StyledExercise>
              <Link to={`/exercise-info`} state={{ exercise }}>
                {exercise.name}
              </Link>
            </StyledExercise>
          </li>
        ))}
      </StyledList>
    </ExerciseListContainer>
  );
};

const setDifficultyParagraphMap = () => {
  const difficultyParagraphMap = new Map();

  difficultyParagraphMap.set(
    "Beginner",
    "For beginners in calisthenics, focusing on foundational movements is crucial to build strength, mobility, and coordination. Start with exercises like push-ups, pull-ups, and squats as they engage multiple muscle groups and lay the groundwork for more advanced moves. It's important to prioritize proper form and technique over the number of repetitions."
  );

  difficultyParagraphMap.set(
    "Intermediate",
    "For intermediates in calisthenics, it's crucial to hone in on perfecting form and technique while continuing to build strength and endurance. Focus on mastering exercises like push-ups, pull-ups, squats, and dips with impeccable form. Ensure proper alignment and engagement of muscles throughout each movement, emphasizing full range of motion. Work on increasing the difficulty of these exercises by adding variations such as wide grip or diamond push-ups, different grip positions for pull-ups, single-leg squats, and deeper dips. Consistency in training is key, alongside progressively challenging yourself with more reps, sets, or advanced variations. Strengthening these fundamental movements will provide a solid foundation for more advanced calisthenics skills in the future."
  );

  difficultyParagraphMap.set(
    "Advanced",
    "For advanced calisthenics athletes, training should prioritize mastering advanced movements such as the muscle-up, front lever, back lever, and handstand. Focus on building strength and control in each of these exercises through progressive variations and proper technique. Incorporate drills and exercises specifically targeting the muscles and skills needed for these movements. Consistent practice, along with targeted strength training and flexibility work, will help achieve mastery in these advanced calisthenics skills. Additionally like in all skill levels, ensure proper rest and recovery to allow muscles to adapt and grow stronger between sessions."
  );

  difficultyParagraphMap.set(
    "Saiyan",
    "For Saiyan-level calisthenics athletes, training should focus on mastering the most formidable bodyweight movements and skills known to mankind. This includes conquering advanced exercises such as the full planche handstand push-up and human flag. Saiyan-level athletes must relentlessly pursue unparalleled strength, balance, and control through meticulous technique and progressive overload. Incorporate specific drills and exercises tailored to each skill, targeting the muscles and movement patterns required to attain superhuman feats. Consistent and dedicated training, alongside adequate recovery and injury prevention measures, is essential at this level to achieve and maintain these extraordinary levels of strength and athleticism."
  );

  return difficultyParagraphMap;
};

const StyledList = styled.ul`
  list-style-type: none;
`;

const StyledExercise = styled.p`
  display: inline-block;
  font-size: 24px;
`;

const StyledParagraph = styled.p`
width: 500px;`

const ExerciseListContainer = styled.div`
margin-top: 80px;
margin-left: 100px;`
export default ExerciseList;
