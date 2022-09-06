
import {SearchBar} from "../components";
import styled from "styled-components";

const ContainerSearchBar = styled.div`
    position: relative;
    margin-top: 48px;
    display: flex;
    justify-content: center;
`;


const Search = () => {

    return(

        <ContainerSearchBar>
            <SearchBar/>
        </ContainerSearchBar>
    )
}
export default Search;