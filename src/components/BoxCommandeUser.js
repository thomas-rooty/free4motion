import styled from "styled-components";
import {useEffect, useState} from "react";
import ChevronDown from "../img/down-arrow.png";
import {H4} from "./BoxUser";
import {ContainerInputMui} from "../containers/MoreInfoCar";
import {ENTRY_API_URL} from "../utils";
import {ButtonReservation} from "./index";
import {useMessageStateClient} from "../context/MessageStateClient";
import {Link} from "react-router-dom";

const ContainerCommande = styled.div`

  background-color: #10111E;
  padding: 5px;
  display: flex;
  justify-content: space-around;

  align-items: center;
  border : 1px solid white;
  min-height: 60px;
  margin-top: 20px;
  
  & .child {
    margin-top: 10px;
    max-width: 250px;
    overflow: hidden;
    text-align: center;
  }
  & img {
  width: 48px;
  }


`;

const ContainerDiv = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  color : white;
`;
const ContainerImg = styled.div`
    transform: ${props => props.rotate && "rotate(180deg)"}
`;



const BoxCommandeUser = ({dataContrat}) => {

    const {validateMessage} = useMessageStateClient()

    const [infoVehicle, setInfoVehicle] = useState({})

    const [showCommands, setUserShowCommands] = useState(false)

    const getInfoVehicle = async () => {


        const reqOffre = await fetch(`${ENTRY_API_URL}api/offre/${dataContrat.idOffre}`)
        const {idVehicule} = await reqOffre.json()

        const reqVehiculeInfo = await fetch(`${ENTRY_API_URL}api/vehicules/${idVehicule}`)
        const resVehiculeInfo = await reqVehiculeInfo.json()
        setInfoVehicle(resVehiculeInfo)

    }

    useEffect(() => {
        getInfoVehicle()
    }, [])

    const {idContrat, dateDebut, dateFin, state, montantTotal, montantPaye} = dataContrat

    const {marque, plaque, modele} = infoVehicle
    console.log(dataContrat)


    return(

        <ContainerDiv>
            <ContainerCommande>
                <div style={{width : "60%", display : "flex", flexFlow : "row wrap", justifyContent : "space-around"}}>
                    <div className="child">
                        <H4>Numéro de commande</H4>
                        <h2>{idContrat}</h2>
                    </div>
                    <div className="child">
                        {
                            <img src={infoVehicle.image}/>
                        }
                    </div>

                    <div className="child">
                        <H4>Date début</H4>
                        <h2>{dateDebut.split('T')[0]}</h2>
                    </div>
                    <div className="child">
                        <H4>Date fin</H4>
                        <h2>{dateFin.split('T')[0]}</h2>
                    </div>
                </div>

                <div className="child" style={{width : "150px"}}>
                    <H4>Status</H4>
                    {
                        state !== 3
                            &&
                            <h2>{state === "0" ? "Annuler" : state === 1 ? "Validé" : state === 2 && "Fini"}</h2>
                    }
                    <Link to={`/payment/${idContrat}`}><ButtonReservation msg="A payé" /></Link>
                </div>
                <div className="child">
                    <H4>Plus d'infos</H4>
                    <ContainerImg rotate={showCommands} onClick={() => setUserShowCommands(prevState => !prevState)}><img src={ChevronDown}/></ContainerImg>

                </div>

            </ContainerCommande>
            {
                showCommands &&
                <div style={{marginTop : "20px"}}>

                    <div>
                        <h2>Info véhicule</h2>
                        <div style={{display : "flex"}}>
                            <ContainerInputMui width={20}>
                                <H4>Marque véhicule :</H4>
                                <h2>{marque}</h2>
                            </ContainerInputMui>
                            <ContainerInputMui width={20}>
                                <H4>Plaque du véhicule :</H4>
                                <h2>{plaque}</h2>
                            </ContainerInputMui>
                            <ContainerInputMui width={20}>
                                <H4>Modèle véhicule :</H4>
                                <h2>{modele}</h2>
                            </ContainerInputMui>

                        </div>
                    </div>

                    <div style={{display : "flex", justifyContent : "flex-end"}}>
                        <div style={{textAlign : "center"}}>
                            <H4>Montant Total</H4>
                            <div style={{display : "flex"}}><h2>{montantTotal ? montantTotal : 0} €</h2><h5 style={{marginLeft : "10px"}}> TTC</h5></div>
                        </div>
                        <div style={{textAlign : "center", marginLeft : "20px"}}>
                            <H4>Montant Payé</H4>
                            <div style={{display : "flex"}}><h2>{montantPaye ? montantPaye : 0} €</h2><h5 style={{marginLeft : "10px"}}> TTC</h5></div>
                        </div>
                    </div>

                    <div>Hello</div>
                </div>

            }
        </ContainerDiv>
    )

}
export default BoxCommandeUser