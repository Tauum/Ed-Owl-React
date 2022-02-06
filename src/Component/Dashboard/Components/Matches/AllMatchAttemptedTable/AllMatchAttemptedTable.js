import React from 'react';

export default function AllMatchAttemptedTable({parentToChild}) {

    console.log(parentToChild)

    return (    
        <div>
            <div className="table-container">
                <ul className="AllMatch-responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Time Taken</div>
                    <div className="col col-4">Correct</div>

                    <div className="col col-5">Score</div>
                    </li>
                    {parentToChild.map((SubmittedMatch, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{SubmittedMatch.matchTitle}</div>
                            <div className="col col-2" data-label="Date">{SubmittedMatch.generatedDate}</div>
                            <div className="col col-3" data-label="Time limit">{SubmittedMatch.timeTaken}</div>
                            <div className="col col-4" data-label="Time limit">{SubmittedMatch.correct} / {SubmittedMatch.incorrect + SubmittedMatch.correct}</div>
                            <div className="col col-5" data-label="Value">{SubmittedMatch.score}</div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}