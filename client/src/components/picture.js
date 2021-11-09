import { Carousel } from 'react-carousel-minimal';
import React, { useLayoutEffect, useState, useEffect } from "react";
import "./style/picture.css";
import Navbar from './Navbar.jsx';
import axios from "axios";
import cat from './images/cat1.jpg';
function Pictures() {

    const [username, setUsername] = useState(null);

    /*check user authorization*/
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
    }, [])

   
    /*axios.post("http://localhost:5000/api/images", {
           
        }).then((response) =>{
            console.log(response);
        }).catch(e => {
            console.log(e);
        });*/

 const data = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
      caption: "San Francisco"
    }
   
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
   
  return (
    <div className="mainDiv">
        <Navbar/><br/>
      <div style={{ textAlign: "center" }}>
        <h2>User Name Comes here</h2>
        <p>A list of User pictures.</p>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={data}
            time={2000}
            slide={true}
            width="850px"
            height="400px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={false}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="none"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
              
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Pictures;