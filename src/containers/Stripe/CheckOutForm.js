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


const CheckOutForm = ({montant,idContrat, cbSelect, dataPaymentIntent}) => {

    const {validateMessage} = useMessageStateClient()
    const {getIdCurrentPpl} = useContextAuth()

    const stripe = useStripe();
    const elements = useElements();

    const [saveCrediCard, setSaveCreditCard] = useState(false)

    const updateStateCommand = async () => {
        const data = {
            state : 1
        }

        const req = await fetch(`${ENTRY_API_URL}api/state/contrat/${idContrat}`,{
            method : "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }


    const MakePaiementBackEnd = async (id, cbId) => {

        const x = {
            "payment_method" : {

            }
        }
        if (cbId) {
            x.payment_method = cbId
        } else {
            x.payment_method = {
                "card" : elements.getElement(CardElement)
            }
        }

        const payload = await stripe.confirmCardPayment(id, x);
        if (payload.error) {
            validateMessage("Une erreur est survenue lors du paiement", "pas ok", 0)
        } else {
            updateStateCommand().then(() => {
                validateMessage("Payement bien effectué", "ok", "/my-orders")
            })
        }
    }

    const handleSubmit = async (e) =>  {

        e.preventDefault()


        if(dataPaymentIntent) {
            MakePaiementBackEnd(dataPaymentIntent, cbSelect.id)
        } else {
            validateMessage("Une erreur est survenue lors de la création de l'intention de payement stripe", "pas ok", 0)
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

    console.log(cbSelect)

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