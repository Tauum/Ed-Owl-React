import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';


export default function BlankFillModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 
    const [uncompletedHangmanList, setUncompletedHangmanList] = useState([]) 

    const[ parentToChildData, setParentToChildData]=useState([])

    useEffect(() => {
        if (loadUncompleted === true){
        fetch(`${window.ipAddress.ip}/BlankFill`)
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
                            Fill in the blanks
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            These are Hangman tasks which you have not attempted yet.
                            <br/><br/>
                            {/* {parentToChildData.length > 0 &&
                                <Table parentToChild={parentToChildData}/>
                            }        */}
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }