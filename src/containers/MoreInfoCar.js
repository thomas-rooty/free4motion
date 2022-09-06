import {useLocation, Link, useParams, useNavigate} from "react-router-dom";
import {StandarContainers} from "./Containers";
import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import {formatDateToDateTime, priceByKm, priceByDays, CHECKLOCALTOKEN, styleForSelectMui, styleInputMui} from '../utils'
import {ButtonReservation} from "../components";
import {useMessageStateClient} from "../context/MessageStateClient";
import styled from "styled-components";

const H3 = styled.h3`
    color : white;
    font-size: 16px;
`;
const ContainerImg = styled.div`
    width: 250px;
    height: 115px;
    margin-left: auto;
    margin-right: auto;
`;
export const ContainerInputMui = styled.div`
    margin-top: 32px;
    min-width: ${props => props.width ? props.width + "%" : "35%" };
    text-align: ${props => props.textCenter && "center"};
`;



const MoreInfoCar = () => {

    const {validateMessage} = useMessageStateClient()

    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()


    const myDate = new Date()
    const {userAgent} = navigator


    const currentUserAgent = !!userAgent.match(/firefox|fxios/i)

    const [pointRetrait, setPointRetrait] = useState(0)
    const [startDate, setStartDate ] = useState(formatDateToDateTime(myDate))
    const [endDate, setEndDate] = useState(formatDateToDateTime(myDate))
    const [killometers, setKillometers] = useState(100)
    const [price, setPrice] = useState(0)
    const [paramsCar, setParamsCar] = useState({})

    const fetchByIdInfo = async (id) => {
        const req = await fetch(`http://139.162.191.134:8080/api/vehicules/${id}`)
        const data = await req.json()
        setParamsCar(data)
    }

    const handleSubmitParams = () => {

        navigate("/validation_commande")
    }

    useEffect(() => {
        setPointRetrait(paramsCar.agence)
    }, [paramsCar])

    useEffect(() => {
        if (!CHECKLOCALTOKEN()) {
            validateMessage("Vous devez être connecté pour accéder à cette donnée", "info", "/login")
        }
            if (location.state) {
                setParamsCar(location.state)
            } else {
                fetchByIdInfo(params.currID)
            }

    }, [])

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


    const {image, description, agence} = paramsCar


    return(
        <div style={{marginTop : "46px"}}>
            <ContainerImg>
                <img src={Object.keys(paramsCar).length > 0 && image ? image : "https://www.h2-mobile.fr/img/post-h2/aide-achat-voiture-hydrogene_280219.jpg"} style={{width : "100%", height : "100%"}} alt="voiture récap"/>
            </ContainerImg>
            <StandarContainers>

                <div style={{display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>
                    <ContainerInputMui width={85}>
                        <div style={{marginTop : "48px"}}>
                            <H3>Description</H3>
                        </div>
                        <div style={{marginTop : "16px"}}>
                            <h5 style={{color : "#747474"}}>{Object.keys(paramsCar).length > 0 && description ? description : ""}</h5>
                        </div>
                    </ContainerInputMui>
                    <ContainerInputMui>
                        <InputLabel id="select-point-retrait-label" style={{color : "#747474", fontFamily : "Inter"}}>Votre point de retrait</InputLabel>
                        <Select
                            id="select-point-retrait"
                            labelId="select-point-retrait-label"
                            value={pointRetrait}
                            fullWidth
                            onChange={(e) => handleChangePointRetrait(e)}
                            sx={styleForSelectMui}
                        >
                            {
                                Object.keys(paramsCar).length > 0 && agence === 0
                                    ?
                                    <MenuItem value={0}>Agence de Paris</MenuItem>
                                    : agence === 1 &&
                                    <MenuItem value={1}>Agence de Lyon</MenuItem>
                            }
                        </Select>
                    </ContainerInputMui>
                    <ContainerInputMui>
                        <label htmlFor="form-input-date-start" style={{color : "#747474", display: "block"}}>Date début</label>
                        {
                            currentUserAgent
                                ?
                                <div>

                                    <Input id="form-input-date-start" type="date" fullWidth sx={styleInputMui} value={startDate.split("T")[0]} inputProps={{min : formatDateToDateTime(myDate).split('T')[0]}} onChange={(e) => handleChangeStartDate(e, "days")}/>
                                    <Input id="form-input-times-start" type="time" fullWidth sx={styleInputMui} value={startDate.split("T")[1]}  onChange={(e) => handleChangeStartDate(e, "hours")}/>
                                </div>
                                :
                                <Input id="form-input-date-start" type="datetime-local" fullWidth sx={styleInputMui} value={startDate}  inputProps={{min : formatDateToDateTime(myDate)}} onChange={(e) => handleChangeStartDate(e)}/>
                        }
                    </ContainerInputMui>
                    <ContainerInputMui>
                        <label htmlFor="form-input-date-end" style={{color : "#747474", display: "block"}}>Date fin</label>
                        {
                            currentUserAgent
                                ?
                                <div>
                                    <Input id="form-input-date-end" type="date" fullWidth sx={styleInputMui} inputProps={{min : startDate.split('T')[0]}} value={endDate.split("T")[0]} onChange={(e) => handleChangeEndDate(e, "days")}/>
                                    <Input id="form-input-times-end" type="time" fullWidth sx={styleInputMui} value={endDate.split("T")[1]} onChange={(e) => handleChangeEndDate(e, "hours")}/>
                                </div>
                                :
                                <Input id="form-input-date-end"  type="datetime-local" fullWidth onBlur={() => handleVerifEndDate()} inputProps={{min : startDate }} sx={{
                                    color : "white",
                                    colorScheme: "dark",
                                    ':after': { borderBottomColor: '#44C034' },
                                }} value={endDate} onChange={(e) => handleChangeEndDate(e)}/>
                        }
                    </ContainerInputMui>
                    <ContainerInputMui>
                        <label htmlFor="form-input-km" style={{color : "#747474", display: "block"}}>Distance</label>
                        <Input id="form-input-km" type="number" fullWidth placeholder="En kilomètre" sx={styleInputMui} value={killometers} onChange={(e) => handleChangeKm(e)}/>
                    </ContainerInputMui>
                </div>
                <ContainerInputMui textCenter={true}>
                    <div>
                        <h2 style={{color : "white"}}>{`${price.toFixed(2).toString()}€ TTC`}</h2>
                    </div>
                    <div style={{marginTop : "16px", marginBottom : "16px", maxWidth : "720px", marginLeft : "auto", marginRight : "auto"}}>
                        <Link to="/validation_commande" state={{...{pointRetrait,startDate,endDate,killometers,price}, ...location.state}}><ButtonReservation height={40} msg="Continuer"/></Link>
                    </div>
                </ContainerInputMui>
            </StandarContainers>

        </div>
    )

}
export default MoreInfoCar