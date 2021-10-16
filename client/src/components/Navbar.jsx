import { useHistory, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {

    const history = useHistory()
    const [username, setUsername] = useState(null)

    async function logout() {
        localStorage.removeItem("token")
        await history.push("/login")
    }

    useEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.userName): null)
    }, [])

    return (
        <div>
            <Link to='/home'>Home</Link>
            {username
                ? <div>
                    <Link to={"/u/" + username}>Profile</Link>
                    <div onClick={logout}>Logout</div>
                </div>
                : <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            }
        </div>
    )
}

export default Navbar;