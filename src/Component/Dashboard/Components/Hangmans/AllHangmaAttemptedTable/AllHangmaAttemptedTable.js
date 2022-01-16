import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Button} from 'react-bootstrap';

import './AllHangmaAttemptedTable.css'

export default function AllHangmaAttemptedTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Lives Used</div>
                    <div className="col col-4">Hint Used</div>
                    <div className="col col-5">Time Taken</div>
                    <div className="col col-6">Completed</div>
                    <div className="col col-7">Score</div>
                    </li>
                    {parentToChild.map((SubmittedHangman, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{SubmittedHangman.hangman.title}</div>
                            <div className="col col-2" data-label="Date">{SubmittedHangman.generatedDate}</div>
                            <div className="col col-3" data-label="lives Used">{SubmittedHangman.incorrect}</div>
                            <div className="col col-4" data-label="Hint Used">{SubmittedHangman.hintUsed}</div>
                            <div className="col col-5" data-label="Time Limit">{SubmittedHangman.timeLimit}</div>
                            <div className="col col-6" data-label="Completed">{SubmittedHangman.completed}</div>
                            <div className="col col-7" data-label="Score">{SubmittedHangman.score}</div>

                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}