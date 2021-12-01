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
import InputLabel from '@mui/material/InputLabel';

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
      toRender = loggingUi();
      break;
    case 'sound':
      toRender = soundUi();
      break;
    case 'text':
      toRender = textUi();
      break;
    case 'light':
      toRender = lightUi();
      break;
    case 'snapshot':
      toRender = snapshotUi();
      break;
    case 'video':
      toRender = videoUi();
      break;
    default:
      console.log("Unable to parse udaType");
      break;
  }

    return (
      <>
      <Formik.Field
              placeholder="UDA Name"
              name="selectedUda.udaName"
              type="input"
              variant="filled"
              label="UDA Name"
              style={{width: "100%"}}
              as={TextField}
            />
      <Formik.Field
              placeholder="UDA Type"
              name="selectedUda.udaType"
              type="select"
              variant="filled"
              style={{width: "100%"}}
              label="UDA Type"
              as={Select}
            >
               <MenuItem value="email">email</MenuItem>
               <MenuItem value="video">video</MenuItem>
               <MenuItem value="sound">sound</MenuItem>
               <MenuItem value="log">log</MenuItem>
      </Formik.Field>
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
              name="selectedUda.params.recipient"
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
              name="selectedUda.params.body"
              type="textArea"
              variant="filled"
              label="Message Body"
              style={{width: "100%"}}
              as={TextField}
            />
          </div>
          </>
        )
    }

    // Returns a loggingUDA UI specific for emails
    const loggingUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a soundUDA UI specific for emails
    const soundUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a textUDA UI specific for emails
    const textUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a lightUDA UI specific for emails
    const lightUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a snapshotUDA UI specific for emails
    const snapshotUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a videoUDA UI specific for emails
    const videoUi = () => {
          return (
            <>
            <Formik.Field
              placeholder="Video Title"
              name="selectedUda.params.videoTitle"
              type="input"
              variant="filled"
              label="Video Title"
              style={{width: "100%"}}
              as={TextField}
            />

            <Formik.Field
              name="selectedUda.params.videoDuration"
              type="select"
              variant="filled"
              style={{width: "100%"}}
              label="Video Duration"
              inputLabel="Duration"
              as={Select}
            >
              <InputLabel>Duration</InputLabel>
               <MenuItem value={10}>10 Seconds</MenuItem>
               <MenuItem value={15}>15 Seconds</MenuItem>
               <MenuItem value={20}>20 Seconds</MenuItem>
               <MenuItem value={25}>25 Seconds</MenuItem>
               <MenuItem value={30}>30 Seconds</MenuItem>
            </Formik.Field>
            </>
          )
    }

    useEffect(() => {
      console.log("rerender");
      // setUda(props.config);
    })

    // return (
    //   <Formik.Formik
    //   enableReinitialize
    //   initialValues={{
    //       udaName: props.config.udaName,
    //       udaType: props.config.udaType,
    //       script: props.config.script,
    //       params: props.config.params
    //     }}
    //     onSubmit={(data, { setSubmitting }) => {
    //       setSubmitting(true);
    //       console.log("submit ", data);
    //       setSubmitting(false);
    //     }}>
    //     {({ values, isSubmitting}) => (
    //       // <Formik.Form>
    //       <>
    //         <Card border="dark">
    //           <Card.Header>UDA Type: {values.udaType}</Card.Header>
    //         </Card>
    //         <UdaBaseUI uda={values}/>
    //         <div>
    //           <Button
    //             disabled={isSubmitting}
    //             variant="contained"
    //             style={{width: "100%"}}>
    //             Update UDA
    //           </Button>
    //         </div>
    //         {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
    //       </>
    //       // </Formik.Form>
    //     )}
    //   </Formik.Formik>
    // )

    return (
      <>
      <Card border="dark">
        <Card.Header>UDA Type: {props.uda.udaType}</Card.Header>
      </Card>
      <UdaBaseUI uda={props.uda}/>
      <Button
        variant="contained"
        style={{width: "100%"}}>
        Update UDA
      </Button>
      </>
    )

}

export default UDA;
