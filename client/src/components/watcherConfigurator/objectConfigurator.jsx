import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import {Card, InputGroup, FormControl} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'
// import Select from 'react-select';
import { TextField, Select, MenuItem, Button} from '@material-ui/core';
import * as Formik from "formik";

function ObjectConfigurator(props) {

    const availableLabels = ["person", "bicycle", "car", "motorbike", "banana", "book", "bottle", "cell phone"];
    const options = availableLabels.map((option) => {
            return (
                {value: option, label: option}
            )
        })

    return (
        <div className="my-3">
            <Card border="dark">
                <Card.Body>Object Configuration</Card.Body>
            </Card>
            <Formik.Formik
            enableReinitialize
            initialValues={props.config}>
                {({values}) => (
                    // <Formik.Form>
                    <>
                        <Formik.Field
                            name="object"
                            type="select"
                            variant="filled"
                            style={{width: "100%"}}
                            as={Select}>
                            <MenuItem value="car">car</MenuItem>
                            <MenuItem value="person">person</MenuItem>
                            <MenuItem value="bike">bike</MenuItem>
                            <MenuItem value="banana">banana</MenuItem>
                            <MenuItem value="bottle">bottle</MenuItem>
                        </Formik.Field>
                        <Button 
                            // disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            style={{width: "100%"}}>
                            Update Object
                        </Button>
                        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                    </>
                    // </Formik.Form>
                )}
            </Formik.Formik>
        </div>
    )
}
export default ObjectConfigurator;
