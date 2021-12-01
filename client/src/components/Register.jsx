import { useHistory } from 'react-router'
import { useLayoutEffect, useState } from 'react'
import loginImg from "./images/register.png";
import "./style/register.css";
import Navbar from './Navbar';
import axios from 'axios'
import { Redirect} from 'react-router-dom'


const SERVER = process.env.NODE_ENV === "production" ? (process.env.REACT_APP_SERVER || "http://localhost:5000") : "http://localhost:5000";

function Register() {
    const history = useHistory()

    const [errorMessage, setErrorMessage] = useState("");

    function handleRegister(e) {
        e.preventDefault()
        // console.warn(e)

        const form = e.target
        const user = {
            username: form[0].value,
            password: form[1].value,
            confirmPassword: form[2].value
        }

        console.warn(JSON.stringify(user))

        axios
        .post(`${SERVER}/register`, user).then((response) => {
            console.log(response);
            setErrorMessage(response.data.message);

            if(response.data.message === "Username has already been taken"){
                alert("Username already taken! Please choose another username...");
            }
            else if(response.data.message === '"Confirm password" does not match'){
                alert("Confirm password does not match!");
            }
            else if(response.data.message === "\"password\" length must be at least 8 characters long"){
                alert("Password length must be at least 8 characters long!");
            }
        })
        // fetch("http://localhost:5000/register", {
        //     method: "POST",
        //     header: {
        //         "Content-type": "applications/json"
        //     },
        //     body: user
        // })
    }

    useLayoutEffect(() => {
        fetch("/isUserAuth", {
            'method': "GET",
            'headers': {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/ProfilePage"): null)
    }, [history])

    return (
        <div className="container">
            <div className="register-container">

                <Navbar/>
                <h2>Account Registration</h2>
                <img src={loginImg} className="register-logo" alt="login pic"/><br/>
                <form onSubmit={event => handleRegister(event)}>
                    <input required type="username" name="username" placeholder="Username"/><br/>
                    <input required type="password" name="password" placeholder="Password"/><br/>
                    <input required type="password" name="confirm-password" placeholder="Confirm Password"/><br/>
                    <input required type="submit" value="Register"/><br/>
                </form>
            </div>
            {errorMessage === "Success"?<Redirect to="/Login"/>: console.log("Registration failed")}
        </div>
    )
}

export default Register;