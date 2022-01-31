import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import AnnouncementmoderationTable from './AnnouncementModerationTable';
import { Link } from 'react-router-dom'

import "./AnnouncementModeration.css"

export default function AnnouncementModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 
    const[ parentToChildData, setParentToChildData]=useState([])

    useEffect(() => {
        if (loadUncompleted === true){
        fetch(`${window.ipAddress.ip}/Announcement/Recent`)
        .then(response => response.json())
        .then(json => { 
            setParentToChildData(json);
         })
        }
      },[loadUncompleted]) 


    return (    
        <div>
            <div className='accordian-container announcement'>
                <Accordion className="accordian shadow" onClick= {() => {setLoadUncompleted(true)}}>
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Announcement
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                            Create, edit or delete Announcements. 
                            <br/>
                            Announcements stay live for 2 weeks
                            <br/><br/>
                            <Link to={ { pathname:"/EditAnnouncement" }}>
                                <button>
                                    Create
                                </button>
                            </Link> 
                            <br/><br/>
                            {parentToChildData.length > 0 &&
                                <AnnouncementmoderationTable parentToChild={parentToChildData}/>
                            }       
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }