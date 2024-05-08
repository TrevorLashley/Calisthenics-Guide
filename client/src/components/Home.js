import styled from "styled-components";
import DifficultyButton from "./DifficultyButton";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>

      <p>
        Welcome to my Calisthenics workout regiment set for any and all fitness
        levels ranging from begginer to Saiyan.
      </p>

      <h2>What is Calisthenics?</h2>

      <p>
        Calisthenics is a form of exercise that primarily utilizes one's body
        weight for resistance, focusing on strength, flexibility, and endurance.
        Calisthenics routines often require minimal equipment, making them
        accessible to people of all fitness levels and can be done virtually
        anywhere, from parks to living rooms. The discipline not only builds
        muscle but also improves coordination, balance, and overall athleticism,
        making it a popular choice for individuals seeking a versatile and
        challenging workout regimen.
      </p>

      <ButtonContainer>
        <DifficultyButton difficulty="Beginner"></DifficultyButton>
        <DifficultyButton difficulty="Intermidiate"></DifficultyButton>
        <DifficultyButton difficulty="Advanced"></DifficultyButton>
        <DifficultyButton difficulty="Saiyan"></DifficultyButton>
      </ButtonContainer>
    </div>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
`;

export default Home;
