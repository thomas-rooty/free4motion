import styled from "styled-components";

const CustomButton = styled.button`
    background-color: #44C034;
    height: ${props => props.height ? props.height+"px" : "25px"} ;
    border-radius: 321px;
    border: none;
    width: 100%;
`;


const ButtonReservation = ({height}) => {
    return (
        <CustomButton height={height}>Réserver</CustomButton>
    )
}
export default ButtonReservation