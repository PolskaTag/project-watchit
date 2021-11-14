/*take user info and store them as label and value, so that we can easily use it with Select - only takes label and value arguments*/
function MakeVideoSelection(props){
    let newVideo = []
      let j;
      for(j = 0; j < props.length; j++){
        let vid = {}
        vid['label'] = props[j].name
        vid['value'] = props[j].url
        newVideo.push(vid)
      }
      return newVideo;
}
export default MakeVideoSelection