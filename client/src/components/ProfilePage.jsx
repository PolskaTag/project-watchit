import React, { useState } from "react";//useRef, 
//import ReactDOM from 'react-dom';
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"


function ProfilePage() {

  const [username] = useState(null)

  if (localStorage.getItem("token") != null) {
    const user = localStorage.getItem("user");
    console.log("User is logged in " + username);
    console.log(localStorage.getItem("token"));

      return (
        <div>
          <Navbar/>
          <h1>Welcome {user}</h1>
        </div>
      )
  } 

  else {
      return (
        <div className="profile-container">
            <Navbar/>
        <h1>Please Log in</h1>
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