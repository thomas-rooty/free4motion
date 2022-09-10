import {useLocation, Link, useParams, useNavigate} from "react-router-dom";
import {StandarContainers} from "./Containers";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import {ENTRY_API_URL, styleInputMui} from '../utils'
import {ButtonReservation} from "../components";
import {useMessageStateClient} from "../context/MessageStateClient";
import styled from "styled-components";
import DefaultImg from "../img/aide-achat-voiture-hydrogene_280219.jpg";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import Deleteicon from '../img/remove.png'
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
  & .fc-event-time {
    display: none;
  }
`;


const MoreInfoCar = () => {


    const {validateMessage} = useMessageStateClient()
    const {role, setLastNavigate,getIdCurrentPpl} = useContextAuth()

    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()

    const validRange = {
        "start" : new Date()
    }


    const [pointRetrait, setPointRetrait] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [killometers, setKillometers] = useState(100)
    const [price, setPrice] = useState(0)
    const [paramsCar, setParamsCar] = useState({})
    const [paramsLocation, setParamsLocation] = useState({})
    const [listEvents, setListEvents] = useState([])

    const fetchByIdInfo = async (id) => {
        const req = await fetch(`${ENTRY_API_URL}api/vehicules/${id}`)
        const data = await req.json()
        setParamsCar(data)
    }

    const handleSelectDate = (infos) => {


        const occurenceStart = getEvents(infos.start)
        const occurenceEnd = getEvents(infos.end)


        if (!occurenceStart || !occurenceEnd) {
            const inverse = inverseGetEvents(infos.start, infos.end)
            if (!inverse) {
                const newEndDate = infos.end.setDate(infos.end.getDate()-1)
                setStartDate(infos.startStr + " 07:00")
                setEndDate(new Date(newEndDate).toISOString().split("T")[0]  + " 18:00")
            } else {
                validateMessage("Merci de renseigner des dates disponibles", "pas ok", 0)
            }
        } else {
            validateMessage("Merci de renseigner des dates disponibles", "pas ok", 0)
        }

    }

    const getEvents = (date) => {


        const newDate = date.setHours(9)
        let occurrence = false;
        listEvents.forEach((entry) => {

            const newDateStart = new Date(entry["start"])
            const newDateEnd = new Date(entry["end"])

            if (newDateStart.getTime() == newDate){
                occurrence = true
            }
            else if (newDateStart.getTime() < newDate && newDateEnd.getTime() > newDate){
                occurrence = true
            }
        });

        return occurrence
    }

    const inverseGetEvents = (dateDebut, dateFin) => {

        let occurrence = false;
        const newDateDebut = dateDebut.setHours(9)
        const newDateFin = dateFin.setHours(9)

        listEvents.forEach((entry) => {
            const newDateStart = new Date(entry["start"])

            if (newDateDebut < newDateStart.getTime() && newDateFin > newDateStart.getTime()){
                occurrence = true
            }

        })

        return occurrence


    }
    const handleClickDate = (infos) => {

        const occurrence = getEvents(infos.date)
        if (occurrence) {
            validateMessage("Merci de renseigner des dates disponibles", "pas ok", 0)
        } else {
            setStartDate(infos.dateStr + " 07:00")
            setEndDate(infos.dateStr  + " 18:00")
        }

    }

    const fetchOffreVehicule =  async  () => {

        const req = await fetch(`${ENTRY_API_URL}api/vehicules/${paramsCar.idVehicule}/offre`)
        const result = await req.json()
        setParamsLocation(result)
    }

    useEffect(() => {

        if (Object.keys(paramsCar).length > 0) {
            setPointRetrait(paramsCar.agence)
            fetchOffreVehicule()
        }


    }, [paramsCar])

    useEffect(() => {
        if (role ===0){
            setLastNavigate(location.pathname)
        }
        fetchByIdInfo(params.currID)

    }, [])

    useEffect(() => {
        if (Object.keys(paramsLocation).length > 0){
            console.log(paramsLocation)

            fetchCommandesByLocation()
        }
    }, [paramsLocation])

    const fetchCommandesByLocation = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/contrat/offre/${paramsLocation.idOffre}`)
        const result = await req.json()
        if (result) {
            const currListEvents = result.map(element => (
                {
                    "id" : element.idContrat,
                    "start" : element.dateDebut,
                    "end" : element.dateFin,
                    allDay : element.dateDebut.split("T")[0] === element.dateFin.split("T")[0]
                }
            ))

            setListEvents(currListEvents)
        }
    }

    const handleSubmit = async () => {

        const {idPersonne} = await getIdCurrentPpl()

        if (idPersonne && startDate && endDate &&  killometers && paramsLocation) {


            const data = {
                "idPersonne": idPersonne,
                "dateDebut": startDate,
                "dateFin": endDate,
                "kmContrat": parseInt(killometers),
                "idOffre": paramsLocation.idOffre,
                "idVehicule" : paramsCar.idVehicule,
                "image" : paramsCar.image,
                "pointRetrait" : paramsCar.agence,
                "prix" : price
            }

            navigate("/validation_commande", {state: data})
        }
        else {
            validateMessage("Vous devez remplir tous les champs", "pas ok" , 0)
        }
    }

    useEffect(() => {

        if (Object.keys(paramsLocation).length > 0) {

            let nbr;
            if (startDate === endDate) {
                nbr = 1
            } else {
                const timeStampStart = new Date(startDate.replaceAll("-"," ")).getTime()
                const timeStampEnd = new Date(endDate.replaceAll("-"," ")).getTime()

                const differenceTimeStamp = timeStampEnd - timeStampStart
                nbr = Math.ceil(differenceTimeStamp / (1000 * 3600 * 24))
            }
            const priceDays = nbr * paramsLocation.prixParJour
            const priceKms = killometers * paramsLocation.prixParKm
            setPrice(priceDays + priceKms)
        }


    }, [startDate, endDate, killometers])

    const handleChangeKm = (e) => {
        setKillometers(e.target.value)
    }


    const {image, description} = paramsCar



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
                            <div style={{width : "80%", marginLeft : "auto", marginRight : "auto"}}>
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
                            </div>

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
                    <div style={{marginTop : "16px", marginBottom : "16px", maxWidth : "720px", marginLeft : "auto", marginRight : "auto"}} onClick={() => handleSubmit()}>
                        {/* <Link to="/validation_commande" state={{...{pointRetrait,startDate,endDate,killometers,price}, ...location.state}}> */}
                            <ButtonReservation height={40} msg="Continuer"/>
                        {/* </Link> */}
                    </div>
                </ContainerInputMui>
            </StandarContainers>

        </div>
    )

}
export default MoreInfoCar