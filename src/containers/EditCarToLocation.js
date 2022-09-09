import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {styleForSelectMui, styleInputMui} from "../utils";
import {ButtonReservation} from "../components";
import {LabelCustom} from "./Register";
import {useMessageStateClient} from "../context/MessageStateClient";
import DefaultImg from "../img/aide-achat-voiture-hydrogene_280219.jpg";
import RemoveImg from "../img/remove.png";

const EditCarToLocation = () => {

    const location = useLocation()
    const params = useParams()
    const {validateMessage} = useMessageStateClient()

    const [prixKm , setPrixKm] = useState("0.00")
    const [prixByDays, setPrixByDays] = useState("0.00")
    const [paramsCar, setParamsCar] = useState({})
    const [idOffre, setIdOffre] = useState(undefined)

    const fetchByIdInfo = async (id) => {
        const req = await fetch(`http://139.162.191.134:8080/api/vehicules/${id}`)
        const data = await req.json()
        setParamsCar(data)
    }

    const fetchGetValueLocation = async (id) => {
        const req = await fetch(`http://139.162.191.134:8080/api/vehicules/${id}/offre`)
        const data = await req.json()
        const {idOffre, prixParJour, prixParKm} = data
        setPrixKm(prixParKm)
        setPrixByDays(prixParJour)
        setIdOffre(idOffre)
    }

    const handleSubmitEditLocation = async (id) => {

        const data = {
            "idVehicule" : id,
            "prixParKm" : parseFloat(prixKm),
            "prixParJour" : parseFloat(prixByDays)
        }

        const reqPostLocation = await fetch(`http://139.162.191.134:8080/api/offre/${idOffre}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resp = await reqPostLocation.json()

        if (resp.message === "Offre was updated successfully!") {
            validateMessage("Location bien modifié, merci", "ok", -1)
        }

    }


    useEffect(() => {
        if (location.state) {
            setParamsCar(location.state)
        } else {
            fetchByIdInfo(params.currID)
        }
        fetchGetValueLocation(params.currID)
    }, [])

    const handleChangeValueDays = (event) => {

        setPrixByDays(event.target.value)
    }
    const handleChangeValueKms = (event) => {

        setPrixKm(event.target.value)
    }

    const removeOffer = async (id) => {

        const req = await fetch(`http://139.162.191.134:8080/api/offre/${id}`, {
            method : "DELETE"
        })
        const result = await req.json()

        if (result.message) {
            validateMessage("Location bien supprimé", "ok", -1)
        } else {
            validateMessage("Erreur lors de la suppression", "pas ok", 0)
        }

        console.log(result)


        setTimeout(() => {

        }, 1000)

    }

    const {id, image} = paramsCar


    return(
        <div style={{marginTop : "32px"}}>
            <div style={{textAlign : "center", display : "flex", justifyContent : "center", alignItems : "center"}}>
                <h1 style={{color : "white"}}>Modifier location</h1>
                {
                    idOffre &&
                    <img src={RemoveImg} style={{width : "24px", marginLeft : "10px", cursor : "pointer"}} onClick={() => removeOffer(idOffre)}/>
                }
            </div>
            <div style={{marginTop : "32px", width : "70%", maxWidth : "480px", marginLeft : "auto", marginRight : "auto"}}>
                <img src={image} alt="recap voiture" style={{width : "100%"}} onError={({currentTarget}) => {
                    currentTarget.onerror= null;
                    currentTarget.src= DefaultImg
                }}/>
            </div>
            <div style={{display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>
                <div style={{marginTop : "32px"}}>
                    <LabelCustom htmlFor="form-input-km">Prix par km</LabelCustom>
                    <Input id="form-input-km" type="number" sx={styleInputMui} value={prixKm} onChange={(e) => handleChangeValueKms(e)}/>
                </div>
                <div style={{marginTop : "32px"}}>
                    <LabelCustom htmlFor="form-input-km">Prix par jour</LabelCustom>
                    <Input id="form-input-km" type="number" sx={styleInputMui} value={prixByDays} onChange={(e) => handleChangeValueDays(e)}/>
                </div>
            </div>
            <div style={{marginTop : "32px", width : "70%", marginLeft : "auto", marginRight : "auto"}} onClick={() => {
                handleSubmitEditLocation(id)
            }}>
                <ButtonReservation msg="Modifier la location" height={35} />
            </div>
        </div>
    )

}
export default EditCarToLocation;
