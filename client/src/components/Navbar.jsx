import { useHistory, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./style/navbar.css"

function Navbar() {

    const history = useHistory()
    const [username, setUsername] = useState(null)

    async function logoutHandler() {
        if (localStorage.getItem("token") != null) {
            console.log("User has been successfully logged out.");
            localStorage.removeItem("token")
            await history.push("/login")
        }
        else {
            console.log("No user is logged in.");
        }
    }

    useEffect(() => {
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

    if (localStorage.getItem("token") != null) {
        return (
            <div>
                <ul>
                    <li className="navItem"><Link to="/login">Login</Link></li>
                    <li className="navItem" onClick={logoutHandler}>LogoutHandler</li>
                    <li className="navItem"><Link to="/register">Register</Link></li>
                    <li className="navItem"><Link to="/ProfilePage">ProfilePage</Link></li>
                </ul>
            </div>
        )
    }
    else {
        return (
            <div>
                <ul>
                    <li className="navItem"><Link to="/login">Login</Link></li>
                    <li className="navItem"><Link to="/register">Register</Link></li>
                    <li className="navItem"><Link to="/ProfilePage">ProfilePage</Link></li>
                </ul>
            </div>
        )
    }

}

export default Navbar;