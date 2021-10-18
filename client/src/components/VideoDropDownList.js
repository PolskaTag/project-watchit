import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

function VideoDropDownList(){

 
const actions = [
  { label: "Add", value: 1 },
  { label: "Edit", value: 2 },
  { label: "Delete", value: 3 }
];
 
return(
  
      <div className="w-25 p-3">
        <Select options={ actions }
        isSearchable 
        placeholder="Search for video"
        />
      </div>
     
)
 
}
export default VideoDropDownList