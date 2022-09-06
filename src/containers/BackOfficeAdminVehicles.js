import {Link} from "react-router-dom";
import {BoxCar} from "../components";
import {useEffect, useState} from "react";
import {ContainerHomePage} from "./HomeContainerListCars";
import {StandarContainers} from "./Containers";
import styled from "styled-components";

const H2 = styled.h2`
    font-size: 16px;
    color: #747474;
`;

const ContainerListVehicles = styled.div`
  margin-top: 16px;
  display: flex;
  max-width: 100%;
  overflow-y: auto;
  overflow: hidden;
`

const BackOfficeAdminVehicles = () => {

    const [VehiclesWithoutOffer, setVehiclesWithoutOffer] = useState([])
    const [VehiclesWithOffer, setVehiclesWithOffer] = useState([])

    const reqVehicles = async () => {

        const reqVehicles = await fetch('http://139.162.191.134:8080/api/vehicules/')
        const respVehicles = await reqVehicles.json()

        console.log(respVehicles)


        const reqOffers = await fetch("http://139.162.191.134:8080/api/offre")
        const respOffers = await reqOffers.json()

        console.log(respOffers)

        const resultsOffers = respOffers.filter((obj) => {
            return respVehicles.some((obj2) => {
                return obj.value == obj2.value;
            });
        });
        const vehiclesWithNoOffers = respVehicles.filter((obj) => {
            return !resultsOffers.some((obj2) => {
                return obj.idVehicule === obj2.idVehicule
            })
        });

        setVehiclesWithoutOffer(vehiclesWithNoOffers)
        setVehiclesWithOffer(resultsOffers)
    }

    useEffect(() => {
        reqVehicles()
    }, [])

    return(
        <ContainerHomePage>
            <h1 style={{color : "white"}}>BackOfficeAdmin</h1>
            <Link to="/free_admin/add_vehicle"><button>Ajouter une voiture</button></Link>

            <div>
                <StandarContainers>
                    <H2>Les voitures sans offres de locations</H2>
                </StandarContainers>

                <div style={{display : "flex", justifyContent : "flex-start", flexFlow : "row wrap"}}>
                    {
                        VehiclesWithoutOffer.map(
                            element =>
                                <ContainerListVehicles key={element.idVehicule}>
                                    <BoxCar  description={element.description} marque={element.marque} id={element.idVehicule} image={element.image} plaque={element.plaque} modele={element.modele} msg="Ajouter à la location" VehiclesWithoutOffer={VehiclesWithoutOffer}  setVehiclesWithoutOffer={setVehiclesWithoutOffer}/>
                                </ContainerListVehicles>
                        )
                    }
                </div>
                <StandarContainers>
                    <H2>Les voitures déjà avec une offre de location</H2>
                </StandarContainers>
                <div style={{display : "flex", justifyContent : "flex-start", flexFlow : "row wrap"}}>
                    {
                        VehiclesWithOffer.map(
                            element =>
                                <ContainerListVehicles key={element.idVehicule}>
                                    <BoxCar description={element.description} marque={element.marque} id={element.idVehicule} image={element.image} plaque={element.plaque} modele={element.modele} msg="Modifier la location" VehiclesWithOffer={VehiclesWithOffer} setVehiclesWithOffer={setVehiclesWithOffer}/>
                                </ContainerListVehicles>
                        )
                    }
                </div>
            </div>


        </ContainerHomePage>
    )
}
export default BackOfficeAdminVehicles