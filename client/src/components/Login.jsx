import axios from 'axios';
import { useLayoutEffect, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "./style/login.css";
import loginImg from "./images/login.png";
import Navbar from './Navbar';
import { render } from 'react-dom';
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
            axios
        .post("http://localhost:5000/login", user)
        // .then(res => console.log(res))
        .then(data => {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", data.data.username);
            console.log(data.data.token);
            
        })
    } catch(err) {
        console.log("error");
    }

    
    if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == null) {
        alert("Error, try again");
    }
    else {
        alert("Success, welcome: " + localStorage.getItem("user"));
        window.location.replace("/profilepage");
    }
}

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
        .then(data => {
            console.log("response from isUserAuth");
            console.log(data);
            if(data.isLoggedIn){
                history.push('/ProfilePage');
            }
        }).catch(err => console.log("User not logged in, log in damnit!"))
    }, [history])

    return (
        <div className="container">
            <div className="login-container">
                <Navbar/>
                <h2>Login</h2>
                <img src={loginImg} className="login-logo" alt="login pic"/><br/>
                <form onSubmit={event => handleLogin(event)}>
                    <input required type="username" placeholder="Email"/><br/>
                    <input required type="password" placeholder="Password"/><br/>
                    <input required type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default Login;