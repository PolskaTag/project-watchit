import axios from "axios";
import { text } from "body-parser";
import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOM from 'react-dom';
import { Redirect } from "react-router";
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"

const SERVER = process.env.NODE_ENV === "production" ? (process.env.REACT_APP_SERVER || "http://localhost:5000") : "http://localhost:5000";

function ProfilePage() {

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("")
  const [userUdaList, setUserUdaList] = useState([])
  const [allUserUdaList, setAllUserUdaList] = useState([])
  const [logList, setLogList] = useState("")


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

  // Create component for all udaList
  const allUserList = (
    <ul className="list-group">
      {allUserUdaList.map((userUda,index) => (
        userUda.map((uda, index) => (
          <li key={index} className="list-group-item">
          {index+1} {uda.udaName} | {uda.script} | {uda.params}{"  "}
          <button onClick={function(){deleteUda(userId, uda._id)}} className="btn btn-outline-danger btn-sm float-right">Delete</button>
          </li>
        ))
      )
      )}
    </ul>
  );

  function deleteUda(userId, udaId){
    axios.delete(`${SERVER}/uda/${userId}/${udaId}`,
    {headers: {'x-access-token': localStorage.getItem("token")}})
  }

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
      axios.post(`${SERVER}/uda/` + userId + "/add", newUda,
       {headers: {'x-access-token': localStorage.getItem("token")}})
       .then(res => console.log(res));
    } catch (err) {
      console.log(err);
    }
  }
 
  useLayoutEffect(() => {
    // Checks if the user is authenticated
    fetch(`${SERVER}/isUserAuth`, {
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
              axios.get(`${SERVER}/uda`, {headers: {"x-access-token": localStorage.getItem("token")}})
              .then(res => {
                // console.log(res);
                setAllUserUdaList(res.data);
              })
            } catch (err) {
              console.log(err);
            }

            // Get the users UDAs
            axios.get(`${SERVER}/uda/` + data.id,
              {headers: {'x-access-token': localStorage.getItem("token")}})
              .then(res => {
                // console.log(res.data);
                setUserUdaList(res.data)
              })
            
          }
        });

    }, [])

   function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }

   function handleRetrieve(e) {
     console.log(e);
  //   document.getElementById("logBox").style.visibility = "visible"
  //   document.getElementById("hideButton").style.visibility = "visible"
  //   e.preventDefault()
  //   const form = e.target;

  //   const entry = {
  //     identifier: userId
  //   }

  //   //const file = 

  //   //console.log(entry);

  //   //using userID to add to users document
  //   try {
  //       axios.post(`${SERVER}/retrieveLog`, entry)
  //           .then(res => console.log(res));
  //   } catch (err) {
  //       console.log(err);
  //   }

  //   //setTimeout(() => {  console.log("test timeout"); }, 2000);

  //   try {
  //     axios.get(`${SERVER}/retrieveLog/show`, entry)
  //         .then(res => setLogList(res.data));

  // } catch (err) {
  //     console.log(err);
  // }
}

function handleTest(e) {
  e.preventDefault()
  const form = e.target;

  const entry = {
    identifier: userId
  }

  //const file = 

  //console.log(userId);

  //console.log(entry);

  //using userID to add to users document
  try {
      axios.post(`${SERVER}/logging`, entry)
          .then(res => console.log(res));
  } catch (err) {
      console.log(err);
  }
}

const logBox = useRef(null);

//document.getElementById("hideButton").style.visibility = "hidden";
const hideBox = () => document.getElementById("logBox").style.visibility = "hidden";

  return (
    <>
    <Navbar/>
    <div className="profile-container">
        <div className="userwelcome">
        <h1 >Welcome {capitalize(username)}</h1>
        <h2>Id# {userId}</h2>
          <h1>Retrieve Logs</h1>
          <form onSubmit={event => handleRetrieve(event)}>
            <div class="form-group">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
          </form><br/>

        </div>
        <div>
            <div id="logBox" ref={logBox}>
              {logList}
            </div>
            <div id="notif">
            <button class="btn btn-primary" id = "hideButton" onClick={hideBox}> Hide Logs </button>
            </div> 
          </div>
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
    </div>
    </>
  )
}

export default ProfilePage