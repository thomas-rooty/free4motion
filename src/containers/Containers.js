import styled from "styled-components";

export const FullContainers = styled.div`
    width: auto;
    margin-top: 60px;
    position: relative;
`;
export const StandarContainers = styled.div`
    width: auto;
    max-width: 100%;
    padding-right: 16px;
    padding-left: 16px;
    display: ${props => props.flex ? "flex" : "block"};
    justify-content: ${props => props.flex && props.justifyContent && props.justifyContent};
`;
