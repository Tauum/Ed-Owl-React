import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Button} from 'react-bootstrap';

export default function QuizModerationTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Time Limit</div>
                    <div className="col col-4">Value</div>
                    <div className="col col-5">Edit</div>
                    </li>
                    {parentToChild.map((quiz,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{quiz.title}</div>
                            <div className="col col-2" data-label="Date">{quiz.generatedDate}</div>
                            <div className="col col-3" data-label="Time limit">{quiz.timeLimit}</div>
                            <div className="col col-4" data-label="Value">{quiz.value}</div>
                            <div className="col col-5" data-label="Edit">
                                <Link to={ { pathname:"/EditQuiz", state: quiz }}>
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