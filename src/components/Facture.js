import styled from "styled-components";
import DownLoadIcon from '../img/download.png'
import {useLocation} from "react-router-dom";
import {useMessageStateClient} from "../context/MessageStateClient";
import {useEffect, useState} from "react";
import {useContextAuth} from "../context/ContextAuth";
import {ENTRY_API_URL} from "../utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



const ContainerFacture = styled.div`
        width: 60%; 
        min-width: 320px;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
        margin-top : 20px;
        padding: 5%;
      
      & h5 {
        font-weight: bold;
      }
    `;

const ContainerTypeAndInfos = styled.div`
        display: flex;
        justify-content: flex-start;
        width: 300px;
        align-items: center;
        margin-top: 20px;
    `;
const ContainerTableauRecapFacture = styled.table`
        margin-top: 30px;
        border-spacing:0;
        border-collapse: collapse;
        width: 100%;
      
        & thead {
          height: 60px;
          background-color: #44C034;
        }
        & td {
          text-align: center;
          padding: 10px;
        }
    `;

const ContainerDownloadFacture = styled.div`
        position: fixed;
        right: 2%;
        top : 85%;
        z-index: 1;
        min-height: 72px;
        min-width: 72px;
        border-radius: 50%;
        background-color: #44C034;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

const ContainerInfosEntreprise = styled.div`
        
        & h2 {
          font-weight: bold;
        }
        & h4 {
          font-size: 1.2rem;
        }
    `;

const ContainerTotalAPayer = styled.div`
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    `;
const ContainerTextTotalAPayer = styled.div`
        width: 180px;
    `
const ContainerUniqueInfoTotal = styled.div`
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid black;
        padding: 2px 2px 2px 0px;
      
        & h3, h4 {
          font-weight: bold;
        }
        & h4 {
          margin-right: 15px;
        }
        & h3 {
          margin-left: 15px;
          width: 100px;
        }
    `;

const Facture = type => {

    const location = useLocation()
    const {validateMessage} = useMessageStateClient()
    const {getIdCurrentPpl} = useContextAuth()

    const [params, setParams] = useState({})
    const [infoPpl, setInfoPpl] = useState({})
    const [infoVehicle, setInfoVehicle] = useState({})
    const [infoCommande, setInfoCommande] = useState({})


    const getInfoPpl = async () => {
        const info = await getIdCurrentPpl()
        setInfoPpl(info)
    }
    const getVehicleInfo = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/vehicules/${params.idVehicule} `)
        const result = await req.json()
        setInfoVehicle(result)
    }
    const getInfoCommande = async () => {
        const req = await fetch(`${ENTRY_API_URL}api/contrat/${params.idContrat}`)
        const result = await req.json()
        setInfoCommande(result)
    }

    useEffect(() => {
        if (!location.state) {
            validateMessage("Veuillez accéder à cette page par votre historique de commandes", "info", "/my-orders")
        }else {
            setParams(location.state)
        }
    }, [])

    useEffect(() => {
        if (Object.keys(params).length > 0) {
            getInfoPpl()
            getVehicleInfo()
            getInfoCommande()
        }
    }, [params])

    const generatePdf = async (id) => {

        if (!id) {
            return
        }

        const data = document.getElementById("facture");
        await html2canvas(data, {scrollY : -window.scrollY, scale : 3, windowWidth : 1648, windowHeight : 900, width : 1200, height : 1200}).then(
            canvas => {
                const contentDataURL = canvas.toDataURL('image/png', 1.0)

                const pdf = new jsPDF("p","px","a4");
                const position = 0;

                const divHeight = 1920
                const divWidth = 1080
                const ratio = divHeight / divWidth

                const width = pdf.internal.pageSize.getWidth()
                let height = ratio * width
                pdf.addImage(contentDataURL, "PNG", 0, position, width, height);
                pdf.save(`Facture_commande_${id}_${new Date().toLocaleDateString().split("T")[0]}.pdf`)
            }
        )

    }


    let differenceNbrJours;

    if (infoCommande) {
        const dateDebutParser = new Date(infoCommande.dateDebut).getTime()
        const dateFinParser = new Date(infoCommande.dateFin).getTime()

        const differenceTimeStamp = dateFinParser - dateDebutParser
        differenceNbrJours = Math.ceil(differenceTimeStamp / (1000 * 3600 * 24))
    }

    return (
        <>

            <ContainerDownloadFacture onClick={() => generatePdf(infoCommande.idContrat)}>
                <img src={DownLoadIcon} style={{width : "46px"}}/>
            </ContainerDownloadFacture>

            <ContainerFacture id="facture">
                <ContainerTypeAndInfos>
                    <div style={{width : "80px"}}>
                        <h5>Vendeur</h5>
                    </div>
                    <ContainerInfosEntreprise>
                        <h2>Free4Motion</h2>
                        <h4>51 Rue Jouffroy d'Abbans</h4>
                        <h4>75001 Paris</h4>
                        <h4>France</h4>
                        <h4>contact@free4motion.com</h4>
                        <h4>01 51 13 51 51</h4>
                    </ContainerInfosEntreprise>
                </ContainerTypeAndInfos>
                <ContainerTypeAndInfos>
                    <div style={{width : "80px"}}>
                        <h5>Client</h5>
                    </div>
                    <ContainerInfosEntreprise>
                        <h2>{infoPpl && `${infoPpl.prenom} ${infoPpl.nom}`}</h2>
                        <h4>{infoPpl && infoPpl.addresse}</h4>
                        <h4>France</h4>
                        <h4>{infoPpl && infoPpl.email}</h4>
                        <h4>{infoPpl && infoPpl.numeroTel}</h4>
                    </ContainerInfosEntreprise>
                </ContainerTypeAndInfos>

                <div style={{overflow : "auto"}}>
                    <ContainerTableauRecapFacture>
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Nombre de Jours</th>
                            <th>Nombre de Killomètres</th>
                            <th>% TVA</th>
                            <th>Total TVA</th>
                            <th>Total TTC</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            infoVehicle &&
                            <tr>
                                <td>{`Location ${infoVehicle.marque} ${infoVehicle.modele} \n`}</td>
                                <td>{differenceNbrJours && differenceNbrJours}</td>
                                <td>{infoCommande && infoCommande.kmContrat}</td>
                                <td>20%</td>
                                <td>{infoCommande && infoCommande.montantTotal * 20/100} €</td>
                                <td>{infoCommande && infoCommande.montantTotal} €</td>
                            </tr>
                        }
                        </tbody>
                    </ContainerTableauRecapFacture>
                </div>

                <ContainerTotalAPayer>
                    <ContainerTextTotalAPayer>
                        <ContainerUniqueInfoTotal>
                            <h3>Total HT</h3>
                            <h4>{infoCommande && infoCommande.montantTotal - infoCommande.montantTotal * 20/100} €</h4>
                        </ContainerUniqueInfoTotal>
                        <ContainerUniqueInfoTotal>
                            <h3>Total TVA</h3>
                            <h4>{infoCommande && infoCommande.montantTotal * 20/100} €</h4>
                        </ContainerUniqueInfoTotal>
                        <ContainerUniqueInfoTotal>
                            <h3>Total TTC</h3>
                            <h4>{infoCommande && infoCommande.montantTotal} €</h4>
                        </ContainerUniqueInfoTotal>
                        <ContainerUniqueInfoTotal>
                            <h3>Acompte</h3>
                            <h4>{infoCommande && infoCommande.montantPaye} €</h4>
                        </ContainerUniqueInfoTotal>
                        <ContainerUniqueInfoTotal>
                            <h3>Net à payer</h3>
                            <h4>{infoCommande && infoCommande.montantTotal - infoCommande.montantPaye} €</h4>
                        </ContainerUniqueInfoTotal>
                    </ContainerTextTotalAPayer>
                </ContainerTotalAPayer>
            </ContainerFacture>

        </>

    )



}
export default Facture