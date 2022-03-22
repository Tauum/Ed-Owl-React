import React, { useState, useEffect } from 'react';


export default function Announcement() {

    const[annoucements, setAnnoucements]=useState([])
    const [fetchExecuted, setFetchExecuted]=useState(false)

    useEffect(() => {
        fetch(`${window.ipAddress.ip}/Announcement/Recent`)
        .then(response => response.json())
        .then(json => {
            setAnnoucements(json);
            setFetchExecuted(true)
        })
        
    }, [])

    useEffect(() => {
        console.log(annoucements)
    }, [annoucements])

    if (fetchExecuted){
        if (annoucements.length > 0){
            return (
                <div className="announcement-container">
                    <ul className="announcement-list">
                    {annoucements.map((announcement, index)=>(
                        <li key={index} className="announcement-element">{announcement.generatedDate} -<br/> {announcement.content}</li>
                    ))}
                    </ul>
                </div>
                );
            }
        
        else{
            return(
                <div className="announcement-container">
                    <ul className="announcement-list">
                        <div>
                            <p  className="announcement-list announcement-element" >There are currently no new updates!</p>
                        </div>  
                    </ul>
                </div>
            );
        }
    }
    else{
        return (
            <div className="announcement-container">
            </div>
        )
    }
}