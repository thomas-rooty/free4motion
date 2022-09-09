import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {STRIPE_PUBLIC_KEY} from "../../utils";
import {CheckOutForm} from "./index";
const stripeTestPromise = loadStripe(STRIPE_PUBLIC_KEY);

const StripeContainer = ({montant, idContrat}) => {





    return(
        <div>

            <Elements stripe={stripeTestPromise} >
                <CheckOutForm montant={montant} idContrat={idContrat}/>
            </Elements>
        </div>
    )
}
export default StripeContainer