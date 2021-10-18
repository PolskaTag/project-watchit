import React from 'react';
import ReactPlayer from 'react-player';


 const VideoController =({url}) =>{
    
        return (  
          <div className="vid-controller">
            <ReactPlayer url={url}
            controls={true}
            />  
          </div>     
        );
}

 
export default VideoController