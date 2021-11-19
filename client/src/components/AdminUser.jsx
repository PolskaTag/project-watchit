import React, { useLayoutEffect, useState, useEffect } from "react";
import VideoController from "./video";
import Select from 'react-select';
import axios from 'axios';
import AdminCreate from "./AdminCreate";
import AdminRead from "./AdminRead";
import AdminUpdate from "./AdminUpdate";
import AdminDelete from "./AdminDelete";
import "./style/adminPage.css"
import hamImage from "./images/hamImg.png";
import cancelButton from "./images/cancelButton.png";
import MakeUserSelection from "./MakeUserSelection";
import MakeVideoSelection from "./MakeVideoSelection";
import { Redirect} from 'react-router-dom'

const SERVER = process.env.NODE_ENV === "production" ? (process.env.REACT_APP_SERVER || "http://localhost:5000") : "http://localhost:5000";

function AdminUser() {
    
      /*set variable states*/
      const [username, setUsername] = useState(null);
      const [videos, setVideos] = useState([]);
      const [active, setIsActive] = useState("videoSearch");
      const [showCancelDiv, setShowCancelDiv] = useState(true);
      const [showHambergerDiv, setShowHamberDiv] = useState(true);
      const [showExtraSelectDiv, setEtraSelectDiv] = useState(true);
      const [showSidebarDiv, setShowSidebarDiv ] = useState(true);
      const [users, setUsers] = useState([]);

      /*check user authorization*/
      useLayoutEffect(() => {
        fetch(`${SERVER}/isUserAuth`, {
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

        // Make a request for the videos
        axios.get(`${SERVER}/videoIDs/${"test123"}`, { headers: {
          "x-access-token": localStorage.getItem("token")
      }})
        .then((res) => {
           console.log(res.data);
          const newVideos = [...res.data[0]];
          console.log(newVideos);
          setVideos(newVideos);
        })
    }, [])


    /*get all the users in the database*/
    useEffect(() =>{
      axios.get(`${SERVER}/adminread`, { headers: {
        "x-access-token": localStorage.getItem("token")
    }})
      .then((response) =>{
          const newUsers = [...response.data];
          setUsers(newUsers)
      });
  }, []);

    
    function setHamber(){
      setShowHamberDiv(true);
      setShowCancelDiv(false);
      setShowSidebarDiv(false);
      console.log("Hamber set")
    }

    function setCancel(){
      setShowHamberDiv(false);
      setShowCancelDiv(true);
      setShowSidebarDiv(true);
      console.log("Cancel set")
    }
  
     /*change the state of the videos url based on users selection*/
      const [url, setUrl] = useState("")
      const handleVideo = e =>{
        setUrl(e.value)
      }

       
      const [newUserId, setNewUserId] = useState("")
      const [newUser, setNewUser] = useState("")

      /*get the user that was selected*/
      const handleUser = e =>{
       // let result = [];
         setNewUserId(e.value) 
         let i;
         for (i = 0; i < users.length; i++){
             if(users[i]._id === e.value){
                 setNewUser(users[i].videos);
                 console.log("I AM USER I")
                 console.log(users[i])
                 
             }
         }
      }

      /*logs the user out*/
      async function logoutHandler() {
        if (localStorage.getItem("token") != null) {
            console.log("User has been successfully logged out. " + username);
            localStorage.removeItem("token")
            setUsername("");
            // await history.push("/login")
            
        }
        else {
            console.log("No user is logged in.");
        }
    }
          /*this is displays on screen, if conditions are met - buttons, user selection box and video*/
          return (
            <div className="admin-container">  
            {showCancelDiv? <img src={cancelButton} className="cancelButton" alt="cancel button" onClick={setHamber} /> : null}
            {showSidebarDiv && <div id="sidebar">
            <div id="links">
            <div id="arrow"><p>&#10095;</p></div>
                <ul>
                    <li><button onClick={() => setIsActive("videoSearch")}>Video Search</button></li>
                    <li><button onClick={() => setIsActive("create")}>Create a User</button></li>
                    <li><button onClick={() => setIsActive("read")}>Find and Delete User</button></li>
                    <li><button onClick={() => setIsActive("update")}>Update a User</button></li>       
                    <li><button onClick={() => setIsActive("logOut")}>Log Out</button></li>               
                </ul>
            </div>
            </div>}
            <div className="header">         
            <h2>WatchIt</h2>
            <p className="pheader">Admin</p>
            </div> 

            {showHambergerDiv? <img src={hamImage} className="hamImg" alt="hamberger menu" onClick={setCancel} /> : null}
            {active==="videoSearch" &&
            <><div className="input-vid-search">
                  <div className="searchDiv">
                  <label className="label-span-search">
                    <span className="span-search">Search for all Videos</span>
                  </label>
                  <div className="select">
                    <Select isSearchable placeholder="Search for all videos" onChange={handleVideo} options={MakeVideoSelection(videos)} className="innerSelect" />
                  </div>
                  </div>
                  <div className="searchDiv">
                  <label className="label-span-search  spacingMiddleSearch" >
                    <span className="span-search">Search for a User</span>
                  </label>
                  <div className="select" >
                    <Select isSearchable placeholder="Search for a User" onChange={handleUser} options={MakeUserSelection(users)} className="innerSelect" />
                  </div>
                  </div>
                  {showExtraSelectDiv?
                  <div className="searchDiv">
                  <label className="label-span-search spacingEndSearch">
                    <span className="span-search">Search for User's Videos</span>
                  </label>
                  <div className="select" >
                    <Select isSearchable placeholder="Search for User's Videos" onChange={handleVideo} options={MakeVideoSelection(newUser)} className="innerSelect" />
                  </div>
                  </div> : null}

              </div>
              <br />
              <br />
              <br />
              <div className="vid-container">
              {url ? <VideoController url={url} className="innerVid" /> : null}
              </div></>}
            {active==="create" && <AdminCreate />}
            {active==="read" && <AdminRead />}
            {active==="update" && <AdminUpdate />}   
            {active==="logOut" && logoutHandler()? <Redirect to="/"/> : null}   
            </div>
          )
    
};

export default AdminUser