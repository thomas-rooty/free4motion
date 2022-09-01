import {Link} from "react-router-dom";
import data from '../datatest/datalistlocation.json'
import {BoxCar} from "../components";

const BackOfficeAdmin = () => {
    return(
        <div >
            <h1 style={{color : "white"}}>BackOfficeAdmin</h1>
            <Link to="/free_admin/add_vehicle"><button>Ajouter une voiture</button></Link>

            <h2 style={{fontSize : "16px", color : "#747474"}}>Les voitures sans offres de locations</h2>
            <div style={{display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>
                {
                    data.map(
                        element =>
                            <div style={{width : "260px"}}>
                                <BoxCar description={element.description} marque={element.brand} image={element.image} model={element.model} plaque={element.licensePlate}/>
                            </div>
                    )
                }
            </div>

        </div>
    )
}
export default BackOfficeAdmin