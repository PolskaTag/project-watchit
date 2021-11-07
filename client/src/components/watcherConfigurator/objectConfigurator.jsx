import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import {Card, InputGroup, FormControl} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'
import Select from 'react-select';

function ObjectConfigurator(props) {

    const availableLabels = ["person", "bicycle", "car", "motorbike"];

    function createObjectUI(config){

        const options = availableLabels.map((option) => {
            return (
                {value: option, label: option}
            )
        })

        return (
            <>
                <InputGroup className="">
                    <InputGroup.Text id="objectLabel">Object Name</InputGroup.Text>
                    {/* <FormControl
                    placeholder="Object Label"
                    aria-label="objectLabel"
                    aria-describedby="objectLabel"
                    defaultValue={config.object}
                    /> */}
                    <Select options={options} defaultInputValue={config}></Select>
                </InputGroup>
            </>
        )
    }

    return (
        <div className="my-3">
            <Card>
                <Card.Body>Object Configuration</Card.Body>
            </Card>
            {createObjectUI(props.config)}
        </div>
    )
}
export default ObjectConfigurator;
