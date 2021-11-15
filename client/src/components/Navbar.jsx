import { useHistory, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./style/navbar.css"

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
        fetch("http://localhost:5000/isUserAuth", {
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
            <div>
                <ul className="navList">
                    {!localStorage.getItem("token") ?
                    <li className="navItem"><Link to="/login">Login</Link></li>
                    :
                    <li className="navItem"><Link onClick={logoutHandler} to="/">Logout</Link></li>}
                    <li className="navItem"><Link to="/register">Register</Link></li>
                    <li className="navItem"><Link to="/ProfilePage">ProfilePage</Link></li>
                    <li className="navItem"><Link to="/VideoList">VideoList</Link></li>
                    <li className="navItem"><Link to="/Pictures">Pictures</Link></li>
                    <li className="navItem"><Link to="/ConfigWatcher">ConfigureWatcher</Link></li>
                </ul>
            </div>
    )
}

export default Navbar;