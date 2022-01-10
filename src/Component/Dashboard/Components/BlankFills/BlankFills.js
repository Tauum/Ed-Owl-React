import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import './BlankFills.css';


export default function BlankFills() {

    return (    
        <div>
            <h1> Fill the blank </h1>
            <div className='container'>
                <Accordion className="accordian shadow">
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Uncompleted
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            These are Fill the blank tasks which you have not attempted yet.
                            <br/>
                            (PUT TABLE HERE)
                    
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
                            These are Fill the blank tasks which you have attempted.
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