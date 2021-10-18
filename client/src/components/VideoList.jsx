import React, { useRef, useState } from "react";
import ReactDOM from 'react-dom';
import Navbar from './Navbar.jsx'
import "./style/videolist.css"


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
    ]
	
	const recordingList = (
        <ul class="video-list">
            {recording.map(recording => (
                <li key={recording.id}>
                    <a href={recording.URL}> {recording.name}</a>
                    {recording.timestamp}
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
        <div className="profile-container">
          <Navbar/>
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