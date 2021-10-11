import React from 'react';
import ReactPlayer from 'react-player';


export default class VideoController extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (  
          <ReactPlayer url={this.props.source}
          controls={true}
          />       
        );
      };
}
 
 