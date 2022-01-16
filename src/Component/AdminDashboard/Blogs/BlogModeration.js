import React, {useState, useEffect} from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import BlogModerationTable from "./BlogModerationTable";
import { Link } from 'react-router-dom'


export default function BlogModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false) 
    const[ parentToChildData, setParentToChildData]=useState([])

    useEffect(() => {
        if (loadUncompleted === true){
        fetch(`${window.ipAddress.ip}/Post`)
        .then(response => response.json())
        .then(json => { 
            setParentToChildData(json);
         })
        }
      },[loadUncompleted]) 


    return (    
        <div>
            <div className='container'>
                <Accordion className="accordian shadow" onClick= {() => {setLoadUncompleted(true)}}>
                    <Card className='card'>
                        <Card.Header className='header'>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Blogs
                            </Accordion.Toggle>
                        </Card.Header>
                    <Accordion.Collapse eventKey="0">

                        <Card.Body>
                        Create, edit or delete Blog posts.
                            <br/><br/>
                            <Link to={ { pathname:"/EditBlog" }}>
                                <button>
                                    Create
                                </button>
                            </Link> 
                            <br/><br/>
                            {parentToChildData.length > 0 &&
                                <BlogModerationTable parentToChild={parentToChildData}/>
                            }      
                    
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
        );
    }