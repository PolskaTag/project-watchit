import { useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import watchItLogo from "./images/WatchIT-logos_black_land.png";
import "./style/landingPage.css";
import Navbar from './Navbar.jsx'

function LandingPage() {

    console.log(Date());
    console.log("token: " + localStorage.getItem("token"))

    return (
        <div className="container">
            <div className="landing-container">
                <Navbar/>
            </div>
            <div className="landing-image">
                <img src={watchItLogo} className="landing-logo" alt="logo"/><br/>
            </div>
        </div>   
    )
}   

export default LandingPage;