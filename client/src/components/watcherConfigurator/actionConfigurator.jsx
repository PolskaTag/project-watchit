import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import {Card} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'

function ActionConfigurator() {

    return (
        <div className="my-3">
            <Card>
                <Card.Body>Action Configuration</Card.Body>
            </Card>
        </div>
    )
}
export default ActionConfigurator;
