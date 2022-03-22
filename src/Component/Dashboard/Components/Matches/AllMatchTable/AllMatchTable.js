import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';

import './AllMatchTable.css'

export default function AllMatchTable({parentToChild}) {

    
    const [match, setMatch] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function showMatch(entry) {
        setShow(true);
        setMatch(entry);
    }

    return (    
        <div>
            <div className="table-container">
                <ul className="AllMatch-responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className='col col-2'>Subject</div>
                    <div className="col col-3">Date</div>
                    <div className="col col-5">Load</div>
                    </li>
                    {parentToChild.map((match, index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{match.title}</div>
                            <div className="col col-2" data-label="Title">{match.subject}</div>
                            <div className="col col-3" data-label="Date">{match.generatedDate}</div>
                            <div className="col col-5" data-label="Play">
                            <button className=""  onClick={() => showMatch(match)}>
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
                            
                            {match? <div> {match.title} </div> : <div>  </div> }
                            <br/><br/>
                            {match? <div> Subject: {match.subject} </div> : <div>  </div> }
                            <br/><br/>
                            {match? <div> Created: {match.generatedDate} </div> : <div>  </div> }
                            <br/><br/>
                            {match? <div> Score available: {match.value} points </div> : <div>  </div> }
                            <br/><br/>
                                                        
                            <Link to={{ pathname: "/Match", state: match }}>

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