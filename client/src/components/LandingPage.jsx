import { useLayoutEffect, useState } from 'react'
//import { useHistory } from 'react-router-dom'
import Navbar from './Navbar.jsx'
//import { Link } from 'react-router-dom'
import watchItLogo from "./images/WatchIT-logos_black_land.png";
import "./style/landingPage.css";


function LandingPage() {

 const [username, setUsername] = useState(null)

    useLayoutEffect(() => {
        // Check if the user is authenticated
        fetch("http://localhost:5000/isUserAuth", {
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