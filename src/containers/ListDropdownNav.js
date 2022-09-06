import styled from "styled-components";
import {Link} from "react-router-dom";
import {useContextMenu} from "../context/ContextMenu";

const CustomUl = styled.ul`
    padding-inline-start: 0px;
    margin: 0;
    list-style: none;
    
    & a {
      text-decoration: none;
      color : inherit;
    }
    & li {
      text-align: center;
      padding: 30px;
      font-size: 16px;
    }
`;


const ListDropdownNav = () => {

    const {role} = useContextMenu()
    console.log(role)
    
    return(
        <div style={{color : "white"}}>
            <CustomUl>
                {
                    role === 0
                        ? <Link to="/login"><li>Se connecter / s'inscrire</li></Link>
                        : role === 1
                            ? <>
                                <Link to="/my-orders"><li>Mes commandes</li></Link>
                                <Link to="/logout"><li>Se déconnecter</li></Link>
                            </>
                            : role === 2
                                && <>
                                    <Link to="/free_admin/vehicles"><li>Gestion véhicules / offres</li></Link>
                                    <Link to="/free_admin/users"><li>Gestions utilisateurs</li></Link>
                                    <Link to="/logout"><li>Se déconnecter</li></Link>
                                </>
                }
            </CustomUl>
        </div>
    )
}
export default ListDropdownNav