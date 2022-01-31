import React from 'react';
import { Link } from 'react-router-dom'

export default function QuizModerationTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table Match-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Subject</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-4">Value</div>
                    <div className="col col-5">Hidden</div>
                    <div className="col col-6">Edit</div>
                    </li>
                    {parentToChild.map((match,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{match.title}</div>
                            <div className="col col-2" data-label="Subject">{match.subject}</div>
                            <div className="col col-3" data-label="Date">{match.generatedDate}</div>
                            <div className="col col-4" data-label="Value">{match.value}</div>
                            <div className="col col-5" data-label="Hidden">{match.hidden + " "}</div>
                            <div className="col col-6" data-label="Edit">
                                <Link to={ { pathname:"/EditMatch", state: match }}>
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