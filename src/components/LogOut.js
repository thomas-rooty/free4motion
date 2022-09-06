import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useContextMenu} from "../context/ContextMenu";

const LogOut = () => {

    const navigate = useNavigate()
    const {logout} = useContextMenu()

    useEffect(() => {
        logout()
        navigate(-1)
    }, [])
}
export default LogOut