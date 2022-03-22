import React from 'react';
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { Modal, Button} from 'react-bootstrap';

export default function QuizModerationTable({parentToChild}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[title, setTitle] = useState("");
    const [displayEntries, setDisplayEntries] = useState([]);
    const[match, stMatch]=useState([])
    

    function showList(match) {
        setDisplayEntries(parentToChild.filter( x => x.matchTitle === match))
        setTitle(match.title)
        setShow(true);
    }

    useEffect(() => {
        if (show){
            fetch(`${window.ipAddress.ip}/SubmittedMatch/getForMatch/${title}`)
            .then(response => response.json())
            .then(json => {
                setDisplayEntries(json)
        })
        }
    }, [show])

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table Match-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Value</div>
                    <div className="col col-4">Hidden</div>
                    <div className="col col-5">Edit</div>
                    <div className="col col-6">Attempts</div>
                    </li>
                    {parentToChild.map((match,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{match.title}</div>
                            <div className="col col-3" data-label="Date">{match.generatedDate}</div>
                            <div className="col col-5" data-label="Hidden">{match.hidden + " "}</div>
                            <div className="col col-6" data-label="Edit">
                                <Link to={ { pathname:"/EditMatch", state: match }}>
                                    <button>
                                        Edit
                                    </button>
                                </Link> 
                            </div>

                            <div className="col col-5" data-label="Edit">
                              <button className="" onClick={() => showList(match)}>
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
                    <div className="table-container">
            <ul className="responsive-table Match-moderation-table">
                <li className="table-header">
                <div className="col col-1">User</div>
                <div className="col col-2">Date</div>
                
                <div className="col col-5">Time Taken</div>
                <div className="col col-4">Correct</div>
                <div className="col col-6">Score</div>
                </li>
                {displayEntries.map((SubmittedMatch, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Date">{SubmittedMatch.user.name}</div>
                            <div className="col col-2" data-label="Date">{SubmittedMatch.generatedDate}</div>
                            <div className="col col-3" data-label="Time limit">{SubmittedMatch.timeTaken}</div>
                            <div className="col col-4" data-label="Time limit">{SubmittedMatch.correct} / {SubmittedMatch.incorrect + SubmittedMatch.correct}</div>
                            <div className="col col-5" data-label="Value">{SubmittedMatch.score}/{SubmittedMatch.matchValue}</div>

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