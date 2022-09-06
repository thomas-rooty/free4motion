import {
    useStripe,
    useElements,
    CardElement
} from "@stripe/react-stripe-js";
import {ButtonReservation} from "../../components";
import {useMessageStateClient} from "../../context/MessageStateClient";


const CheckOutForm = () => {

    const {validateMessage} = useMessageStateClient()

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type : "card",
            card : elements.getElement(CardElement)
        })

        if (!error) {

            const dataToPost = {"id" : paymentMethod.id, "amount" : 150}

            const reqPaymentNode = await fetch("http://139.162.191.134:8080/stripe/charge", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToPost)
            })
            const result = await reqPaymentNode.json()
            if (result.success) {
                validateMessage("Payement bien effectué ! merci", "ok", "/my-orders")
            }
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
                <CardElement options={{
                    style : style,
                    hidePostalCode: true
                }}/>
                <div style={{marginTop : "10px"}}>
                    <ButtonReservation msg="Payer"/>
                </div>
            </form>
        </div>

    )

}
export default CheckOutForm