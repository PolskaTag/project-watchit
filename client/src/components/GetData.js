function getData(props){
    let data = [];
    let i;
    let j;
    for(i = 0; i < props.length; i++){
      for(j = 0; j < props[i].length; j++){
        console.log(props[1][0].url);
        let user = {};
        user['image' ] = props[i][j].url;
        user['caption'] = props[i][j].name;
        data.push(user);
      }                
    }
   // setNewData(data);
    console.log("inside function");
    console.log(data);
    return (data);
  }
  export default getData;