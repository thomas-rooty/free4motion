import {useMessageStateClient} from "../context/MessageStateClient";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import ListCommandes from "../datatest/contrat.json";
import listUsers from "../datatest/users.json";
import listVehicles from "../datatest/datalistlocation.json";
import {StandarContainers} from "./Containers";
import {ContainerInputMui} from "./MoreInfoCar";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {styleForSelectMui, styleInputMui} from "../utils";
import DefaultImg from "../img/aide-achat-voiture-hydrogene_280219.jpg";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import RemoveImg from "../img/remove.png";
import {ButtonReservation} from "../components";
import styled from "styled-components";


const ContainerFullCalendar = styled.div`
  color : white;
  margin-top: 48px;
  
  & .fc-event {
    height: 60px !important;
  }
`;


const BackOfficeEditCommande = () => {

    const {validateMessage} = useMessageStateClient()
    const location = useLocation()

    const [selectedCar, setSelectedCar] = useState("")
    const [selectedDate, setSelectedDate] = useState({})
    const [agence, setAgence] = useState(0);
    const [km, setKm] = useState(100);
    const [status, setStatus] = useState(2);
    const {currID} = useParams()
    const [paramsCar, setParamsCar] = useState({})

    const listCommandeVehicle = ListCommandes.filter(commande => commande.idVehicle === selectedCar)

    const listEvents = listCommandeVehicle.map(element => (
        {
            "id" : element.idContrat,
            "start" : element.dateDebut,
            "end" : element.dateFin,
            "title" : `Réservation faite par : ${listUsers.filter(user => user.idPersonne === element.idPersonne)[0].email}`,
            allDay : true,
        }
    ))

    useEffect(() => {
        const [InfoVehicleSelected] = listVehicles.filter(vehicle => vehicle.id === selectedCar)
        if (InfoVehicleSelected) {
            setAgence(InfoVehicleSelected.agence)
        }
    }, [selectedDate])

    useEffect(() => {

        const [commande] = ListCommandes.filter(contrat => contrat.idContrat === currID)
        setSelectedDate({
            "start" : commande.dateDebut,
            "end" : commande.dateFin
        })
        setKm(commande.km)
        setStatus(commande.state)
        if (location.state) {
            setSelectedCar(location.state.idVehicle)
            const [goodVehicle] = listVehicles.filter(vehicle => vehicle.id === location.state.idVehicle)
            setParamsCar(goodVehicle)
            setAgence(goodVehicle.agence)
        }
    }, [])

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
    const handleSubmit = () => {
        setTimeout(() => {
            validateMessage("Commande bien modifiez !", "ok", -1)
        }, 1000)
    }




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
                            listVehicles.length > 0
                            && listVehicles.map(
                                vehicle =>
                                    <MenuItem key={vehicle.id} value={vehicle.id} style={{display : "flex", justifyContent : "space-evenly"}}>
                                        <img src={vehicle.image ? vehicle.image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} alt="votre voiture" style={{width : "10%", minWidth : "100px", height : "10%", marginTop : "16px"}} onError={({currentTarget}) => {
                                            currentTarget.onerror= null;
                                            currentTarget.src= DefaultImg
                                        }}/>
                                        <h2>{vehicle.licensePlate}</h2>
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
                                    <Input id="form-input-km" type="number" fullWidth placeholder="En kilomètre" sx={styleInputMui} value={km} onChange={(e) => setKm(e.target.vale)}/>
                                </ContainerInputMui>
                                <div style={{width : "80%", marginLeft : "auto", marginRight : "auto"}}>
                                    {
                                        paramsCar &&
                                        <ContainerInputMui>
                                            <InputLabel id="form-input-agence" style={{color : "#747474", fontFamily : "Inter"}}>Agence</InputLabel>
                                            <Select
                                                id="select-form-input-agence"
                                                labelId="form-input-agence"
                                                value={agence}
                                                fullWidth
                                                onChange={(e) => setAgence(e.target.value)}
                                                sx={styleForSelectMui}
                                            >
                                                {
                                                    paramsCar.agence === 0
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
                                            <MenuItem value={0}>Annulé</MenuItem>
                                            <MenuItem value={1}>A payé</MenuItem>
                                            <MenuItem value={2}>Validé</MenuItem>
                                            <MenuItem value={3}>Fini</MenuItem>
                                        </Select>
                                    </ContainerInputMui>
                                </div>
                                <div style={{marginTop : "20px"}} onClick={() => handleSubmit()}>

                                    <ButtonReservation msg="Modifier la commande" height={45}/>
                                </div>
                            </div>

                    }
                </div>
            </div>



        </StandarContainers>


    )
}
export default BackOfficeEditCommande