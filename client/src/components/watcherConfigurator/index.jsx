import React, { Component, PropTypes, useLayoutEffect } from 'react'
import { useState, useEffect } from 'react'
import {Form, Button, Card} from 'react-bootstrap';
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'
import DeviceConfigurator from './deviceConfigurator';
import Select from 'react-select';
import ObjectConfigurator from './objectConfigurator';
import ActionConfigurator from './actionConfigurator';
import UDA from "./UDA";
import * as Formik from "formik";
import './index.css';
import Navbar from "../Navbar";
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:5000";


function WatcherConfigurator() {

    const [username, setUsername] = useState(null)
    const [userId, setUserId] = useState(null)
    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState({
        watcherName: "",
        ipAddress: "",
        object: "",
        udaList: [],
        options: {}
    })

    // Gets the array of user's watchers
    // Uses setState with the response from call.
    function getWatcherData(userId) {
        axios.get(`${SERVER}/watchers/` + userId,
        {"headers": {"x-access-token": localStorage.getItem("token")}})
        .then((res) => {
            console.log(res.data);
            setWatchers(res.data);
        })
    }

    function createWatcher(userId, watcherData){
        axios.post(`${SERVER}/watchers/` + userId,
        watcherData,
        {"headers": {"x-access-token": localStorage.getItem("token")}})
        .then((res) => console.log(res));
    }

    // Creates a select component - Lets the user select their available watchers
    const selectWatcher = (watchers) => {

        // options for our select component
        const options = watchers.map((watcher) => {
            return {value: watcher, label: watcher.watcherName}
        })

        // onChange function for when something gets selected, or created
        const _onChange = (
            newValue,
            actionMeta
        ) => {
            console.group("Input Changed");
            console.log(newValue);
            console.log(actionMeta);
            console.groupEnd();

            let watcher = newValue.value;

            // If a new option is made, create a watcher config
            // and add the value of the create as the watcherName
            if(actionMeta.action === "create-option"){

                // Add the new watcher to the list of watchers
                setWatchers((prevState) => {
                    watcher = {
                        watcherName: newValue.label,
                        ipAddress: "",
                        object: "",
                        udaList: [],
                        options: {}
                    }
                    return([...prevState, watcher])
                })

                // Finally make that new watcher the selected watcher
                setSelectedWatcher(watcher);
            } else {
                // Make the watcher the selected watcher
                setSelectedWatcher(watcher);
            }
            
            // setSelectedWatcher(e.value);
        }

        const handleInputChange = (inputValue, actionMeta) => {
            console.group("Input Changed");
            console.log(inputValue);
            console.log(actionMeta);
            console.groupEnd();
        }
        return (
            <CreatableSelect
                isClearable
                options={options}
                onChange={_onChange}
                onInputChange={handleInputChange}/>
        )
    }

    const handleSave = (e) => {
        e.preventDefault();
        console.log(e);
        // console.log(e.target[0]);
    }

    useEffect(() => {

        // Check to see if the user is auth
        axios.get(`${SERVER}/isUserAuth`,
         {"headers": {"x-access-token": localStorage.getItem("token")}})
        .then((res) => {
            if(res.data.isLoggedIn){
                console.log(`ID: ${res.data.id}`);
                setUsername(res.data.username);
                setUserId(res.data.id);
                getWatcherData(res.data.id);
                // createWatcher(res.data.id, {watcherName: "MySecondWatcher", ipAddress: "10.0.10.0"});
            }
        })
    }, [])

    return (
        <div className="container">
            <Navbar/>
            <div className="watcherConfig-content">
                <Form onSubmit={handleSave}>
                <Card className="text-center" border="dark">
                    <Card.Body>
                        <Card.Title>Watcher Configuration</Card.Title>
                        <Card.Text>
                            Configure your watcher profile, or create a new one!
                        </Card.Text>
                    </Card.Body>
                </Card>
                {username !== "" ? selectWatcher(watchers) : null}
                {/* <Button variant="primary">Create</Button> */}
                {/* <Button variant="danger">Delete</Button> */}
                {/* <pre>{JSON.stringify(selectedWatcher, null, 2)}</pre> */}
                <DeviceConfigurator config={selectedWatcher}/>
                <ObjectConfigurator config={selectedWatcher}/>
                <ActionConfigurator config={selectedWatcher.udaList}/>
                <Button type="submit">Save</Button>
                </Form>
            </div>
        </div>
    )
}
export default WatcherConfigurator;
