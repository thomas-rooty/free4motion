import {useLocation} from "react-router-dom";
import {StandarContainers} from "./Containers";
import {Input, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";
import {formatDateToDateTime} from '../utils'
import {ButtonReservation} from "../components";



const MoreInfoCar = () => {

    const location = useLocation()
    const {id, img, description} = location.state

    const defaultPrice = 32.00


    const myDate = new Date()

    const [pointRetrait, setPointRetrait] = useState("paris")
    const [startDate, setStartDate ] = useState(formatDateToDateTime(myDate))
    const [endDate, setEndDate] = useState(formatDateToDateTime(myDate))
    const [killometers, setKillometers] = useState(100)
    const [price, setPrice] = useState(defaultPrice + killometers * 0.32)

    const handleChangePointRetrait = (e) => {
        setPointRetrait(e.target.value)
    }
    const handleChangeKm = (e) => {
        setKillometers(e.target.value)
        setPrice(defaultPrice + e.target.value * 0.32)
    }
    const handleChangeStartDate = (e) => {
        const timestamp = new Date(e.target.value.replaceAll("-"," ").replace("T", " ")).getTime()
        if (timestamp > myDate.getTime()) {
            setStartDate(e.target.value)
        }
    }
    const handleChangeEndDate = (e) => {
        const timestamp = new Date(e.target.value.replaceAll("-"," ").replace("T", " ")).getTime()
        if (timestamp > myDate.getTime()) {
            setEndDate(e.target.value)
        }

    }


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
                <div style={{width : "320px", display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>
                    <div style={{marginTop : "32px"}}>
                        <InputLabel id="select-point-retrait-label" style={{color : "#747474", fontFamily : "Inter"}}>Votre point de retrait</InputLabel>
                        <Select
                            id="select-point-retrait"
                            labelId="select-point-retrait-label"
                            value={pointRetrait}
                            onChange={(e) => handleChangePointRetrait(e)}
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
                            <MenuItem value="paris">Agence de Paris</MenuItem>
                            <MenuItem value="lyon">Agence de Lyon</MenuItem>
                        </Select>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-date-start" style={{color : "#747474", display: "block"}}>Date début</label>
                        <Input id="form-input-date-start" type="datetime-local" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={startDate} onChange={(e) => handleChangeStartDate(e)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-date-end" style={{color : "#747474", display: "block"}}>Date fin</label>
                        <Input id="form-input-date-end"  type="datetime-local" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={endDate} onChange={(e) => handleChangeEndDate(e)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-km" style={{color : "#747474", display: "block"}}>Distance</label>
                        <Input id="form-input-km" type="number" placeholder="En kilomètre" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={killometers} onChange={(e) => handleChangeKm(e)}/>
                    </div>
                </div>
                <div style={{marginTop : "32px"}}>
                    <div>
                        <h2 style={{color : "white"}}>{`${price.toFixed(2).toString()}€`}</h2>
                    </div>
                    <div style={{marginTop : "16px", marginBottom : "16px"}}>
                        <ButtonReservation height={40}/>
                    </div>
                </div>

            </StandarContainers>



        </div>
    )

}
export default MoreInfoCar