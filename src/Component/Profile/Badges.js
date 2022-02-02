import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button} from 'react-bootstrap';

import "./Profile.css"

function Badges({quizzes, hangmen, matches}) {
    const { user } = useAuth0();
    const [ serverUser, setServerUser ]=useState('')

    //3. passing an empty array for on mount (when the page loads)
    useEffect(() => {
        
    },[]) 

    const handleClick=(e)=>{
        e.preventDefault();
    }
    
        return(
            <div className='all-badges-contents'>

        </div>
    );
}



  
 export default Profile