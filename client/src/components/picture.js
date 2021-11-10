import { Carousel } from 'react-carousel-minimal';
import React, { useLayoutEffect, useState, useEffect } from "react";
import "./style/picture.css";
import Navbar from './Navbar.jsx';
import axios from "axios";
//import cat from './images/cat1.jpg';
import { Redirect } from 'react-router-dom';

function Pictures() {
  
    const [username, setUsername] = useState(null);
    const [filename, setFilename] = useState(null);
    const [pictures, setPictures] = useState([]);
    const [newData, setNewData] = useState([]);

    /*check user authorization*/
    /*useLayoutEffect(() => {
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
    }, [])*/


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
          axios.get('http://localhost:5000/pictures', {headers: {"x-access-token": localStorage.getItem("token")}})
            .then((res) => {
              const newPictures = [...res.data];
              console.log(newPictures);
              setPictures(newPictures);
              let data = [];
              let i;
              let j;
              for(i = 0; i < newPictures.length; i++){
                for(j = 0; j < newPictures[i].length; j++){
                  console.log(newPictures[1][0].url);
                  let user = {};
                  user['url' ] = newPictures[i][j].url;
                  user['caption'] = newPictures[i][j].name;
                  data.push(user);
                }

                
              }
              setNewData(data);
          })
        }
      })
      .catch(err => alert(err))
  }, [])
   // useLayoutEffect(() => {
   /* axios.post("http://localhost:5000/api/images",formData, config ).then((response) =>{
            console.log(response);
        }).catch(e => {
            console.log(e);
        });*/
   //  }, [])
   /*useLayoutEffect(() => {
    let formData = new FormData();    //formdata object

    formData.append('file', cat); 
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }
   axios.post("http://localhost:5000/api/images", formData, config)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
  }, [])*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', filename);
    //formData.append('birthdate', newUser.birthdate);
    //formData.append('name', newUser.name);

    axios.post('http://localhost:5000/api/images', formData)
         .then(res => {
            console.log(res);
         })
         .catch(err => {
            console.log(err);
         });
}

  const onChangeFile = (e) => {
    setFilename(e.target.files[0]);
  }

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
        <h2>{username}</h2>
        <p>A list of User pictures.</p>

        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={onChangeFile}
            />
             <input 
                type="submit"
            />
        </form>
        <div style={{
          padding: "0 20px"
        }}>{newData?
         
          <Carousel
            data={newData}
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
          />: null}
          {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
        </div>
      </div>
    </div>
  );
}

export default Pictures;