
import React, { useState } from "react";
import VideoController from "./video";
import Select from 'react-select';
import "./style/adminPage.css"


function AdminUser() {
   
      const actions = [
        { label: "Sam", value: "https://watchit-east-bucket1.s3.amazonaws.com/output1.avi" },
        { label: "Jennifer", value:"https://media.w3.org/2010/05/bunny/trailer.mp4" },
        { label: "Magic", value: "https://media.w3.org/2010/05/bunny/movie.mp4" }
      ];
      const [url, setUrl] = useState(actions.value)
      const handleVideo = e =>{
        setUrl(e.value)
      }
          return (
            <div className="admin-container">       
              <h1>I am Admin user</h1>
              <br />
              <br/>
              <div className="input-vid-search" >
                <label className="label-span-search" >
                    <span className="span-search">Search a User Videos</span>
                </label>
        
                <div className="select">
                   <Select isSearchable  placeholder="Search for video" onChange={handleVideo} options={actions}/>
                </div>
                 
                </div>
                <br/>
                <div className="vid-con">
                {url ? <VideoController url = {url}/>: null}
                </div>
            </div>
          )
    
};

export default AdminUser