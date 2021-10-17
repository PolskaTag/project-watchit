import { useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import watchItLogo from "./images/WatchIT-logos_black_land.png";
import "./style/landingPage.css";

function LandingPage() {

 const [username, setUsername] = useState(null)

    useLayoutEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            'method': "GET",
            'headers': {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
        .catch(err => alert(err))
    }, [])

    return (
        <div>
            <Navbar/>

            <div className="base-container">
                <img src={watchItLogo} className="landing-logo" alt="logo"/><br/>
                <h1>WELCOME {username}</h1>
            </div>

        </div>   
    )
}   

export default LandingPage