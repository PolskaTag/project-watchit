//import { useState } from "react";

function Display(props, name){
   // const [user, setUser] = useState([])

    let i;
    let user = []
    for(i = 0; i < props.length; i++){
        if(props.length === 0){
          //  console.log(props[i]);
            return;
        }
        else if(props.username.equals(name)){
            //setUser(props[i]);
            user = props[i];
            //console.log(props[i]);
        }
    }
   /* const details = user.userDetails.map((userDetail) =>
    <div key={userDetail.id}>
      <h2>{userDetail.id}</h2>
      <h2>{userDetail.username}</h2>
      <h2>{userDetail.videos}</h2>
      <h2>{userDetail.createdAt}</h2>
      <h2>{userDetail.updatedAt}</h2>
    </div>*/
//  );
//{details}
    return(
        <div>
          {user.username}
        </div>
    )

}
export default Display;