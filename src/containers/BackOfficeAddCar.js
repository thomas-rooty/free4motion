import {Input, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import {StandarContainers} from "./Containers";
import {ENTRY_API_URL, styleForSelectMui, styleInputMui} from "../utils";
import {ButtonReservation} from "../components";
import {useMessageStateClient} from "../context/MessageStateClient";
import {ContainerInputMui} from "./MoreInfoCar";
import {LabelCustom} from "./Register";

const BackOfficeAddCar = () => {

    const newDate = new Date().toISOString().split("T")[0]
    console.log(newDate)
    const {validateMessage} = useMessageStateClient()

    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [serialNumber, setSerialNumber] = useState("")
    const [color, setColor] = useState("")
    const [licencePlate, setLicencePlate] = useState("")
    const [totalKm, setTotalKm] = useState(0)
    const [purchaseDate, setPurchaseDate]= useState(newDate)
    const [purcahsePrice, setPurchasePrice] = useState(0)
    const [type, setType] = useState("car")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    const [pointRetrait, setPointRetrait] = useState(0)

    const handleSubmitAddCar = async () => {


        if (model && description && serialNumber && color && licencePlate && totalKm && purchaseDate && purcahsePrice && type && image && brand) {

            const formData = {
                "modele" : model,
                "description" : description,
                "state" : 1,
                "nSerie" : serialNumber,
                "couleur" : color,
                "plaque" : licencePlate,
                "totalKm" : totalKm,
                "dateAchat": purchaseDate + " 00:00:00",
                "prixAchat" : purcahsePrice,
                "type" : type,
                "image" : image,
                "agence" : pointRetrait,
                "marque" : brand
            }

            const req = await fetch(`${ENTRY_API_URL}api/vehicules`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await req.json()
            if (result.id) {
                validateMessage("Voiture bien ajouté !", "ok", "/free_admin/vehicles")
            } else {
                validateMessage("Erreur lors de l'ajout du véhicule", "pas ok", 0)
            }
        } else {
            validateMessage("Vous devez remplir tous les champs", "pas ok" , 0)
        }

    }

    return (
        <div style={{color : "white", marginBottom : "16px"}}>
            <div style={{marginTop : "32px", textAlign : "center"}}>
                <h2>Ajouter un véhicule</h2>
            </div>
            <StandarContainers>
                <div style={{width : "100%", display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>

                    <ContainerInputMui width={45}>
                        <LabelCustom htmlFor="form-input-brand">Marque du véhicule</LabelCustom>
                        <Input id="form-input-brand" type="text" placeholder="Ferrari" fullWidth sx={styleInputMui} value={brand} onChange={(e) => setBrand(e.target.value)}/>
                    </ContainerInputMui>
                    <ContainerInputMui width={45}>
                        <LabelCustom htmlFor="form-input-model">Modèle du véhicule</LabelCustom>
                        <Input id="form-input-model" fullWidth type="text" placeholder="SF90 Spider" sx={styleInputMui} value={model} onChange={(e) => setModel(e.target.value)}/>
                    </ContainerInputMui>
                    <ContainerInputMui width={45}>
                        <LabelCustom htmlFor="form-input-serialNumber">Numéro de série</LabelCustom>
                        <Input id="form-input-serialNumber" fullWidth type="number" placeholder="16900000979752" sx={styleInputMui} value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)}/>
                    </ContainerInputMui>
                    <ContainerInputMui width={45}>
                        <LabelCustom htmlFor="form-input-color">Couleur de votre voiture</LabelCustom>
                        <Input id="form-input-color" type="text"  fullWidth placeholder="red" sx={styleInputMui} value={color} onChange={(e) => setColor(e.target.value)}/>
                    </ContainerInputMui>
                    <ContainerInputMui width={45}>
                        <LabelCustom htmlFor="form-input-licencePlate">Plaque d'immatriculation</LabelCustom>
                        <Input id="form-input-licencePlate" fullWidth type="text" placeholder="BM-919-XQ" sx={styleInputMui} value={licencePlate} onChange={(e) => setLicencePlate(e.target.value)}/>
                    </ContainerInputMui>
                    <ContainerInputMui width={45}>
                        <LabelCustom htmlFor="form-input-totalKm">km du véhicule</LabelCustom>
                        <Input id="form-input-totalKm" fullWidth type="number" placeholder="" sx={styleInputMui} value={totalKm} onChange={(e) => setTotalKm(parseInt(e.target.value))}/>
                    </ContainerInputMui>
                    <ContainerInputMui width={45}>
                        <LabelCustom htmlFor="form-input-purchaseDate">Date d'achat</LabelCustom>
                        <Input id="form-input-purchaseDate" type="date" fullWidth sx={styleInputMui} value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)}/>
                    </ContainerInputMui>
                    <ContainerInputMui width={45}>
                        <LabelCustom htmlFor="form-input-purchasePrice">Prix d'achat</LabelCustom>
                        <Input id="form-input-purchasePrice" type="number" fullWidth sx={styleInputMui} value={purcahsePrice} onChange={(e) => setPurchasePrice(parseInt(e.target.value))}/>
                    </ContainerInputMui>
                    <ContainerInputMui width={50}>
                        <InputLabel id="form-input-type" style={{color : "#747474", fontFamily : "Inter"}}>Type de véhicule</InputLabel>
                        <Select
                            id="select-form-input-type"
                            labelId="form-input-type"
                            value={type}
                            fullWidth
                            onChange={(e) => setType(e.target.value)}
                            sx={styleForSelectMui}
                        >
                            <MenuItem value="car">Voiture</MenuItem>
                            <MenuItem value="trotinette">Trottinette</MenuItem>
                        </Select>
                    </ContainerInputMui>
                    <ContainerInputMui>
                        <label htmlFor="form-input-description" style={{color : "#747474", display: "block"}}>Description de votre véhicule</label>
                        <Input id="form-input-description" type="text" fullWidth={true} multiline={true} rows={4} placeholder="Le 6m3 (type Fiat Scudo ou similiare) est recommandé pour le transport d'objets et de cartons de grande taille. Ce petit utilitaire confortable et fonctionnel, permet aux particuliers et professionnels de transporter leur matériel facilement. Egalement adapté pour le déménagement de gros meubles." sx={styleInputMui} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </ContainerInputMui>
                    <ContainerInputMui>
                        <label htmlFor="form-input-description" style={{color : "#747474", display: "block"}}>Url de votre image</label>
                        <Input id="form-input-description" type="text" fullWidth={true} placeholder="https://img.freepik.com/photos-premium/voiture-sport-sans-marque-generique-rouge-fond-coucher-soleil_110488-1890.jpg?w=2000" sx={styleInputMui} value={image} onChange={(e) => setImage(e.target.value)}/>
                    </ContainerInputMui>
                    <ContainerInputMui>
                        <div style={{marginTop : "32px"}}>
                            <InputLabel id="select-point-retrait-label" style={{color : "#747474", fontFamily : "Inter"}}>L'agence du véhicule</InputLabel>
                            <Select
                                id="select-point-retrait"
                                labelId="select-point-retrait-label"
                                value={pointRetrait}
                                onChange={(e) => setPointRetrait(e.target.value)}
                                sx={styleForSelectMui}
                            >
                                <MenuItem value={0}>Agence de Paris</MenuItem>
                                <MenuItem value={1}>Agence de Lyon</MenuItem>
                            </Select>
                        </div>
                    </ContainerInputMui>
                </div>
                <div style={{width : "80%", marginTop : "32px", marginLeft : "auto", marginRight : "auto"}} onClick={() => handleSubmitAddCar()}>
                    <ButtonReservation height={40} msg="Envoyer"/>
                </div>
            </StandarContainers>

        </div>
    )


}
export default BackOfficeAddCar