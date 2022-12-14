import {StandarContainers} from "./Containers";
import {BoxCar} from "../components";
import {useEffect, useState} from "react";
import {useContextHomePage} from "../context/ContexHomePage";
import styled from "styled-components";
import {ENTRY_API_URL} from "../utils";

export const ContainerHomePage = styled.div`
  position : relative;
  margin-top : 48px;
  
  & div {
    margin-top: 10px;
  }
`

export const ContainerListVehicles = styled.div`
  margin-top: 16px;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;
export const H2 = styled.h2`
    font-size: 18px;
    color: #747474;
`;




const HomeContainerListCars = () => {

    // récupération de la valeur du contexte de la recherche par modèle
    const {search} = useContextHomePage()


    const [data, setData] = useState([])

    const getListVehicles = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/vehicules`)
        const data = await req.json()


        const activeOffres = data.filter(offre => offre.stateOffre === 1 && offre.stateVehicule === 1)
        setData(activeOffres)
    }
    const searchByName = async (value) => {
        const req = await fetch(`${ENTRY_API_URL}api/vehicules?modele=${value}`)
        const data = await req.json()
        const activeOffres = data.filter(offre => offre.stateOffre === 1 && offre.stateVehicule === 1)
        setData(activeOffres)
    }



    useEffect(() => {
        const value = search.get("modele")
        if (value) {
            searchByName(value)
        } else {
            // Si modele n'est pas définie recupère l'ensemble des véhicules
            getListVehicles()
        }
    }, [search])

    const vehiclesParis = data.filter(element => element.agence === 0)
    const vehiclesLyon = data.filter(element => element.agence === 1)


    // Affiche l'ensemble des véhicules
    return(
        <ContainerHomePage>
            {
                vehiclesParis.length > 0
                &&
                <div style={{marginTop : "32px"}}>
                    <StandarContainers>
                        <H2>PARIS</H2>
                    </StandarContainers>
                    <ContainerListVehicles>
                        {
                            vehiclesParis.map(
                                element =>
                                    <BoxCar key={element.idVehicule} image={element.image} marque={element.marque} modele={element.modele} id={element.idVehicule} description={element.description} agence={element.agence}/>
                            )
                        }
                    </ContainerListVehicles>
                </div>
            }
            {
                vehiclesLyon.length > 0
                &&
                <div style={{marginTop : "32px"}}>
                    <StandarContainers>
                        <H2>LYON</H2>
                    </StandarContainers>
                    <ContainerListVehicles>
                        {
                            vehiclesLyon.map(
                                element =>
                                    <BoxCar key={element.idVehicule} image={element.image} marque={element.marque} modele={element.modele} id={element.idVehicule} description={element.description} agence={element.agence}/>
                            )
                        }
                    </ContainerListVehicles>
                </div>
            }


        </ContainerHomePage>
    )

}
export default HomeContainerListCars