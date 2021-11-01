import axios from "axios";
import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOM from 'react-dom';
import { Redirect } from "react-router";
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"

function editUDA() {

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("")
  const [userUdaList, setUserUdaList] = useState([])
  const [allUserUdaList, setAllUserUdaList] = useState([])

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
            
            // get all users udas
            try {
              axios.get("http://localhost:5000/uda", {headers: {"x-access-token": localStorage.getItem("token")}})
              .then(res => {
                // console.log(res);
                setAllUserUdaList(res.data);
              })
            } catch (err) {
              console.log(err);
            }

            // Get the users UDAs
            axios.get("http://localhost:5000/uda/" + data.id,
              {headers: {'x-access-token': localStorage.getItem("token")}})
              .then(res => {
                console.log(res.data);
                setUserUdaList(res.data)
              })
            
          }
        });

    }, [])


  return (
    <div className="profile-container">
        <Navbar/>
        <h1>Welcome {username} {userId}</h1>
        <br/>
        <div>
          <h1>Edit UDA</h1>
          <form onSubmit={addUda}>
            <div class="form-group">
            <input required type="text" class="form-control" id="udaName" placeholder="UDA Name" value={uda.udaName}/>
            <input required type="text" class="form-control" id="Script" placeholder="Script" value={uda.script} />
            <input required type="text" class="form-control" id="Params" placeholder="Params" value={uda.params} />
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
          </form>
        </div>
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
    </div>
  )
}


export default editUDA