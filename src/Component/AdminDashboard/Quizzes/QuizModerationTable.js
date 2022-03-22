import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';

export default function QuizModerationTable({parentToChild}) {
   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[title, setTitle] = useState("");
    const [displayEntries, setDisplayEntries] = useState([]);
    const[quiz, setQuiz]=useState([])
    

    function showList(quiz) {
        // console.log(quiz)
        setDisplayEntries(parentToChild.filter( x => x.quizTitle === quiz))
        setTitle(quiz.title)
        setShow(true);
    }

    useEffect(() => {
        if (show){
            fetch(`${window.ipAddress.ip}/SubmittedQuiz/getForQuiz/${title}`)
            .then(response => response.json())
            .then(json => {
                // console.log("list json")
                // console.log(json)
                setDisplayEntries(json)
        })
        }
    }, [show])

    // useEffect(() => {
    //     console.log("display entries V")
    //     console.log(displayEntries)
    // }, [displayEntries])

    // useEffect(() => {
    //     console.log("title V")
    //     console.log(title)
    // }, [title])

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table quiz-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Hidden</div>
                    <div className="col col-4">Edit</div>
                    <div className="col col-4">Attempts</div>
                    </li>
                    {parentToChild.map((quiz,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{quiz.title}</div>
                            <div className="col col-2" data-label="Date">{quiz.generatedDate}</div>
                            <div className="col col-3" data-label="Hidden">{quiz.hidden + " "}</div>
                            <div className="col col-4" data-label="Edit">
                                <Link to={ { pathname:"/EditQuiz", state: quiz }}>
                                    <button>
                                        Edit
                                    </button>
                                </Link> 
                            </div>

                            <div className="col col-5" data-label="Edit">
                            <button className="" onClick={() => showList(quiz)}>
                                    View
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

                            {title}
{/* 
                        <ul className="AllQuiz-responsive-table">
                                <li className="table-header">
                                    <div className="col col-2">Date</div>
                                    <div className="col col-4">Score</div>
                                    <div className="col col-5">Review</div>
                                </li>

                            </ul>
                        <br/> */}
                            


                        <div className="table-container">
                <ul className="responsive-table quiz-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">User</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Score</div>
                    <div className="col col-3">Time Taken</div>
                    <div className="col col-4">View</div>
                    </li>
                    {displayEntries.map((SubmittedQuiz,index)=>( 
                    <li className="table-Row" key={index}>
                        <div className="col col-1" data-label="Title">{SubmittedQuiz.user.name}</div>
                        <div className="col col-2" data-label="Date">{SubmittedQuiz.generatedDate}</div>
                        <div className="col col-2" data-label="timetaken">{SubmittedQuiz.timeTaken}/{SubmittedQuiz.quizTimeLimit}</div>
                        <div className="col col-3" data-label="score">{SubmittedQuiz.score}/{SubmittedQuiz.quizValue}</div>
                        <div className="col col-4" data-label="Edit">
                            <Link to={ { pathname:"/QuizReview", state: SubmittedQuiz }}>
                                <button>
                                    X
                                </button>
                            </Link> 
                        </div>

                    </li>
                    ))}
                </ul>
            </div>

                        <Button variant="btn btn-dark" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Modal> 

        </div>
    );
}