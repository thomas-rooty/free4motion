import {useContext, createContext, useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

const ContextLogin = createContext()

export const ContextLoginProvider = ({children}) => {

    return(

        <ContextLogin.Provider value={}>
            {children}
        </ContextLogin.Provider>

    )
}
export const useContextLogin = () => {

    return useContext(ContextLogin)

}