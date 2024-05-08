import { Link } from "react-router-dom"
import styled from "styled-components"

const DifficultyButton = (props) => {

    return(<Link to={`/exercises/${props.difficulty}`}><StyledImage src={`${props.difficulty}.png`} width={200} height={323}></StyledImage><p>{props.difficulty}</p></Link>)

}

const StyledImage = styled.img`
box-shadow:19px 20px 20px 0px gray;
border: outset gray;`
export default DifficultyButton