import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import {InputGroup, FormControl, Card} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'

/**
 * deviceConfiguration is a child component of parent index.js
 * It shows existing device information like the watcher name, ipAddress
 * Allows the user to edit the device information
 */
function DeviceConfigurator(props) {
    
    function createDeviceUI(config){
        return (
            <>
                <InputGroup className="">
                    <InputGroup.Text id="watcherName">Watcher Name</InputGroup.Text>
                    <FormControl
                    placeholder="Watcher Name"
                    aria-label="watcherName"
                    aria-describedby="watcherName"
                    defaultValue={config.watcherName}
                    />
                </InputGroup>
                <InputGroup className="">
                    <InputGroup.Text id="ipaddress">IP Address</InputGroup.Text>
                    <FormControl
                    placeholder="0.0.0.0"
                    aria-label="ipaddress"
                    aria-describedby="ipaddress"
                    defaultValue={config.ipAddress}
                    />
                </InputGroup>
            </>
        )
    }

    return (
        <div className="my-3">
            <Card>
                <Card.Body>Device Configuration</Card.Body>
            </Card>
            {createDeviceUI(props.config)}
        </div>
    )
}
export default DeviceConfigurator;
