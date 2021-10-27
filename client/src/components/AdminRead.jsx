import {useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';
import MakeUserSelection from './MakeUserSelection';
import Display from './Display';


function AdminRead() {

    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [selectUser, setSelectUser] = useState("")
    
    useEffect(() =>{
        axios.get("http://localhost:5000/adminread")
        .then((response) =>{
            const newUsers = [...response.data];
            setUsers(newUsers)
        });
    }, []);
    
           
      const handleUser = e =>{
        setSelectUser(e.value)
        let i;
        for (i = 0; i < users.length; i++){
            if(users[i]._id === e.value){
                setUser(users[i]);
                console.log("I AM USER I")
                console.log(users[i])
                
            }
        }
      }
      
      const deleteUser = (id) =>{
        axios.delete(`http://localhost:5000/admindelete/${id}`)
        .then((response) =>{
            console.log(response);
        });
      };

      return(
            <div  >
           {<><div className="adminreadDiv">
                <div className="searchDiv adminread">
              <label className="label-span-search adminreadlabel">
                  <span className="span-search">Search for a User</span>
              </label>
              <div className="select">
                  <Select isSearchable placeholder="Search for a User" onChange={handleUser} options={MakeUserSelection(users)} className="innerSelect" />
              </div>
              </div>
              <br/>
              <br/>
              <div className="displayDiv">
              {user? <Display props={user}/> : null}  
              </div>
              <br/>
              <button className="readBtn" onClick={() => deleteUser(selectUser)}>Delete User</button>      
              </div></>}
              </div>
      )
}

export default AdminRead;