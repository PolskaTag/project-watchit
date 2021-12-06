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
import { FieldArray, useField } from 'formik';

function UDA({uda, name, ...props}) {
  // const [field, meta] = useField(props);
  // const errorText = meta.error && meta.touched ? meta.error : "";

  // // Makes our UI for the Form
  // const UdaBaseUI = ({uda, name}) => {
  // console.log(uda);
  // // This is the udaType specific UI payload

  //   return (
  //     <>
  //     {/* <Formik.Field
  //             placeholder="UDA Name"
  //             name={`selectedWatcher.udaList.${index}.udaName`}
  //             type="input"
  //             variant="filled"
  //             label="UDA Name"
  //             style={{width: "100%"}}
  //             as={TextField}
  //           />
  //     <Formik.Field
  //             placeholder="UDA Type"
  //             name={`selectedWatcher.udaList.${index}.udaType`}
  //             type="select"
  //             variant="filled"
  //             style={{width: "100%"}}
  //             label="UDA Type"
  //             as={Select}
  //           >
  //              <MenuItem value="email">email</MenuItem>
  //              <MenuItem value="video">video</MenuItem>
  //              <MenuItem value="sound">sound</MenuItem>
  //              <MenuItem value="log">log</MenuItem>
  //     </Formik.Field> */}
  //     {toRender}
  //     </>
  //   )
  // }

    // Returns a emailUDA UI specific for emails
    const EmailUi = (name) => {
      // const [field] = useField(props);
      // console.log(name);
       
        return(
          <div key={uda._id}>
            <Formik.Field
              placeholder="Recipient Email Address"
              // {...props}
              name= {`${name}.params.recipient`}
              type="input"
              variant="filled"
              label="Email Address"
              style={{width: "100%"}}
              as={TextField}
            />
            <Formik.Field
              placeholder="Message Body"
              name={`${name}.params.body`}
              type="textArea"
              variant="filled"
              label="Message Body"
              style={{width: "100%"}}
              as={TextField}
            />
          </div>
        )
    }

    // Returns a loggingUDA UI specific for emails
    const LoggingUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a soundUDA UI specific for emails
    const SoundUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a textUDA UI specific for emails
    const TextUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a lightUDA UI specific for emails
    const LightUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a snapshotUDA UI specific for emails
    const SnapshotUi = () => {
          return (
            <>
            </>
          )
    }

    // Returns a videoUDA UI specific for emails
    const VideoUi = (name) => {
          return (
            <>
            <Formik.Field
              placeholder="Video Title"
              name={`${name}.params.videoTitle`}
              type="input"
              variant="filled"
              label="Video Title"
              style={{width: "100%"}}
              as={TextField}
            />

            <Formik.Field
              name={`${name}.params.videoDuration`}
              type="select"
              variant="filled"
              style={{width: "100%"}}
              label="Video Duration"
              inputlabel="Duration"
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

      let toRender = <></>;
      switch (uda.udaType) {
        case 'email':
          toRender = EmailUi(name);
          break;
        case 'logging':
          toRender = LoggingUi();
          break;
        case 'sound':
          toRender = SoundUi();
          break;
        case 'text':
          toRender = TextUi();
          break;
        case 'light':
          toRender = LightUi();
          break;
        case 'snapshot':
          toRender = SnapshotUi();
          break;
        case 'video':
          toRender = VideoUi(name);
          break;
        default:
          console.log("Unable to parse udaType");
          break;
      }

    // useEffect(() => {
    //   console.log("rerender");
    //   // setUda(props.config);
    // })

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
            // <Card border="dark">
            //   <Card.Header>UDA Type: {values.udaType}</Card.Header>
            // </Card>
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

    // return (
    //   <>
    //   {/* <Card border="dark">
    //     <Card.Header>UDA Type: {props.uda.udaType}</Card.Header>
    //   </Card> */}
    //   <UdaBaseUI uda={uda} index={index}/>
    //   {/* <Button
    //     variant="contained"
    //     style={{width: "100%"}}>
    //     Update UDA
    //   </Button> */}
    //   </>
    // )

    return (
      <>
      <Card border="dark">
        <Card.Header>UDA Configuration</Card.Header>
      </Card>
      {/* <pre>{JSON.stringify(name, null, 2)}</pre> */}
        <Formik.Field
          placeholder="UDA Name"
          name={name+'.udaName'}
          type="input"
          variant="filled"
          label="UDA Name"
          style={{width: "100%"}}
          as={TextField}
        />
      <Formik.Field
        placeholder="UDA Type"
        name={name + `.udaType`}
        type="select"
        variant="filled"
        style={{width: "100%"}}
        label="UDA Type"
        labelId="udaType-select-label"
        as={Select}
      >
        <InputLabel id="udaType-select-label">UDA Type</InputLabel>
        <MenuItem value="email">email</MenuItem>
        <MenuItem value="video">video</MenuItem>
        <MenuItem value="sound">sound</MenuItem>
        <MenuItem value="log">log</MenuItem>

      </Formik.Field>

      {/* <Formik.Field
          placeholder="email recip"
          name={name+'.params.recipient'}
          type="input"
          variant="filled"
          label="UDA Name"
          style={{width: "100%"}}
          as={TextField}
        /> */}
        {/* {uda.udaType === "email" && <>{toRender}</>} */}
        {toRender}
        {/* {function () {
          // This is the udaType specific UI payload
          let toRender = <></>;

          switch (uda.udaType) {
            case 'email':
              toRender = EmailUi(name);
              break;
            case 'logging':
              toRender = LoggingUi();
              break;
            case 'sound':
              toRender = SoundUi();
              break;
            case 'text':
              toRender = TextUi();
              break;
            case 'light':
              toRender = LightUi();
              break;
            case 'snapshot':
              toRender = SnapshotUi();
              break;
            case 'video':
              toRender = VideoUi(name);
              break;
            default:
              console.log("Unable to parse udaType");
              break;
          }
          console.log(toRender);
          return (<>{toRender}</>);
        }} */}
      </>
    )

}

export default UDA;
