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