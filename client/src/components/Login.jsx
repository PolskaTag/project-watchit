import axios from 'axios';
import { useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./style/login.css";
import loginImg from "./images/login2.png";
import Navbar from './Navbar';
//import axios from 'axios'

function Login() {
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

    try {
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user),
        })
        const data = await res.json()
        console.log(data);
        console.log(res);
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", data.username)
        console.log("token: " + localStorage.getItem("token"));
    } catch(err) {
        console.log("error");
    }
}

    useLayoutEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("response from isUserAuth");
            console.log(res);
            res.json();
        })
        .then(data => data.isLoggedIn ? history.push("/home"): null)
        .catch(err => console.log("User not logged in, log in damnit!"))
    }, [history])

    return (
        <div className="container">
            <div className="login-container">
                <Navbar/>
                <h2>Login</h2>
                <img src={loginImg} className="register-logo" alt="login pic"/><br/>
                <form onSubmit={event => handleLogin(event)}>
                    <input required type="username"/><br/>
                    <input required type="password"/><br/>
                    <input required type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default Login;