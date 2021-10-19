
import React, { useState } from "react";
import VideoController from "./video";
import Select from 'react-select';
import "./style/adminPage.css"


function AdminUser() {
    //code that might be needed after we axios
  /*  <Select isSearchable  placeholder="Search for video" onChange={handleVideo}>
                        {data.map(items =>(
                            <option label={items.url} value={items.username}>
                                {items.username}
                            </option>
                        )) }
                    </Select>*/
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
      let newUsers = []
      
      //const [tuser, newtuser] = useState([{}])
     // users.map((user) => (newtuser("label: " + user.username, "value: " + user.username)))
     // console.log(tuser)
       let i;
      // let count = 1;
       
       //newtuser("label " + users[0].username, "value: " + users[0].vidoeName1)
      for(i = 0; i < users.length; i++){
       // if(users[i].username!==users[i-1]){
        let foo = {}
        foo['label' ] = users[i].username
        foo['value'] = users[i].vidoeName
        //}
        newUsers.push(foo)
      }
      console.log(newUsers)
      
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
      const [url, setUrl] = useState(actions.value)
      const handleVideo = e =>{
        setUrl(e.value)
      }
          return (
            <div className="admin-container">       
              <h1>I am Admin user</h1>
              <div className="input-vid-search" >
                <label className="label-span-search" >
                    <span className="span-search">Search a User Videos</span>
                </label>
        
                <div className="select">
                   <Select isSearchable  placeholder="Search for video" onChange={handleVideo} options={actions}/>
                </div>
                <div className="select">
                   <Select isSearchable  placeholder="Search for video" onChange={handleVideo} options={newUsers}/>
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