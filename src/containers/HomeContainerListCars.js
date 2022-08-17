import data from '../datatest/datalistlocation.json'
import {StandarContainers} from "./Containers";
import {BoxCar} from "../components";

const HomeContainerListCars = () => {

    const myData = data.filter(element => element.type === "voiture")

    return(
        <div style={{position : "relative", marginTop : "48px"}}>
                {
                    myData.length > 0
                    &&
                    <div>
                        <StandarContainers>
                            <h2 style={{fontSize : "12px", color : "#747474"}}>Nos voitures disponibles</h2>
                        </StandarContainers>
                        <div style={{marginTop : "16px", display : "flex", maxWidth : "100%", overflow : "auto"}}>
                            {
                                myData.map(
                                    element =>
                                        <BoxCar image={element.image} marque={element.marque} model={element.model} id={element.id} description={element.description}/>
                                )
                            }
                        </div>
                    </div>
                }
        </div>
    )

}
export default HomeContainerListCars