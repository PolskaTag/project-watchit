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


  //function to play user video
  const play = (url) =>{
    setNewUrl(url);
  }

  //function to delete user video
  const deleteItem = (vidID, userID) =>{
    console.log(userID)
    axios.delete("http://localhost:5000/deletevideo", {
        userid: "616cc860059e1d07729fa0fe",
        videoid : vidID,
        
    }).then((response) =>{
        console.log(response);
    }).catch(e => {
        console.log(e);
    });
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
                    <button className="listButton" onClick={()=>{deleteItem(recording.videoID, recording._id)}}>Delete</button>     
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
        // Make a request for the videos
        axios.get('http://localhost:5000/videos', {headers: {"x-access-token": localStorage.getItem("token")}})
          .then((res) => {
            const newVideos = [...res.data[0]];
            console.log(newVideos);
            setVideos(newVideos);
        })
      }
    })
    .catch(err => alert(err))
}, [])
    
    return (
      <div className="video-page">
        < Navbar/> <br></br>
        <h1 style={{textAlign:"center"}}>All Video Recordings</h1>
        
      <div className="urlList" >
        {videos ? <div>{recordingList}</div>: null}
      </div> 
      <div className="vidDiv">
        {newUrl? <VideoController url={newUrl} className="vid" /> : null}
      </div> 
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
       </div>
    )
}


export default VideoList