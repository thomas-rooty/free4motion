import {useLocation} from "react-router-dom";


const MoreInfoCar = () => {

    const location = useLocation()
    console.log(location.state)

    return(
        <h1>Hello</h1>
    )

}
export default MoreInfoCar