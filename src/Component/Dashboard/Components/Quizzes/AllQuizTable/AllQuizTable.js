import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import './AllQuizTable.css'

export default function AllQuizTable({parentToChild}) {

    var w = window.innerWidth;
    var h = window.innerHeight;

    const handleButton = (e) => {
        console.log(w)
    console.log(h)
    }


    return (    
        <div>

            <button onClick={handleButton}></button>
            <div className="table-container">
                <ul className="AllQuiz-responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Subject</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-4">Time Limit</div>
                    <div className="col col-5">Score available</div>
                    <div className="col col-6">Start</div>
                    </li>
                    {parentToChild.map((quiz, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{quiz.title}</div>
                            <div className="col col-1" data-label="Subject">{quiz.subject}</div>
                            <div className="col col-2" data-label="Date">{quiz.generatedDate}</div>
                            <div className="col col-3" data-label="Time limit">{quiz.timeLimit}</div>
                            <div className="col col-4" data-label="Score available">{quiz.value}</div>
                            <div className="col col-5" data-label="Play">

                                <Link to={ { pathname:"/Quiz", state: quiz }}>

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