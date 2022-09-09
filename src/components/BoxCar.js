import styled from "styled-components";
import {ButtonReservation} from "./index";
import {slugify} from "../utils";
import {Link} from "react-router-dom";
import RemoveImg from '../img/remove.png'
import {useMessageStateClient} from "../context/MessageStateClient";
import DefaultImg from '../img/aide-achat-voiture-hydrogene_280219.jpg'

const ContainerBoxCar = styled.div`
    margin-left: 8px;
    min-width: 22vh;
    min-height: 22vh;
    background-color: #10111E;
`;


const BoxCar = ({image, marque, modele,id, description, plaque, agence, msg, VehiclesWithOffer, VehiclesWithoutOffer,setVehiclesWithoutOffer, setVehiclesWithOffer}) => {

    const {validateMessage} = useMessageStateClient()


    const removeCurrentVehicle = async (type) => {
        const req = await fetch(`http://139.162.191.134:8080/api/vehicules/${id}`, {
            method : "DELETE"
        })
        const data = await req.json()
        console.log(data)
        if (data.message) {
            validateMessage("Véhicule bien supprimé", "ok", 0)
            if (type === "add") {
                const newVehiclesWithoutOffer = VehiclesWithoutOffer.filter(element => element.idVehicule !== id)
                setVehiclesWithoutOffer(newVehiclesWithoutOffer)
            } else if (type === "edit") {
                const newVehiclesWithOffer = VehiclesWithOffer.filter(element => element.idVehicule !== id)
                setVehiclesWithOffer(newVehiclesWithOffer)
            }
        }
    }

    return(
        <ContainerBoxCar>
            <div style={{position : "relative", top : "50%", transform : "translateY(-50%)", paddingBottom : "10px"}}>
                <div style={{marginTop : "16px", maxWidth : "140px", height : "60px", marginLeft : "auto", marginRight : "auto", paddingTop : "5px", paddingBottom : "5px"}}>
                    <img src={image ? image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} style={{ width : "100%", height : "100%"}} onError={({currentTarget}) => {
                        currentTarget.onerror= null;
                        currentTarget.src= DefaultImg
                    }}/>
                </div>
                <div style={{marginTop : "8px", paddingLeft : "8px",}}>
                    <h4 style={{fontSize : "11px", color : "white"}}>{marque}</h4>
                    <h5 style={{color : "#747474"}}>{modele}</h5>
                    {
                        plaque && <h5 style={{color : "#747474"}}>{plaque}</h5>
                    }
                </div>
                <div style={{width : "90%", marginLeft : "auto", marginRight : "auto", paddingBottom : "6px"}}>
                    {
                        msg
                            ? msg === "Modifier la location"
                                ?
                                <div style={{display : "flex", justifyContent : "center", textDecoration : "none", alignItems : "center"}}>
                                    <Link to={`/free_admin/edit_location/${id}`} state={{id, image}}>
                                            <ButtonReservation msg={msg}/>
                                    </Link>
                                    <img src={RemoveImg} style={{width : "24px", marginLeft : "10px", cursor : "pointer"}} onClick={() => removeCurrentVehicle("edit")}/>
                                </div>
                                :
                                <div style={{display : "flex", justifyContent : "center", textDecoration : "none",  alignItems : "center"}}>
                                    <Link to={`/free_admin/add_location/${id}`} state={{id, image}} >
                                            <ButtonReservation msg={msg}/>
                                    </Link>
                                    <img src={RemoveImg} style={{width : "24px",  marginLeft : "10px", cursor : "pointer"}} onClick={() => removeCurrentVehicle("add")}/>
                                </div>
                            : <Link to={`/shop-car/${id}`} state={{image,marque,modele,id,description,agence}}><ButtonReservation/></Link>
                    }

                </div>
            </div>
        </ContainerBoxCar>

    )
}
export default BoxCar