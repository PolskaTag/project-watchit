import axios from "axios";
import { text } from "body-parser";
import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOM from 'react-dom';
import { Redirect } from "react-router";
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"


function UpdateUDA() {

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("")
  const [userUdaList, setUserUdaList] = useState([])

  // Create Component for udaList
  const udaList = (
    <ul className="list-group">
      {userUdaList.map((uda,index) => (
        <li key={index} className="list-group-item">
          {index+1} {uda.udaName} | {uda.script} | {uda.params}
        </li>
      )
      )}
    </ul>
  );

  function deleteUda(userId, udaId){
    axios.delete(`http://localhost:5000/uda/${userId}/${udaId}`,
    {headers: {'x-access-token': localStorage.getItem("token")}})
  }

  function updateUda(e) {
    e.preventDefault()
    const form = e.target;
    const updateUda = {
      udaName: form[0].value,
      script: form[1].value,
      params: form[2].value
    }

    //using userID to add to users document
    try {
      axios.post("http://localhost:5000/uda/" + userId + "/edit", updateUda,
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
            
            // get users udas
            try {
                axios.get("http://localhost:5000/uda/" + data.id,
                {headers: {'x-access-token': localStorage.getItem("token")}})
                .then(res => {
                  // console.log(res.data);
                  setUserUdaList(res.data)
                })
            } catch (err) {
              console.log(err);
            }          
            
          }
        });

    }, [])

   function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }

  return (
    <div className="profile-container">
        <Navbar/>
        <div className="userwelcome">
        <h1 >Welcome {capitalize(username)}</h1>
        <h2>Id# {userId}</h2>
        </div>
        <br/>
        {udaList ? <div style={{color: "#502b3a"},{fontSize: "1em"}}><h1 style={{textAlign: "center"}}>{capitalize(username)} UDA List</h1><br/>{udaList}</div>: null}
         <br/>
         <hr/>
        <div>
          <h1>Change UDA</h1>
          <form onSubmit={updateUda}>
            <div class="form-group">
            <input required type="text" class="form-control" id="udaName" placeholder="UDA Name"/>
            <input required type="text" class="form-control" id="Script" placeholder="Script"/>
            <input required type="text" class="form-control" id="Params" placeholder="Params"/>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
          </form>
        </div>
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
    </div>
  )
}


export default UpdateUDA