import {useContext, createContext} from "react";
import {useSearchParams} from "react-router-dom";


const ContextHomePage = createContext()

export const ContextHomePageProvider = ({children}) => {

    const [search, setSearch] = useSearchParams({})

    const handleChangeSearch = (value) => {
        setSearch({
            "modele" : value
        })
    }


    return(

        <ContextHomePage.Provider value={{search, handleChangeSearch}}>
            {children}
        </ContextHomePage.Provider>

    )
}
export const useContextHomePage = () => {
    return useContext(ContextHomePage)
}