import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import {InputGroup, FormControl, Card} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'
import * as Formik from "formik";
import { TextField, Button } from '@material-ui/core';

/**
 * deviceConfiguration is a child component of parent index.js
 * It shows existing device information like the watcher name, ipAddress
 * Allows the user to edit the device information
 */
function DeviceConfigurator(props) {
    
    const CreateDeviceUI = () => {
        return (
            <>
                <Formik.Field 
                    placeholder="Watcher Name"
                    name="watcherName"
                    type="input"
                    variant="filled"
                    label="Watcher Name"
                    style={{width: "50%"}}
                    as={TextField}/>
                <Formik.Field 
                    placeholder="IP Address"
                    name="ipAddress"
                    type="input"
                    variant="filled"
                    label="Ip Address"
                    InputProps={{readOnly: true}}
                    style={{width: "50%"}}
                    as={TextField}/>
            </>
        )
    }

    return (
        <div className="my-3">
            <Formik.Formik
            enableReinitialize
            initialValues={{...props.config}}
            onSubmit={(data) => {
                console.log(data);
            }}>
                {({values, isSubmitting}) => (
                    // <Formik.Form>
                    <>
                        <Card border="dark">
                            <Card.Body>Device Configuration</Card.Body>
                        </Card>
                        <CreateDeviceUI config={props.config}></CreateDeviceUI>
                        <Button 
                            // disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            style={{width: "100%"}}>
                            Update Device
                        </Button>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        </>
                    // </Formik.Form>
                )}
            </Formik.Formik>
        </div>
    )
}
export default DeviceConfigurator;
