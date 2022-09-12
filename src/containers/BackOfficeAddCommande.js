import {ContainerInputMui} from "./MoreInfoCar";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {ENTRY_API_URL, styleForSelectMui, styleInputMui} from "../utils";
import listVehicles from '../datatest/datalistlocation.json'
import {useEffect, useState} from "react";
import DefaultImg from "../img/aide-achat-voiture-hydrogene_280219.jpg";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {StandarContainers} from "./Containers";
import RemoveImg from '../img/remove.png'
import frLocale from '@fullcalendar/core/locales/fr'
import {ButtonReservation} from "../components";
import {useMessageStateClient} from "../context/MessageStateClient";

const ContainerFullCalendar = styled.div`
  color : white;
  margin-top: 48px;
  
  & .fc-event {
    height: 60px !important;
  }
  & .fc-event-time {
    display: none;
  }
`;

const BackOfficeAddCommande = () => {

    const {validateMessage} = useMessageStateClient()

    const [selectedCar, setSelectedCar] = useState("")
    const [selectedDate, setSelectedDate] = useState({})
    const [agence, setAgence] = useState(0);
    const [km, setKm] = useState(100);
    const [status, setStatus] = useState(1);

    const [listOffreLocations, setListOffreLocations] = useState([])
    const [listEvents, setListEvents] = useState([])
    const [dataOffreLocation, setDataOffreLocation] = useState({})
    const [prix, setPrix] = useState(0)

    const getListOffreLocations = async () => {

        const req = await fetch(`${ENTRY_API_URL}api/offre`)
        const data = await req.json()

        const activeOffre = data.filter(x => x.stateOffre === 1 && x.stateVehicule === 1)

        setListOffreLocations(activeOffre)

    }

    const getOffreByIDVehicule = async () => {

        const req = await fetch(`${ENTRY_API_URL}api/vehicules/${selectedCar}/offre`)
        const result = await req.json()

        setDataOffreLocation(result)

    }

    useEffect(() => {

        if (Object.keys(dataOffreLocation).length > 0) {

            let nbr;
            if (selectedDate.start === selectedDate.end) {
                nbr = 1
            } else {
                const timeStampStart = new Date(selectedDate.start.replaceAll("-"," ")).getTime()
                const timeStampEnd = new Date(selectedDate.end.replaceAll("-"," ")).getTime()

                const differenceTimeStamp = timeStampEnd - timeStampStart
                nbr = Math.ceil(differenceTimeStamp / (1000 * 3600 * 24)) + 1
            }
            const priceDays = nbr * dataOffreLocation.prixParJour
            const priceKms = km * dataOffreLocation.prixParKm
            setPrix(priceDays + priceKms)
        }


    }, [selectedDate, km])
    const getCommandeByIdOffre = async () => {

        const req = await fetch(`${ENTRY_API_URL}api/contrat/offre/${dataOffreLocation.idOffre}`)
        const result = await req.json()
        const reqGetAllUsers = await fetch(`${ENTRY_API_URL}api/users`)
        const allUsers = await reqGetAllUsers.json()
        const currListEvents = result.map(element => (
            {
                "id" : element.idContrat,
                "start" : element.dateDebut,
                "end" : element.dateFin,
                "title" : `Réservation faite par : ${allUsers.filter(user => user.idPersonne === element.idPersonne)[0].email}`,
                allDay : element.dateDebut.split("T")[0] === element.dateFin.split("T")[0]
            }
        ))
        setListEvents(currListEvents)

    }

    useEffect(() => {
        getListOffreLocations()
    }, [])

    useEffect(() => {
        if (selectedCar) {
            getOffreByIDVehicule()
        }
    }, [selectedCar])
    useEffect(() => {
        if (selectedCar && Object.keys(dataOffreLocation).length > 0) {
            getCommandeByIdOffre()
        }
    }, [dataOffreLocation])


    const {currID} = useParams()


    useEffect(() => {
        const [InfoVehicleSelected] = listVehicles.filter(vehicle => vehicle.id === selectedCar)
        if (InfoVehicleSelected) {
            setAgence(InfoVehicleSelected.agence)
        }
    }, [selectedDate])

    const handleSelectDate = (infos) => {

        const dateLessOneDays = infos.end.setDate(infos.end.getDate())
        const [newDate] = new Date(dateLessOneDays).toISOString().split("T")


        setSelectedDate({
            "start" : infos.startStr + " 07:00",
            "end" : newDate  + " 18:00"
        })
    }
    const handleClickDate = (infos) => {
        setSelectedDate({
            "start" : infos.dateStr + " 07:00",
            "end" : infos.dateStr + " 18:00"
        })
    }
    const handleSubmit = async () => {

        const data = {
            "idPersonne" : parseInt(currID),
            "dateDebut" : selectedDate.start,
            "dateFin" : selectedDate.end,
            "kmContrat" : parseInt(km),
            "state" : status,
            "idOffre" : dataOffreLocation.idOffre
        }

        const reqPostCommande = await fetch(`${ENTRY_API_URL}api/contrat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await reqPostCommande.json()
        if (result.idContrat) {
            validateMessage("Commande bien enregistrez !", "ok", -1)
        } else {
            validateMessage("Une erreur est survenue", "pas ok", 0)
        }

    }

    const [goodVehicles] = listOffreLocations.filter(element => element.idVehicule === selectedCar)

    return (

        <StandarContainers>
            <div style={{width : "70%", marginLeft : "auto" , marginRight : "auto"}}>

                <ContainerInputMui>
                    <InputLabel id="select-point-retrait-label" style={{color : "#747474", fontFamily : "Inter"}}>La voiture concernée</InputLabel>
                    <Select
                        id="select-point-retrait"
                        labelId="select-point-retrait-label"
                        value={selectedCar}
                        fullWidth
                        onChange={(e) => setSelectedCar(e.target.value)}
                        sx={styleForSelectMui}
                    >
                        <MenuItem value="" disabled>Sélectionner une voiture</MenuItem>
                        {
                            listOffreLocations.length > 0
                                && listOffreLocations.map(
                                    vehicle =>
                                        <MenuItem value={vehicle.idVehicule} key={vehicle.idVehicule} style={{display : "flex", justifyContent : "space-evenly"}}>
                                            <img src={vehicle.image ? vehicle.image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} alt="votre voiture" style={{width : "10%", minWidth : "100px", height : "10%", marginTop : "16px"}} onError={({currentTarget}) => {
                                                currentTarget.onerror= null;
                                                currentTarget.src= DefaultImg
                                            }}/>
                                            <h2>{vehicle.plaque}</h2>
                                        </MenuItem>
                                )
                        }
                    </Select>
                </ContainerInputMui>
                <div style={{marginTop : "32px", color : "white"}}>
                    {
                        selectedCar
                        && Object.keys(selectedDate).length === 0 ?
                            <ContainerFullCalendar>

                                <FullCalendar
                                    plugins={[ dayGridPlugin, interactionPlugin ]}
                                    initialView="dayGridMonth"
                                    locale={frLocale}
                                    events={listEvents}
                                    eventColor='red'
                                    selectable={true}
                                    selectLongPressDelay={100}
                                    dateClick={(clickedInfo) => handleClickDate(clickedInfo)}
                                    select={(selectInfo) => handleSelectDate(selectInfo)}
                                />
                            </ContainerFullCalendar>
                            : selectedCar &&
                            <div>
                                <div style={{display : "flex", alignItems : "center"}}>
                                    <h2>Date chosie : {selectedDate.start.split(' ')[0]} / {selectedDate.end.split(' ')[0]}</h2>
                                    <img src={RemoveImg} alt="icone remove" style={{width : "24px", marginLeft : "10px"}} onClick={() => setSelectedDate({})}/>
                                </div>
                                <ContainerInputMui>
                                    <label htmlFor="form-input-km" style={{color : "#747474", display: "block"}}>Distance</label>
                                    <Input id="form-input-km" type="number" fullWidth placeholder="En kilomètre" sx={styleInputMui} value={km} onChange={(e) => setKm(e.target.value)}/>
                                </ContainerInputMui>
                                <div style={{width : "80%", marginLeft : "auto", marginRight : "auto"}}>
                                    {
                                        goodVehicles &&
                                        <ContainerInputMui>
                                            <InputLabel id="form-input-agence" style={{color : "#747474", fontFamily : "Inter"}}>Agence</InputLabel>
                                            <Select
                                                id="select-form-input-agence"
                                                labelId="form-input-agence"
                                                value={goodVehicles.agence}
                                                fullWidth
                                                onChange={(e) => setAgence(e.target.value)}
                                                sx={styleForSelectMui}
                                            >

                                                {
                                                    goodVehicles.agence === 0
                                                        ? <MenuItem value={0}>Paris</MenuItem>
                                                        : <MenuItem value={1}>Lyon</MenuItem>
                                                }
                                            </Select>
                                        </ContainerInputMui>
                                    }
                                    <ContainerInputMui>
                                        <InputLabel id="form-input-status" style={{color : "#747474", fontFamily : "Inter"}}>Status</InputLabel>
                                        <Select
                                            id="select-form-input-status"
                                            labelId="form-input-status"
                                            value={status}
                                            fullWidth
                                            onChange={(e) => setStatus(e.target.value)}
                                            sx={styleForSelectMui}
                                        >
                                            <MenuItem value={1}>Déjà payé / Validé</MenuItem>
                                            <MenuItem value={3}>A payer</MenuItem>
                                        </Select>
                                    </ContainerInputMui>
                                </div>
                                <div style={{marginTop : "32px"}}>
                                    <h2 style={{color : "white"}}>{`${prix.toFixed(2).toString()}€ TTC`}</h2>
                                </div>
                                <div style={{marginTop : "20px"}} onClick={() => handleSubmit()}>

                                    <ButtonReservation msg="Ajouter la commande" height={45}/>
                                </div>
                            </div>

                    }
                </div>
            </div>



        </StandarContainers>


    )



}
export default BackOfficeAddCommande