import styled from "styled-components";
import {ButtonReservation} from "./index";
import {Link} from "react-router-dom";
import RemoveImg from '../img/remove.png'
import {useMessageStateClient} from "../context/MessageStateClient";
import DefaultImg from '../img/aide-achat-voiture-hydrogene_280219.jpg'
import {ENTRY_API_URL} from "../utils";
import {H4} from "./BoxUser";

const ContainerBoxCar = styled.div`
    margin-left: 8px;
    min-width: 22vh;
    min-height: 22vh;
    background-color: #10111E;
`;
const ContainerImg = styled.div`
  margin-top: 16px;
  max-width: 150px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  padding-bottom: 5px;
`
const H5 = styled.h5`
  color : #747474
`;

const ContainerLinkButton = styled.div`
    display: flex;
  justify-content: center;
  text-decoration: none;
  align-items: center;
`;
const ContainerButton = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 6px;
`;

const ImgRemove = styled.img`
    width: 24px;
  margin-left: 10px;
  cursor: pointer;
`;
const SecondContainerBoxCar = styled.div`
    position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding-bottom: 10px;
`;

const BoxCar = ({image, marque, modele,id, description, plaque, agence, msg, VehiclesWithOffer, VehiclesWithoutOffer,setVehiclesWithoutOffer, setVehiclesWithOffer}) => {

    const {validateMessage} = useMessageStateClient()

    const removeCurrentVehicle = async (type) => {

        const data = {
            "state" : 0
        }

        const req = await fetch(`${ENTRY_API_URL}api/state/vehicule/${id}`, {
            method : "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await req.json()

        if (result.id) {
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
            <SecondContainerBoxCar>
                <ContainerImg>
                    <img src={image ? image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} style={{ width : "100%", height : "100%"}} onError={({currentTarget}) => {
                        currentTarget.onerror= null;
                        currentTarget.src= DefaultImg
                    }}/>
                </ContainerImg>
                <div style={{marginTop : "8px", paddingLeft : "8px",}}>
                    <H4>{marque}</H4>
                    <H5>{modele}</H5>
                    {
                        plaque && <H5>{plaque}</H5>
                    }
                </div>
                <ContainerButton>
                    {
                        msg
                            ? msg === "Modifier la location"
                                ?
                                <ContainerLinkButton>
                                    <Link to={`/free_admin/edit_location/${id}`} state={{id, image}}>
                                            <ButtonReservation msg={msg}/>
                                    </Link>
                                    <ImgRemove src={RemoveImg} onClick={() => removeCurrentVehicle("edit")}/>
                                </ContainerLinkButton>
                                :
                                <ContainerLinkButton>
                                    <Link to={`/free_admin/add_location/${id}`} state={{id, image}} >
                                            <ButtonReservation msg={msg}/>
                                    </Link>
                                    <ImgRemove src={RemoveImg} onClick={() => removeCurrentVehicle("add")}/>
                                </ContainerLinkButton>
                            : <Link to={`/shop-car/${id}`} state={{image,marque,modele,id,description,agence}}><ButtonReservation/></Link>
                    }

                </ContainerButton>
            </SecondContainerBoxCar>
        </ContainerBoxCar>

    )
}
export default BoxCar