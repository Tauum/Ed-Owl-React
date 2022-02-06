import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import UserModerationTable from './UserModerationTable';
// import QuizModerationTable from "./QuizModerationTable";

import "./UserModeration.css"

export default function UserModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 

    const[ parentToChildData, setParentToChildData]=useState([])

    useEffect(() => {
        if (loadUncompleted === true){
        fetch(`${window.ipAddress.ip}/User/getAll`)
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
                            Users
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            These are all users within the system.
                            <br/><br/>
                            {parentToChildData.length > 0 &&
                                <UserModerationTable parentToChild={parentToChildData}/>
                            }       
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }