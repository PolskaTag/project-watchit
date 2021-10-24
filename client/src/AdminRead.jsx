import {useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';
import MakeUserSelection from './components/MakeUserSelection';
import Display from './components/Display';

function AdminRead() {

    const [users, setUsers] = useState([])
    
    useEffect(() =>{
        axios.get("http://localhost:5000/adminread")
        .then((response) =>{
            const newUsers = [...response.data];
            setUsers(newUsers)
        });
    }, []);
    console.log(users);
   /* let newUsers = []
    let i;
    for(i = 0; i < users.length; i++){
     // if(users[i].username!==users[i-1]){
      let foo = {}
      foo['label' ] = users[i].username
      foo['value'] = users[i].vidoeName
      //}
      newUsers.push(foo)
    }*/

  /*  <div>
    {active==="update" && <AdminUpdate />}   
    {active==="delete" && <AdminDelete />} </div>*/
    
   /* {users.map((val, key) =>{
           return(
            <div key={key}>
                <h2>{val.userName}</h2>
                </div>
                  );  
           })} */
         // return <h1>YES!!!</h1>
// {url ? <VideoController url={url} className="innerVid" /> : null}

      const [selectUser, setSelectUser] = useState(users.username)
      const handleUser = e =>{
        setSelectUser(e.username)
      }

      const posts = [
        {id: 1, username: 'Hello World', videos: 'Welcome to learning React!'},
        {id: 2, username: 'Installation', videos: 'You can install React from npm.'}
      ];
      return(
            <div>
           {<> <div className="searchDiv adminread">
              <label className="label-span-search adminreadlabel">
                  <span className="span-search">Search for User</span>
              </label>
              <div className="select">
                  <Select isSearchable placeholder="Search for a User" onChange={handleUser} options={MakeUserSelection(users)} className="innerSelect" />
              </div>
              </div>
              <div>
                  {<Display userDetails={users, selectUser} className="innerVid" />}</div></>}
            </div>
      )
}

export default AdminRead;