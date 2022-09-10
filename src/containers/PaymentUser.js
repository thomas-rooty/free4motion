import {StripeContainer} from "./Stripe";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ENTRY_API_URL, styleForSelectMui} from "../utils";
import {useContextAuth} from "../context/ContextAuth";
import {useMessageStateClient} from "../context/MessageStateClient";
import {ContainerInputMui} from "./MoreInfoCar";
import {InputLabel, MenuItem, Select} from "@mui/material";
import CarteBancaire from '../img/carte-bancaire.png'

const ContainerPayment = styled.div`
    width: 300px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
`;

const PaymentUser = () => {

    const {currID} = useParams()
    const {getIdCurrentPpl} = useContextAuth()
    const {validateMessage} = useMessageStateClient()

    const [infoCommande, setInfoCommande] = useState({})
    const [idPersonne, setIdPersonne] = useState("")
    const [cbs, setCbs] = useState([])
    const [selectedCbs, setSelectedCbs] = useState("");

    const getInfo = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/contrat/${currID}`)
        const result = await req.json()
        setInfoCommande(result)
    }
    const checkAccess = async () => {
        const {idPersonne} = await getIdCurrentPpl()
        setIdPersonne(idPersonne)
        if (idPersonne !== infoCommande.idPersonne){
            validateMessage("Vous n'avez pas accès a cette partie !", "pas ok", "/", 1000)
        } else if (infoCommande.montantPaye >= infoCommande.montantTotal) {
            validateMessage("Vous n'avez rien à réglez", "info", "/my-orders", 1000)
        }
    }

    const getCbs = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/cb/user/${idPersonne}`)
        const result = await req.json()

        setCbs(result)
    }

    useEffect(() => {
        getInfo()
    }, [])



    useEffect(() => {
        if (Object.keys(infoCommande).length > 0){
            checkAccess()
        }
    }, [infoCommande])

    useEffect(() => {
        if (idPersonne) {
            getCbs()
        }
    }, [idPersonne])

    const [activeDataCb] = cbs.filter(cb => cb.idCb === selectedCbs)

    return(
        <div>
            {

                cbs.length > 0 &&
                <div style={{width : "20%", minWidth : "280px", marginLeft : "auto", marginRight : "auto"}}>

                    <ContainerInputMui>
                        <InputLabel id="form-input-cbs" style={{color : "#747474", fontFamily : "Inter"}}>Vos cartes bancaires</InputLabel>
                        <Select
                            id="select-form-input-cbs"
                            labelId="form-input-cbs"
                            value={selectedCbs}
                            fullWidth
                            onChange={(e) => setSelectedCbs(e.target.value)}
                            sx={styleForSelectMui}
                        >
                            <MenuItem value="">-- Use a new credit card --</MenuItem>
                            {
                                cbs.map(
                                    cb => <MenuItem value={cb.idCb} key={cb.idCb}>
                                        <div style={{display : "flex", alignItems : "center"}}>
                                            <img src={CarteBancaire} style={{width : "32px"}}/>
                                            <h4 style={{marginLeft : "10px"}}>**** **** **** {cb.last4}</h4>
                                            <h4 style={{marginLeft : "10px"}}>{cb.expMonth}/{cb.expYear}</h4>
                                        </div>
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </ContainerInputMui>
                </div>
            }
            {
                Object.keys(infoCommande).length > 0
                &&
                <ContainerPayment>
                    <StripeContainer cbSelect={activeDataCb} idContrat={currID} montant={parseFloat(infoCommande.montantTotal - infoCommande.montantPaye)}/>
                </ContainerPayment>
            }
        </div>

    )
}
export default PaymentUser