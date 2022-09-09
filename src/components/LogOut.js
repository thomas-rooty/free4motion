import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useContextAuth} from "../context/ContextAuth";

const LogOut = () => {

    const navigate = useNavigate()
    const {logout} = useContextAuth()

    useEffect(() => {
        logout()
        navigate("/")
    }, [])
}
export default LogOut