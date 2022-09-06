
import styled from "styled-components";
import {useState} from "react";

import EditImg from '../img/edit.png'
import ChevronDown from '../img/down-arrow.png'
import Validate from '../img/check.png'
import {useMessageStateClient} from "../context/MessageStateClient";
import {ContainerInputMui} from "../containers/MoreInfoCar";
import {LabelCustom} from "../containers/Register";
import {Input} from "@mui/material";
import {styleInputMui} from "../utils";

const ContainerDiv = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  color : white;
`;

const ContainerUserBox = styled.div`

  background-color: #10111E;
  padding: 5px;
  display: flex;
  justify-content: space-around;

  align-items: center;
  border : 1px solid white;
  
  & .child {
    margin-top: 10px;
    width: 150px;
  }
  & img {
  width: 48px;
  }

`;

const H4 = styled.h4`
    font-size: 12px;
    color: #747474;
`;

const ContainerImg = styled.div`
    transform: ${props => props.rotate && "rotate(180deg)"}
`;


const BoxUser = ({id, nom, prenom, naissance, adresse, numeroPermis, handleChange}) => {

    const [userWantEdit, setUserWantEdit] = useState(false)
    const [showCommands, setUserShowCommands] = useState(false)
    const {validateMessage} = useMessageStateClient()

    const handleEditUser = () => {


        setTimeout(() => {
            setUserWantEdit(false)
            validateMessage("Modification bien sauvegarder" , "ok", 0)
        }, 1000)

    }

    return (
        <ContainerDiv>
            <ContainerUserBox>
                {
                    !userWantEdit
                        ?
                            <>
                                <div style={{display :"flex", flexFlow : "row wrap", justifyContent : "space-around"}}>

                                    <div className="child">
                                        <H4>ID :</H4>
                                        <h2>{id}</h2>
                                    </div>
                                    <div className="child">
                                        <H4>Nom :</H4>
                                        <h2>{nom}</h2>
                                    </div>
                                    <div className="child">
                                        <H4>Prénom :</H4>
                                        <h2>{prenom}</h2>
                                    </div>
                                    <div className="child">
                                        <H4>Date de naissance :</H4>
                                        <h2>{naissance}</h2>
                                    </div>
                                    <div className="child">
                                        <H4>Adresse : </H4>
                                        <h2>{adresse}</h2>
                                    </div>
                                    <div className="child">
                                        <H4>Numéro de permis :</H4>
                                        <h2>{numeroPermis}</h2>
                                    </div>
                                </div>
                                <img src={EditImg} onClick={() => {setUserWantEdit(true)}}/>
                                <ContainerImg rotate={showCommands} onClick={() => {setUserShowCommands(prevState => prevState === false)}}>
                                    <img src={ChevronDown}/>
                                </ContainerImg>

                            </>
                        :
                        <>
                            <div style={{display :"flex", flexFlow : "row wrap"}}>

                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="text" value={nom} sx={styleInputMui} onChange={(e) => handleChange(id, "nom", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="text" value={prenom} sx={styleInputMui} onChange={(e) => handleChange(id, "prenom", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="date" value={naissance} sx={styleInputMui} onChange={(e) => handleChange(id, "naissance", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="text" value={adresse} sx={styleInputMui} onChange={(e) => handleChange(id, "adresse", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="number" value={numeroPermis} sx={styleInputMui} onChange={(e) => handleChange(id, "numeroPermis", e.target.value)}/>
                                </ContainerInputMui>
                            </div>

                            <img src={Validate} onClick={() => {handleEditUser()}}/>
                            <ContainerImg rotate={showCommands} onClick={() => {setUserShowCommands(prevState => prevState === false)}}>
                                <img src={ChevronDown}/>
                            </ContainerImg>


                        </>
                }



            </ContainerUserBox>
            {
                showCommands
                && <div style={{textAlign : "center", alignItems : "center", marginTop : "16px", minHeight : "400px"}}>
                </div>
            }
        </ContainerDiv>


    )

}
export default BoxUser