
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

    const fetchAllUsers = async () => {

        const req = await fetch(`http://139.162.191.134:8080/api/users`)
        const result = await req.json()

        setData(result)

    }

    useEffect(() => {

        fetchAllUsers()

    }, [])


    const handleChangeData = (id, key, value) => {
        const newData = [...data]
        newData[id][key] = value
        setData(newData)
    }

    const filterData = !filter ? data : data.filter(element => element.prenom.toLowerCase().includes(filter.toLowerCase()) || element.nom.toLowerCase().includes(filter.toLowerCase()))

    console.log(filterData)

    return(

        <StandarContainers>
            <div style={{width : "80%", marginRight : "auto", marginLeft : "auto"}}>


                <ContainerInputMui>
                    <LabelCustom htmlFor="form-input-filter">Recherche par nom / ou prénom</LabelCustom>
                    <Input id="form-input-filter" fullWidth type="text" placeholder="Armand" sx={styleInputMui} value={filter} onChange={(e) => setFilter(e.target.value)}/>
                </ContainerInputMui>
            </div>

            {
                filterData.map(
                    user => user.role !== 1 && <BoxUser key={user.idPersonne} data={user} handleChange={handleChangeData}/>
                )
            }
        </StandarContainers>
    )


}
export default BackOfficeUsers