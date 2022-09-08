import {useLocation, useNavigate} from "react-router-dom";

import {StandarContainers} from "./Containers";

import LocalistaionWhite from '../img/locationWhite.png'
import CalendarWhite from '../img/calendarWhite.png';
import DistanceWhite from '../img/distanceWhite.png';
import ChevronBackWhite from '../img/backWhite.png'
import {ButtonReservation} from "../components";
import {Link} from "react-router-dom";
import styled from "styled-components";
import DefaultImg from "../img/aide-achat-voiture-hydrogene_280219.jpg";
import {useMessageStateClient} from "../context/MessageStateClient";

const ContainerReturn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ContainerRecapCommande = styled.div`
    margin-top: 32px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    min-height: 500px;
    background-color: #10111E;
`;
const ContainerImg = styled.div`
    margin-top: 16px;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
`;

const ContainerItems = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: flex-start;
    width: 30%;
    min-width: 260px;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
`;
const H5 = styled.h5`
    color: white;
    font-size: 14px;
    text-align: center;
    margin-left: 10%;
`;



const RecapCommande = () => {

    const location = useLocation()
    const {validateMessage} = useMessageStateClient()
    const {dateDebut,dateFin,idOffre,idPersonne,idVehicule,image,kmContrat,pointRetrait, prix} = location.state

    const handleSubmit = async () => {
        const data = {
            "idPersonne" : idPersonne,
            "dateDebut" : dateDebut,
            "dateFin" : dateFin,
            "kmContrat" : kmContrat,
            "state" : 3,
            "idOffre" : idOffre
        }
        const reqPostCommande = await fetch('http://139.162.191.134:8080/api/contrat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await reqPostCommande.json()
        if (result.id) {
            validateMessage("Redirection vers le paiement !", "info", `/payment/${result.id}`, 1000)
        } else {
            validateMessage("Une erreur est survenue", "pas ok", 0)
        }
    }

    return (
        <div style={{textAlign : "center", marginTop : "32px"}}>
            <ContainerReturn>
                <h2 style={{color : "white"}}>Récapitulatif commande</h2>
            </ContainerReturn>
            <ContainerRecapCommande>
                <ContainerImg>
                    <img src={image ? image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} alt="votre voiture" style={{width : "80%", height : "80%", marginTop : "16px"}} onError={({currentTarget}) => {
                        currentTarget.onerror= null;
                        currentTarget.src= DefaultImg
                    }}/>
                </ContainerImg>
                <ContainerItems>
                    <div style={{width : "32px"}}>
                        <img src={LocalistaionWhite} alt="icone localisation" style={{width : "100%"}}/>
                    </div>
                    <H5>

                        {`Agence de ${pointRetrait === 0 ? "Paris" : "Lyon"}`}
                        <br/>
                        {
                            pointRetrait === 0
                            ?
                                <>51 Rue Jouffroy d'Abbans, Paris</>
                            :
                                <>32 Rue De Berlin, Lyon</>
                        }
                    </H5>
                </ContainerItems>
                <ContainerItems>
                    <div style={{width : "32px"}}>
                        <img src={CalendarWhite} alt="icone calendar"/>
                    </div>
                    <H5>
                        {
                            `${dateDebut.replace('T', ' ')} > ${dateFin.replace('T', ' ')}`
                        }
                    </H5>
                </ContainerItems>
                <ContainerItems>
                    <div style={{width : "32px"}}>
                        <img src={DistanceWhite} alt="icone distance"/>
                    </div>
                    <H5>
                        {
                            kmContrat + " km"
                        }
                    </H5>
                </ContainerItems>
                <div style={{marginTop : "32px", width : "80%", maxWidth : "720px", marginLeft : "auto", marginRight : "auto", paddingBottom : "20px"}} onClick={() => handleSubmit()}>
                    <ButtonReservation height={40} msg={`Confimer et Payer - ${prix} €`} />
                </div>
            </ContainerRecapCommande>
        </div>

    )
}
export default RecapCommande