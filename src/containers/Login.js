import {useEffect, useState} from "react";
import {ENTRY_API_URL, styleInputMui} from "../utils";
import {Input} from "@mui/material";
import {StandarContainers} from "./Containers";
import {ButtonReservation} from "../components";
import {useMessageStateClient} from "../context/MessageStateClient";
import {Link} from "react-router-dom";
import {LabelCustom} from "./Register";
import {ContainerInputMui} from "./MoreInfoCar";
import {useContextAuth} from "../context/ContextAuth";

const Login = () => {

    const {validateMessage} = useMessageStateClient()
    const {lastNavigate, login , logout} = useContextAuth()

    useEffect(() => {
        logout()
    }, [])

    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")

    const handleLogin = async () => {


        const req = await fetch(`${ENTRY_API_URL}api/login?email=${userName}&pwd=${passWord}`)
        const data = await req.text()
        let jsonData;
        try {
            jsonData = JSON.parse(data)
        }catch (e) {
            jsonData = data
        }
        if (jsonData.message){
            validateMessage("Mot de passe et/ou utilisateur incorrect", "pas ok", 0)
        } else {
            validateMessage("Vous êtes bien connectés", "ok", lastNavigate ? lastNavigate : "/")
            login(data)
        }

    }

    return(
        <StandarContainers>
            <div style={{width : "100%", display : "flex", justifyContent : "space-around", flexFlow : "row wrap"}}>
                <ContainerInputMui width={45}>
                    <LabelCustom htmlFor="form-input-brand">Votre adresse mail</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="text" placeholder="dupont.vincent@gmail.com" sx={styleInputMui} value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </ContainerInputMui>
                <ContainerInputMui width={45}>
                    <LabelCustom htmlFor="form-input-brand">Votre mot de passe</LabelCustom>
                    <Input id="form-input-brand" fullWidth type="password" placeholder="*****" sx={styleInputMui} value={passWord} onChange={(e) => setPassWord(e.target.value)}/>
                </ContainerInputMui>
                <div style={{marginTop : "32px", width : "70%", marginLeft : "auto", marginRight : "auto"}} onClick={() => handleLogin().catch(() => validateMessage("Erreur lors de la connexion", "pas ok", 0))}>
                    <ButtonReservation msg="se connecter" height={42}/>
                </div>

            </div>
            <div style={{textAlign : "center", marginTop : "10px", textDecoration : "underline"}}><Link to="/register" style={{ color : "#747474"}}><h5>Pas de compte ? Inscrivez-vous</h5></Link></div>

        </StandarContainers>
    )


}
export default Login