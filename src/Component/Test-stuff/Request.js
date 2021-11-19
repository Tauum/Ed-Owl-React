import { useEffect, useState } from 'react';
import React from 'react';


function Request(){

    
}

Request.useSendPostWithoutBody = (endpoint) => {
    const [ data, setData ]=useState('')
    const [ error, setError]=useState(null)

    useEffect(() => {

        fetch(`${window.ipAddress.ip}/${endpoint}`,{
        method: "POST",  
        headers:{'Content-Type':'application/json'}}) 
        
        .then((response)=> 
        {
            console.log(response)
            if (!response.ok){
                throw Error("Could not fetch data for that resource")
            }
            return response.json() 
        })

        .then((data)=>{ 
            setData(data); 
            setError(null) // prevents error if reloading content
        })

        .catch(error =>{ setError(error.message) })

        

    },[])
        // insert return statement here somewhere to either return info or error?

    };
Request.useSendPostWithBodyToGet = (endpoint, field, content) => {
    const [ data, setData ]=useState('')
    const [ error, setError]=useState(null)

        useEffect(() => {

            fetch(`${window.ipAddress.ip}/${endpoint}`, {
                method: "POST",  
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ [field]: content })})

            .then((response)=> 
            {
                console.log(response)
                if (!response.ok){
                    throw Error("Could not fetch data for that resource")
                }
                return response.json() 
            })

            .then((data)=>{ 
                setData(data); 
                setError(null) // prevents error if reloading content
            })

            .catch(error =>{ setError(error.message) })


        },[])
    }
// figure out how to redirect to error page if request is errored
// either implement error into every page or put it in here somehow

 export {Request};