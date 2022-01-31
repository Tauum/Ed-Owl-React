import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Button} from 'react-bootstrap';

export default function AllQuizAttemptedTable({parentToChild}) {

    console.log(parentToChild)

    return (    
        <div>
            <div className="table-container">
                <ul className="AllQuiz-responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Time Taken</div>
                    <div className="col col-4">Score</div>
                    <div className="col col-5">Review</div>
                    </li>
                    {parentToChild.map((SubmittedQuiz, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{SubmittedQuiz.quizTitle}</div>
                            <div className="col col-2" data-label="Date">{SubmittedQuiz.generatedDate}</div>
                            <div className="col col-3" data-label="Time limit">{SubmittedQuiz.timeTaken}/{SubmittedQuiz.timeLimit}</div>
                            <div className="col col-4" data-label="Value">{SubmittedQuiz.score}/{SubmittedQuiz.quizValue}</div>
                            <div className="col col-5" data-label="Play">

                            <Link to={ { pathname:"/QuizReview", state: SubmittedQuiz }}>

                                <button className="">
                                Review
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