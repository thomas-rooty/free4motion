import {StripeContainer} from "./Stripe";
import styled from "styled-components";

const ContainerPayment = styled.div`
    width: 300px;
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
`;

const PaymentUser = () => {

    return(
        <ContainerPayment>
            <StripeContainer/>
        </ContainerPayment>
    )
}
export default PaymentUser