import {StripeContainer} from "./Stripe";
import {ButtonReservation} from "../components";

const PaymentUser = () => {

    return(
        <div style={{width : "300px", marginTop : "200px", marginLeft : "auto", marginRight : "auto"}}>
            <StripeContainer/>
        </div>
    )
}
export default PaymentUser