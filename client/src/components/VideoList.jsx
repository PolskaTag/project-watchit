import axios from "axios";
import React, { useRef, useState, useLayoutEffect } from "react";
import ReactDOM from 'react-dom';
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
            {videos.map(recording => (
                <li key={recording.videoID + recording.name}>
                    Video <a href={recording.url}>{recording.name}</a>  {recording.time}
                </li>
            ))}
        </ul>
    )

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

  if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == null) {

    return (
      <div className="profile-container">
          <Navbar/>
          <h1>Please Log in</h1>
      </div>
    )
  } 

  else {

      return (
        <div className="video-page">
          <Navbar/> <br></br>
          <h1>All Video Recordings</h1>
          <div>{recordingList}</div>
        </div>
        
      )
  }
}


export default VideoList