import React from "react";

function VideoLister() {
    const recording = [
        {
            id: 1,
            name: '10142021',
            timestamp:'',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
        {
            id: 2,
            name: '12252021',
            timestamp:'',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
    ]

    const recordingList = (
        <ul>
            {recording.map(recording => (
                <li key={recording.id}>
                    <a href={recording.URL}><div>{recording.name}</div></a>
                    {recording.URL}
                </li>
            ))}
        </ul>
    )

    return <div>{recordingList}</div>
}



export default VideoLister;
