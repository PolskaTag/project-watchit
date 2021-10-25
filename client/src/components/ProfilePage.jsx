import axios from "axios";
import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOM from 'react-dom';
import { Redirect } from "react-router";
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"


function ProfilePage() {

  const [username, setUsername] = useState(null)


 
  useLayoutEffect(() => {
    // Checks if the user is authenticated
    fetch("http://localhost:5000/isUserAuth", {
      'method': "GET",
      'headers': {
      "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
        .catch(err => alert(err))
    }, [])


  /*return (
    <div className="profile-container">
        <Navbar/>
        <h1>Welcome {username}</h1>
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
    </div>
  )*/
}


export default ProfilePage