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

    async function handleLogin(e) {
        e.preventDefault()
        // console.log("submit clicked");
        // console.log(e);
        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        try {
            await axios
        .post("http://localhost:5000/login", user)
        .then(data => {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", data.data.username);
            //localStorage.setItem("adminStatus", data.data.admin);
            setErrorMessage(data.data.message);
            // console.log("handleLogin complete");
            // console.log(data.data.token);
            
        })
    } catch(err) {
        setErrorMessage(err);
    }

    
    // if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == null) {
    //     // alert("Error, try again");
    //     console.log("Error logging in");
    // }
    // else {
    //     // alert("Success, welcome: " + localStorage.getItem("user"));
    //     window.location.replace("/profilepage");
    // }
}
//{errorMessage === "Success" ? <Redirect to="/ProfilePage"/>: console.log("Validation Error")}

/* if(errorMessage === "Success" && checkAdmin=== true){
                <Redirect to= "/admin/user"/>
             }
             else if(errorMessage === "Success" && checkAdmin=== false){
                <Redirect to="/ProfilePage"/>
             }
             else{
                console.log("Validation Error")
              //  alert("Please check your credentials!!!")
             }
            */
    useLayoutEffect(() => {
        console.log(":::::::::::::::useLayoutEffect::::::::::::::")
        fetch("http://localhost:5000/isUserAuth", {
            'method': "GET",
            'headers': {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => {
             console.log(res);
             console.log(res.json)
             return res.json();
        })
        .then(data => {
            setCheckAdmin(data.admin)
            // console.log("response from isUserAuth");
             console.log(data);
            if(data.isLoggedIn && data.admin){
                history.push('/admin/user')
                
                // console.log(history);
            }
            else if(data.isLoggedIn && !data.admin){
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
            {errorMessage === "Success" ? <Redirect to="/ProfilePage"/>: console.log("Validation Error")}
            
        </div>
    )
}

export default Login;