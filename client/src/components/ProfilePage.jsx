import axios from "axios";
import { text } from "body-parser";
import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOM from 'react-dom';
import { Redirect } from "react-router";
import Navbar from './Navbar.jsx'
import "./style/profilepage.css"

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:5000";

function ProfilePage() {

  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("")
  const [userUdaList, setUserUdaList] = useState([])
  const [allUserUdaList, setAllUserUdaList] = useState([])

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
    e.preventDefault()
    const form = e.target;

    const entry = {

    }

    const file = 

    console.log(entry);

    //using userID to add to users document
    try {
        axios.post(`${SERVER}/retrieveLog`, entry)
            .then(res => console.log(res));
    } catch (err) {
        console.log(err);
    }
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
         {allUserList ? <div><h1 style={{textAlign: "center"}}>All UDA List</h1><br/>{allUserList}</div>: null}
         <hr/>
        <div>
          <h1>Add a UDA</h1>
          <form onSubmit={addUda}>
            <div class="form-group">
            <input required type="text" class="form-control" id="udaName" placeholder="UDA Name"/>
            <input required type="text" class="form-control" id="Script" placeholder="Script"/>
            <input required type="text" class="form-control" id="Params" placeholder="Params"/>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
          </form><br/><br/>
          <h1>Retrieve Logs</h1>
          <form onSubmit={event => handleRetrieve(event)}>
            <div class="form-group">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
          </form>
        </div>
        {/* <form onSubmit={addUda}>
          <input required type="text" placeholder="UDA Name"></input>
          <input required type="text" placeholder="Script"/>
          <input required type="text" placeholder="Params"/>
          <input required type="submit" value="Add UDA"/>
        </form> */}
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
    </div>
  )
}


export default ProfilePage