import styled from "styled-components";
import React from "react";
import SearchIcon from '../img/search_icon.png'
import {useContextHomePage} from "../context/ContexHomePage";


const SearchInputContainer = styled.input`
  padding-left: 24px;
  width: 220px;
  height: 30px;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
const ContainerSearch = styled.div`
  padding-left : 5px;
  align-items: center;
  width: 300px;
  height: 50px;
  background-color: white;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;

`;

const IconButton = styled.button`
    right: 20px;
    cursor: pointer;
    background: none;
    border: none;
`;


const SearchBar = () => {


    // Utilisation du contexte pour remonter l'information
    const {handleChangeSearch} = useContextHomePage()

    return(
        <React.Fragment>
            <ContainerSearch>
                <SearchInputContainer placeholder="Chercher par modèle" onChange={(e) => handleChangeSearch(e.target.value)}/>
                <IconButton>
                    <img src={SearchIcon} style={{width : "24px"}}/>
                </IconButton>
            </ContainerSearch>


        </React.Fragment>
    )

}
export default SearchBar