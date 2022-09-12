import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ContainerInputMui} from "./MoreInfoCar";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {ENTRY_API_URL, styleForSelectMui, styleInputMui} from "../utils";
import {ButtonReservation} from "../components";
import {LabelCustom} from "./Register";
import {useMessageStateClient} from "../context/MessageStateClient";

const BackOfficeEditCommande = () => {

    const {validateMessage} = useMessageStateClient()
    const {currID} = useParams();

    const newDate = new Date()


    const getPreviousInfo = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/contrat/${currID}`)
        const {kmContrat, state} = await req.json()

        setKmParcouru(kmContrat)
        setSelectType(state === 3 ? 1 : state)
    }


    useEffect(() => {
        getPreviousInfo()
    }, [])




    const [selectType, setSelectType] = useState(2);
    const [kmParcouru, setKmParcouru] = useState(0)
    const [dateRendu, setDateRendu] = useState(newDate.toISOString().split("T")[0])

    const handleSubmit = async () => {


        const data = {
            state : selectType
        }
        if (selectType === 2) {
            data['kmParcouru'] = kmParcouru
            data ["dateRendu"] = dateRendu
        }

        const req = await fetch(`${ENTRY_API_URL}api/state/contrat/${currID}`,{
            method : "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await req.json()
        if (result.success) {
            validateMessage("Modification bien enregistrez", "ok", -1)
        } else {
            validateMessage("Erreur", "pas ok", 0)
        }
    }

    return(
        <div style={{width : "80%", marginLeft : "auto", marginRight : "auto"}}>

            <ContainerInputMui>
                <InputLabel id="form-input-status" style={{color : "#747474", fontFamily : "Inter"}}>Action a effectuer</InputLabel>
                <Select
                    id="select-form-input-status"
                    labelId="form-input-status"
                    value={selectType}
                    fullWidth
                    onChange={(e) => setSelectType(e.target.value)}
                    sx={styleForSelectMui}
                >
                    <MenuItem value={0}>Annuler la commande</MenuItem>
                    <MenuItem value={1}>Déjà payé / Validé</MenuItem>
                    <MenuItem value={2}>Fini</MenuItem>
                </Select>
            </ContainerInputMui>
            <div style={{marginTop : "20px"}}>

                {
                    selectType === 0
                    ? <div style={{width : "40%", marginLeft : "auto", marginRight : "auto"}} onClick={() => handleSubmit()}><ButtonReservation msg="Annuler la commande" height={45}/></div>
                        : selectType === 1
                            ? <div style={{width : "40%", marginLeft : "auto", marginRight : "auto"}} onClick={() => handleSubmit()}><ButtonReservation msg="Modifier la commande" height={45}/></div>
                                : selectType === 2
                            &&
                            <div>
                                <ContainerInputMui>
                                    <LabelCustom htmlFor="form-input-km">Nombre de killomètre parcouru</LabelCustom>
                                    <Input id="form-input-km" fullWidth type="number" placeholder="Votre numéro de permis" sx={styleInputMui} value={kmParcouru} onChange={(e) => setKmParcouru(e.target.value)}/>
                                </ContainerInputMui>

                                <ContainerInputMui>
                                    <LabelCustom htmlFor="form-input-date">Date de rendu du véhicule</LabelCustom>
                                    <Input id="form-input-date" fullWidth type="date" sx={styleInputMui} value={dateRendu} onChange={(e) => setDateRendu(e.target.value)}/>
                                </ContainerInputMui>
                                <div onClick={() => handleSubmit()} style={{width : "40%", marginLeft : "auto", marginRight : "auto", marginTop : "20px"}}><ButtonReservation msg="valider le rendu véhicule" height={45}/></div>
                            </div>
                }

            </div>


        </div>


    )
}
export default BackOfficeEditCommande