import {useContext, createContext, useState, useEffect} from "react";


const ContextAuth = createContext()

export const ContextAuthProvider = ({children}) => {


    const [lastNavigate, setLastNavigate] = useState(false)
    const [firstReloadDone, setFirstReloadDone] = useState(false)
    const [role, setRole] = useState(undefined)



    const fetchRoleByToken = async (token) => {

        if (token) {

            const req = await fetch(`http://139.162.191.134:8080/api/user?token=${token}`)
            const [result] = await req.json()

            if (result.idPersonne) {
                setRole(result.role + 2)
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

    return(

        <ContextAuth.Provider value={{lastNavigate,login, logout, role,firstReloadDone, setLastNavigate}}>
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