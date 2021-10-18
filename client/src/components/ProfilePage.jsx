import axios from "axios";
import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOM from 'react-dom';
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"


function ProfilePage() {

  //const [username] = useState(null)


 
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
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
        .catch(err => alert(err))
    }, [])

  if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == null) {

    return (
      <div className="profile-container">
          <Navbar/>
          <h1>Please Log in</h1>
      </div>
    )
  } 

  else {

    const user = localStorage.getItem("user");
    // console.log("User is logged in");
    // console.log(localStorage.getItem("token"));

      return (
        <div className="profile-container">
          <Navbar/>
          <h1>Welcome {username}</h1>
        </div>
      )
  }


  /*return (
    <div className="profile-container">
        <Navbar/>
    </div>
  )*/
}


export default ProfilePage