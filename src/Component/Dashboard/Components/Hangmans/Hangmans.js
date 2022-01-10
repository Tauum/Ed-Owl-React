import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import './Hangmans.css';
import Table from "./Table/Table"


export default function Hangmans() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 
    const [uncompletedHangmanList, setUncompletedHangmanList] = useState([]) 

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
            <h1> Hangman </h1>
            <div className='container'>
                <Accordion className="accordian shadow" onClick= {() => {setLoadUncompleted(true)}}>
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Uncompleted
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            These are Hangman tasks which you have not attempted yet.
                            <br/><br/>
                            {parentToChildData.length > 0 &&
                                <Table parentToChild={parentToChildData}/>
                            }       
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>

                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Completed
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            These are Hangman tasks which you have attempted.
                            <br/>
                            You can review the results by clicking the play button.
                            <br/>
                            (PUT TABLE HERE)
                        </Card.Body>

                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }