import { Link } from 'react-router-dom'
import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import { useState } from 'react';


export default function UserModerationTable({parentToChild}) {
   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [user, setUser]=useState(); 

    function showList(user) {
        setUser(user)
        setShow(true);
    }

    return (    

        <div>
            <div className="table-container">
                <ul className="responsive-table user-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">Name</div>
                    <div className="col col-2">Email</div>
                    <div className="col col-3">Role</div>
                    <div className="col col-8">Load</div>
                    </li>
                    {parentToChild.map((user,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Name">{user.name}</div>
                            <div className="col col-2" data-label="Email">{user.email}</div>
                            <div className="col col-3" data-label="Role">{user.role}</div>


                            
                            <div className="col col-8" data-label="load">

                                <button className="" onClick={() => showList(user)}>
                                X
                            </button>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal className="article-modal blog-modal" show={show} onHide={handleClose}>
            <div className="card text-center shadow">
                <div className="card-header"> </div>
                <div className="card-body">

                { user ? <div>

                        {user.name}
                        <br/><br/>
                        {user.email}
                        <br/><br/>
                        {user.role}
                        <br/><br/>
                        T&C: {user.termsandconditions  + " "}
                        <br/><br/>
                        Study: {user.studyacceptence  + " "}
                        <br/><br/>
                        <Link to={ { pathname:"/Dashboard", state: user.id }}>
                            <Button>
                                Dashboard
                            </Button>

                        </Link> 
                        <br/>
                        <Link to={ { pathname:"/Profile", state: user.email }}>
                            <Button className='btn btn-warning'>
                                Profile
                            </Button>

                        </Link> 

                    </div>
                    :
                <div>
                </div>
                }

                    <Button variant="btn btn-dark" onClick={handleClose}>Close</Button>
                </div>
            </div>
        </Modal> 


        </div>
    );
}