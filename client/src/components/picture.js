import { Carousel } from 'react-carousel-minimal';
import React, { useLayoutEffect, useState, useEffect } from "react";
import "./style/picture.css";
import Navbar from './Navbar.jsx';
import axios from "axios";
//import cat from './images/cat1.jpg';
import { Redirect } from 'react-router-dom';
import getData from './GetData';
import {Card, InputGroup, FormControl, Form} from 'react-bootstrap';
import Select from 'react-select';
import Item from 'antd/lib/list/Item';

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


    useEffect(() => {
      //const ac = new AbortController();
     // let mounted = true;
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
        //  if (mounted) {
          setUsername(data.username);
         // }
          // Make a request for the videos
          axios.get('http://localhost:5000/pictures', {headers: {"x-access-token": localStorage.getItem("token")}})
            .then((res) => {
              //if (mounted) {
              const newPictures = [...res.data];
             // f = newPictures[0][0].url;
              //console.log(f)
              console.log(newPictures);
              setPictures(newPictures);
             // console.log(pictures)
             // }
          })
        }
      })
      .catch(err => alert(err))
      //return () => ac.abort(); // Abort both fetches on unmount
    //  return () => { mounted = false };
  }, [])


  
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
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
      caption: "San Francisco"
    },
    {
      image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
      caption: "Scotland"
    },
    {
      image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
      caption: "Darjeeling"
    },
    {
      image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
      caption: "San Francisco"
    },
    {
      image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
      caption: "Scotland"
    },
    {
      image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
      caption: "Darjeeling"
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
   
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
 }
  return (
    <div className="mainDiv">
        <Navbar/><br/>
        
      <div style={{ textAlign: "center" }}>
        <h2>{username? capitalize(username): null}</h2>
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
        }}>{()=>getData(pictures)?
         
          <Carousel
            data={()=>getData(pictures)}
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