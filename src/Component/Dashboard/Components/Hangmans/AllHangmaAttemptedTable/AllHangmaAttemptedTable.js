import React from 'react';

import './AllHangmanAttemptedTable.css'

export default function AllHangmaAttemptedTable({parentToChild}) {

    console.log(parentToChild)

    return (    
        <div>
            <div className="table-container">
                <ul className="AllHangman-responsive-table">
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
                            <div className="col col-1" data-label="Title">{SubmittedHangman.hangmanTitle}</div>
                            <div className="col col-2" data-label="Date">{SubmittedHangman.generatedDate}</div>
                            <div className="col col-3" data-label="lives Used">{SubmittedHangman.incorrect} / 5</div>
                            <div className="col col-4" data-label="Hint Used">{SubmittedHangman.hintUsed ? "Yes" : "No" }</div>
                            <div className="col col-5" data-label="Time Limit">{SubmittedHangman.timeTaken}</div>
                            <div className="col col-6" data-label="Completed">{SubmittedHangman.completed ? "Yes" : "No" }</div>
                            <div className="col col-7" data-label="Score">{SubmittedHangman.score}</div>

                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}