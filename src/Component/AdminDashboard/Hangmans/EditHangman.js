import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'


export default function EditHangman(props) {

  const [hangman, setHangman] = useState({ id: 999, title: "", word: "", hint: "", value: 0, subject: "", content: "", hidden: true });
  const [missingParentData, setMissingParentData] = useState(false);
  const [completed, setCompleted] = useState(false);
 
  useEffect(() => {
    if (props.location.state) {
      setHangman(props.location.state)
    }
    else {
      setMissingParentData(true)
    }
  }, [])

  const handleHideClicked = () => {
    setHangman((prev) => ({...prev, hidden:!hangman.hidden }));
  };

  const handleSubmitButton = (hangman) => {
    if (hangman.title !== "" && hangman.word !== "" && hangman.hint !== "")
        if (missingParentData) {
          var todayDate = new Date().toISOString().slice(0, 10);
          fetch(`${window.ipAddress.ip}/Hangman/add`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                title: hangman.title,
                word: hangman.word.toUpperCase(),
                hint: hangman.hint,
                value: hangman.value,
                content: hangman.content,
                subject: hangman.subject,
                hidden: hangman.hidden,
                generatedDate: todayDate
              })
          })
            .then(res => res.json())
            .catch(error => {
              console.log("error: " + error);
            })
            .then((result) => {
              setCompleted(true)
            })
        }
        else {
          fetch(`${window.ipAddress.ip}/Hangman/update/${hangman.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                title: hangman.title,
                word: hangman.word.toUpperCase(),
                hint: hangman.hint,
                value: hangman.value,
                content: hangman.content,
                subject: hangman.subject,
                hidden: hangman.hidden,
                generatedDate: todayDate
              })
          })
            .then(res => res.json())
            .catch(error => {
              console.log("error: " + error);
            })
            .then((result) => {
              setCompleted(true)
            })
        }
  }

  const handleDeleteButton = () => {
    if (!missingParentData) {
      var id = props.location.state.id
      console.log(id)

      fetch(`${window.ipAddress.ip}/Hangman/delete/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => 
          {
            return res.json
        }
        )
        .catch(error => {
          console.log("error: " + error);
          
        })
        .then((result) => {
          setCompleted(true)
        })
    }
  }


  if (completed) {
    return (<Redirect to="/AdminDashboard"></Redirect>);
  }

  return (
    <div className='page'>
      <br />
      <h1>Hangman input / Edit Page</h1>
      <br /><br /><br />
      <form action="">
        <label htmlFor="Title">Title</label>
        <br />
        <input type="text" id="title" name="title" value={hangman.title} onChange={(e) => setHangman({ ...hangman, title: e.target.value })} />
        <br />
        <label htmlFor="Value">Value</label>
        <br />
        <input type="number" id="Value" name="Value" value={hangman.value} onChange={(e) => setHangman({ ...hangman, value: e.target.value })} />
        <br />
        <label htmlFor="Word">Word</label>
        <br />
        <input type="text" id="Word" name="Word" value={hangman.word} onChange={(e) => setHangman({ ...hangman, word: e.target.value })} />
        <br />
        <label htmlFor="Subject">Subject</label>
        <br />
        <input type="text" id="Subject" name="Subject" value={hangman.subject} onChange={(e) => setHangman({ ...hangman, subject: e.target.value })} />
        <br />
        <label htmlFor="Content">Content</label>
        <br />
        <input type="text" id="Content" name="Content" value={hangman.content} onChange={(e) => setHangman({ ...hangman, content: e.target.value })} />
        <br />
        <label htmlFor="Hint">Hint</label>
        <br />
        <input type="text" id="Hint" name="Hint" value={hangman.hint} onChange={(e) => setHangman({ ...hangman, hint: e.target.value })} />
        <br />

        <br />

        <label htmlFor="Title">HIDE </label>
        <input defaultValue={hangman.hidden} type="checkbox" className="form-check-input stuff" id="hidden"
          onChange={(e) => {handleHideClicked()}} />
          <p>Current status: {hangman.hidden ? "Hidden" : "Shown"}</p>

        <br/>

        <h4>PLEASE HIDE CONTENT OVER DELETION <br/> DELETION IS A LAST RESORT AND CAN BREAK SERVICE FOR ALL <br/> IF SOMETHING NEEDS DELETING CONSULT tjs1crt@bolton.ac.uk</h4>
                   

        <button onClick={() => handleSubmitButton(hangman)} type="button" className="btn btn-warning submit" id="submit">Submit</button>
        <button onClick={() => handleDeleteButton()} type="button" className="btn btn-dark submit" id="submit">Delete</button>
      </form>


    </div>);

}