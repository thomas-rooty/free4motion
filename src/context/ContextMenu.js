import {useContext, createContext, useState, useEffect} from "react";
import {Navbar, ListDropdownNav} from "../containers";
import {useLocation} from "react-router-dom";


const ContextMenu = createContext()

export const ContextMenuProvider = ({children}) => {

    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false)
    const [lastNavigate, setLastNavigate] = useState(false)
    const [localStorageToken, setLocalStorageToken] = useState("")
    const [role, setRole] = useState(0)

    useEffect(() => {
        setIsOpen(false)
        if (location.pathname.split("/")[1] === "shop-car") {
            setLastNavigate(prevState => prevState ? false : location.pathname)
        }
    }, [location])

    useEffect(() => {

        setLocalStorageToken(localStorage.getItem("token"))


    }, [localStorage])

    useEffect(() => {

        setRole(localStorageToken ? 2 : 0)

        console.log("token", localStorageToken)

    }, [localStorageToken])

    const login = (value) => {
        localStorage.setItem("token" , value)
        setLocalStorageToken(value)
    }
    const logout = () => {
        localStorage.setItem("token" , "")
        setLocalStorageToken("")
    }

    console.log(role)

    return(

        <ContextMenu.Provider value={{isOpen, setIsOpen, lastNavigate,login, logout, role }}>
            <>
                <Navbar/>
                {
                    !isOpen
                        ? children
                        : <ListDropdownNav/>
                }
            </>
        </ContextMenu.Provider>

    )
}
export const useContextMenu = () => {
    return useContext(ContextMenu)
}