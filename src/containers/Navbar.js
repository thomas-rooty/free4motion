import styled from "styled-components";
import {StandarContainers} from "./Containers";
import Logo4Motion from '../img/logo2.png'
import {Hamburger} from "../components";
import {Link} from "react-router-dom";

const DivNavbar = styled.div`
    width: 100%;
    background-color: #10111E;
    height: 60px;
    line-height: 60px;
    position: relative;
    top : 0px;
    overflow : hidden;
`;

const Navbar = () => {
    return(
        <DivNavbar>
            <StandarContainers flex={true} justifyContent="space-between">
                <div><Link to="/"><img src={Logo4Motion} style={{ width : "128px"}}/></Link></div>
                <Hamburger/>
            </StandarContainers>
        </DivNavbar>
    )
}
export default Navbar;