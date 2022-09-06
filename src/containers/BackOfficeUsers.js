import x from '../datatest/users.json'
import {StandarContainers} from "./Containers";
import BoxUser from "../components/BoxUser";
import {useEffect, useState} from "react";

const BackOfficeUsers = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        setData(x)
    }, [])


    const handleChangeData = (id, key, value) => {
        const newData = [...data]
        newData[id][key] = value
        setData(newData)
    }

    return(

        <StandarContainers>
            {
                data.map(
                    user => <BoxUser key={user.idPersonne} prenom={user.prenom} id={user.idPersonne} naissance={user.naissance} adresse={user.adresse} nom={user.nom} numeroPermis={user.numeroPermis} handleChange={handleChangeData}/>
                )
            }
        </StandarContainers>
    )


}
export default BackOfficeUsers