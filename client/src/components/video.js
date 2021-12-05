import React from 'react';
import ReactPlayer from 'react-player/lazy';
import "./style/adminPage.css"

 const VideoController =({url}) =>{
    
        return (  
          <div className="vid-controller">
            <ReactPlayer url={url}
            controls={true} width="100%" 
            />  
          </div>     
        );
}
 
export default VideoController