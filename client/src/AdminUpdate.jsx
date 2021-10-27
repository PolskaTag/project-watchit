import {useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';
import MakeUserSelection from './components/MakeUserSelection';


function AdminUpdate() {
    
    const [newUsername, setNewUsername] = useState("")
    const [newAdmin, setNewAdmin] = useState(false)
   // const [newUsername, setNewUsername] = useState([])

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

    const updateUser = (id) =>{
        axios.put("http://localhost:5000/adminupdate", {
            id: id,
            username: newUsername,
            admin: newAdmin,
        });
    };


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
          <h2>Id: {user._id}</h2>
          <h2>Username: {user.username}</h2>
          <input type="username" name="username" placeholder="new user name" onChange={(e) => {
              setNewUsername(e.target.value); }}/>
          <h2>Admin: {user.admin? "true" : "false"}</h2>
          <input type="admin" name="admin" placeholder="new admin status" onChange={(e) => {
              setNewAdmin(e.target.value); }}/>
          <h2>Created: {user.createdAt}</h2>
          <h2>Updated: {user.updatedAt}</h2>
          </div>
          <br/>
          <button className="readBtn" onClick={() => updateUser(selectUser)}>Update User</button>      
          </div></>}
          </div>
  )
}

export default AdminUpdate;