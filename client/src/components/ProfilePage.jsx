import React from "react";//useRef, , { useState } 
//import ReactDOM from 'react-dom';
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"


function ProfilePage() {

  //const [username] = useState(null)

  if (localStorage.getItem("token") === "undefined" || localStorage.getItem("token") === null) {

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
          <h1>Welcome {user}</h1>
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