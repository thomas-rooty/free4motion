import {
    useStripe,
    useElements,
    CardElement
} from "@stripe/react-stripe-js";
import {ButtonReservation} from "../../components";
import {useMessageStateClient} from "../../context/MessageStateClient";
import {useContextAuth} from "../../context/ContextAuth";
import {Checkbox, FormControlLabel} from "@mui/material";
import {useState} from "react";
import {ENTRY_API_URL} from "../../utils";


const CheckOutForm = ({montant,idContrat, cbSelect}) => {

    const {validateMessage} = useMessageStateClient()
    const {getIdCurrentPpl} = useContextAuth()

    const stripe = useStripe();
    const elements = useElements();

    const [saveCrediCard, setSaveCreditCard] = useState(false)

    const MakePaiementBackEnd = async (paymentMethod) => {
        const {idPersonne} = await getIdCurrentPpl()

        const data = {...paymentMethod, "idPersonne" : idPersonne, "saveCreditCard" : saveCrediCard, "idContrat" : parseInt(idContrat)}
        console.log(data)

        const reqPaymentNode = await fetch(`${ENTRY_API_URL}stripe/charge`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await reqPaymentNode.json()
        console.log(result)
        if (result.success) {
            validateMessage("Payement bien effectué ! merci", "ok", "/my-orders")
        } else {
            validateMessage("Une erreur est survenue lors du paiement", "pas ok", 0)
        }

    }
    const MakePaiementWithPreviousCard = async (paymentMethod) => {

        console.log("previous card")

        const {expMonth, expYear, idCb, idPersonne, last4} = paymentMethod

        const data = {
            "idCb" : idCb,
            "expMonth" : expMonth,
            "expYear" : expYear,
            "last4" : last4,
            "idPersonne" : idPersonne,
            "saveCreditCard" : false,
            "idContrat" : parseInt(idContrat)
        }
        const reqPaymentNode = await fetch(`${ENTRY_API_URL}stripe/charge`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await reqPaymentNode.json()
        console.log(result)
        if (result.success) {
            validateMessage("Payement bien effectué ! merci", "ok", "/my-orders")
        } else {
            validateMessage("Une erreur est survenue lors du paiement", "pas ok", 0)
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!cbSelect) {
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type : "card",
                card : elements.getElement(CardElement)
            })

            if (!error) {
                MakePaiementBackEnd(paymentMethod).catch(() => {
                    validateMessage("Une erreur est survenue lors du paiement", "pas ok", 0)
                })
            }
        } else {
            MakePaiementWithPreviousCard(cbSelect).catch(() => {
                validateMessage("Une erreur est survenue lors du paiement", "pas ok", 0)
            })
        }

    }

    const style = {
        hidePostalCode: true,
        base: {
            color: "white",
            fontFamily: 'Arial, sans-serif',
            fontSize: "16px",
            "::placeholder": {
                color: "white"
            },
            iconColor: "white"
        },
        invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    };

    return(
        <div style={{maxWidth : "340px", flexFlow : "row wrap"}}>
            <form onSubmit={(e) => handleSubmit(e)}>
                {
                    !cbSelect &&
                    <>

                        <CardElement options={{
                            style : style,
                            hidePostalCode: true
                        }}/>
                        <div style={{color : "#747474", width : "100%", marginLeft : "auto", marginRight : "auto", marginTop : "20px"}}>
                            <FormControlLabel
                                label="Sauvegarder ma carte pour mes prochains paiements"
                                control={
                                    <Checkbox
                                        checked={saveCrediCard}
                                        sx={{
                                            color: "#44C034",
                                            '&.Mui-checked': {
                                                color: "#44C034",
                                            },
                                        }}
                                        onChange={() => setSaveCreditCard(prevState => !prevState)}
                                    />
                                }
                            />
                        </div>
                    </>
                }

                <div style={{marginTop : "10px"}}>
                    <ButtonReservation msg={`Payer - ${montant} €`} />
                </div>
            </form>
        </div>

    )

}
export default CheckOutForm