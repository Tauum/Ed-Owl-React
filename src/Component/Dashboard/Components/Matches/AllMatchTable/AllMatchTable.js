import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import './AllMatchTable.css'

export default function AllMatchTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="AllMatch-responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className='col col-2'>Subject</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-4">Score available</div>
                    <div className="col col-5">Start</div>
                    </li>
                    {parentToChild.map((match, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{match.title}</div>
                            <div className="col col-2" data-label="Title">{match.subject}</div>
                            <div className="col col-3" data-label="Date">{match.generatedDate}</div>
                            <div className="col col-4" data-label="Score available">{match.value}</div>
                            <div className="col col-5" data-label="Play">

                                <Link to={ { pathname:"/Match", state: match }}>

                                    <button className="">
                                    Play
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