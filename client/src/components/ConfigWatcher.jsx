import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./style/configWatcher.css"
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import Navbar from './Navbar.jsx'
import axios from 'axios'

function ConfigWatcher() {

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState(null)
    const [userId, setUserId] = useState(null)

    const { TabPane } = Tabs;

    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);
    const [checkedThree, setCheckedThree] = React.useState(false);
    const [checkedFour, setCheckedFour] = React.useState(false);

    const handleChangeOne = () => {
        setCheckedOne(!checkedOne);
    }

    const handleChangeTwo = () => {
        setCheckedTwo(!checkedTwo);
    }

    const handleChangeThree = () => {
        setCheckedThree(!checkedThree);
    }

    const handleChangeFour = () => {
        setCheckedFour(!checkedFour);
    }

    function handleNotification(e) {
        e.preventDefault()
        // console.warn(e)
        const form = e.target
        console.log(form);
        const watcherInfo = {
            watcherName: form[0].value,
            email: form[1].value
        }

        console.warn(JSON.stringify(watcherInfo))

        axios
        .post("http://localhost:5000/notification", watcherInfo).then((response) => {
            console.log(response);
            setErrorMessage(response.data.message);
        })
    }

    function handleFormNotification(e) {
        e.preventDefault()
        const form = e.target;
        
        const newUda = {
            udaName: form[0].value,
            script: "http://localhost:5000/notification",
            params: form[1].value
        }

        const email = {
            watcherName: form[0].value,
            email: form[1].value
        }

        console.log(email);

        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/uda/" + userId + "/add", newUda,
                { headers: { 'x-access-token': localStorage.getItem("token") } })
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }

        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/notification", email)
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }
    }

    function handleFormLog(e) {
        e.preventDefault()
        const form = e.target;
        
        const newUda = {
            udaName: form[0].value,
            script: "http://localhost:5000/logging",
            params: form[1].value
        }

        const entry = {
            watcherName: form[0].value,
            statement: form[1].value
        }

        const file = 

        console.log(entry);

        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/uda/" + userId + "/add", newUda,
                { headers: { 'x-access-token': localStorage.getItem("token") } })
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }

        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/logging", entry)
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }

        /*
        try {
            axios.post("http://localhost:5000/files", file)
                .then(res => console.log(res));
                console.log(file);
        } catch (err) {
            console.log(err);
        }
        */
    }

    function handleTestNotification(e) {
        e.preventDefault()

        console.log(e);
        const form = e.target;
        

        const email = {
            watcherName: form[0].value,
            email: form[1].value
        }

        console.log(email);
        
        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/notification", email)
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }
    }

    function handleTestLog(e) {
        e.preventDefault()

        console.log(e);
        const form = e.target;
        

        const entry = {
            watcherName: form[0].value,
            statement: form[1].value
        }

        console.log(entry);
        
        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/logging", entry)
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }
    }

    function handleFormSnapshot(e) {
        e.preventDefault()
        const form = e.target;
        
        const newUda = {
            udaName: form[0].value,
            script: "http://localhost:5000/snapshot",
            params: form[1].value
        }

        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/uda/" + userId + "/add", newUda,
                { headers: { 'x-access-token': localStorage.getItem("token") } })
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }
    }

    function handleFormSound(e) {
        e.preventDefault()
        const form = e.target;
        
        const newUda = {
            udaName: form[0].value,
            script: "http://localhost:5000/sound",
            params: form[1].value
        }

        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/uda/" + userId + "/add", newUda,
                { headers: { 'x-access-token': localStorage.getItem("token") } })
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }
    }

    function handleFormLights(e) {
        e.preventDefault()
        const form = e.target;
        
        const newUda = {
            udaName: form[0].value,
            script: "http://localhost:5000/lights",
            params: form[1].value
        }

        //using userID to add to users document
        try {
            axios.post("http://localhost:5000/uda/" + userId + "/add", newUda,
                { headers: { 'x-access-token': localStorage.getItem("token") } })
                .then(res => console.log(res));
        } catch (err) {
            console.log(err);
        }
    }

    useLayoutEffect(() => {
        // Checks if the user is authenticated
        fetch("http://localhost:5000/isUserAuth", {
          'method': "GET",
          'headers': {
          "x-access-token": localStorage.getItem("token")
            }
          })
          .then(res => res.json())
            .then(data => {
              if(data.isLoggedIn){
                setUsername(data.username);
                setUserId(data.id);
              }
            });
    
        }, [])

        

    return (
        <div className="Watcher-Container">
            <Navbar/>
            <h2>Configure Watcher: watcherName</h2>

            <h2>Select Watcher Target</h2><br />

            <div className="WatcherInfo">
                        <select name="watcherTarget" id="watcherTarget" disabled>
                            <option value="Select">Select...</option>
                        </select><br /><br />
            </div>
            <div className="UDAInfo">
                <h2>Select User Defined Actions</h2>

                <div className="item">
                    <input type="checkbox"
                        id="checkbox"
                        label="Value 1"
                        value={checkedOne}
                        checked={checkedOne}
                        onChange={handleChangeOne}
                        disabled="disabled"
                        checked
                    />
                    <label htmlFor="checkbox">Notifcations</label>
                </div>
                <div className="item">
                    <input type="checkbox"
                        label="Value 2"
                        value={checkedTwo}
                        checked={checkedTwo}
                        onChange={handleChangeTwo}
                        disabled="disabled"
                    />
                    <label htmlFor="checkbox">Snapshot</label>
                </div>
                <div className="item">
                    <input type="checkbox"
                        label="Value 3"
                        value="{checkedThree}"
                        checked={checkedThree}
                        onChange={handleChangeThree}
                        disabled="disabled"
                    />
                    <label htmlFor="checkbox">Sound</label>
                </div>
                <div className="item">
                    <input type="checkbox"
                        label="Value 4"
                        value={checkedFour}
                        checked={checkedFour}
                        onChange={handleChangeFour}
                        disabled="disabled"
                    />
                    <label htmlFor="checkbox">Lights</label>
                </div>

            </div><br />

            <div id="tabs">

            </div>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Notifications" key="1" id="tab1">
                    <form onSubmit={event => handleFormNotification(event)}>
                        <label htmlFor="watchername">Watcher Name: </label>
                        <input type="text" id="watchername" name="watchername"></input><br /><br />
                        <label htmlFor="email">Email: </label>
                        <input type="text" id="email" name="email"></input><br /><br />
                        <input type="submit" value="Submit"></input><br/><br/>
                    </form>
                    </TabPane>
                    <TabPane tab="Snapshots" disabled key="2">
                    <form onSubmit={event => handleFormSnapshot(event)}>
                        <label htmlFor="watchername">Watcher Name: </label>
                        <label htmlFor="email">Email: </label>
                        <input type="text" id="email" name="email"></input><br /><br />
                        <input type="submit" value="Submit"></input>
                    </form>
                    </TabPane>
                    <TabPane tab="Sound" disabled key="3">
                    <form onSubmit={event => handleFormSound(event)}>
                        <label htmlFor="watchername">Watcher Name: </label>
                        <label htmlFor="sounds">Choose a sound: </label>
                        <select name="sounds" id="sounds">
                            <option value="Chime">Chime</option>
                            <option value="Alarm">Alarm</option>
                            <option value="Bark">Bark</option>
                            <option value="Custom">Custom</option>
                        </select><br /><br />
                        <input type="submit" value="Submit"></input>
                    </form>
                    </TabPane>
                    <TabPane tab="Lights" disabled key="4">
                    <form onSubmit={event => handleFormLights(event)}>
                        <label htmlFor="watchername">Watcher Name: </label>
                        <label htmlFor="seconds">Seconds: </label>
                        <input type="text" id="seconds" name="seconds"></input><br /><br />
                        <input type="submit" value="Submit"></input>
                    </form>
                    </TabPane>
                    <TabPane tab="Log" key="5">
                    <form onSubmit={event => handleFormLog(event)}>
                        <label htmlFor="watchername">Watcher Name: </label>
                        <input type="text" id="watchername" name="watchername"></input><br /><br />
                        <label htmlFor="statement">Custom Statement: </label>
                        <input type="text" id="statement" name="statement"></input><br /><br />
                        <p>*Note: if statement is left blank, a default statement will be used</p>
                        <input type="submit" value="Submit"></input>
                    </form>
                    </TabPane>
                </Tabs><br /><br />
                {!localStorage.getItem("token") ? <Redirect to="/login"></Redirect>: null}
        </div>
    )
}

export default ConfigWatcher;