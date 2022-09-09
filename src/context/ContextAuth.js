import {useContext, createContext, useState, useEffect} from "react";
import {ENTRY_API_URL} from "../utils";


const ContextAuth = createContext()

export const ContextAuthProvider = ({children}) => {


    const [lastNavigate, setLastNavigate] = useState(false)
    const [firstReloadDone, setFirstReloadDone] = useState(false)
    const [role, setRole] = useState(undefined)


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
    const getIdCurrentPpl = async () => {
        const token = localStorage.getItem("token")
        const req = await fetch(`${ENTRY_API_URL}api/user?token=${token}`)
        const [result] = await req.json()
        console.log(result.idPersonne)
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