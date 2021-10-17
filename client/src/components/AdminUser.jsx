//import Login from './Login.jsx';
import React, { useState } from "react";
//import { useState } from "react"
import "./style/adminPage.css"

function AdminUser() {
    const [searchUser, setData] = useState(null)
    /*const [username] = useState(null)
    if (localStorage.getItem("token") != null) {
        const user = localStorage.getItem("user");
        console.log("User is logged in " + username);
        console.log(localStorage.getItem("token"));*/
      //  <h1>Welcome, my name is {user}</h1>

      function getSearch(event){
          setData(event.target.value)
      }
      function loadSearch(searchUser){
        alert(searchUser)
      }
          return (
            <div className="admin-container">       
              <h1>I am Admin user</h1>
              <div className="vid-btn">
                <button>Load all videos</button>   
              </div>
              <br />
              <div className="input-vid-search" >
              <label className="label-span-search" >
                <span className="span-search">Search a User Videos</span>
             </label>
                <input type="text" onChange={getSearch}/>
                <button onClick={()=>loadSearch(searchUser)}>Load videos</button></div> 
            </div>
          )
     // } 
     /* else {
        return (
          //<div className="admin-container">
              <Login/>
        //  </div>
        )
    }*/
};

export default AdminUser