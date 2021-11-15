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
// import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';
import axios from 'axios'
import UDA from './UDA';
import * as Formik from "formik";
import { TextField,
            Select,
            MenuItem,
            Button
        } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';

function ActionConfigurator(props) {
    const [selectedUDA, setSelectedUDA] = useState(() => {
        return(
            {
            udaName: "",
            udaType: "",
            script: "",
            params: {}
            }
        )
    });

    const options = props.config.map((option) => {
            return (
                {value: option, label: option.udaName}
            )
        })

    const getSelectOptions = (udaList) => {
        let results = udaList.map((uda) => {
            return(
                {value: uda, label: uda.udaName}
            )
        })
        return results;
    }

    const _onChange = (e) => {
        console.log(e);
            setSelectedUDA((prevState) => {
                return({...e.target.value});
            });
        }

    const buildMenuItems = (udaList) => (
        udaList.map((uda) => {
            return (
                <MenuItem value={uda}>{uda.udaName}</MenuItem>
            )
        })
    )

    const createUdaConfig = () => {

    }

    return (
        <div className="my-3">
            <Card border="dark">
                <Card.Body>Action Configuration</Card.Body>
            </Card>
            <Formik.Formik
            enableReinitialize
            initialValues={{
                uda: "",
                udaList: props.config ? props.config : []
            }}>
                {({values}) => (
                    // <Formik.Form>
                    <>
                        <Formik.Field
                            name="uda"
                            type="select"
                            variant="filled"
                            style={{width: "100%"}}
                            as={Select}>
                            {buildMenuItems(values.udaList)}
                        </Formik.Field>
                        <Button 
                            // disabled={isSubmitting}
                            // type="submit"
                            variant="contained"
                            style={{width: "50%"}}
                            onClick={() => {values.udaList.push({udaName: "NewUDA"})}}
                            >
                            Create
                        </Button>
                        <Button 
                            // disabled={isSubmitting}
                            // type="submit"
                            variant="outlined"
                            startIcon={<DeleteIcon/>}
                            color="error"
                            style={{width: "50%"}}>
                            Delete
                        </Button>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        <UDA config={values.uda}/>
                    </>
                    // </Formik.Form>
                    
                )}
            </Formik.Formik>
        </div>
    )
}
export default ActionConfigurator;
