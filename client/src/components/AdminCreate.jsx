import { useState } from 'react';//useLayoutEffect, 
//import "./style/register.css";
import axios from 'axios';

const SERVER = process.env.NODE_ENV === "production" ? (process.env.REACT_APP_SERVER || "http://localhost:5000") : "http://localhost:5000";

function AdminCreate() {
    //const history = useHistory()

    const [errorMessage, setErrorMessage] = useState("");

    function handleRegister(e) {
        e.preventDefault()
        // console.warn(e)

        const form = e.target
        const user = {
            username: form[0].value,
            admin: form[1].value,
            password: form[2].value,
            confirmPassword: form[3].value
        }

        console.warn(JSON.stringify(user))

        axios
        .post(`${SERVER}/adminregister`, user).then((response) => {
            console.log(response);
            setErrorMessage(response.data.message);
            console.log(errorMessage);
        })
        // fetch("http://localhost:5000/register", {
        //     method: "POST",
        //     header: {
        //         "Content-type": "applications/json"
        //     },
        //     body: user
        // })
        form.username = "";
        form.password = "";
        form.admin = "";
        form.confirmPassword = "";
    }
// <Navbar/>
//<img src={loginImg} className="register-logo" alt="login pic"/><br/>
    /*useLayoutEffect(() => {
        fetch("/isUserAuth", {
            'method': "GET",
            'headers': {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/ProfilePage"): null)
    }, [history])*/

    return (
        <div className="container">
            <div className="register-container">

               
                <h2>Account Registration</h2>
                
                <form onSubmit={event => handleRegister(event)}>
                    <input required type="username" name="username" placeholder="Username"/><br/>
                    <input required type="boolean" name="admin" placeholder="isAdmin?"/><br/>
                    <input required type="password" name="password" placeholder="Password"/><br/>
                    <input required type="password" name="confirm-password" placeholder="Confirm Password"/><br/>
                    <input required type="submit" value="Register" className="btn"/><br/>
                </form>
            </div>
        </div>
    )
}

export default AdminCreate;