import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import './Quizzes.css';
import UncompleTable from "./UncompleTable/UncompleTable";


export default function Quizzes() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 
    const [uncompletedQuizList, setUncompletedQuizList] = useState([]) 

    const[ parentToChildData, setParentToChildData]=useState([])

    useEffect(() => {
        if (loadUncompleted === true){
        fetch(`${window.ipAddress.ip}/Quiz`)
        .then(response => response.json())
        .then(json => { 
            setParentToChildData(json);
         })
         
        }
      },[loadUncompleted]) 

    return (    
        <div>
            <h1> Quiz </h1>
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
                            These are Quiz tasks which you have not attempted yet. You can attempt them by clicking the play button.
                            <br/><br/>
                            {parentToChildData.length > 0 &&
                                <UncompleTable parentToChild={parentToChildData}/>
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
                            These are Quiz tasks you have attempted.
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