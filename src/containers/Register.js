import {useEffect, useState} from "react";
import {LOGIN, LOGOUT, styleInputMui} from "../utils";
import {Input} from "@mui/material";
import {StandarContainers} from "./Containers";
import {ButtonReservation} from "../components";
import {useMessageStateClient} from "../context/MessageStateClient";
import styled from "styled-components";
import {ContainerInputMui} from "./MoreInfoCar";

const ContainerDivRegister = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
`;

export const LabelCustom = styled.label`
    color: #747474;
    display: block;
`;

const Register = () => {

    const {validateMessage} = useMessageStateClient()

    const handleSubmit = async () => {
        if (prenom && nom && email && naissance && addresse && numeroTel && numeroPermis && addresseFacturation && password) {

            const dataToPost = {
                "prenom" : prenom,
                "nom" : nom,
                "email" : email,
                "naissance" : naissance,
                "addresse" : addresse,
                "numeroTel" : numeroTel,
                "numeroPermis" : numeroPermis,
                "addresseFacturation":addresseFacturation,
                "pwd" : password,
            }
            const req = await fetch("http://139.162.191.134:8080/api/user", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToPost)
            })
            const result = await req.json()
            console.log(result)

        } else {
            validateMessage("Vous devez remplir tous les champs", "pas ok" , 0)
        }

    }

    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [email, setEmail] = useState("")
    const [naissance, setNaissance] = useState("")
    const [addresse, setAddresse] = useState("")
    const [numeroTel, setNumeroTel] = useState("")
    const [numeroPermis, setNumeroPermis] = useState(0)
    const [addresseFacturation, setAddresseFacturation] = useState("")
    const [password, setPassWord] = useState("")

    return(
        <StandarContainers>
            <ContainerDivRegister>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Votre prénom</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="text" placeholder="Alexandre" sx={styleInputMui} value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Votre nom</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="text" placeholder="Durant" sx={styleInputMui} value={nom} onChange={(e) => setNom(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Votre email</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="text" placeholder="alexandre.durant@gmail.com" sx={styleInputMui} value={email} onChange={(e) => setEmail(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Date de naissance</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="date" placeholder="Alexandre" sx={styleInputMui} value={naissance} onChange={(e) => setNaissance(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Votre adresse</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="text" placeholder="12 rue des ponts Versailles 78000" sx={styleInputMui} value={addresse} onChange={(e) => setAddresse(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Votre adresse de facturation</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="text" placeholder="12 rue des ponts Versailles 78000" sx={styleInputMui} value={addresseFacturation} onChange={(e) => setAddresseFacturation(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Votre numéro de téléphone</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="tel" placeholder="07818383569" sx={styleInputMui} value={numeroTel} onChange={(e) => setNumeroTel(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Votre numéro de téléphone</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="number" placeholder="Votre numéro de permis" sx={styleInputMui} value={numeroPermis} onChange={(e) => setNumeroPermis(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-brand">Votre mot de passe</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="password" placeholder="Votre mot de passe" sx={styleInputMui} value={password} onChange={(e) => setPassWord(e.target.value)}/>
                </ContainerInputMui>
                <div style={{marginTop : "32px", width : "70%", marginLeft : "auto", marginRight : "auto"}} onClick={() => {handleSubmit()}}>
                    <ButtonReservation msg="S'inscrire" height={42}/>
                </div>
            </ContainerDivRegister>


        </StandarContainers>
    )


}
export default Register