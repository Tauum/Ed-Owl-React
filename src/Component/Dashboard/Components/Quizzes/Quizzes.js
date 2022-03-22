import React, { useState, useEffect } from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';

import AllQuizTable from "./AllQuizTable/AllQuizTable";
import AllQuizAttemptedTable from "./AllQuizAttemptedTable/AllQuizAttemptedTable";

export default function Quizzes({parentToChild}) {
    
    const [LoadAll, setLoadAll] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])
    const [parentToChildData2, setParentToChildData2] = useState([])
    const [parentToChildData3, setParentToChildData3] = useState([])
    const [loadAttempted, setloadAttempted] = useState(false)

    useEffect(() => {
        if (LoadAll) {
            fetch(`${window.ipAddress.ip}/Quiz/newestOrder-hideHidden`)
            .then(response => response.json())
            .then(json => {
                setParentToChildData(json);
            })
        }
        // v CHANGE THIS REQUEST TO STUFF THAT HAS BEEN ATTEMPTED SOMEHOW
        if (loadAttempted){
            if (parentToChild){
                fetch(`${window.ipAddress.ip}/SubmittedQuiz/getForUser/${parentToChild}`)
                .then(response => response.json())
                .then(json => {
                    setParentToChildData2(json);
                })
            }
            else{
                fetch(`${window.ipAddress.ip}/SubmittedQuiz/getForUser/${window.BackendUser.id}`)
                .then(response => response.json())
                .then(json => {
                    setParentToChildData2(json);

                    let distinctResults = [...new Set(json.map(item => item.quizTitle))];

                    setParentToChildData3(distinctResults)

                })
            }
        }
    }, [LoadAll, loadAttempted])

    return (
        <div>
            <h1> Quiz </h1>
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
                                These are all Quiz tasks which you may attempt. You can do this by clicking the play button.
                                <br /><br />
                                {parentToChildData.length > 0 &&
                                    <AllQuizTable parentToChild={parentToChildData} />
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
                                These are Quiz tasks you have attempted. You can review the results by clicking the play button.
                                <br /><br />
                                {parentToChildData2.length > 0 &&
                                    <AllQuizAttemptedTable parentToChild={parentToChildData2} distinct={parentToChildData3}/>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    );
}