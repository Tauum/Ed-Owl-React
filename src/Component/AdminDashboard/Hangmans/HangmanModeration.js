import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import HangmanModerationTable from './HangmanModerationTable';
import { Link } from 'react-router-dom'

import "./HangmanModeration.css"

export default function HangmanModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 
    const[ parentToChildData, setParentToChildData]=useState([])

    useEffect(() => {
        if (loadUncompleted === true){
        fetch(`${window.ipAddress.ip}/Hangman`)
        .then(response => response.json())
        .then(json => { 
            setParentToChildData(json);
         })
        }
      },[loadUncompleted]) 


    return (    
        <div>
            <div className='accordian-container'>
                <Accordion className="accordian shadow" onClick= {() => {setLoadUncompleted(true)}}>
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Hangmen
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            Create, edit or delete Hangmen.
                            <br/><br/>
                            <Link to={ { pathname:"/EditHangman" }}>
                                <button>
                                    Create
                                </button>
                            </Link> 
                            <br/><br/>
                            {parentToChildData.length > 0 &&
                                <HangmanModerationTable parentToChild={parentToChildData}/>
                            }       
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }