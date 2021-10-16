import axios from 'axios';
import { useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory()

    function handleLogin(e) {
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
            localStorage.setItem("token", data.token);
            console.log(data);
        })
        } catch(err){
            console.log("Error handling login " + err);
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
        <form onSubmit={event => handleLogin(event)}>
            <input required type="username"/>
            <input required type="password"/>
            <input required type="submit" value="Submit"/>
        </form>
    )
}

export default Login;