import data from '../datatest/datalistlocation.json'
import {StandarContainers} from "./Containers";
import {BoxCar} from "../components";
import {useEffect, useState} from "react";
import {useContextHomePage} from "../context/ContexHomePage";
import styled from "styled-components";

const ContainerHomePage = styled.div`
  position : relative;
  margin-top : 48px;
  
  & div {
    margin-top: 10px;
  }
`


const HomeContainerListCars = () => {

    const {search} = useContextHomePage()
    const [data, setData] = useState([])

    const getListVehicles = async () => {
        const req = await fetch('http://139.162.191.134:8080/api/vehicules')
        const data = await req.json()
        setData(data)
    }
    const searchByName = async (value) => {
        const req = await fetch(`http://139.162.191.134:8080/api/vehicules?modele=${value}`)
        const data = await req.json()
        setData(data)
    }


    useEffect(() => {
        const value = search.get("modele")
        if (value) {
            searchByName(value)
        } else {
            getListVehicles()
        }
    }, [search])

    console.log(data)

    const carParis = data.filter(element => element.type === "car" && element.agence === 0)
    const trotiParis = data.filter(element => element.type === "trottinette" && element.agence === 0)
    const carLyon = data.filter(element => element.type === "car" && element.agence === 1)
    const trotiLyon = data.filter(element => element.type === "trottinette" && element.agence === 1)


    return(
        <ContainerHomePage>
            {
                carParis.length > 0
                &&
                <div>
                    <StandarContainers>
                        <h2 style={{fontSize : "12px", color : "#747474"}}>Nos voitures disponibles sur Paris</h2>
                    </StandarContainers>
                    <div style={{marginTop : "16px", display : "flex", maxWidth : "100%", overflow : "auto"}}>
                        {
                            carParis.map(
                                element =>
                                    <BoxCar key={element.serialNumber} image={element.image} marque={element.marque} modele={element.modele} id={element.id} description={element.description} agence={element.agence}/>
                            )
                        }
                    </div>
                </div>
            }
            {
                trotiParis.length > 0
                &&
                <div>
                    <StandarContainers>
                        <h2 style={{fontSize : "12px", color : "#747474"}}>Nos trottinettes disponibles sur Paris</h2>
                    </StandarContainers>
                    <div style={{marginTop : "16px", display : "flex", maxWidth : "100%", overflow : "auto"}}>
                        {
                            trotiParis.map(
                                element =>
                                    <BoxCar key={element.serialNumber} image={element.image} marque={element.marque} modele={element.modele} id={element.id} description={element.description} agence={element.agence}/>
                            )
                        }
                    </div>
                </div>
            }
            {
                carLyon.length > 0
                &&
                <div>
                    <StandarContainers>
                        <h2 style={{fontSize : "12px", color : "#747474"}}>Nos voitures disponibles sur Lyon</h2>
                    </StandarContainers>
                    <div style={{marginTop : "16px", display : "flex", maxWidth : "100%", overflow : "auto"}}>
                        {
                            carLyon.map(
                                element =>
                                    <BoxCar key={element.serialNumber} image={element.image} marque={element.marque} modele={element.modele} id={element.id} description={element.description} agence={element.agence}/>
                            )
                        }
                    </div>
                </div>
            }
            {
                trotiLyon.length > 0
                &&
                <div>
                    <StandarContainers>
                        <h2 style={{fontSize : "12px", color : "#747474"}}>Nos trottinettes disponibles sur Lyon</h2>
                    </StandarContainers>
                    <div style={{marginTop : "16px", display : "flex", maxWidth : "100%", overflow : "auto"}}>
                        {
                            trotiLyon.map(
                                element =>
                                    <BoxCar key={element.serialNumber} image={element.image} marque={element.marque} modele={element.modele} id={element.id} description={element.description} agence={element.agence}/>
                            )
                        }
                    </div>
                </div>
            }

        </ContainerHomePage>
    )

}
export default HomeContainerListCars