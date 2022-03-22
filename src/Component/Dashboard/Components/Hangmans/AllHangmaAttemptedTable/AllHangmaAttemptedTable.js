import React, { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './AllHangmanAttemptedTable.css'

export default function AllHangmaAttemptedTable({ parentToChild, distinct }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const[hangman, setHangman] = useState()

    const [displayEntries, setDisplayEntries] = useState([]);

    useEffect(() => {

        fetch(`${window.ipAddress.ip}/Hangman/title/${title}`)
        .then(response => response.json())
        .then(json => { 
            setHangman(json)
        })

    },[show])

    function showList(entry) {
        setDisplayEntries(parentToChild.filter(x => x.hangmanTitle === entry))
        setTitle(entry)
        setShow(true);
    }

    return (
        <div>
            <div className="table-container">
                <ul className="AllHangman-responsive-table">
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
                        {hangman? <div className='desc'> {hangman.content} </div> : <div> </div> }
                        <br/>
                        

                        <ul className="AllHangman-responsive-table">
                            <li className="table-header">
                                <div className="col col-1">Date</div>
                                <div className="col col-2">Lives Used</div>
                                <div className="col col-3">Hint Used</div>
                                <div className="col col-4">Time Taken</div>
                                <div className="col col-5">Score</div>
                            </li>
                            {displayEntries.map((SubmittedHangman, index) => (
                                <li className="table-Row" key={index}>
                                    <div className="col col-1" data-label="Date">{SubmittedHangman.generatedDate}</div>
                                    <div className="col col-2" data-label="lives Used">{SubmittedHangman.incorrect} / 5</div>
                                    <div className="col col-3" data-label="Hint Used">{SubmittedHangman.hintUsed ? "Yes" : "No"}</div>
                                    <div className="col col-4" data-label="Time Limit">{SubmittedHangman.timeTaken}</div>
                                    <div className="col col-5" data-label="Score">{SubmittedHangman.score}/{SubmittedHangman.hangmanValue}</div>
                                </li>

                            ))}
                        </ul>
                        <Button variant="btn btn-dark" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}