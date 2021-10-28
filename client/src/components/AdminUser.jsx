
import React, { useLayoutEffect, useState } from "react";
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


function AdminUser() {
    //code that might be needed after we axios
  /*  <Select isSearchable  placeholder="Search for video" onChange={handleVideo}>
                        {data.map(items =>(
                            <option label={items.url} value={items.username}>
                                {items.username}
                            </option>
                        )) }
                    </Select>*/
 
      const [username, setUsername] = useState(null);
      const [videos, setVideos] = useState([]);
      const [active, setIsActive] = useState("videoSearch");
      const [showCancelDiv, setShowCancelDiv] = useState(true);
      const [showHambergerDiv, setShowHamberDiv] = useState(true);
      const [showExtraSelectDiv, setEtraSelectDiv] = useState(true);
      const [showSidebarDiv, setShowSidebarDiv ] = useState(true);
     
                    
      const users = [
        { username: "Sam", vidoeName: "https://watchit-east-bucket1.s3.amazonaws.com/output1.avi?AWSAccessKeyId=AKIAYFVHGUKZZ3RKHI6T&Expires=1634529315&Signature=ent3QtIixRHOrT6Q4QFogbpzv4I%3D" },
        { username: "Jennifer", vidoeName:"https://media.w3.org/2010/05/bunny/trailer.mp4" },
        { username: "Magic", vidoeName: "https://media.w3.org/2010/05/bunny/movie.mp4" },
        { username : "Rihanna", vidoeName: "https://www.youtube.com/watch?v=lWA2pjMjpBs"},
        { username : "Rihanna", vidoeName: "https://www.youtube.com/watch?v=rp4UwPZfRis"},
        { username : "Rihanna", vidoeName: "https://www.youtube.com/watch?v=JF8BRvqGCNs"},
        { username : "Rihanna", vidoeName: "https://www.youtube.com/watch?v=uelHwf8o7_U"},
        { username : "Chris Brown", vidoeName: "https://www.youtube.com/watch?v=z29nI8RQV0U"},
        { username : "Chris Brown", vidoeName: "https://www.youtube.com/watch?v=6CFYIOF89hc"},
        { username : "Chris Brown", vidoeName: "https://www.youtube.com/watch?v=iGs1gODLiSQ"}
      ];

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

        // Make a request for the videos
        axios.get('http://localhost:5000/videos')
        .then((res) => {
          // console.log(res.data);
          const newVideos = [...res.data[0]];
          console.log(newVideos);
          setVideos(newVideos);
        })
    }, [])

    
      /*let newUsers = []
      let i;
      for(i = 0; i < users.length; i++){
       // if(users[i].username!==users[i-1]){
        let foo = {}
        foo['label' ] = users[i].username
        foo['value'] = users[i].vidoeName
        //}
        newUsers.push(foo)
      }
      console.log(newUsers)*/

     /* let newUsers1 = []
      let j;
      for(j = 0; j < videos.length; j++){
       // if(users[i].username!==users[i-1]){
        let foo1 = {}
        foo1['label' ] = videos[j].name
        foo1['value'] = videos[j].url
        //}
        newUsers1.push(foo1)
      }
      console.log(newUsers1)*/
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

      
      const actions = [
        { label: "Sam", value: "https://watchit-east-bucket1.s3.amazonaws.com/output1.avi?AWSAccessKeyId=AKIAYFVHGUKZZ3RKHI6T&Expires=1634529315&Signature=ent3QtIixRHOrT6Q4QFogbpzv4I%3D" },
        { label: "Jennifer", value:"https://media.w3.org/2010/05/bunny/trailer.mp4" },
        { label: "Magic", value: "https://media.w3.org/2010/05/bunny/movie.mp4" },
        { label : "Rihanna", value: "https://www.youtube.com/watch?v=lWA2pjMjpBs"},
        { label : "Rihanna", value: "https://www.youtube.com/watch?v=rp4UwPZfRis"},
        //{ label : "Rihanna", value: "https://www.youtube.com/watch?v=JF8BRvqGCNs"},
       // { label : "Rihanna", value: "https://www.youtube.com/watch?v=uelHwf8o7_U"},
        //{ label : "Chris Brown", value: "https://www.youtube.com/watch?v=z29nI8RQV0U"},
       // { label : "Chris Brown", value: "https://www.youtube.com/watch?v=6CFYIOF89hc"},
       // { label : "Chris Brown", value: "https://www.youtube.com/watch?v=iGs1gODLiSQ"}
      ];
   
     
      const [url, setUrl] = useState("")
      const handleVideo = e =>{
        setUrl(e.value)
      }
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
                    <Select isSearchable placeholder="Search for a User" onChange={handleVideo} options={MakeUserSelection(users)} className="innerSelect" />
                  </div>
                  </div>
                  {showExtraSelectDiv?
                  <div className="searchDiv">
                  <label className="label-span-search spacingEndSearch">
                    <span className="span-search">Search for User's Videos</span>
                  </label>
                  <div className="select" >
                    <Select isSearchable placeholder="Search for User's Videos" onChange={handleVideo}  className="innerSelect" />
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
            {active==="delete" && <AdminDelete />}   
            </div>
          )
    
};

export default AdminUser