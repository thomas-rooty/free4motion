import {H4} from "./BoxUser";
import styled from "styled-components";
import DefaultImg from "../img/aide-achat-voiture-hydrogene_280219.jpg";
import EditImg from "../img/edit.png";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


const ContainerCommande = styled.div`

  background-color: #10111E;
  padding: 5px;
  display: flex;
  justify-content: space-around;

  align-items: center;
  border : 1px solid white;
  
  & .child {
    margin-top: 10px;
    max-width: 250px;
    overflow: hidden;
  }
  & img {
  width: 48px;
  }

`;

const Circle = styled.div`
    width: 32px;
    height: 32px;
    background-color: ${props => props.state ? props.state : "red"};
    border-radius: 50%;
`;

const BoxCommandeAdmin = ({admin, info}) => {


    const {idOffre, idVehicle, idContrat, state, dateDebut, dateFin} = info

    const [infoVehicle, setInfoVehicle] = useState({})

    const getOffre = async () => {

        const req = await fetch(`http://139.162.191.134:8080/api/offre/${idOffre}`)
        const {idVehicule} = await req.json()

        if (idVehicule) {

            const getInfoVehicule = await fetch(`http://139.162.191.134:8080/api/vehicules/${idVehicule}`)
            const data = await getInfoVehicule.json()

            setInfoVehicle(data)
        }

    }

    useEffect(() => {
        getOffre()
    }, [])

    return(
        <ContainerCommande>

            <div className="child">
                <H4>Numéro de commande</H4>
                <h2>{idContrat}</h2>
            </div>
            <div className="child">
                {
                    Object.keys(infoVehicle).length > 0 && <img src={infoVehicle.image ? infoVehicle.image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} alt="votre voiture" style={{width : "100px", marginTop : "16px"}} onError={({currentTarget}) => {
                        currentTarget.onerror= null;
                        currentTarget.src= DefaultImg
                    }}/>
                }

            </div>
           <div style={{width : "40%", display :"flex", flexFlow : "row wrap", justifyContent : "space-around", alignItems : "center"}}>

               <div className="child">
                   <H4>Date début</H4>
                   <h2>{dateDebut.split('T')[0]}</h2>
               </div>
               <div className="child">
                   <H4>Date fin</H4>
                   <h2>{dateFin.split('T')[0]}</h2>
               </div>
               <div className="child">
                   <Circle state={state === 0 ? "red" : state === 1 ? "green" : state === 2 ? "white" : state === 3 && "orange" }/>
               </div>
               <div className="child">
                   <Link to={`/free_admin/edit_commande/${idContrat}`} state={{"idVehicle" : idVehicle}}><img src={EditImg} style={{width : "32px"}}/></Link>
               </div>
            </div>

        </ContainerCommande>
    )

}
export default BoxCommandeAdmin