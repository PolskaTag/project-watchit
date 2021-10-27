import axios from "axios";
import React, { useRef, useState, useLayoutEffect } from "react";
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar.jsx'
import "./style/videolist.css"

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
  
  //uses map to change the array so that it displays into a unordered table for viewing
	const recordingList = (
        <ul className="video-list">
            {videos.map((recording, index) => (
                <li key={index+recording.name}>
                    Video <a href={recording.url}>{recording.name}</a>  {recording.time}
                </li>
            ))}
        </ul>
    )

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
        axios.get('http://localhost:5000/videos')
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
        <Navbar/> <br></br>
        <h1>All Video Recordings</h1>
        {videos ? <div>{recordingList}</div>: null}
        {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
      </div>
    )
}


export default VideoList