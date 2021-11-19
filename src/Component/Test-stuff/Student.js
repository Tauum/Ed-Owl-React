import { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

import '../Style/Student.css';

export default function Student() {

 // for adding a student
    const[name, setName]=useState('')
    const[contactNo,setcontactNo]=useState('')

    const handleClick=(e)=>{
         e.preventDefault() 
         const student={name, contactNo}
         console.log(student)
         fetch("http://192.168.0.101:8080/Student/add", {
            method: "POST", 
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
         }).then(()=>{
            console.log("Request sent -" + student)
        })
    }
    //const classes = useStyles(); //doesnt work - maybe its because he uses some other ui library?
    //for getting students
    const[students, setStudents]=useState([])

    useEffect(()=>{
        fetch("http://192.168.0.101:8080/Student/")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result)
        })
    },[])


  return (

    <div>
        <h1> Add Student </h1>

        <Form>
            <div class="form-group">
                <label for="Name">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)}
                    type="text" class="form-control" id="Name" placeholder="Enter Name" required/>

                <small id="emailHelp" class="form-text text-muted">Enter both first & last names.</small>
            </div>
            <div class="form-group">
                <label for="ContactNumber">Contact Number</label>
                <input value={contactNo} onChange={(e)=>setcontactNo(e.target.value)}
                    type="text" class="form-control" id="contactNo" placeholder="Enter Contact Number"/>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            
            <Button onClick={handleClick} type="submit" class="btn btn-primary">Submit</Button>
        </Form>

        <div>
            <p>
            output name: {name}  
            </p>
            <p>
            output contact number: {contactNo}  
            </p>
        </div>    

        <div class="list">
            <h1>Students</h1>
            {students.map(student=>(
            <Card class="elements"> 
                <p> id = {student.id} <br/>
                name = {student.name} <br/>
                contact number = {student.contactNo}
                </p>
            </Card>
            ))}
        </div>
    </div>
  );
}
