import { useHistory, Link } from 'react-router-dom'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'
import "./style/configWatcher.css"
import { set } from 'mongoose'
import { render } from '@testing-library/react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import Navbar from './Navbar.jsx'




function ConfigWatcher() {

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

    return (
        <div className="Watcher-Container">
            <Navbar/>
            <h2>Configure Watcher: watcherName</h2>

            <h2>Select Watcher Target</h2><br />

            <div className="WatcherInfo">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p><br />
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
                    />
                    <label for="checkbox">Notifcations</label>
                </div>
                <div className="item">
                    <input type="checkbox"
                        label="Value 2"
                        value={checkedTwo}
                        checked={checkedTwo}
                        onChange={handleChangeTwo}
                    />
                    <label for="checkbox">Snapshot</label>
                </div>
                <div className="item">
                    <input type="checkbox"
                        label="Value 3"
                        value="{checkedThree}"
                        checked={checkedThree}
                        onChange={handleChangeThree}
                    />
                    <label for="checkbox">Sound</label>
                </div>
                <div className="item">
                    <input type="checkbox"
                        label="Value 4"
                        value={checkedFour}
                        checked={checkedFour}
                        onChange={handleChangeFour}
                    />
                    <label for="checkbox">Lights</label>
                </div>

            </div><br />

            <div id="tabs">

            </div>
            <form>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Notifications" key="1" id="tab1">

                        <label for="email">Email: </label>
                        <input type="text" id="email" name="email"></input><br /><br />
                        <label for="phone">Phone #: </label>
                        <input type="text" id="phone" name="phone"></input>

                    </TabPane>
                    <TabPane tab="Snapshots" key="2">

                        <label for="email">Email: </label>
                        <input type="text" id="email" name="email"></input><br /><br />
                        <label for="phone">Phone #: </label>
                        <input type="text" id="phone" name="phone"></input>

                    </TabPane>
                    <TabPane tab="Sound" key="3">

                        <label for="sounds">Choose a sound: </label>
                        <select name="sounds" id="sounds">
                            <option value="Chime">Chime</option>
                            <option value="Alarm">Alarm</option>
                            <option value="Bark">Bark</option>
                            <option value="Custom">Custom</option>
                        </select>

                    </TabPane>
                    <TabPane tab="Lights" key="4">

                        <label for="seconds">Seconds: </label>
                        <input type="text" id="seconds" name="seconds"></input><br /><br />


                    </TabPane>
                </Tabs><br /><br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default ConfigWatcher;