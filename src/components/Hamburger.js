import styled from "styled-components";
import React from "react"

const HamburgerLine = styled.div`
    width: 49px;
    height: 7px;
    background-color: white;
    border-radius: 30px;
`;

const HamburgerContainer = styled.div`
    & ${HamburgerLine} {
      margin-top: 8px;
    }
`;

const Hamburger = () => {
    return(
        <HamburgerContainer>
            <HamburgerLine/>
            <HamburgerLine/>
            <HamburgerLine/>
        </HamburgerContainer>
    )
}
export default Hamburger