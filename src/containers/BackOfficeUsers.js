import x from '../datatest/users.json'
import {StandarContainers} from "./Containers";
import BoxUser from "../components/BoxUser";
import {useEffect, useState} from "react";
import {ContainerInputMui} from "./MoreInfoCar";
import {LabelCustom} from "./Register";
import {Input} from "@mui/material";
import {styleInputMui} from "../utils";

const BackOfficeUsers = () => {

    const [data, setData] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        setData(x)
    }, [])


    const handleChangeData = (id, key, value) => {
        const newData = [...data]
        newData[id][key] = value
        setData(newData)
    }

    const FilterData = !filter ? data : data.filter(element => element.prenom.toLowerCase().includes(filter.toLowerCase()) || element.nom.toLowerCase().includes(filter.toLowerCase()))

    return(

        <StandarContainers>
            <div style={{width : "80%", marginRight : "auto", marginLeft : "auto"}}>


                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-filter">Recherche par nom / ou prénom</LabelCustom>
                    <Input id="form-input-filter" fullWidth type="text" placeholder="Armand" sx={styleInputMui} value={filter} onChange={(e) => setFilter(e.target.value)}/>
                </ContainerInputMui>
            </div>

            {
                FilterData.map(
                    user => <BoxUser key={user.idPersonne} prenom={user.prenom} id={user.idPersonne} naissance={user.naissance} adresse={user.adresse} nom={user.nom} numeroPermis={user.numeroPermis} handleChange={handleChangeData}/>
                )
            }
        </StandarContainers>
    )


}
export default BackOfficeUsers