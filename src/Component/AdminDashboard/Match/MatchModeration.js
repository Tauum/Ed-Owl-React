import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import MatchModerationTable from "./MatchModerationTable";
import { Link } from 'react-router-dom'

import "./MatchModeration.css"

export default function MatchModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 
    const[ parentToChildData, setParentToChildData]=useState([])

    useEffect(() => {
        if (loadUncompleted === true){
        fetch(`${window.ipAddress.ip}/Match`)
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
                            Matches
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            Create, edit or delete Matches.
                            <br/><br/>
                            <Link to={ { pathname:"/EditMatch" }}>
                                <button>
                                    Create
                                </button>
                            </Link> 
                            <br/><br/>
                            {parentToChildData.length > 0 &&
                                <MatchModerationTable parentToChild={parentToChildData}/>
                            }       
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }