import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {STRIPE_PUBLIC_KEY} from "../../utils";
import {CheckOutForm} from "./index";
import {ButtonReservation} from "../../components";

const stripeTestPromise = loadStripe(STRIPE_PUBLIC_KEY);

const StripeContainer = () => {


    return(
        <Elements stripe={stripeTestPromise} >
            <CheckOutForm/>
        </Elements>
    )
}
export default StripeContainer