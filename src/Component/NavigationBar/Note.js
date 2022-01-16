import { Button, Form, FormControl } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function Note({parentToChild}) {

    const [deleteNote, setDeleteNote]=useState()
    const [deleteNoteCondition, setDeleteNoteCondition] = useState(false)
    const [submitNote, setSubmitNote]=useState({content:""})
    const [submitNoteCondition, setSubmitNoteCondition]=useState(false)
    const [parentToChildData, setParentToChildData] = useState(parentToChild)
    const [refresh, setRefresh]=useState(false)


    useEffect(() => {
        if (deleteNoteCondition){

            fetch(`${window.ipAddress.ip}/Note/delete/${deleteNote.id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
              })
            .then(res => res.json())
            .catch(error => {
                console.log("error: " + error);
            }).then((result) => {
                setDeleteNoteCondition(false)
                setRefresh(true)
                return result})
        }
    }, [deleteNoteCondition])


      useEffect(() => {
         if (submitNoteCondition && submitNote.content !== "" && submitNote.content.length < 80 ) {
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
            .then((result) => {
                setSubmitNote(false)
                setRefresh(true)
            })
            }
    }, [submitNoteCondition])

    function DeleteNote(note){
        setDeleteNote(note)
        setDeleteNoteCondition(true)
    }

    function SubmitNote(note){
        setSubmitNote(note)
        setSubmitNoteCondition(true)
    }

    
    return (
        <div className='nav-note-complete'>
                <Form className="d-flex nav-note-form">
                <br />
                <input type="text" id="title" name="title" className='nav-note-input' value={submitNote.content}
                 onChange={(e) => setSubmitNote({ ...submitNote, content: e.target.value })} max="10" />
                <br />
                  {/* <FormControl type="Add" placeholder="Enter a note" className="me-2"  aria-label="Add"  /> */}

                  <Button variant="outline-secondary" className="nav-note-submit btn-warning" onClick={() => { SubmitNote(submitNote) }} >Add</Button>

                </Form>
            <ul className='nav-note-list'>
            {parentToChild.map((note, index)=>(
                <li key={index} className='note-elemenet' >{index +1} - {note.content} <Button className="btn-close nav-note-delete" onClick={() => { DeleteNote(note) }}></Button></li>
            ))}
            </ul>
        </div>
        );

}