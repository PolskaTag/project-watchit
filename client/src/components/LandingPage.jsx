import Navbar from './Navbar.jsx'
//import { Link } from 'react-router-dom'
import watchItLogo from "./images/WatchIT-logos_black_land.png";
import "./style/landingPage.css";


function LandingPage() {

    console.log(Date());
    console.log("Token from landing page: ");
    console.log("token: " + localStorage.getItem("token"))

    return (
        <div>
            <Navbar/>

            <div className="base-container">
                <img src={watchItLogo} className="landing-logo" alt="logo"/><br/>
            </div>

        </div>   
    )
}   

export default LandingPage