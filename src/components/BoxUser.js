
import styled from "styled-components";
import {useEffect, useState} from "react";

import EditImg from '../img/edit.png'
import ChevronDown from '../img/down-arrow.png'
import Validate from '../img/check.png'
import RemoveImg from '../img/remove.png'
import {useMessageStateClient} from "../context/MessageStateClient";
import {ContainerInputMui} from "../containers/MoreInfoCar";
import {Input} from "@mui/material";
import {ENTRY_API_URL, styleInputMui} from "../utils";

import BoxCommandeAdmin from "./BoxCommandeAdmin";
import addWhite from '../img/addWhite.png'
import {Link} from "react-router-dom";

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
    overflow: hidden;
  }
  & img {
  width: 48px;
  }

`;

export const H4 = styled.h4`
    font-size: 12px;
    color: #747474;
`;

const ContainerImg = styled.div`
    margin-left: 10px;
    transform: ${props => props.rotate && "rotate(180deg)"}
`;

const ContainerFlex = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
`;

const BoxUser = ({data, handleChange, index}) => {

    const [userWantEdit, setUserWantEdit] = useState(false)
    const [showCommands, setUserShowCommands] = useState(false)
    const {validateMessage} = useMessageStateClient()

    const {idPersonne, nom, prenom, naissance,addresse,numeroPermis, numeroTel} = data

    const [contratsPpl, setContratsPpl] = useState([])

    const getAllContratsPpl = async () => {

        const req = await fetch(`${ENTRY_API_URL}api/contrat/user/${idPersonne}`)
        const result = await req.json()

        if (!result.message) {
            setContratsPpl(result)
        }

    }



    useEffect(() => {

        getAllContratsPpl()


    }, [])

    const handleEditUser = async () => {

        const dataToPost = {...data}
        dataToPost["naissance"] = data.naissance.split('T')[0]


        console.log(dataToPost)


        const req = await fetch(`${ENTRY_API_URL}api/user/${idPersonne}`,{
            method : "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToPost)
        })
        const result = await req.json()
        if (result.email){
            validateMessage("Modification bien enregistrer", "ok", 0)
        } else {
            validateMessage("Erreur", "pas ok", 0)
        }

    }

    const handleDeleteUser = async () => {

        const req = await fetch(`http://localhost:8080/api/user/${idPersonne}`,{
            method : "DELETE"
        })
        const result = await req.json()
        console.log(result)
    }


    return (
        <ContainerDiv>
            <ContainerUserBox>
                {
                    !userWantEdit
                        ?
                            <>
                                <ContainerFlex>

                                    <div className="child">
                                        <H4>ID :</H4>
                                        <h2>{idPersonne}</h2>
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
                                        <h2>{naissance.split("T")[0]}</h2>
                                    </div>
                                    <div className="child">
                                        <H4>Adresse : </H4>
                                        <h2>{addresse}</h2>
                                    </div>

                                    <div className="child">
                                        <H4>Tel : </H4>
                                        <h2>{numeroTel}</h2>
                                    </div>
                                    <div className="child">
                                        <H4>Numéro de permis :</H4>
                                        <h2>{numeroPermis}</h2>
                                    </div>
                                </ContainerFlex>
                                <img src={EditImg} alt="edit" onClick={() => {setUserWantEdit(true)}} style={{width : "32px"}}/>
                                <ContainerImg rotate={showCommands} onClick={() => {setUserShowCommands(prevState => prevState === false)}}>
                                    <img src={ChevronDown}/>
                                </ContainerImg>

                            </>
                        :
                        <>
                            <ContainerFlex>

                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="text" value={nom} sx={styleInputMui} onChange={(e) => handleChange(index, "nom", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="text" value={prenom} sx={styleInputMui} onChange={(e) => handleChange(index, "prenom", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="date" value={naissance.split("T")[0]} sx={styleInputMui} onChange={(e) => handleChange(index, "naissance", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="text" value={addresse} sx={styleInputMui} onChange={(e) => handleChange(index, "addresse", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="number" value={numeroTel} sx={styleInputMui} onChange={(e) => handleChange(index, "numeroTel", e.target.value)}/>
                                </ContainerInputMui>
                                <ContainerInputMui width={15}>
                                    <Input id="form-input-serialNumber" fullWidth type="number" value={numeroPermis} sx={styleInputMui} onChange={(e) => handleChange(index, "numeroPermis", e.target.value)}/>
                                </ContainerInputMui>
                            </ContainerFlex>
                            <ContainerFlex>
                                <ContainerFlex>
                                    <img src={Validate} onClick={() => {handleEditUser()}}  style={{width : "32px"}}/>
                                    <img src={RemoveImg} onClick={() => handleDeleteUser()} style={{width : "32px"}}/>
                                </ContainerFlex>
                                <ContainerImg rotate={showCommands && true} onClick={() => {setUserShowCommands(prevState => prevState === false)}}>
                                    <img src={ChevronDown}/>
                                </ContainerImg>
                            </ContainerFlex>


                        </>
                }



            </ContainerUserBox>
            {
                showCommands
                &&
                <div style={{textAlign : "center", alignItems : "center", marginTop : "16px"}}>
                    {
                        contratsPpl.map(
                            contrat =>
                                <BoxCommandeAdmin key={contrat.idContrat} info={contrat} />

                        )
                    }
                    <Link to={`/free_admin/add_commande/${idPersonne}`}><img src={addWhite} style={{marginTop : "24px", width : "24px"}}/></Link>
                </div>
            }

        </ContainerDiv>


    )

}
export default BoxUser

