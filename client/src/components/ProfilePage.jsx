import axios from "axios";
import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOM from 'react-dom';
import { Redirect } from "react-router";
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"


function ProfilePage() {

  const [username, setUsername] = useState(null)
  const [userId, setUserId] = useState(null)

  function addUda(e) {
    e.preventDefault()
    const form = e.target;
    const newUda = {
      udaName: form[0].value,
      script: form[1].value,
      params: form[2].value
    }

    //using userID to add to users document
    try {
      axios.post("http://localhost:5000/uda/" + userId + "/add", newUda,
       {headers: {'x-access-token': localStorage.getItem("token")}})
       .then(res => console.log(res));
    } catch (err) {
      console.log(err);
    }
  }


 
  useLayoutEffect(() => {
    // Checks if the user is authenticated
    fetch("http://localhost:5000/isUserAuth", {
      'method': "GET",
      'headers': {
      "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
        .then(data => {
          if(data.isLoggedIn){
            setUsername(data.username);
            setUserId(data.id);
          }
        });
        

    try {
       axios.get("http://localhost:5000/uda", {headers: {"x-access-token": localStorage.getItem("token")}})
      .then(res => {
        console.log(res);
      })
    } catch (err) {
      console.log(err);
    }

    }, [])


  return (
    <div className="profile-container">
        <Navbar/>
        <h1>Welcome {username}</h1>
        <form onSubmit={addUda}>
          <input required type="text" placeholder="UDA Name"></input>
          <input required type="text" placeholder="Script"/>
          <input required type="text" placeholder="Params"/>
          <input required type="submit" value="Add UDA"/>
        </form>
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
    </div>
  )
}


export default ProfilePage