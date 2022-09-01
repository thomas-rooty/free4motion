import {useLocation, Link} from "react-router-dom";
import {StandarContainers} from "./Containers";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import {formatDateToDateTime, priceByKm, priceByDays} from '../utils'
import {ButtonReservation} from "../components";



const MoreInfoCar = () => {

    const location = useLocation()
    const {image,marque,model,id,description} = location.state

    const myDate = new Date()
    const {userAgent} = navigator


    const currentUserAgent = !!userAgent.match(/firefox|fxios/i)

    const [pointRetrait, setPointRetrait] = useState("paris")
    const [startDate, setStartDate ] = useState(formatDateToDateTime(myDate))
    const [endDate, setEndDate] = useState(formatDateToDateTime(myDate))
    const [killometers, setKillometers] = useState(100)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (new Date(startDate.replaceAll("-"," ").replace("T", " ")).getTime() > new Date(endDate.replaceAll("-"," ").replace("T", " ")).getTime()) {
            setEndDate(startDate)
        }

    }, [startDate])



    useEffect(() => {

        let nbr;
        if (startDate === endDate) {
            nbr = 1
        } else {
            const timeStampStart = new Date(startDate.replaceAll("-"," ").replace("T", " ")).getTime()
            const timeStampEnd = new Date(endDate.replaceAll("-"," ").replace("T", " ")).getTime()

            const differenceTimeStamp = timeStampEnd - timeStampStart
            nbr = Math.ceil(differenceTimeStamp / (1000 * 3600 * 24)) + 1
        }
        const priceDays = nbr * priceByDays
        const priceKms = killometers * priceByKm
        setPrice(priceDays + priceKms)

    }, [startDate, endDate, killometers])

    const handleChangePointRetrait = (e) => {
        setPointRetrait(e.target.value)
    }
    const handleChangeKm = (e) => {
        setKillometers(e.target.value)
    }


    const handleChangeStartDate = (e, params) => {

        if (currentUserAgent && params) {
            if (params === "days") {
                setStartDate(e.target.value + "T" + startDate.split("T")[1])
            } else if (params === "hours"){
                setStartDate(startDate.split("T")[0] + "T" + e.target.value)
            }
            return
        }
        setStartDate(e.target.value)

    }

    const handleVerifEndDate = () => {
        if (new Date(startDate.replaceAll("-"," ").replace("T", " ")).getTime() > new Date(endDate.replaceAll("-"," ").replace("T", " ")).getTime()) {
            setEndDate(startDate)
        }
    }
    const handleChangeEndDate = (e, params) => {

        if (currentUserAgent && params) {
            if (params === "days") {
                setEndDate(e.target.value + "T" + startDate.split("T")[1])
            } else if (params === "hours"){
                setEndDate(startDate.split("T")[0] + "T" + e.target.value)
            }
            return
        }
        setEndDate(e.target.value)

    }

    return(
        <div style={{marginTop : "46px"}}>
            <div style={{width : "250px", height : "115px", marginLeft : "auto", marginRight : "auto"}}>
                <img src={image} style={{width : "100%", height : "100%"}} alt="voiture récap"/>
            </div>
            <StandarContainers>
                <div style={{marginTop : "48px"}}>
                    <h3 style={{color : "white", fontSize : "16px"}}>Description</h3>
                </div>
                <div style={{marginTop : "16px"}}>
                    <h5 style={{color : "#747474"}}>{description}</h5>
                </div>
                <div style={{display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>
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
                        {
                            currentUserAgent
                                ?
                                <div>

                                    <Input id="form-input-date-start" type="date" sx={{
                                        color : "white",
                                        colorScheme: "dark",
                                        ':after': { borderBottomColor: '#44C034' },
                                    }} value={startDate.split("T")[0]} inputProps={{min : formatDateToDateTime(myDate).split('T')[0]}} onChange={(e) => handleChangeStartDate(e, "days")}/>
                                    <Input id="form-input-times-start" type="time" sx={{
                                        color : "white",
                                        colorScheme: "dark",
                                        ':after': { borderBottomColor: '#44C034' },
                                    }} value={startDate.split("T")[1]}  onChange={(e) => handleChangeStartDate(e, "hours")}/>
                                </div>
                                :
                                <Input id="form-input-date-start" type="datetime-local" sx={{
                                    color : "white",
                                    colorScheme: "dark",
                                    ':after': { borderBottomColor: '#44C034' },
                                }} value={startDate}  inputProps={{min : formatDateToDateTime(myDate)}} onChange={(e) => handleChangeStartDate(e)}/>
                        }
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-date-end" style={{color : "#747474", display: "block"}}>Date fin</label>
                        {
                            currentUserAgent
                                ?
                                <div>
                                    <Input id="form-input-date-end" type="date" sx={{
                                        color : "white",
                                        colorScheme: "dark",
                                        ':after': { borderBottomColor: '#44C034' },
                                    }} inputProps={{min : startDate.split('T')[0]}} value={endDate.split("T")[0]} onChange={(e) => handleChangeEndDate(e, "days")}/>
                                    <Input id="form-input-times-end" type="time" sx={{
                                        color : "white",
                                        colorScheme: "dark",
                                        ':after': { borderBottomColor: '#44C034' },
                                    }} value={endDate.split("T")[1]} onChange={(e) => handleChangeEndDate(e, "hours")}/>
                                </div>
                                :
                                <Input id="form-input-date-end"  type="datetime-local" onBlur={() => handleVerifEndDate()} inputProps={{min : startDate }} sx={{
                                    color : "white",
                                    colorScheme: "dark",
                                    ':after': { borderBottomColor: '#44C034' },
                                }} value={endDate} onChange={(e) => handleChangeEndDate(e)}/>
                        }
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
                        <h2 style={{color : "white"}}>{`${price.toFixed(2).toString()}€ TTC`}</h2>
                    </div>
                    <div style={{marginTop : "16px", marginBottom : "16px"}}>
                        <Link to="/validation_commande" state={{...{pointRetrait,startDate,endDate,killometers,price}, ...location.state}}><ButtonReservation height={40} msg="Continuer"/></Link>
                    </div>
                </div>
            </StandarContainers>

        </div>
    )

}
export default MoreInfoCar