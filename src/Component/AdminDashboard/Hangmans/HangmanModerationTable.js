import React from 'react';
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { Modal, Button} from 'react-bootstrap';

export default function HangmanModerationTable({parentToChild}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[title, setTitle] = useState("");
    const [displayEntries, setDisplayEntries] = useState([]);
    const[hangman, setHangman]=useState([])
    

    function showList(hangman) {
        setDisplayEntries(parentToChild.filter( x => x.hangmanTitle === hangman))
        setTitle(hangman.title)
        setShow(true);
    }

    useEffect(() => {
        if (show){
            fetch(`${window.ipAddress.ip}/SubmittedHangman/getForHangman/${title}`)
            .then(response => response.json())
            .then(json => {
                setDisplayEntries(json)
        })
        }
    }, [show])

return (    
    <div>
        <div className="table-container">
            <ul className="responsive-table hangman-moderation-table">
                <li className="table-header">
                <div className="col col-1">Title</div>
                <div className="col col-2">Date</div>
                <div className="col col-3">Hidden</div>
                <div className="col col-4">Edit</div>
                <div className="col col-4">Attempts</div>
                </li>
                {parentToChild.map((hangman,index)=>( 
                    <li className="table-Row" key={index}>
                        <div className="col col-1" data-label="Title">{hangman.title}</div>
                        <div className="col col-2" data-label="Date">{hangman.generatedDate}</div>
                        <div className="col col-3" data-label="Hidden">{hangman.hidden + " "}</div>
                        <div className="col col-4" data-label="Edit">
                            <Link to={ { pathname:"/EditHangman", state: hangman }}>
                                <button>
                                    Edit
                                </button>
                            </Link> 
                        </div>

                        <div className="col col-5" data-label="Edit">
                        <button className="" onClick={() => showList(hangman)}>
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
            <ul className="responsive-table hangman-moderation-table">
                <li className="table-header">
                <div className="col col-1">User</div>
                <div className="col col-2">Date</div>
                <div className="col col-3">Lives Used</div>
                <div className="col col-4">Hint Used</div>
                <div className="col col-5">Time Taken</div>
                <div className="col col-6">Score</div>
                </li>
                {displayEntries.map((submittedHangman,index)=>( 
                <li className="table-Row" key={index}>
                    <div className="col col-1" data-label="Title">{submittedHangman.user.name}</div>
                    <div className="col col-2" data-label="Date">{submittedHangman.generatedDate}</div>
                    <div className="col col-3" data-label="lives Used">{submittedHangman.incorrect} / 5</div>
                    <div className="col col-4" data-label="Hint Used">{submittedHangman.hintUsed ? "Yes" : "No"}</div>
                    <div className="col col-5" data-label="Time Limit">{submittedHangman.timeTaken}</div>
                    <div className="col col-6" data-label="Score">{submittedHangman.score}/{submittedHangman.hangmanValue}</div>
               
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