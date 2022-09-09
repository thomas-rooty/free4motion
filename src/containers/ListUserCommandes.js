import {useContextAuth} from "../context/ContextAuth";
import {useEffect, useState} from "react";
import BoxCommandeUser from "../components/BoxCommandeUser";
import {ENTRY_API_URL} from "../utils";


const ListUserCommandes = () => {

    const {getIdCurrentPpl} = useContextAuth()

    const [id, setId] = useState(undefined)
    const [listCommandes, setListCommandes] = useState([])

    const getId = async () => {
        const {idPersonne} = await getIdCurrentPpl()
        setId(idPersonne)
    }
    const getListCommandes = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/contrat/user/${id}`)
        const result = await req.json()
        setListCommandes(result)
    }

    useEffect(() => {
        getId()
    }, [])

    useEffect(() => {
        if (id) {
            getListCommandes()
        }
    }, [id])

    console.log(id)



    return (
        <div style={{color : "white"}}>
            <div style={{marginTop : "32px", textAlign : "center"}}><h2>Vos dernières commandes</h2></div>
            {
                listCommandes.length > 0 && listCommandes.map(
                    commande => <BoxCommandeUser key={commande.idContrat} dataContrat={commande} />
                )
            }


        </div>
    )

}
export default ListUserCommandes