import React from 'react';

import "./ContactUsModeration.css"

export default function ContactUsModerationTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table contact-us-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">Name</div>
                    <div className="col col-2">Email</div>
                    <div className="col col-3">Message</div>
                    <div className="col col-4">Date</div>
                    </li>
                    {parentToChild.map((contactUs,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="name">{contactUs.name}</div>
                            <div className="col col-2" data-label="email">{contactUs.email}</div>
                            <div className="col col-3" data-label="message">{contactUs.message}</div>
                            <div className="col col-4" data-label="generatedDate">{contactUs.generatedDate}</div> 
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}