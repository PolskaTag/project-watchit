import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes, useLayoutEffect } from 'react'
import ReactDOM, { render } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import {Form, Button} from 'react-bootstrap';
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'
import DeviceConfigurator from './deviceConfigurator';
import Select from 'react-select';
import ObjectConfigurator from './objectConfigurator';
import ActionConfigurator from './actionConfigurator';
import UDA from "./UDA";
import './index.css';

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

    const sampleUDAList = [
        {udaName: "sample1", script:"notification",params: "sample params email", udaType:"email"},
        {udaName: "sample2", script:"text",params: "sample params text", udaType:"text"},
        {udaName: "sample3", script:"logging", params: "sample params logging", udaType:"logging"}]

    // Gets the array of user's watchers
    // Uses setState with the response from call.
    function getWatcherData(userId) {
        axios.get("http://localhost:5000/watchers/" + userId,
        {"headers": {"x-access-token": localStorage.getItem("token")}})
        .then((res) => {
            console.log(res.data);
            setWatchers(res.data);
        })
    }

    function createWatcher(userId, watcherData){
        axios.post("http://localhost:5000/watchers/" + userId,
        watcherData,
        {"headers": {"x-access-token": localStorage.getItem("token")}})
        .then((res) => console.log(res));
    }

    // Creates a select component - Lets the user select their available watchers
    const selectWatcher = (watchers) => {
        // onChange function for when something gets selected
        const _onChange = (e) => {
            setSelectedWatcher(e.value);
        }

        // options for our select component
        const options = watchers.map((watcher) => {
            return {value: watcher, label: watcher.watcherName}
        })
        return (
            <Select options={options} onChange={_onChange}></Select>
        )
    }

    const handleSave = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(e.target[0]);
    }

    useEffect(() => {

        // Check to see if the user is auth
        axios.get("http://localhost:5000/isUserAuth",
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
        <div className="watcherConfig-content">
            <Form onSubmit={handleSave}>
            {username !== "" ? selectWatcher(watchers) : null}
            <DeviceConfigurator config={selectedWatcher}/>
            <ObjectConfigurator config={selectedWatcher.object}/>
            <ActionConfigurator config={selectedWatcher.udaList}/>
            <Button type="submit">Save</Button>
            </Form>
        </div>
    )
}
export default WatcherConfigurator;
