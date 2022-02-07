import React from 'react';
import { Link } from 'react-router-dom'

export default function QuizModerationTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table quiz-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Sub</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-4">Time</div>
                    <div className="col col-5">Worth</div>
                    <div className="col col-6">Hidden</div>
                    <div className="col col-7">Edit</div>
                    </li>
                    {parentToChild.map((quiz,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{quiz.title}</div>
                            <div className="col col-2" data-label="Title">{quiz.subject}</div>
                            <div className="col col-3" data-label="Date">{quiz.generatedDate}</div>
                            <div className="col col-4" data-label="Time limit">{quiz.timeLimit}</div>
                            <div className="col col-5" data-label="Value">{quiz.value}</div>
                            <div className="col col-6" data-label="Hidden">{quiz.hidden + " "}</div>
                            <div className="col col-7" data-label="Edit">
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