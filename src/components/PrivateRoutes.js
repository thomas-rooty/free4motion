import { Navigate, Outlet } from 'react-router-dom'
import {useMessageStateClient} from "../context/MessageStateClient";
import {useEffect} from "react";
import {useContextAuth} from "../context/ContextAuth";

const msg = {
    "adminNotAccess" : "Connectez sur votre compte personnel pour continuer",
    "adminRoleNeeded" : "Vous devez disposez des droits pour accéder à cette page"

}

const PrivateRoutes = ({roleNeeded, msgRedirect}) => {

    const {role} = useContextAuth()
    console.log(role)


    const access = roleNeeded.indexOf(role) > -1

    return (
        access ? <Outlet/> : <RedirectWithMessage msg={msg[msgRedirect]}/>
    )
}
export default PrivateRoutes

const RedirectWithMessage = ({msg}) => {


    const {validateMessage} = useMessageStateClient()

    useEffect(() => {

        validateMessage(msg, "info", "/login", 2000)

    }, [])

    return (
        <></>
    )
}