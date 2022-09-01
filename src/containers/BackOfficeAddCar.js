import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import {StandarContainers} from "./Containers";
import {formatDateToDateTime} from "../utils";
import UploadWhite from "../img/uploadImage.png"
import UploadWhiteSuccess from "../img/uploadImageGreen.png"
import {ButtonReservation} from "../components";

const BackOfficeAddCar = () => {

    const newDate = new Date()

    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serialNumber, setSerialNumber] = useState("")
    const [color, setColor] = useState("")
    const [licencePlate, setLicencePlate] = useState("")
    const [totalKm, setTotalKm] = useState(0)
    const [purchaseDate, setPurchaseDate]= useState(formatDateToDateTime(newDate))
    const [purcahsePrice, setPurchasePrice] = useState(0)
    const [type, setType] = useState("car")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(undefined)

    return (
        <div style={{color : "white", marginBottom : "16px"}}>
            <div style={{marginTop : "32px", textAlign : "center"}}>
                <h2>Ajouter un véhicule</h2>
            </div>
            <StandarContainers>
                <div style={{width : "100%", display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>

                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-brand" style={{color : "#747474", display: "block"}}>Marque du véhicule</label>
                        <Input id="form-input-brand" type="text" placeholder="Ferrari" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={brand} onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-model" style={{color : "#747474", display: "block"}}>Modèle du véhicule</label>
                        <Input id="form-input-model" type="text" placeholder="SF90 Spider" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={model} onChange={(e) => setModel(e.target.value)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-serialNumber" style={{color : "#747474", display: "block"}}>Numéro de série</label>
                        <Input id="form-input-serialNumber" type="text" placeholder="ZFA16900000979752" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-color" style={{color : "#747474", display: "block"}}>Couleur de votre voiture</label>
                        <Input id="form-input-color" type="text" placeholder="red" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={color} onChange={(e) => setColor(e.target.value)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-licencePlate" style={{color : "#747474", display: "block"}}>Plaque d'immatriculation</label>
                        <Input id="form-input-licencePlate" type="text" placeholder="BM-919-XQ" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={licencePlate} onChange={(e) => setLicencePlate(e.target.value)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-totalKm" style={{color : "#747474", display: "block"}}>km du véhicule</label>
                        <Input id="form-input-totalKm" type="number" placeholder="" sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={totalKm} onChange={(e) => setTotalKm(parseInt(e.target.value))}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-purchaseDate" style={{color : "#747474", display: "block"}}>Date d'achat</label>
                        <Input id="form-input-purchaseDate" type="date" inputProps={{min : formatDateToDateTime(newDate)}}  sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-purchasePrice" style={{color : "#747474", display: "block"}}>Prix d'achat</label>
                        <Input id="form-input-purchasePrice" type="number"  sx={{
                            color : "white",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={purcahsePrice} onChange={(e) => setPurchasePrice(parseInt(e.target.value))}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <InputLabel id="form-input-type" style={{color : "#747474", fontFamily : "Inter"}}>Type de véhicule</InputLabel>
                        <Select
                            id="select-form-input-type"
                            labelId="form-input-type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
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
                            <MenuItem value="car">Voiture</MenuItem>
                            <MenuItem value="trotinette">Trotinette</MenuItem>
                        </Select>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-description" style={{color : "#747474", display: "block"}}>Description de votre véhicule</label>
                        <Input id="form-input-description" type="text" fullWidth={true} multiline={true} rows={4} placeholder="Le 6m3 (type Fiat Scudo ou similiare) est recommandé pour le transport d'objets et de cartons de grande taille. Ce petit utilitaire confortable et fonctionnel, permet aux particuliers et professionnels de transporter leur matériel facilement. Egalement adapté pour le déménagement de gros meubles." sx={{
                            color : "white",
                            width : "320px",
                            colorScheme: "dark",
                            ':after': { borderBottomColor: '#44C034' },
                        }} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div style={{marginTop : "32px"}}>
                        <label htmlFor="form-input-image">
                            <div style={{textAlign : "center"}}>
                                <h5 style={{fontSize : "16px", color : "#747474"}}>Uploader une image</h5>
                                <div style={{marginTop : "16px"}}>
                                    <img src={image ? UploadWhiteSuccess : UploadWhite} style={{width : "64px"}} alt="icone upload image"/>
                                </div>
                            </div>
                        </label>
                        <input id="form-input-image" type="file" style={{display : "none"}} onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                </div>
                <div style={{width : "80%", marginTop : "32px", marginLeft : "auto", marginRight : "auto"}}>
                    <ButtonReservation height={40} msg="Envoyer"/>
                </div>
            </StandarContainers>

        </div>
    )


}
export default BackOfficeAddCar