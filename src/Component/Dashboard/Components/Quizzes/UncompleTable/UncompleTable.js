import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Button} from 'react-bootstrap';

import './UncompleTable.css'

export default function UncompleteTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Time Limit</div>
                    <div className="col col-4">Value</div>
                    <div className="col col-5">Start</div>
                    </li>
                    {parentToChild.map(quiz=>( 
                        <li className="table-Row" key={quiz.id}>
                            <div className="col col-1" data-label="Title">{quiz.title}</div>
                            <div className="col col-2" data-label="Date">{quiz.generatedDate}</div>
                            <div className="col col-3" data-label="Time limit">{quiz.timeLimit}</div>
                            <div className="col col-4" data-label="Value">{quiz.value}</div>
                            <div className="col col-5" data-label="Play">

                                <Link to={ { pathname:"/Quiz", state: quiz }}>
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