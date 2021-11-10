/**
 * ActionConfigurator is responsible showcasing UDAs, as well as giving the user
 *  CRUD options.
 * Requirements:
 *  - Selecting from a list of user's UDAs, and have the specified UDA's data
 *      populate in InputGroups.
 *  - Creation of a new UDA
 *  - Edit a UDA
 *  - Delete a UDA
 *               
 */

import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import {Card, InputGroup} from 'react-bootstrap';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'
import UDA from './UDA';

function ActionConfigurator(props) {
    const [selectedUDA, setSelectedUDA] = useState({
        udaName: "",
        udaType: "",
        script: "",
        params: {}
    });

    const options = props.config.map((option) => {
        console.log(option);
            return (
                {value: option, label: option.udaName}
            )
        })

    const _onChange = (e) => {
            setSelectedUDA(e.value);
        }

    return (
        <div className="my-3">
            <Card>
                <Card.Body>Action Configuration</Card.Body>
            </Card>
            <Select options={options} onChange={_onChange}></Select>
            <UDA config={selectedUDA}/>
        </div>
    )
}
export default ActionConfigurator;
