/**
 * UDA.js is responsible for creating the UI for a specified udaType.
 */

import {React, useState} from 'react';
import {Card, InputGroup, FormControl, Form} from 'react-bootstrap';
import Select from 'react-select';

function UDA(props) {

  const udaBaseUI = (uda) => {

  // This is the udaType specific UI payload
  let toRender = <></>;
  switch (uda.udaType) {
    case 'email':
      toRender = emailUi(uda);
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
      break;
  }

    return (
      <>
        <Card>
          <Card.Header>{uda.udaType ? uda.udaType : "UDA Type"}</Card.Header>
        </Card>
          <Form.Group>
            <Form.Label>UDA Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name of UDA"
              defaultValue={uda.udaName} />
          </Form.Group>
          {toRender}
      </>
    )
  }

    // Returns a emailUDA UI specific for emails
    const emailUi = (uda) => {
       if(uda.udaType === "email"){
          return (
            <>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="sample@extension.com"
                    defaultValue={uda.params.email} />
                </Form.Group>
            </>
          )
       }
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

    return (
      <>
        {udaBaseUI(props.config)}
      </>
    )

}

export default UDA;

/*<Form.Control     
                type="number"
                placeholder="Enter Video Duration e.g. 15secs"
                defaultValue={uda.params.vieo} />*/