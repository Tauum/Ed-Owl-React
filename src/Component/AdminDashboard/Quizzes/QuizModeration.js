import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import QuizModerationTable from "./QuizModerationTable";
import { Link } from 'react-router-dom'

import "./QuizModeration.css"

export default function QuizModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 
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
            <div className='accordian-container'>
                <Accordion className="accordian shadow" onClick= {() => {setLoadUncompleted(true)}}> 
                    <Card className='card moderationaccordian'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Quizzes
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            Create, edit or delete Quizzes.
                            <br/><br/>
                            <Link to={ { pathname:"/EditQuiz" }}>
                                <button>
                                    Create
                                </button>
                            </Link> 
                            <br/><br/>
                            {parentToChildData.length > 0 &&
                                <QuizModerationTable parentToChild={parentToChildData}/>
                            }       
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }