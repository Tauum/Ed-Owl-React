import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button} from 'react-bootstrap';

export default function AllMatchAttemptedTable({parentToChild, distinct}) {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[title, setTitle] = useState("");
    const [displayEntries, setDisplayEntries] = useState([]);
    const [match, setMatch] = useState(); 
    
    useEffect(() => {

        fetch(`${window.ipAddress.ip}/Match/title/${title}`)
        .then(response => response.json())
        .then(json => { 
            setMatch(json)
        })

    },[show])

    function showList(entry) {
        setDisplayEntries(parentToChild.filter( x => x.matchTitle === entry))
        setTitle(entry)
        setShow(true);
    }


    return (    
        <div>
            <div className="table-container">
                <ul className="AllMatch-responsive-table">
                    <li className="table-header">
                    <div className="col ">Title</div>
                    <div className="col ">Attempts</div>
                    </li>

                    {distinct.map((entry, index)=>( 
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
                        {match? <div className='desc'> {match.content} </div> : <div> </div> }
                        <br/>
                        
                            <div className="table-container">
                <ul className="AllMatch-responsive-table">
                    <li className="table-header">
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Time Taken</div>
                    <div className="col col-4">Correct</div>
                    <div className="col col-5">Score</div>
                    </li>
                    {displayEntries.map((SubmittedMatch, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-2" data-label="Date">{SubmittedMatch.generatedDate}</div>
                            <div className="col col-3" data-label="Time limit">{SubmittedMatch.timeTaken}</div>
                            <div className="col col-4" data-label="Time limit">{SubmittedMatch.correct} / {SubmittedMatch.incorrect + SubmittedMatch.correct}</div>
                            <div className="col col-5" data-label="Value">{SubmittedMatch.score}/{SubmittedMatch.matchValue}</div>

                        </li>
                    ))}
                </ul>
            </div>
                        <br/>
                            
                        <Button variant="btn btn-dark" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Modal> 





          


        </div>
    );
}