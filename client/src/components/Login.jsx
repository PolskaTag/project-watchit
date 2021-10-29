import axios from 'axios';
import { useLayoutEffect,useState } from 'react'// useEffect, 
import { Redirect, useHistory } from 'react-router-dom'//Link, 
import "./style/login.css";
import loginImg from "./images/login.png";
import Navbar from './Navbar';
//import { render } from 'react-dom';

function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory()
    const [checkAdmin, setCheckAdmin] = useState(false);

    // onSubmit function that handles login.
    async function handleLogin(e) {
        e.preventDefault()
        const form = e.target;
        // user information to pass into login api.
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        // Call our login API, returns token if verified.
        try {
            await axios
        .post("http://localhost:5000/login", user)
        .then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.username);
            setCheckAdmin(res.data.admin);
            setErrorMessage(res.data.message); 
            console.log("check admin");
            console.log(res.data.admin);
            console.log(res.data);
        })
    } catch(err) {
        setErrorMessage(err);
    }
}
//{errorMessage === "Success" ? <Redirect to="/ProfilePage"/>: console.log("Validation Error")}


    
    useLayoutEffect(() => {
        fetch("http://localhost:5000/isUserAuth", {
            'method': "GET",
            'headers': {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => {
             return res.json();
        })
        .then(data => {
            
            if(data.isLoggedIn && data.admin){
                history.push('/admin/user'); 
            }
            else if(data.isLoggedIn){
                history.push('/');
            }
        }).catch(err => setErrorMessage(err));
    }, [history])

    return (
        <div className="container">
            <div className="login-container">
                <Navbar/>
                <h2>Login</h2>
                <img src={loginImg} className="login-logo" alt="login pic"/><br/>
                <form onSubmit={(e) => handleLogin(e)}>
                    <input required type="username" placeholder="Email"/><br/>
                    <input required type="password" placeholder="Password"/><br/>
                    <input required type="submit" value="Submit"/>
                </form>
            </div>
            {console.log("print meeeeeeeeeeeeeeee")}
            {console.log(checkAdmin)}
            {errorMessage === "Success" && checkAdmin?<Redirect to="/admin/user"/>: console.log("Validation Error")}
            {errorMessage === "Success" && !checkAdmin?<Redirect to="/ProfilePage"/>: console.log("Validation Error")}
            
        </div>
    )
}

export default Login;