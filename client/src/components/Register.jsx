import { useHistory } from 'react-router'
import { useLayoutEffect } from 'react'
import loginImg from "./images/login2.png";
import "./style/register.css";
import Navbar from './Navbar';
import axios from 'axios'

function Register() {
    const history = useHistory()

    function handleRegister(e) {
        e.preventDefault()
        console.warn(e)

        const form = e.target
        const user = {
            username: form[0].value,
            password: form[1].value,
            confirmPassword: form[2].value
        }

        console.warn(JSON.stringify(user))

        axios
        .post("http://localhost:5000/register", user).then((response) => {
            console.log(response);
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
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/dashboard"): null)
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
                    <input required type="submit" value="Register" className="btn"/><br/>
                </form>
            </div>
        </div>
    )
}

export default Register;