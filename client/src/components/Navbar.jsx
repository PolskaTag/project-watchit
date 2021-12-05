import { useHistory, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./style/navbar.css"

const SERVER = process.env.NODE_ENV === "production" ? (process.env.REACT_APP_SERVER || "http://localhost:5000") : "http://localhost:5000";

function Navbar() {

    const history = useHistory()
    const [username, setUsername] = useState(null)

    async function logoutHandler() {
        if (localStorage.getItem("token") != null) {
            console.log("User has been successfully logged out. " + username);
            localStorage.removeItem("token")
            setUsername("");
            // await history.push("/login")
        }
        else {
            console.log("No user is logged in.");
        }
    }



    useEffect(() => {
        // Check if user is authenticated
        fetch(`${SERVER}/isUserAuth`, {
            'headers': {
                'method': "GET",
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res =>  {
                return res.json();
            })
            .then(data => data.isLoggedIn ? console.log(setUsername(data.userName)) : null)
    }, [])

    return (
            <div className="topnav" id="myTopnav">
                    <a  ><Link to="/">Home</Link></a>
                    {!localStorage.getItem("token") ?
                    <a ><Link to="/login">Login</Link></a>
                    :
                    <a  ><Link onClick={logoutHandler} to="/login">Logout</Link></a>}
                     {!localStorage.getItem("token") ?
                     <a  ><Link to="/register">Register</Link></a> : null}
                    <a ><Link to="/ProfilePage">ProfilePage</Link></a>
                    <a ><Link to="/VideoList">VideoList</Link></a>
                    <a ><Link to="/Pictures">Pictures</Link></a>
                    <a ><Link to="/watcherConfigurator">Configure Watcher</Link></a>    
            </div>
    )
}

export default Navbar;