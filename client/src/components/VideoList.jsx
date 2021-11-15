import axios from "axios";
import React, { useRef, useState, useLayoutEffect } from "react";
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import "./style/videolist.css"
import VideoController from "./video";

//predefined array with URLs for testing purposes
// const recording = [
//         {
//             id: 1,
//             name: '10142021',
//             timestamp:'9am',
//             URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
//         },
//         {
//             id: 2,
//             name: '12252021',
//             timestamp:'10pm',
//             URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
//         },
//         {
//             id: 22,
//             name: '122sdf52021',
//             timestamp:'10pm',
//             URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
//         },
//         {
//             id: 23,
//             name: '122asdf52021',
//             timestamp:'10pm',
//             URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
//         },
//         {
//             id: 24,
//             name: '1225asdf2021',
//             timestamp:'10pm',
//             URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
//         }
//     ]


function VideoList() {

  const [username, setUsername] = useState(null);
  const [videos, setVideos] = useState([]);
  const [newUrl, setNewUrl] = useState(null);
  const [anyVideo, setAnyVideo] = useState(true);
  const [userID, setUserID] = useState(null);


  //function to play user video
  const play = (url) =>{
    setNewUrl(url);
  }

  //function to delete user video
  const deleteItem = (vidID, userID) =>{
    console.log(vidID)
  if(window.confirm("Are you sure you want to delete this video?")){
    axios.post("http://localhost:5000/deletevideo", {
        userid: userID,
        videoid : vidID,
        
    }).then((response) =>{
        console.log(response);
    }).catch(e => {
        console.log(e);
    });
     // console.log(vidID);
    }
    
  };
  
  
  //uses map to change the array so that it displays into a unordered table for viewing
	const recordingList = (
        <ul className="video-list">
            {videos.map((recording, index) => (
              
              <div className="newDiv" >
                
                <li key={index+recording.name}> 
             
                   <a style={{listStyleType: "none"}} onClick={()=>play(recording.url)} href="#">
                     <div className="list" style={{marginBottom: ".2em"}} >
                        Video {recording.name}  {recording.time} 
                      </div>
                    </a>
                    <button className="listButton" onClick={()=>{deleteItem(recording.videoID, userID)}}>Delete</button>     
                </li>
                </div>
            ))}
        </ul>
    )//recording.url

   

  useLayoutEffect(() => {
    // Check if the user is authenticated
    fetch("http://localhost:5000/isUserAuth", {
      'method': "GET",
      'headers': {
          "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {

      // If the users token was authenticated, load the goodies.
      if (data.isLoggedIn) {
        setUsername(data.username);
        
           setUserID(data.id)
        // Make a request for the videos
        axios.get("http://localhost:5000/videos", {headers: {"x-access-token": localStorage.getItem("token")}})
          .then((res) => {
            
            //console.log(res.data)
            if(res.data!==0){
              const newVideos = [...res.data[0]];
              console.log(newVideos);
              setVideos(newVideos);
            }
            else{
              setAnyVideo(false)
            }
        })
      }
    })
    .catch(err => alert(err))
}, [])
    
    return (
      <div className="video-page">
       <h5>< Navbar/> </h5><br></br>
        <h1 style={{textAlign:"center"}}>All Video Recordings</h1>
        
      <div className="urlList" >
        {videos ? <div>{recordingList}</div>: null}
      </div> 
      <div className="tv" style={{width: "50em"}}></div>
      <div className="vidDiv">
        {!anyVideo? <h4>This user has no video</h4>: null}
        {newUrl? <VideoController url={newUrl} className="vid" /> : null}
      </div> 
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
       </div>
    )
}


export default VideoList