import {useContext, createContext, useState, useEffect} from "react";
import {Navbar, ListDropdownNav} from "../containers";
import {useLocation} from "react-router-dom";


const ContextMenu = createContext()

export const ContextMenuProvider = ({children}) => {

    const location = useLocation()



    // State -> If is open show ListDropdownNav else show children
    const [isOpen, setIsOpen] = useState(false)


    // Every navigation by client close ListDropdownNav by changing state
    useEffect(() => {
        setIsOpen(false)
    }, [location])


    // show or not navigation links
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