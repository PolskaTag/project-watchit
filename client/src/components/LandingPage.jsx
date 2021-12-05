import { useLayoutEffect, useState } from 'react'
//import { useHistory } from 'react-router-dom'
import Navbar from './Navbar.jsx'
//import { Link } from 'react-router-dom'
import watchItLogo from "./images/WatchIT-logos_black_land.png";
import piPic from "./images/piPic.jpg";
import "./style/landingPage.css";

const SERVER = process.env.NODE_ENV === "production" ? (process.env.REACT_APP_SERVER || "http://localhost:5000") : "http://localhost:5000";

function LandingPage() {

 const [username, setUsername] = useState(null)

    useLayoutEffect(() => {
        // Check if the user is authenticated
        fetch(`${SERVER}/isUserAuth`, {
            'method': "GET",
            'headers': {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
        .catch(err => alert(err))
    }, [])
    console.log(Date());

    return (
        <div className="container">
            
                <Navbar/>
                
            <div style={{width: "85em", height: "10em"}} className="piPic">
                <div className="pic1">
                     <img style={{width: "100%", height: "7em"}} src={watchItLogo}  alt="logo"/><br/>
                </div>
                <div className="pic2">
                     <img style={{width: "100%", height: "15em"}} src={piPic}  alt="pi pic"/><br/>
                </div>
            </div>
        <div className="lineDiv"><p className="p1">WatchIT</p><p className="p2">The Dynamic Security System</p></div>
            <p className="pTag">WatchIt is an object detection system designed to work with a Raspberry Pi and additional low powered peripherals. Current home devices are generally suited towards a singular task and still largely dependent on the user's smartphone to coordinate between devices. We want the ability for users to customize actions based upon what objects are detected by our model. </p>
        </div>   
    )
}   

export default LandingPage;