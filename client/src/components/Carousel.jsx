import VideoController from "./video";

function Carousel(props){
    const [slides, setSlides] = useState([])
    const [dots, setDots] = useState([])
    const [mySlides, setMySlides] = useState([])

    let index;
    let videos = props; 
    for(index = 0; index < videos.length; index++){

       // imgUrl = videos[i]|| "NO IMAGE";

      /*  const updateSlides = (videos[index], index) =>()=> {
            let slidesCopy = [...slides];
            slidesCopy[index] = <div >
                                     <div className= "numbertext">
                                        <div dangerouslySetInnerHTML={{ __html: index + 1 + " / " + videos.length}}></div>
                                     </div>   
                                    <VideoController source = {props[index]}/>
                                </div>;
            setSlides(slidesCopy);
            };
        const updateDots = (videos[index], index) => () => {
        let dotsCopy = [...dots];
        dotsCopy[index] = videos[index];
        setDots(dotsCopy);
        };
        const updateMySlides = (props[index], index) => () => {
        let mySlidesCopy = [...mySlides];
        mySlidesCopy[index] = videos[index];
        setMySlides(mySlidesCopy);*/
       // }  
    } 
    return(
        <div className="slideshowDiv">
            <div className="mySlides">
                
                updateSlides
            </div>
            
        </div>
    )
}
export default Carousel