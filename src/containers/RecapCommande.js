import {useLocation} from "react-router-dom";
import {StandarContainers} from "./Containers";

import LocalistaionWhite from '../img/locationWhite.png'
import CalendarWhite from '../img/calendarWhite.png';
import DistanceWhite from '../img/distanceWhite.png'
import {ButtonReservation} from "../components";




const RecapCommande = () => {

    const location = useLocation()
    const {endDate,id,image,killometers,pointRetrait,startDate,price} = location.state

    return (
        <div style={{textAlign : "center", marginTop : "32px"}}>
            <h2 style={{color : "white"}}>Récapitulatif commande</h2>
            <div style={{marginTop : "32px" , width : "80%", marginLeft : "auto", marginRight : "auto", minHeight : "500px", backgroundColor : "#10111E"}}>
                <div style={{marginTop : "16px"}}>
                    <img src={image} alt="votre voiture" style={{width : "80%", height : "80%", marginTop : "16px"}}/>
                </div>
                <div style={{marginTop : "24px", display : "flex", justifyContent : "space-evenly", width : "80%", marginLeft : "auto", marginRight : "auto"}}>
                    <div style={{width : "32px"}}>
                        <img src={LocalistaionWhite} alt="icone localisation" style={{width : "100%"}}/>
                    </div>
                    <h5 style={{color : "white", fontSize : "14px", textAlign : "center"}}>

                        {`Agence de ${pointRetrait}`}
                        <br/>
                        {
                            pointRetrait === "paris"
                            ?
                                <>51 Rue Jouffroy d'Abbans, Paris</>
                            :
                                <>32 Rue De Berlin, Lyon</>
                        }
                    </h5>
                </div>
                <div style={{marginTop : "24px", display : "flex", justifyContent : "space-evenly", width : "80%", marginLeft : "auto", marginRight : "auto"}}>
                    <div style={{width : "32px"}}>
                        <img src={CalendarWhite} alt="icone calendar"/>
                    </div>
                    <h5 style={{color : "white", fontSize : "14px", textAlign : "center"}}>
                        {
                            `${startDate.replace('T', ' ')} > ${endDate.replace('T', ' ')}`
                        }
                    </h5>
                </div>
                <div style={{marginTop : "24px", display : "flex", justifyContent : "space-evenly", width : "80%", marginLeft : "auto", marginRight : "auto"}}>
                    <div style={{width : "32px"}}>
                        <img src={DistanceWhite} alt="icone distance"/>
                    </div>
                    <h5 style={{color : "white", fontSize : "14px", textAlign : "center"}}>
                        {
                            killometers + " km"
                        }
                    </h5>
                </div>
                <div style={{marginTop : "32px", width : "80%", marginLeft : "auto", marginRight : "auto"}}>
                    <ButtonReservation height={30} msg={`Payer - ${price} €`} />
                </div>

            </div>
        </div>

    )
}
export default RecapCommande