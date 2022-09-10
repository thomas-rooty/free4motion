import {useContext, createContext} from "react";
import Swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";

const MessageStateClient = createContext()

export const MessageStateClientProvider = ({children}) => {

    const navigate = useNavigate()

    // Show notification to client with the msg, if notification it's a error, sucess with state "ok", info with state "info", goTo for navigate in the application when alter is validate or closed, and timer define how much time the alter need to show up
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

        <MessageStateClient.Provider value={{validateMessage}}>
            {children}
        </MessageStateClient.Provider>

    )
}
export const useMessageStateClient = () => {
    return useContext(MessageStateClient)
}