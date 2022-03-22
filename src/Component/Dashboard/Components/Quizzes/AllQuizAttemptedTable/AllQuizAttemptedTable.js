import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Modal, Button} from 'react-bootstrap';

export default function AllQuizAttemptedTable({ parentToChild, distinct }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[title, setTitle] = useState("");
    const [displayEntries, setDisplayEntries] = useState([]);
    const [quiz, setQuiz] = useState(); 
    
    useEffect(() => {

        fetch(`${window.ipAddress.ip}/Quiz/title/${title}`)
        .then(response => response.json())
        .then(json => { 
            setQuiz(json)
        })

    },[show])

    function showList(entry) {
        setDisplayEntries(parentToChild.filter( x => x.quizTitle === entry))
        setTitle(entry)
        setShow(true);
    }

    return (
        <div>
            <div className="table-container">
                <ul className="AllQuiz-responsive-table">
                    <li className="table-header">
                        <div className="col ">Title</div>
                        <div className="col ">Attempts</div>
                    </li>
                    {distinct.map((entry, index) => (
                        <li className="table-Row" key={index}>
                            <div className="col " data-label="Title">{entry}</div>
                            
                            <div className="col " data-label="Play">

                                <button className="" onClick={() => showList(entry)}>
                                    See all
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal className="article-modal blog-modal" show={show} onHide={handleClose}>
                <div className="card text-center shadow">
                        <div className="card-header"> </div>
                        <div className="card-body">

                            
                        <h5>{title}</h5>
                        <br/>
                        {quiz? <div className='desc'> {quiz.content} </div> : <div> </div> }
                        <br/>
                        

                        <ul className="AllQuiz-responsive-table">
                                <li className="table-header">
                                    <div className="col col-2">Date</div>
                                    <div className="col col-3">Time Taken</div>
                                    <div className="col col-4">Score</div>
                                    <div className="col col-5">Review</div>
                                </li>
                                {displayEntries.map((SubmittedQuiz, index) => (
                                    <li className="table-Row" key={index}>
                                        <div className="col col-2">{SubmittedQuiz.generatedDate}</div>
                                        <div className="col col-3">{SubmittedQuiz.timeTaken}/{SubmittedQuiz.timeLimit}</div>
                                        <div className="col col-4">{SubmittedQuiz.score}/{SubmittedQuiz.quizValue}</div>
                                        <div className="col col-5" data-label="Play">

                                            <Link to={{ pathname: "/QuizReview", state: SubmittedQuiz }}>

                                                <button className="" >
                                                    x
                                                </button>
                                            </Link>
                                        </div>
                                    </li>

                                ))}
                            </ul>
                        <br/>
                            
                        <Button variant="btn btn-dark" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Modal> 

        </div>
    );
}