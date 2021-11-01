

function Display(props){
  // let videosLenghth = props.props.videos;
  // videosLenghth.l
  // <h2>{videosLenghth}</h2>
  /*let admin;
  if(props.props.admin === true){
     admin = "true"
  }admin
  else{
     admin = "false"
  }*/
    const details = (//props.userDetails.map((userDetails) =>//key={userDetails.id}>
    <div style={{justifyContent: "left"}}>
      <h2>Id: {props.props._id}</h2>
      <h2>Name: {props.props.username}</h2>
      <h2>Admin: {props.props.admin? "true" : "false"}</h2>
      <h2>Date Created: {props.props.createdAt}</h2>
      <h2>Date Updated: {props.props.updatedAt}</h2>
    </div>
  );
    return(
        <div>
        {details}
        </div>
    )

}
export default Display;