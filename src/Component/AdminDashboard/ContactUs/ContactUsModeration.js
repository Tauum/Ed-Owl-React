import React, { useState, useEffect } from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import ContactUsModerationTable from './ContactUsModerationTable';


export default function ContactUsModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])

    const [deleteAllContactUs, setDeleteAllContactUs] = useState(false);

    useEffect(() => {
        if (loadUncompleted === true) {
            fetch(`${window.ipAddress.ip}/ContactUs`)
                .then(response => response.json())
                .then(json => {
                    setParentToChildData(json);
                })
        }
    }, [loadUncompleted])

    useEffect(() => {
        if (deleteAllContactUs) {
            fetch(`${window.ipAddress.ip}/ContactUs/delete/all`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => { return res.json} )
            .catch(error => {
                console.log("error: " + error);

            })
            .then((result) => {
                setDeleteAllContactUs(false)
                window.location.reload(true)
            })
        }
    }, [deleteAllContactUs])


    return (
        <div>
            <div className='accordian-container announcement'>
                <Accordion className="accordian shadow" onClick={() => { setLoadUncompleted(true) }}>
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Contact us
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">

                            <Card.Body>
                                Read and delete contact requests
                                <br /><br />
                                <Button onClick={() => setDeleteAllContactUs(true)}>Delete all</Button>
                                <br /><br />
                                {parentToChildData.length > 0 &&
                                    <ContactUsModerationTable parentToChild={parentToChildData} />
                                }

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    );
}