import React from 'react';
import { Link } from 'react-router-dom'

export default function AnnouncementModerationTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table announcement-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">ID</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Content</div>
                    <div className="col col-4">Edit</div>
                    </li>
                    {parentToChild.map((announcement,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="id">{announcement.id}</div>
                            <div className="col col-2" data-label="Date">{announcement.generatedDate}</div>
                            <div className="col col-3" data-label="content">{announcement.content}</div> 
                            <div className="col col-4" data-label="Edit">
                                <Link to={ { pathname:"/EditAnnouncement", state: announcement }}>
                                    <button>
                                        Edit
                                    </button>
                                </Link> 
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}