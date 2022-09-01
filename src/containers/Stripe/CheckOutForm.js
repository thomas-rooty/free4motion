import {
    PaymentElement,
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement, CardElement
} from "@stripe/react-stripe-js";
import {ButtonReservation} from "../../components";

const CheckOutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type : "card",
            card : elements.getElement(CardElement)
        })
        if (!error) {
            console.log('token généré', paymentMethod)
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
                    style : style
                }}/>
                <div style={{marginTop : "10px"}}>
                    <ButtonReservation msg="Payer"/>
                </div>
            </form>
        </div>

    )

}
export default CheckOutForm