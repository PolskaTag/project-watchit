import { useLayoutEffect, useState } from 'react'
//import { useHistory } from 'react-router-dom'
import Navbar from './Navbar.jsx'
//import { Link } from 'react-router-dom'
import watchItLogo from "./images/WatchIT-logos_black_land.png";
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
        <>
        <Navbar />
        <div className="container">
            <div className="landing-container">
                <div className="landing-image">
                    <img src={watchItLogo} className="landing-logo" alt="logo"/><br/>
                </div>
                <p className="landing-about">WatchIt is an object detection system designed to work with a Raspberry Pi and additional low powered peripherals. Current home devices are generally suited towards a singular task and still largely dependent on the user's smartphone to coordinate between devices. We want the ability for users to customize actions based upon what objects are detected by our model. </p>

            </div>
        </div>
        </>   
    )
}   

export default LandingPage;