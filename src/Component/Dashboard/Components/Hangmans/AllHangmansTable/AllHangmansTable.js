import React from 'react';
import { Link } from 'react-router-dom'

import './AllHangmansTable.css'

export default function AllHangmansTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="AllHangman-responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Sub</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-4">Worth</div>
                    <div className="col col-5">Start</div>
                    </li>

                    {parentToChild.map(hangman=>( 
                        <li className="table-Row" key={hangman.id}>
                            <div className="col col-1" data-label="Title">{hangman.title}</div>
                            <div className="col col-2" data-label="Subject">{hangman.subject}</div>
                            <div className="col col-3" data-label="Date">{hangman.generatedDate}</div>
                            <div className="col col-4" data-label="Score available">{hangman.value}</div> 
                            <div className="col col-5" data-label="Start">
                                
                                <Link to={ { pathname:"/Hangman", state: hangman }}>
                                    <button>
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