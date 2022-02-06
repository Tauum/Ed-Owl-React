import React, { useState, useEffect } from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import AllMatchTable from "./AllMatchTable/AllMatchTable";
import AllMatchAttemptedTable from './AllMatchAttemptedTable/AllMatchAttemptedTable';

export default function Matches({parentToChild}) {

    const [LoadAll, setLoadAll] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])
    const [parentToChildData2, setParentToChildData2] = useState([])
    const [loadAttempted, setloadAttempted] = useState(false)

    useEffect(() => {
        if (LoadAll) {
            fetch(`${window.ipAddress.ip}/Match/newestOrder-hideHidden`)
            .then(response => response.json())
            .then(json => {
                setParentToChildData(json);
            })
        }
        // v CHANGE THIS REQUEST TO STUFF THAT HAS BEEN ATTEMPTED SOMEHOW
        if (loadAttempted){
            if (parentToChild){
                fetch(`${window.ipAddress.ip}/SubmittedMatch/getForUser/${parentToChild}`)
                .then(response => response.json())
                .then(json => {
                    setParentToChildData2(json);
                })
            }
            else{
                fetch(`${window.ipAddress.ip}/SubmittedMatch/getForUser/${window.BackendUser.id}`)
                .then(response => response.json())
                .then(json => {
                    setParentToChildData2(json);
                })
            }
        }
    }, [LoadAll, loadAttempted])
    return (
        <div>
            <h1> Match </h1>
            <div className='accordian-container'>
                <Accordion className="quizzes-accordian shadow" onClick={() => { setLoadAll(true) }}>
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Available
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">

                            <Card.Body>
                                These are all Match tasks which you may attempt. You can do this by clicking the play button.
                                <br /><br />
                                {parentToChildData.length > 0 &&
                                    <AllMatchTable parentToChild={parentToChildData} />
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
                                These are Match tasks you have attempted. You can review the results by clicking the play button.
                                <br /><br />
                                {parentToChildData2.length > 0 &&
                                    <AllMatchAttemptedTable parentToChild={parentToChildData2} />
                                }
                            </Card.Body>

                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    );
}