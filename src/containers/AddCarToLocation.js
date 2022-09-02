import {useLocation} from "react-router-dom";
import {useState} from "react";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {formatDateToDateTime} from "../utils";
import {ButtonReservation} from "../components";



const AddCarToLocation = () => {

    const location = useLocation()
    const {id, image} = location.state

    const newDate = new Date()

    const [prixKm , setPrixKm] = useState(0.00)
    const [prixByDays, setPrixByDays] = useState(0.00)
    const [pointRetrait, setPointRetrait] = useState("1")

    const {userAgent} = navigator


    return(
        <div style={{marginTop : "32px"}}>
            <div style={{textAlign : "center"}}>
                <h1 style={{color : "white"}}>Ajouter le véhicule à la location</h1>
            </div>
            <div style={{marginTop : "32px", width : "70%", marginLeft : "auto", marginRight : "auto"}}>
                <img src={image} alt="recap voiture" style={{width : "100%"}}/>
            </div>
            <div style={{display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>
                <div style={{marginTop : "32px"}}>
                    <label htmlFor="form-input-km" style={{color : "#747474", display: "block"}}>Prix par km</label>
                    <Input id="form-input-km" type="number" sx={{
                        color : "white",
                        colorScheme: "dark",
                        ':after': { borderBottomColor: '#44C034' },
                    }} value={parseFloat(prixKm).toFixed(2)} onChange={(e) => setPrixKm(parseInt(e.target.value))}/>
                </div>
                <div style={{marginTop : "32px"}}>
                    <label htmlFor="form-input-km" style={{color : "#747474", display: "block"}}>Prix par jour</label>
                    <Input id="form-input-km" type="number" sx={{
                        color : "white",
                        colorScheme: "dark",
                        ':after': { borderBottomColor: '#44C034' },
                    }} value={parseFloat(prixByDays).toFixed(2)} onChange={(e) => setPrixByDays(parseInt(e.target.value))}/>
                </div>
                <div style={{marginTop : "32px"}}>
                    <InputLabel id="select-point-retrait-label" style={{color : "#747474", fontFamily : "Inter"}}>L'agence du véhicule</InputLabel>
                    <Select
                        id="select-point-retrait"
                        labelId="select-point-retrait-label"
                        value={pointRetrait}
                        onChange={(e) => setPointRetrait(e.target.value)}
                        sx={{
                            color : "white",
                            outline : 0,
                            border: "1px solid darkgrey",
                            colorScheme: "dark",
                            "& .MuiSelect-icon" : {
                                color : "white"
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#44C034',
                            }
                        }}
                    >
                        <MenuItem value="1">Agence de Paris</MenuItem>
                        <MenuItem value="2">Agence de Lyon</MenuItem>
                        <MenuItem value="3">Agence de Lyon & Paris</MenuItem>
                    </Select>
                </div>
            </div>
            <div style={{marginTop : "32px", width : "70%", marginLeft : "auto", marginRight : "auto"}}>
                <ButtonReservation msg="Ajouter à la location" height={35} />
            </div>
        </div>
    )
}
export default AddCarToLocation