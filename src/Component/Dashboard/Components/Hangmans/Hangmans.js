import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import AllHangmansTable from "./AllHangmansTable/AllHangmansTable"
import AllHangmansAttemptedTable from "./AllHangmaAttemptedTable/AllHangmaAttemptedTable"

export default function Hangmans() {

    const [LoadAll, setLoadAll] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])

    const [parentToChildData2, setParentToChildData2] = useState([])
    const [loadAttempted, setloadAttempted] = useState(false)

    useEffect(() => {
        if (LoadAll){
            fetch(`${window.ipAddress.ip}/Hangman/newestOrder-hideHidden`)
            .then(response => response.json())
            .then(json => { 
                setParentToChildData(json);
                })
            }
        // v CHANGE THIS REQUEST TO STUFF THAT HAS BEEN ATTEMPTED SOMEHOW
        if (loadAttempted){
            fetch(`${window.ipAddress.ip}/SubmittedHangman/getForUser/${window.BackendUser.id}`)
            .then(response => response.json())
            .then(json => {
                setParentToChildData2(json);
                console.log(json)
            })
        }
    }, [LoadAll, loadAttempted])




    return (    
        <div>
            <h1> Hangman </h1>
            <div className='accordian-container'>
                <Accordion className="accordian shadow" onClick= {() => {setLoadAll(true)}}>
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Available
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            These are Hangman tasks which you have not attempted yet.
                            {parentToChildData.length > 0 &&
                                <AllHangmansTable parentToChild={parentToChildData}/>
                            }       
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>

                <Accordion className="accordian shadow" onClick={() => { setloadAttempted(true) }}>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Attempted
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            These are Hangman tasks which you have attempted.
                                {parentToChildData2.length > 0 &&
                                    <AllHangmansAttemptedTable parentToChild={parentToChildData2} />
                                }
                        </Card.Body>

                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }