import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Button} from 'react-bootstrap';

export default function HangmanModerationTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Subject</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-4">Value</div>
                    <div className="col col-5">Edit</div>
                    </li>
                    {parentToChild.map((hangman,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{hangman.title}</div>
                            <div className="col col-2" data-label="Subject">{hangman.subject}</div>
                            <div className="col col-3" data-label="Date">{hangman.generatedDate}</div>
                            <div className="col col-4" data-label="Value">{hangman.value}</div> 
                            <div className="col col-5" data-label="Edit">
                                <Link to={ { pathname:"/EditHangman", state: hangman }}>
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