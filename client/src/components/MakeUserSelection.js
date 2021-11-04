
/*take user info and store them as label and value, so that we can easily use it with Select - only takes label and value arguments*/
function MakeUserSelection(props){
    let newUsers = []
      let i;
      for(i = 0; i < props.length; i++){
        let user = {}
        user['label' ] = props[i].username
        user['value'] = props[i]._id
        newUsers.push(user)
      }

      return newUsers;
}
export default MakeUserSelection