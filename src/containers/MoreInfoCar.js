import {useLocation} from "react-router-dom";
import {StandarContainers} from "./Containers";
import {MenuItem, Select} from "@mui/material";
import {useState} from "react";


const MoreInfoCar = () => {

    const location = useLocation()
    const {id, img, description} = location.state

    const [pointRetrait, usePointRetrait] = useState("paris")

    console.log(id, img)

    return(
        <div style={{marginTop : "46px"}}>
            <div style={{width : "250px", height : "115px", marginLeft : "auto", marginRight : "auto"}}>
                <img src={img} style={{width : "100%", height : "100%"}}/>
            </div>
            <StandarContainers>
                <div style={{marginTop : "48px"}}>
                    <h3 style={{color : "white", fontSize : "16px"}}>Description</h3>
                </div>
                <div style={{marginTop : "16px"}}>
                    <h5 style={{color : "#747474"}}>{description}</h5>
                </div>
                <div style={{width : "320px", marginTop : "32px"}}>
                    <Select
                        id="select-point-retrait"
                        value={pointRetrait}
                        label="Age"
                        sx={{
                            color : "white",
                            border: "1px solid darkgrey",
                        }}
                    >
                        <MenuItem value="paris">Agence de Paris</MenuItem>
                        <MenuItem value="lyon">Agence de Lyon</MenuItem>
                    </Select>
                </div>
            </StandarContainers>



        </div>
    )

}
export default MoreInfoCar