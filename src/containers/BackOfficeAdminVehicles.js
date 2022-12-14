import {Link} from "react-router-dom";
import {BoxCar, ButtonReservation} from "../components";
import {useEffect, useState} from "react";
import {ContainerHomePage} from "./HomeContainerListCars";
import {StandarContainers} from "./Containers";
import styled from "styled-components";
import {ENTRY_API_URL} from "../utils";

const H2 = styled.h2`
    font-size: 16px;
    color: #747474;
`;

const ContainerListVehicles = styled.div`
  margin-top: 16px;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`

const BackOfficeAdminVehicles = () => {

    const [VehiclesWithoutOffer, setVehiclesWithoutOffer] = useState([])
    const [VehiclesWithOffer, setVehiclesWithOffer] = useState([])
    const [vehiclesUnderCommmandActive, setVehiclesUnderCommandActive] = useState([])

    const reqVehicles = async () => {

        const reqVehicles = await fetch(`${ENTRY_API_URL}api/vehicules/all`)
        const respVehicles = await reqVehicles.json()


        const activeVehicles = respVehicles.filter(vehicle => vehicle.state === 1)

        const reqOffers = await fetch(`${ENTRY_API_URL}api/vehicules/`)
        const respOffers = await reqOffers.json()

        const resultsOffers = respOffers.filter((obj) => {
            return activeVehicles.some((obj2) => {
                // compare and get only active offre
                return obj.idVehicule === obj2.idVehicule && obj.stateOffre === 1;
            });
        });
        const vehiclesWithNoOffers = activeVehicles.filter((obj) => {
            return !resultsOffers.some((obj2) => {
                return obj.idVehicule === obj2.idVehicule
            })
        });

        setVehiclesWithoutOffer(vehiclesWithNoOffers)
        setVehiclesWithOffer(resultsOffers)
    }

    const reqGetVehiclesUnderLocation = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/enCours/vehicules`)
        const result = await req.json()
        setVehiclesUnderCommandActive(result)
    }

    useEffect(() => {
        reqVehicles()
        reqGetVehiclesUnderLocation()

    }, [])

    return(
        <ContainerHomePage>
            <h1 style={{color : "white"}}>BackOfficeAdmin</h1>

            <div style={{width : "20%"}}><Link to="/free_admin/add_vehicle"><ButtonReservation msg="Ajouter une voiture" height={45}>Ajouter une voiture</ButtonReservation></Link></div>

            <div>
                <StandarContainers>
                    <H2>Les voitures sans offres de locations</H2>
                </StandarContainers>

                <div style={{display : "flex", justifyContent : "flex-start", flexFlow : "row wrap"}}>
                    {
                        VehiclesWithoutOffer.map(
                            element =>
                                <ContainerListVehicles key={element.idVehicule}>
                                    <BoxCar
                                        description={element.description}
                                        marque={element.marque}
                                        id={element.idVehicule}
                                        image={element.image}
                                        plaque={element.plaque}
                                        modele={element.modele}
                                        msg="Ajouter ?? la location"
                                        VehiclesWithoutOffer={VehiclesWithoutOffer}
                                        setVehiclesWithoutOffer={setVehiclesWithoutOffer}/>
                                </ContainerListVehicles>
                        )
                    }
                </div>
                <StandarContainers>
                    <H2>Les voitures d??j?? avec une offre de location</H2>
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
                <StandarContainers>
                    <H2>Les v??hicules actuellement lou??</H2>
                </StandarContainers>
                <div style={{display : "flex", justifyContent : "flex-start", flexFlow : "row wrap"}}>
                    {
                        vehiclesUnderCommmandActive.length > 0 && vehiclesUnderCommmandActive.map(
                            element =>
                                <ContainerListVehicles key={element.idVehicule}>
                                    <BoxCar description={element.description} marque={element.marque} id={element.idVehicule} image={element.image} plaque={element.plaque} modele={element.modele} noButton={true} msg="Voire la commande" VehiclesWithOffer={VehiclesWithOffer} setVehiclesWithOffer={setVehiclesWithOffer}/>
                                </ContainerListVehicles>
                        )
                    }
                </div>

            </div>


        </ContainerHomePage>
    )
}
export default BackOfficeAdminVehicles