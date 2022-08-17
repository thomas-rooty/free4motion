import styled from "styled-components";
import {ButtonReservation} from "./index";
import {slugify} from "../utils";
import {Link} from "react-router-dom";

const ContainerBoxCar = styled.div`
    margin-left: 8px;
    min-width: 160px;
    min-height: 160px;
    background-color: white;
`;


const BoxCar = ({image, marque, model,id, description}) => {

    return(
        <ContainerBoxCar>
            <div style={{marginTop : "16px", maxWidth : "120px", height : "60px", marginLeft : "auto", marginRight : "auto"}}>
                <img src={image} style={{ width : "100%", height : "100%"}}/>
            </div>
            <div style={{marginTop : "8px", paddingLeft : "8px",}}>
                <h4 style={{fontSize : "11px"}}>{marque}</h4>
                <h5 style={{color : "#747474"}}>{model}</h5>
            </div>
            <div style={{marginTop : "12px", width : "100px", marginLeft : "auto", marginRight : "auto"}}>
                <Link to={`/${slugify(marque + "-" + model)}`} state={{"id" : id, "img" : image, "description" : description}}><ButtonReservation/></Link>
            </div>
        </ContainerBoxCar>

    )
}
export default BoxCar