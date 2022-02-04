import * as ObjectVerify from '../../Function/ObjectVerify';

import { HashRouter, Redirect } from "react-router-dom";

import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Logout from '../../Function/Logout'
import './SignUp.css'

function SignUp() {

    const{user} = useAuth0();
    const[name, setName]=useState('')
    const[yob,setYob]=useState('')
    const[termsandconditions,setTermsandconditions]=useState(false)
    const[studyacceptence,setStudyacceptence]=useState(false)
    const[student, setStudent]=useState(false)

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    // const [ data, setData ]=useState('')
    var errorVal = new Boolean(false);

    const handleClick=(e)=>{
        e.preventDefault(); // prevents page reload
        const email = user.email

        var submitUser={ name, email, yob }

        if (ObjectVerify.ObjectProperties(submitUser) && termsandconditions === true){

            if (student)
            {
                var role = "STUDENT"
            }
            else{
                var role = "UNDEFINED"
            }

            submitUser={ name, email, yob,role, termsandconditions, studyacceptence }
            
            fetch(`${window.ipAddress.ip}/User/add`, {
                method: "POST",  
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(submitUser)
            }).then((result)=> { return result.json() })
            .catch(error =>{ 
              errorVal = true
              console.log("error")
            })
            // if (errorVal){
            //     console.log("error")
            // }
            // else{
            // console.log("Sign-up Complete") 
            // handleClose()
            // }
            console.log("Sign-up Complete") 
             handleClose()
             window.location.reload(false);

        }
        else{ console.log("Sign-up Missing fields")}
    }
    
        return (
            <div>
                {/* show here cannot be disabled above???? */}
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="signup-all">
    
                    <Modal.Header>
                        <Modal.Title>Initial Sign-up Process</Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input value={name} onChange={(e)=>setName(e.target.value)}
                                    type="text" className="form-control stuff" id="Name" placeholder="Enter Name" required="required"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Year of birth</label>
                                <input value={yob} onChange={(e)=>setYob(e.target.value)} type="number" className="form-control stuff" id="yob" required="required"/>
                            </div>
    
                            <div className="form-check">
                            <input value={student} onChange={(e)=>setStudent(e.target.checked)}
                                 type="checkbox" className="form-check-input stuff" id="student" required="required"/>
                                    <p>I am a student</p>
                                    <br/>
    
                                <label className="form-check-label" htmlFor="termsandconditions">I have read and accept the below usage</label>
                                
                                <br/>
                                <input value={termsandconditions} onChange={(e)=>setTermsandconditions(e.target.checked)}
                                 type="checkbox" className="form-check-input stuff" id="termsandconditions" required="required"/>
                                    <a href="termsandconditions.html" target="_blank" rel="noopener noreferrer"> Data usage terms & conditions</a>
                                    <br/>
                                    <input value={studyacceptence} onChange={(e)=>setStudyacceptence(e.target.checked)}
                                 type="checkbox" className="form-check-input stuff" id="termsandconditions" required="required"/>
                                    <a href="Participant-information-sheet-and-consent.pdf" target="_blank" rel="noopener noreferrer"> Participation consent</a>
                                
                            </div>
                        </Form>
                    </Modal.Body>
    
                    <Modal.Footer className='signup-modal-footer'>
                        <Button type="submit" className="btn btn-dark sign-up-buttons"> <Logout/> </Button>
                        <Button onClick={handleClick} type="button" className="btn btn-warning sign-up-buttons submit" id="submit">Submit</Button>
                    </Modal.Footer>
    
                </Modal>
              </div>
        );
}

export default SignUp;