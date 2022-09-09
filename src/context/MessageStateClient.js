import {useContext, createContext, useState} from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useNavigate} from "react-router-dom";





const MessageStateClient = createContext()

export const MessageStateClientProvider = ({children}) => {

    const navigate = useNavigate()

    const MySwal = withReactContent(Swal)

    const showLoadingMessage = (msg) => {
        MySwal.fire({
            title: {msg},
            didOpen: () => {
                MySwal.showLoading()
            },
        })
    }


    const validateMessage = (msg, state = "ok", goTo = -1, timer) => {

        Swal.close()

        if (state === "ok") {
            Swal.fire({
                title: "OK!",
                text: msg,
                icon: "success",
                timer : timer ? timer : undefined
            }).then(
                () => {
                    goTo && goTo !== 0 && navigate(goTo)
                }
            )
        } else if (state === "info") {
            Swal.fire({
                "title" : "INFORMATION",
                text : msg,
                icon : "info",
                timer : timer ? timer : undefined
            }).then(
                () => {
                    goTo && goTo !== 0 && navigate(goTo)
                }
            )
        }  else {
            Swal.fire({
                title: "OOPS !",
                text: msg,
                icon: "error",
                timer : timer ? timer : undefined
            }).then(
                () => {
                    goTo && goTo !== 0 && navigate(goTo)
                }
            )
        }

    }

    return(

        <MessageStateClient.Provider value={{validateMessage, showLoadingMessage}}>
            {children}
        </MessageStateClient.Provider>

    )
}
export const useMessageStateClient = () => {
    return useContext(MessageStateClient)
}