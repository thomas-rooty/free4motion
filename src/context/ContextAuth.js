import {useContext, createContext, useState, useEffect} from "react";
import {ENTRY_API_URL} from "../utils";


const ContextAuth = createContext()

export const ContextAuthProvider = ({children}) => {


    /*

        lastNavigate -> Used when anonyme navigate to reservation of vehicle, save the url in lastNavigate to redirect him after login
        firstReloadDone -> State used for wait info and the role of user after a refresh of the application
        role -> determinate the role of user : 0 for anonyme, 1 for user, 2 for admin

     */
    const [lastNavigate, setLastNavigate] = useState(false)
    const [firstReloadDone, setFirstReloadDone] = useState(false)
    const [role, setRole] = useState(undefined)



    // get and set role of user by token saved in localstorage
    const fetchRoleByToken = async (token) => {

        if (token) {

            const req = await fetch(`${ENTRY_API_URL}api/user?token=${token}`)
            const [result] = await req.json()

            if (result.idPersonne) {
                setRole(result.role + 1)
            } else {
                setRole(0)
                return
            }
        } else {
            setRole(0)
        }

        setFirstReloadDone(true)
    }


    // When component is created or refreshed fetch api for get information
    useEffect(() => {

        fetchRoleByToken(localStorage.getItem("token")).catch(() => setRole(0))

    }, [])

    const login = (value) => {
        localStorage.setItem("token" , value)
        fetchRoleByToken(value)
    }
    const logout = () => {
        localStorage.setItem("token" , "")
        fetchRoleByToken("")
    }

    // Used from other composants for get information about token
    const getIdCurrentPpl = async () => {
        const token = localStorage.getItem("token")
        const req = await fetch(`${ENTRY_API_URL}api/user?token=${token}`)
        const [result] = await req.json()
        return result
    }

    return(

        <ContextAuth.Provider value={{lastNavigate,login, logout, role,firstReloadDone, setLastNavigate,getIdCurrentPpl}}>
            <>
                {
                    firstReloadDone && children
                }
            </>
        </ContextAuth.Provider>

    )
}
export const useContextAuth = () => {
    return useContext(ContextAuth)
}