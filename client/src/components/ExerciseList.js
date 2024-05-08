import { useParams } from "react-router-dom";

const ExerciseList = () => {
  const { difficulty } = useParams();

  return <div>{difficulty}</div>;
};

export default ExerciseList;
