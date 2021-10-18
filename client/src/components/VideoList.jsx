import React, { useRef, useState } from "react";
import ReactDOM from 'react-dom';
import Navbar from './Navbar.jsx'
import "./style/videolist.css"

//predefined array with URLs for testing purposes
const recording = [
        {
            id: 1,
            name: '10142021',
            timestamp:'9am',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
        {
            id: 2,
            name: '12252021',
            timestamp:'10pm',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
        {
            id: 22,
            name: '122sdf52021',
            timestamp:'10pm',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
        {
            id: 23,
            name: '122asdf52021',
            timestamp:'10pm',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
        {
            id: 24,
            name: '1225asdf2021',
            timestamp:'10pm',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        }
    ]
	
    //uses map to change the array so that it displays into a unordered table for viewing
	const recordingList = (
        <ul class="video-list">
            {recording.map(recording => (
                <li key={recording.id}>
                    Video <a href={recording.URL}>{recording.name}</a>  {recording.timestamp}
                </li>
            ))}
        </ul>
    )


function VideoList() {

  const [username, setUsername] = useState(null)

  if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == null) {

    return (
      <div className="profile-container">
          <Navbar/>
          <h1>Please Log in</h1>
      </div>
    )
  } 

  else {

    const user = localStorage.getItem("user");
    // console.log("User is logged in");
    // console.log(localStorage.getItem("token"));

      return (
        <div className="video-page">
          <Navbar/> <br></br>
          <h1>{user}'s Video Recordings</h1>
          <div>{recordingList}</div>
        </div>
        
      )
  }


  return (
    <div className="profile-container">
        <Navbar/>
    </div>
  )
}


export default VideoList