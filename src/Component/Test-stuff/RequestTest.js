import * as Request from './Request';
import useSendPostWithBodyToGet from './Request';
import { Button } from 'react-bootstrap';
import React from 'react';
import { useState, useEffect } from 'react';

function RequestTest() {

    Request.Request.useSendPostWithoutBody("User/getAll")
    Request.Request.useSendPostWithBodyToGet("User/checkAlt","email","tjs1crt@bolton.ac.uk")

    const[element, setElement] = useState('option1')


    const handleClick=(e)=>{
        e.preventDefault() 
    }
    
    return (
        <div>
           request test
           <Button onClick={handleClick} type="submit" className="btn btn-primary submit" id="submit">Submit</Button>

           {/* { element === "option1" ? <option1/> : <option2/> } */}
        </div>
    );
}

export default RequestTest;