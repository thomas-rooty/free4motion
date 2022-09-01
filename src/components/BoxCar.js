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


const BoxCar = ({image, marque, modele,id, description, plaque}) => {

    return(
        <ContainerBoxCar>
            <div style={{marginTop : "16px", maxWidth : "120px", height : "60px", marginLeft : "auto", marginRight : "auto", paddingTop : "5px", paddingBottom : "5px"}}>
                <img src={image ? image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} style={{ width : "100%", height : "100%"}}/>
            </div>
            <div style={{marginTop : "8px", paddingLeft : "8px",}}>
                <h4 style={{fontSize : "11px"}}>{marque}</h4>
                <h5 style={{color : "#747474"}}>{modele}</h5>
                {
                    plaque && <h5 style={{color : "#747474"}}>{plaque}</h5>
                }
            </div>
            <div style={{marginTop : "12px", width : "100px", marginLeft : "auto", marginRight : "auto", paddingBottom : "6px"}}>
                {
                    plaque
                    ? <Link to="/free_admin/add_location" state={{id, image}}><ButtonReservation msg="Ajouter location"/></Link>
                        : <Link to={`/${slugify(marque + "-" + modele)}`} state={{image,marque,modele,id,description}}><ButtonReservation/></Link>
                }

            </div>
        </ContainerBoxCar>

    )
}
export default BoxCar