import {useLocation, Link, useParams, useNavigate} from "react-router-dom";
import {StandarContainers} from "./Containers";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import {priceByKm, priceByDays,styleInputMui} from '../utils'
import {ButtonReservation} from "../components";
import {useMessageStateClient} from "../context/MessageStateClient";
import styled from "styled-components";
import DefaultImg from "../img/aide-achat-voiture-hydrogene_280219.jpg";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import Deleteicon from '../img/remove.png'
import ListCommandes from '../datatest/contrat.json'
import {useContextAuth} from "../context/ContextAuth";

const H3 = styled.h3`
    color : white;
    font-size: 16px;
`;
const ContainerImg = styled.div`
    width: 250px;
    height: 115px;
    margin-left: auto;
    margin-right: auto;
`;
export const ContainerInputMui = styled.div`
    margin-top: 32px;
    min-width: ${props => props.width ? props.width + "%" : "35%" };
    text-align: ${props => props.textCenter && "center"};
`;
const ContainerFullCalendar = styled.div`
    color: white;
  
  & .fc-event {
    height: 60px !important;
  }
`;


const MoreInfoCar = () => {

    console.log('jo')

    const {validateMessage} = useMessageStateClient()
    const {role, setLastNavigate} = useContextAuth()

    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()

    const validRange = {
        "start" : new Date()
    }


    const [pointRetrait, setPointRetrait] = useState(0)
    const [startDate, setStartDate ] = useState("")
    const [endDate, setEndDate] = useState("")
    const [killometers, setKillometers] = useState(100)
    const [price, setPrice] = useState(0)
    const [paramsCar, setParamsCar] = useState({})

    const fetchByIdInfo = async (id) => {
        const req = await fetch(`http://139.162.191.134:8080/api/vehicules/${id}`)
        const data = await req.json()
        setParamsCar(data)
    }

    const handleSelectDate = (infos) => {


        if (infos.end.setDate(infos.end.getDate()-1) === infos.start.setDate(infos.start.getDate())) {
            return
        } else {
            const checkStart = listEvents.filter(element => infos.start.getTime() >= Date.parse(element.start) && infos.start.getTime() <= Date.parse(element.end))
            const checkEnd = listEvents.filter(element => infos.end.setDate(infos.end.getDate()+1) >= Date.parse(element.start) && infos.end.setDate(infos.end.getDate()+1) <= Date.parse(element.end))

            if (checkStart.length > 0 || checkEnd.length > 0) {
                validateMessage("Merci de renseigner des dates disponibles", "pas ok", 0)
            } else {
                const dateLessOneDays = infos.end.setDate(infos.end.getDate() + 1)
                const [newDate] = new Date(dateLessOneDays).toISOString().split("T")
                setStartDate(infos.startStr + " 07:00")
                setEndDate(newDate  + " 18:00")
            }
        }


    }
    const handleClickDate = (infos) => {
        const checkIfDateOk = listEvents.filter(element => infos.date.getTime() >= Date.parse(element.start) && infos.date.getTime() <= Date.parse(element.end))
        if (checkIfDateOk.length > 0) {
            validateMessage("Merci de renseigner des dates disponibles", "pas ok", 0)
        } else {
            setStartDate(infos.dateStr + " 07:00")
            setEndDate(infos.dateStr  + " 18:00")
        }
    }

    useEffect(() => {
        setPointRetrait(paramsCar.agence)
    }, [paramsCar])

    useEffect(() => {

        setLastNavigate(location.pathname)
            if (location.state) {
                setParamsCar(location.state)
            } else {
                fetchByIdInfo(params.currID)
            }

    }, [])

    useEffect(() => {

        let nbr;
        if (startDate === endDate) {
            nbr = 1
        } else {
            const timeStampStart = new Date(startDate.replaceAll("-"," ")).getTime()
            const timeStampEnd = new Date(endDate.replaceAll("-"," ")).getTime()

            const differenceTimeStamp = timeStampEnd - timeStampStart
            nbr = Math.ceil(differenceTimeStamp / (1000 * 3600 * 24)) + 1
        }
        const priceDays = nbr * priceByDays
        const priceKms = killometers * priceByKm
        setPrice(priceDays + priceKms)

    }, [startDate, endDate, killometers])

    const handleChangeKm = (e) => {
        setKillometers(e.target.value)
    }


    const {image, description, agence} = paramsCar

    const listCommandeVehicle = ListCommandes.filter(commande => commande.idVehicle === params.currID)

    const listEvents = listCommandeVehicle.map(element => (
        {
            "id" : element.idContrat,
            "start" : element.dateDebut,
            "end" : element.dateFin,
            "title" : `Déjà réservé`,
            allDay : true,
        }
    ))


    if (paramsCar.message) {
        validateMessage("Véhicule non trouvé avec les informations", "pas ok", "/")
    } else if (role === 0) {
        validateMessage("Vous devez être connecté pour accéder à cette donnée", "info", "/login")
    }


    return(
        <div style={{marginTop : "46px"}}>
            <ContainerImg>
                <img src={Object.keys(paramsCar).length > 0 && image ? image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} alt="votre voiture" style={{width : "80%", height : "80%", marginTop : "16px"}} onError={({currentTarget}) => {
                    currentTarget.onerror= null;
                    currentTarget.src= DefaultImg
                }}/>

            </ContainerImg>
            <div style={{width : "60%", marginRight : "auto", marginLeft : "auto"}}>
                <div style={{marginTop : "48px"}}>
                    <H3>Description</H3>
                </div>
                <div style={{marginTop : "16px"}}>
                    <h5 style={{color : "#747474"}}>{Object.keys(paramsCar).length > 0 && description ? description : ""}</h5>
                </div>
            </div>
            <StandarContainers style={{marginTop : "32px"}}>
                <ContainerFullCalendar>
                    {
                        !startDate && !endDate
                        ?
                        <FullCalendar
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            initialView="dayGridMonth"
                            locale={frLocale}
                            eventColor='red'
                            selectable={true}
                            selectLongPressDelay={100}
                            dateClick={(clickedInfo) => handleClickDate(clickedInfo)}
                            select={(selectInfo) => handleSelectDate(selectInfo)}
                            events={listEvents}
                            eventMinHeight={80}
                            validRange={validRange}
                        />
                            : <div style={{width : "60%", marginRight : "auto", marginLeft : "auto", display : "flex", alignItems : "center", justifyContent : "center"}}>
                                <h3 style={{color : "white"}}>Vous avez sélectionner les dates suivantes : {startDate} / {endDate}</h3>
                                <img src={Deleteicon} style={{width : "24px", marginLeft : "15px"}} onClick={() => {
                                    setEndDate("")
                                    setStartDate("")
                                }
                                }/>
                                </div>
                    }
                    <div style={{display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>
                        <ContainerInputMui>
                            <label htmlFor="form-input-km" style={{color : "#747474", display: "block"}}>Distance</label>
                            <Input id="form-input-km" type="number" fullWidth placeholder="En kilomètre" sx={styleInputMui} value={killometers} onChange={(e) => handleChangeKm(e)}/>
                        </ContainerInputMui>
                    </div>
                </ContainerFullCalendar>

                <ContainerInputMui textCenter={true}>
                    <div>
                        <h2 style={{color : "white"}}>{`${price.toFixed(2).toString()}€ TTC`}</h2>
                    </div>
                    <div style={{marginTop : "16px", marginBottom : "16px", maxWidth : "720px", marginLeft : "auto", marginRight : "auto"}}>
                        <Link to="/validation_commande" state={{...{pointRetrait,startDate,endDate,killometers,price}, ...location.state}}><ButtonReservation height={40} msg="Continuer"/></Link>
                    </div>
                </ContainerInputMui>
            </StandarContainers>

        </div>
    )

}
export default MoreInfoCar