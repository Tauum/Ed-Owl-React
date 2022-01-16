import React from "react";



export default function Announcement({parentToChild}) {


    
    return (
        <div className="announcement-container">
            <ul className="announcement-list">
            {parentToChild.map((announcement, index)=>(
                <li key={index} className="announcement-element">{announcement.generatedDate} : {announcement.content}</li>
            ))}
            </ul>
        </div>
        );

}