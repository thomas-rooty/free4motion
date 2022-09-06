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
    const [pointRetrait, setPointRetrait] = useState(0)
    const [paramsCar, setParamsCar] = useState({})

    const fetchByIdInfo = async (id) => {
        const req = await fetch(`http://139.162.191.134:8080/api/vehicules/${id}`)
        const data = await req.json()
        setParamsCar(data)
    }

    const handleSubmitAddLocation = async (id) => {

        const data = {
            "idVehicule" : id,
            "prixParKm" : parseFloat(prixKm),
            "prixParJour" : parseFloat(prixByDays),
            "agence" : pointRetrait
        }

        const reqPostLocation = await fetch('http://139.162.191.134:8080/api/offre', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resp = await reqPostLocation.json()

        if (resp.id) {
            validateMessage("Location bien modifié, merci", "ok")
        }

    }


    useEffect(() => {
        if (location.state) {
            setParamsCar(location.state)
        } else {
            fetchByIdInfo(params.currID)
        }
    }, [])

    const handleChangeValueDays = (event) => {

        setPrixByDays(event.target.value)
    }
    const handleChangeValueKms = (event) => {

        setPrixKm(event.target.value)
    }

    const removeOffer = (id) => {
        console.log(id)
    }

    const {id, image} = paramsCar


    return(
        <div style={{marginTop : "32px"}}>
            <div style={{textAlign : "center", display : "flex", justifyContent : "center", alignItems : "center"}}>
                <h1 style={{color : "white"}}>Modifier location</h1>
                <img src={RemoveImg} style={{width : "24px", marginLeft : "10px", cursor : "pointer"}} onClick={() => removeOffer(id)}/>
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
                <div style={{marginTop : "32px"}}>
                    <InputLabel id="select-point-retrait-label" style={{color : "#747474", fontFamily : "Inter"}}>L'agence du véhicule</InputLabel>
                    <Select
                        id="select-point-retrait"
                        labelId="select-point-retrait-label"
                        value={pointRetrait}
                        onChange={(e) => setPointRetrait(e.target.value)}
                        sx={styleForSelectMui}
                    >
                        <MenuItem value={0}>Agence de Paris</MenuItem>
                        <MenuItem value={1}>Agence de Lyon</MenuItem>
                    </Select>
                </div>
            </div>
            <div style={{marginTop : "32px", width : "70%", marginLeft : "auto", marginRight : "auto"}} onClick={() => {
                handleSubmitAddLocation(id).catch(validateMessage("Erreur ! merci de réessayer" , "pas ok"))
            }}>
                <ButtonReservation msg="Ajouter à la location" height={35} />
            </div>
        </div>
    )

}
export default EditCarToLocation;