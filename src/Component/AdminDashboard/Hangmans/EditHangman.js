import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap';
import HangmanModeration from './HangmanModeration';

export default function EditHangman(props) {

    const [hangman, setHangman]=useState({id: 999, title:"", word:"", hint:"", value:0, subject:""});
    const [executedSet, setExecutedSet] = useState(false);


    const [submitHangman, setSubmitHangman]=useState();
    const [deleteHangman, setDeleteHangman]=useState();
    const [missingParentData, setMissingParentData] = useState();
    const [completed, setCompleted] = useState();
  
    useEffect(() => {
      if (props.location.state){
        console.log(props.location.state)
        setHangman(props.location.state)
        setExecutedSet(true)    
      }
      else{
        setMissingParentData(true)
      }
    },[]) 
  
    //this submits the result
    useEffect(() => {                          
      if (submitHangman){  
          if (hangman.title != "" && hangman.word !="" && hangman.hint !="")
            if (missingParentData){
                var todayDate = new Date().toISOString().slice(0, 10);
                fetch (`${window.ipAddress.ip}/Hangman/add`,{
                    method: "POST",  
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(
                    { 
                        title: hangman.title,
                        word: hangman.word.toUpperCase(),
                        hint: hangman.hint,
                        value: hangman.value,
                        subject: hangman.subject,
                        generatedDate: todayDate
                    })})
                .then(res=>res.json())
                .catch(error =>{ 
                console.log("error: " + error);
                })
                .then((result)=>{

                    setCompleted(true)
                })
            }
            else{
                // this gives a 405 error V AKA not allowed
                console.log("UPATING") 
                fetch (`${window.ipAddress.ip}/Hangman/update/${hangman.id}`,{
                    method: "PUT",  
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(
                    { 
                        title: hangman.title,
                        word: hangman.word.toUpperCase(),
                        hint: hangman.hint,
                        value: hangman.value,
                        subject: hangman.subject,
                        generatedDate: todayDate
                    })})
                .then(res=>res.json())
                .catch(error =>{ 
                console.log("error: " + error);
                })
                .then((result)=>{
                    setCompleted(true)
                })

            }
      }
    },[submitHangman]) 



    useEffect(() => {                          

        if (deleteHangman === true){
            
            console.log("delete initiated")
            // if (missingParentData === false){

            //     console.log(props.location.state.id)

            //     var id = props.location.state.id

            //     fetch (`${window.ipAddress.ip}/Hangman/delete/${id}`),{
            //         method: "DELETE"
            //     }
            //     .then(res=>res.json())
            //     .then((result)=>{
            //         console.log(result)
            //         setCompleted(true)
            //     })
            // }

        }
      },[deleteHangman]) 
  

  const handleSubmitButton  = (hangman) => {
    setSubmitHangman(true)
  }

  const handleDeleteButton  = (hangman) => {
    setDeleteHangman(true)
    }


  if (completed === true){
    return (<Redirect to="/AdminDashboard"></Redirect>);
  }

	return (
    <div className='page'>
      <br/>
      <h1>Hangman input / Edit Page</h1>
      <br/><br/><br/>
      <form action="">
        <label htmlFor="Title">Title</label>
        <br/>
        <input type="text" id="title" name="title" value={ hangman.title} onChange={(e)=>setHangman({...hangman, title: e.target.value})}/>
        <br/>
        <label htmlFor="Value">Value</label>
        <br/>
        <input type="number" id="Value" name="Value" value={hangman.value} onChange={(e)=>setHangman({...hangman, value: e.target.value})}/>
        <br/>
        <label htmlFor="Word">Word</label>
        <br/>
        <input type="text" id="Word" name="Word" value={hangman.word} onChange={(e)=>setHangman({...hangman, word: e.target.value})}/>
        <br/>
        <label htmlFor="Subject">Subject</label>
        <br/>
        <input type="text" id="Subject" name="Subject" value={hangman.subject} onChange={(e)=>setHangman({...hangman, subject: e.target.value})}/>
        <br/>
        <label htmlFor="Hint">Hint</label>
        <br/>
        <input type="text" id="Hint" name="Hint" value={hangman.hint} onChange={(e)=>setHangman({...hangman, hint: e.target.value})}/>
        <br/>

        <br/>

        <button onClick={()=> handleSubmitButton(hangman)} type="button" className="btn btn-primary submit" id="submit">Submit</button>
        <button onClick={()=> handleDeleteButton()} type="button" className="btn btn-dark submit" id="submit">Delete</button>
      </form>
      

    </div>);

}