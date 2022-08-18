import styled from "styled-components";
import {Link} from "react-router-dom";

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
    return(
        <div style={{color : "white"}}>
            <CustomUl>
                <Link to="/my-orders"><li>Mes commandes</li></Link>
                <li>Se déconnecter</li>
            </CustomUl>
        </div>
    )
}
export default ListDropdownNav