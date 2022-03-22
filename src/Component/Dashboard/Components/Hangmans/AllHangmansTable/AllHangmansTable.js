import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';

import './AllHangmansTable.css'

export default function AllHangmansTable({parentToChild}) {

    
    const [hangman,setHangman] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    function showHangman(entry) {
        setShow(true);
        setHangman(entry);
    }

    return (    
        <div>
            <div className="table-container">
                <ul className="AllHangman-responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Subject</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-5">Load</div>
                    </li>

                    {parentToChild.map(hangman=>( 
                        <li className="table-Row" key={hangman.id}>
                            <div className="col col-1" data-label="Title">{hangman.title}</div>
                            <div className="col col-2" data-label="Subject">{hangman.subject}</div>
                            <div className="col col-3" data-label="Date">{hangman.generatedDate}</div>
                            <div className="col col-4" data-label="Load">
                            <button className=""  onClick={() => showHangman(hangman)}>
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
                            
                            {hangman? <div> {hangman.title} </div> : <div>  </div> }
                            <br/><br/>
                            {hangman? <div> Subject: {hangman.subject} </div> : <div>  </div> }
                            <br/><br/>
                            {hangman? <div> Created: {hangman.generatedDate} </div> : <div>  </div> }
                            <br/><br/>
                            {hangman? <div> Score available: {hangman.value} points </div> : <div>  </div> }
                            <br/>
                                                        
                            <Link to={{ pathname: "/Hangman", state: hangman }}>

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




{/* <div className="col col-1">Title</div>
<div className="col col-2">Subject</div>
<div className="col col-3">Date</div>
<div className="col col-4">Worth</div>
<div className="col col-5">Start</div>
</li>

{parentToChild.map(hangman=>( 
    <li className="table-Row" key={hangman.id}>
        <div className="col col-1" data-label="Title">{hangman.title}</div>
        <div className="col col-2" data-label="Subject">{hangman.subject}</div>
        <div className="col col-3" data-label="Date">{hangman.generatedDate}</div>
        <div className="col col-4" data-label="Score available">{hangman.value}</div> 
        <div className="col col-5" data-label="Start">
            
            <Link to={ { pathname:"/Hangman", state: hangman }}>
                <button>
                Play
                </button>
            </Link>
        </div> */}