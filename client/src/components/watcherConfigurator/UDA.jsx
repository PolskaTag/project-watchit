/**
 * UDA.js is responsible for creating the UI for a specified udaType.
 */

import { useEffect } from 'react';
import {React, useState} from 'react';
import {Card, InputGroup, FormControl, Form} from 'react-bootstrap';
// import Select from 'react-select';
import * as Formik from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import * as yup from "yup";

function UDA(props) {

  // Makes our UI for the Form
  const UdaBaseUI = ({uda}) => {

    // console.log(uda);

  // This is the udaType specific UI payload
  let toRender = <></>;
  switch (uda.udaType) {
    case 'email':
      toRender = emailUi();
      break;
    case 'logging':
      toRender = loggingUi(uda);
      break;
    case 'sound':
      toRender = soundUi(uda);
      break;
    case 'text':
      toRender = textUi(uda);
      break;
    case 'light':
      toRender = lightUi(uda);
      break;
    case 'snapshot':
      toRender = snapshotUi(uda);
      break;
    case 'video':
      toRender = videoUi(uda);
      break;
    default:
      console.log("Unable to parse udaType");
      break;
  }

    return (
      <>
      <Formik.Field
              placeholder="UDA Name"
              name="udaName"
              type="input"
              variant="filled"
              label="UDA Name"
              style={{width: "100%"}}
              as={TextField}
            />
      {toRender}
      </>
    )
  }

    // Returns a emailUDA UI specific for emails
    const emailUi = () => {
      // console.log(uda);
       
        return(
          <>
          <div>
            <Formik.Field
              placeholder="Recipient Email Address"
              name="params.recipient"
              type="input"
              variant="filled"
              label="Email Address"
              style={{width: "100%"}}
              as={TextField}
            />
          </div>
          <div>
            <Formik.Field
              placeholder="Message Body"
              name="params.body"
              type="textArea"
              variant="filled"
              label="Message Body"
              style={{width: "100%"}}
              as={TextField}
            />
          </div>
          </>
        )
          // return (
          //   <>
          //       <Form.Group>
          //         <Form.Label>Email Address</Form.Label>
          //         <Form.Control
          //           type="text"
          //           placeholder="sample@extension.com"
          //           defaultValue={uda.params.recipient} />
          //       </Form.Group>
          //       <Form.Group>
          //         <Form.Label>Message Body</Form.Label>
          //         <Form.Control
          //           type="text"
          //           placeholder=""
          //           defaultValue={uda.params.body} />
          //       </Form.Group>
          //   </>
          // )
    }

    // Returns a loggingUDA UI specific for emails
    const loggingUi = (uda) => {
       if(uda.udaType === "logging"){
          return (
            <>
            </>
          )
       }
    }

    // Returns a soundUDA UI specific for emails
    const soundUi = (uda) => {
       if(uda.udaType === "sound"){
          return (
            <>
            </>
          )
       }
    }

    // Returns a textUDA UI specific for emails
    const textUi = (uda) => {
       if(uda.udaType === "text"){
          return (
            <>
            </>
          )
       }
    }

    // Returns a lightUDA UI specific for emails
    const lightUi = (uda) => {
       if(uda.udaType === "light"){
          return (
            <>
            </>
          )
       }
    }

    // Returns a snapshotUDA UI specific for emails
    const snapshotUi = (uda) => {
       if(uda.udaType === "snapshot"){
          return (
            <>
            </>
          )
       }
    }

    // Returns a videoUDA UI specific for emails
    const videoUi = (uda) => {
       if(uda.udaType === "video"){
          return (
            <>
            <Form.Group>
       
              <Form.Label>Video Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Video Title"
                defaultValue={uda.params.video} style={{marginBottom: ".6em"}}/>
                
              <Form.Label>Video Duration</Form.Label>
              <div style={{display: "block"}}>
                <select style={{width: "22.5em", "border-radius":"3px", height: "2.4em", border: "none"}}>
                  <option>10 Seconds</option>
                  <option>15 Seconds</option>
                  <option>20 Seconds</option>
                  <option>25 Seconds</option>
                  <option>30 Seconds</option>
                </select>
              </div>
              
        
            </Form.Group>
            </>
          )
       }
    }

    useEffect(() => {
      console.log("rerender");
      // setUda(props.config);
    })

    return (
      <Formik.Formik
      enableReinitialize
      initialValues={{
          udaName: props.config.udaName,
          udaType: props.config.udaType,
          script: props.config.script,
          params: props.config.params
        }}
        onSubmit={(data, { setSubmitting }) => {
          // setSubmitting(true);
          console.log("submit ", data);
          // setSubmitting(false);
        }}>
        {({ values, isSubmitting}) => (
          <Formik.Form>
            <Card border="dark">
              <Card.Header>UDA Type: {values.udaType}</Card.Header>
            </Card>
            <UdaBaseUI uda={values}/>
            <div>
              <Button 
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                style={{width: "100%"}}>
                Update UDA
              </Button>
            </div>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </Formik.Form>
        )}
      </Formik.Formik>
    )

}

export default UDA;
