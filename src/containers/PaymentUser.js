import {StripeContainer} from "./Stripe";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ENTRY_API_URL} from "../utils";
import {useContextAuth} from "../context/ContextAuth";
import {useMessageStateClient} from "../context/MessageStateClient";

const ContainerPayment = styled.div`
    width: 300px;
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
`;

const PaymentUser = () => {

    const {currID} = useParams()
    const {getIdCurrentPpl} = useContextAuth()
    const {validateMessage} = useMessageStateClient()

    const [infoCommande, setInfoCommande] = useState({})

    const getInfo = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/contrat/${currID}`)
        const result = await req.json()
        setInfoCommande(result)
    }
    const checkAccess = async () => {
        const {idPersonne} = await getIdCurrentPpl()
        if (idPersonne !== infoCommande.idPersonne){
            validateMessage("Vous n'avez pas accès a cette partie !", "pas ok", "/", 1000)
        } else if (infoCommande.montantPaye >= infoCommande.montantTotal) {
            validateMessage("Vous n'avez rien à réglez", "info", "/my-orders", 1000)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])



    useEffect(() => {
        if (Object.keys(infoCommande).length > 0){
            checkAccess()
        }
    }, [infoCommande])

    return(
        <div>
            {
                Object.keys(infoCommande).length > 0
                &&
                <ContainerPayment>
                    <StripeContainer idContrat={currID} montant={parseFloat(infoCommande.montantTotal - infoCommande.montantPaye)}/>
                </ContainerPayment>
            }
        </div>

    )
}
export default PaymentUser