import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'


export default function EditAnnouncement(props) {

  const [announcement, setAnnouncement] = useState({ id: "", content: "", generatedDate: "" });
  const [missingParentData, setMissingParentData] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [content, setContent] = useState(false)

  useEffect(() => {
    if (props.location.state) {
      setAnnouncement(props.location.state)

    }
    else {
      setMissingParentData(true)
    }
    setContent(true)
  }, [])

  const handleSubmitButton = (announcement) => {
    if (announcement.content !== "")
      if (missingParentData) {
        var todayDate = new Date().toISOString().slice(0, 10);
        fetch(`${window.ipAddress.ip}/Announcement/add`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              content: announcement.content,
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
        var todayDate = new Date().toISOString().slice(0, 10);
        fetch(`${window.ipAddress.ip}/Announcement/update/${announcement.id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              content: announcement.content,
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

  const handleDeleteButton = (announcement) => {
    if (!missingParentData) {
      var id = props.location.state.id
      console.log(id)

      fetch(`${window.ipAddress.ip}/Announcement/delete/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => {
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


  if (completed === true) {
    return (<Redirect to="/AdminDashboard"></Redirect>);
  }

  if (content) {
    return (
      <div className='page'>
        <br/>
        <h1>Announcement input / Edit Page</h1>
        <br/><br/><br/>
        <form action="">
          <label htmlFor="Content">Content</label>
          <br/>
          <input type="text" id="content" name="content" value={announcement.content} onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })} />
          <br/><br/>
          <button onClick={() => handleSubmitButton(announcement)} type="button" className="btn btn-primary submit" id="submit">Submit</button>
          <button onClick={() => handleDeleteButton()} type="button" className="btn btn-dark submit" id="submit">Delete</button>
        </form>
        <br/><br/>
      </div>);
  }
  else {
    return (
      <div>

      </div>
    );
  }
}