import {useContext, createContext, useState, useEffect} from "react";
import {Navbar, ListDropdownNav} from "../containers";
import {useLocation} from "react-router-dom";


const ContextMenu = createContext()

export const ContextMenuProvider = ({children}) => {

    const location = useLocation()

    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        setIsOpen(false)
    }, [location])


    return(

        <ContextMenu.Provider value={{isOpen, setIsOpen}}>
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