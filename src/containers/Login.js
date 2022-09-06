import {useEffect, useState} from "react";
import {LOGIN, LOGOUT, styleInputMui} from "../utils";
import {Input} from "@mui/material";
import {StandarContainers} from "./Containers";
import {ButtonReservation} from "../components";
import {useMessageStateClient} from "../context/MessageStateClient";
import {Link} from "react-router-dom";
import {useContextMenu} from "../context/ContextMenu";
import {LabelCustom} from "./Register";
import {ContainerInputMui} from "./MoreInfoCar";

const Login = () => {

    const {validateMessage} = useMessageStateClient()
    const {lastNavigate, login , logout} = useContextMenu()

    useEffect(() => {
        logout()
    }, [])

    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")

    const handleLogin = () => {

        setTimeout(() => {
            validateMessage("Vous êtes bien connectés", "ok", lastNavigate ? lastNavigate : "/")
            login("1T3NF")
        }, 1000)
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
                <div style={{marginTop : "32px", width : "70%", marginLeft : "auto", marginRight : "auto"}} onClick={() => handleLogin()}>
                    <ButtonReservation msg="se connecter" height={42}/>
                </div>

            </div>
            <div style={{textAlign : "center", marginTop : "10px", textDecoration : "underline",}}><Link to="/register"style={{ color : "#747474"}}><h5>Pas de compte ? Inscrivez-vous</h5></Link></div>

        </StandarContainers>
    )


}
export default Login