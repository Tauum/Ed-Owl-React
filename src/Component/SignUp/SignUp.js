import * as ObjectVerify from '../../Function/ObjectVerify';
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Logout from '../Logout'

function SignUp() {

    const{user} = useAuth0();
    const[name, setName]=useState('')
    const[yob,setYob]=useState('')
    const[termsandconditions,setTermsandconditions]=useState(false)
    const[studyacceptence,setStudyacceptence]=useState(false)

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    // const [ data, setData ]=useState('')
    var errorVal = new Boolean(false);

    const handleClick=(e)=>{
        e.preventDefault(); // prevents page reload
        const email = user.email

        var submitUser={ name, email, yob }

        if (ObjectVerify.ObjectProperties(submitUser) && termsandconditions === true){

            submitUser={ name, email, yob, termsandconditions, studyacceptence }
            
            fetch("http://localhost:8080/User/add", {
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
        }
        else{ console.log("Sign-up Missing fields")}
    }
    
    return (
        <div>
            {/* show here cannot be disabled above???? */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>

                <Modal.Header>
                    <Modal.Title>Initial Sign-up Process</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)}
                                type="text" className="form-control stuff" id="Name" placeholder="Enter Name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Year of birth</label>
                            <input value={yob} onChange={(e)=>setYob(e.target.value)} type="number" className="form-control stuff" id="yob" required/>
                        </div>

                        <div className="form-check">
                            <label className="form-check-label" htmlFor="termsandconditions">I have read and accept the below usage</label>
                            
                            <br/>
                            <input value={termsandconditions} onChange={(e)=>setTermsandconditions(e.target.checked)}
                             type="checkbox" className="form-check-input stuff" id="termsandconditions" required/>
                                <a href="termsandconditions.html" target="_blank" rel="noopener noreferrer"> Data usage terms & conditions</a>
                                <br/>
                                <input value={studyacceptence} onChange={(e)=>setStudyacceptence(e.target.checked)}
                             type="checkbox" className="form-check-input stuff" id="termsandconditions" required/>
                                <a href="Participant-information-sheet-and-consent.pdf" target="_blank" rel="noopener noreferrer"> Participation consent</a>
                            
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" className="btn btn-dark"> <Logout/> </Button>
                    <Button onClick={handleClick} type="submit" className="btn btn-primary submit" id="submit">Submit</Button>
                </Modal.Footer>

            </Modal>
          </div>
    );
}

export default SignUp;