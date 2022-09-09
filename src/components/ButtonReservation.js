import styled from "styled-components";

const CustomButton = styled.button`
    background-color: #44C034;
    height: ${props => props.height ? props.height+"px" : "auto"} ;
    padding: 5px;
    border-radius: 321px;
    border: none;
    width: 100%;
    cursor: pointer;
`;


const ButtonReservation = ({height, msg}) => {
    return (
        <CustomButton height={height}>{msg || "Réserver"}</CustomButton>
    )
}
export default ButtonReservation