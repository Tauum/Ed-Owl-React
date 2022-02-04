import { Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function Note() {

    const [notes, setNotes] = useState([])
    const [submitNote, setSubmitNote] = useState({ content: ""})
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch(`${window.ipAddress.ip}/Note/GetAllForUser/${window.BackendUser.id}`)
        .then(response => response.json())
        .then(json => {
            setNotes(json);
        })

    },[])

    useEffect(() => {
        if (refresh){
            fetch(`${window.ipAddress.ip}/Note/GetAllForUser/${window.BackendUser.id}`)
            .then(response => response.json())
            .then(json => {
                setNotes(json);
            })
            setRefresh(false)
        }

    },[refresh])



    function DeleteNote(note){
        fetch(`${window.ipAddress.ip}/Note/delete/${note.id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
          })
        .then(response => { setRefresh(true) })
    }

    function SubmitNote(submitNote){
        if (submitNote.content !== "" && submitNote.content.length < 80 ) {
            fetch(`${window.ipAddress.ip}/Note/add`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                {
                    content: submitNote.content,
                    userId: window.BackendUser.id,
                    userEmail: window.BackendUser.email
                })
            })
            .then(res => res.json())
            .catch(error => {
            console.log("error: " + error);
            })

            setSubmitNote({...submitNote, content:""})
            setRefresh(true)
        }
    }

    return (
        <div className='nav-note-complete'>
                <Form className="d-flex nav-note-form">
                    <input type="text" id="title" name="title" className='nav-note-input' value={submitNote.content}
                    onChange={(e) => setSubmitNote({...submitNote, content: e.target.value })} max="10" />
                    <Button variant="outline-secondary" className="nav-note-submit btn-warning" onClick={() => { SubmitNote(submitNote) }} >Add</Button>
                </Form>
            <ul className='nav-note-list'>
            {notes.map((note, index)=>(
                <li key={index} className='note-elemenet' >{index +1} - {note.content} 
                    <Button className="btn-close nav-note-delete" onClick={() => { DeleteNote(note) }}> </Button>
                </li>
            ))}
            </ul>
        </div>
    );
}