import React, { useState, useEffect } from 'react';


export default function Announcement() {

    const[annoucements, setAnnoucements]=useState([])
    const [fetchExecuted, setFetchExecuted]=useState(false)

    useEffect(() => {

        fetch(`${window.ipAddress.ip}/Announcement/Recent`)
        .then(response => response.json())
        .then(json => {
            if (json.length < 1 ){
            console.log(json)
            setAnnoucements([{content: "There are currently no new updates!"}]);
            }
            else{
            setAnnoucements(json);
            setFetchExecuted(true)
            }
            
        })
        
    }, [])

    if (fetchExecuted){
    return (
        <div className="announcement-container">
            <ul className="announcement-list">
            {annoucements.map((announcement, index)=>(
                <li key={index} className="announcement-element">{announcement.generatedDate} : {announcement.content}</li>
            ))}
            </ul>
        </div>
        );
    }
    else{
        return (
            <div>
            </div>
        )
    }
}