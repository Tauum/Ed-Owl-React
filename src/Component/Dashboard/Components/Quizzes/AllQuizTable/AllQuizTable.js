import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';

import './AllQuizTable.css'

export default function AllQuizTable({parentToChild}) {

    const [quiz, setQuiz] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function showQuiz(entry) {
        setShow(true);
        setQuiz(entry);
    }

    return (    
        <div>            
            <div className="table-container">
                <ul className="AllQuiz-responsive-table responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Subject</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-4">Load</div>
                    </li>
                    {parentToChild.map((quiz, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{quiz.title}</div>
                            <div className="col col-2" data-label="Subject">{quiz.subject}</div>
                            <div className="col col-3" data-label="Date">{quiz.generatedDate}</div>
                            <div className="col col-4" data-label="load">
                            <button className=""  onClick={() => showQuiz(quiz)}>
                                x
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
                            
                            {quiz? <div> {quiz.title} </div> : <div>  </div> }
                            <br/><br/>
                            {quiz? <div> Subject: {quiz.subject} </div> : <div>  </div> }
                            <br/><br/>
                            {quiz? <div> Created: {quiz.generatedDate} </div> : <div>  </div> }
                            <br/><br/>
                            {quiz? <div> Score available: {quiz.value} points </div> : <div>  </div> }
                            <br/><br/>
                            {quiz? <div> Time alloted: {quiz.timeLimit}s </div> : <div>  </div> }
                            <br/>
                                                        
                            <Link to={{ pathname: "/Quiz", state: quiz }}>

                                <Button className='btn btn-warning'>
                                    Play
                                </Button>
                            </Link>
                            <br/>

                        <Button variant="btn btn-dark" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Modal> 
        </div>
    );
}