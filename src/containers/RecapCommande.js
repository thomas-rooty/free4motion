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
    const navigate = useNavigate()
    const {endDate,image,killometers,pointRetrait,startDate,price} = location.state

    return (
        <div style={{textAlign : "center", marginTop : "32px"}}>
            <ContainerReturn>
                <img onClick={() => navigate(-1, {"previousData" : {endDate, pointRetrait, startDate, killometers}})} src={ChevronBackWhite} alt="retour arrière"/>
                <h2 style={{color : "white"}}>Récapitulatif commande</h2>
            </ContainerReturn>
            <ContainerRecapCommande>
                <ContainerImg>
                    <img src={image} alt="votre voiture" style={{width : "80%", height : "80%", marginTop : "16px"}} onError={({currentTarget}) => {
                        currentTarget.onerror= null;
                        currentTarget.src= DefaultImg
                    }}/>
                </ContainerImg>
                <ContainerItems>
                    <div style={{width : "32px"}}>
                        <img src={LocalistaionWhite} alt="icone localisation" style={{width : "100%"}}/>
                    </div>
                    <H5>

                        {`Agence de ${pointRetrait}`}
                        <br/>
                        {
                            pointRetrait === "paris"
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
                            `${startDate.replace('T', ' ')} > ${endDate.replace('T', ' ')}`
                        }
                    </H5>
                </ContainerItems>
                <ContainerItems>
                    <div style={{width : "32px"}}>
                        <img src={DistanceWhite} alt="icone distance"/>
                    </div>
                    <H5>
                        {
                            killometers + " km"
                        }
                    </H5>
                </ContainerItems>
                <div style={{marginTop : "32px", width : "80%", maxWidth : "720px", marginLeft : "auto", marginRight : "auto", paddingBottom : "20px"}}>
                    <Link to="/payment"><ButtonReservation height={40} msg={`Payer - ${price} €`} /></Link>
                </div>
            </ContainerRecapCommande>
        </div>

    )
}
export default RecapCommande