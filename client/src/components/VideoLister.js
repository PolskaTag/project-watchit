import React from "react";

function VideoLister() {
    const recording = [
        {
            id: 1,
            name: '10142021',
            timestamp:'9am',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
        {
            id: 2,
            name: '12252021',
            timestamp:'10pm',
            URL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        },
    ]

    const recordingList = (
        <ul>
            {recording.map(recording => (
                <li key={recording.id}>
                    <a href={recording.URL}> {recording.name}</a>
                    {recording.timestamp}
                </li>
            ))}
        </ul>
    )

    return <div>{recordingList}</div>
}



export default VideoLister;
