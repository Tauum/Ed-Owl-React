import React, { useState, useEffect } from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';

import AllUserTable from './AllUserTable/AllUserTable';

export default function Users() {

    const [LoadAll, setLoadAll] = useState(false);
    const [parentToChildData, setParentToChildData] = useState([]);


    


    useEffect(() => {
        if (LoadAll) {
            fetch(`${window.ipAddress.ip}/User/getAll`)
            .then(response => response.json())
            .then(json => {
                setParentToChildData(json);
            })
        }
    }, [LoadAll])

    

    return (
        <div>
            <h1> Users </h1>
            <div className='accordian-container'>
                <Accordion className="quizzes-accordian shadow" onClick={() => { setLoadAll(true) }}>
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Users
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">

                            <Card.Body>
                                These are all Users, you may view their profiles and stats.
                                <br /><br />
                                {parentToChildData.length > 0 &&
                                    <AllUserTable parentToChild={parentToChildData} />
                                }


                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    );
}