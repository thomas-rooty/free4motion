import {ElementsConsumer} from "@stripe/react-stripe-js";
import {CheckOutForm} from "./index";

const InjectedCheckoutForm = () => (
    <ElementsConsumer>
        {({stripe, elements}) => (
            <CheckOutForm stripe={stripe} elements={elements} />
        )}
    </ElementsConsumer>
);
export default InjectedCheckoutForm