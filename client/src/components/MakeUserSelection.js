

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