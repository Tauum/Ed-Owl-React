import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

export default function EditBlog(props) {

  const [post, setPost] = useState({ id: 999, title: "", author: "", video: "", summary: "", content: "", generatedDate: "", hidden: true });
  
  const [submitPost, setSubmitPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [missingParentData, setMissingParentData] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state)
      setPost(props.location.state)

    }
    else {
      setMissingParentData(true)
    }
  }, [])

  const handleHideClicked = () => {
    setPost((prev) => ({...prev, hidden:!post.hidden }));
  };
  
  //this submits the result
  useEffect(() => {
    if (submitPost) {
      if (post.title !== "" && post.content !== "" && post.author !== "")
        if (missingParentData) {
          var todayDate = new Date().toISOString().slice(0, 10);
          fetch(`${window.ipAddress.ip}/Post/add`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                title: post.title,
                summary: post.summary,
                author: post.author,
                video: post.video,
                content: post.content,
                creation: todayDate,
                hidden: post.hidden
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
          fetch(`${window.ipAddress.ip}/Post/update/${post.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                title: post.title,
                summary: post.summary,
                author: post.author,
                video: post.video,
                content: post.content,
                hidden: post.hidden
              })
          })
            .then(res => res.json())
            .catch(error => {
              console.log("error: " + error);
            })
            .then((result) => {
              console.log(post)
              setCompleted(true)
            })

        }
    }
  }, [submitPost])

  useEffect(() => {
    if (deletePost) {
      if (!missingParentData) {
        var id = props.location.state.id

        fetch(`${window.ipAddress.ip}/Post/delete/${id}`, {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' }
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
  }, [deletePost])

  const handleSubmitButton = (post) => {
    setSubmitPost(true)
  }

  const handleDeleteButton = (post) => {
    setDeletePost(true)
  }

  if (completed === true) {
    return (<Redirect to="/AdminDashboard"></Redirect>);
  }

  return (
    <div className='page'>
      <br />
      <h1>Blog input / Edit Page</h1>
      <br />
      <form action="">

        <label htmlFor="Title">Title</label>
        <br />
        <input type="text" id="title" name="title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
        <br />

        <label htmlFor="Title">Author</label>
        <br />
        <input type="text" id="author" name="author" value={post.author} onChange={(e) => setPost({ ...post, author: e.target.value })} />
        <br />

        <label htmlFor="Title">Youtube Video link</label>
        <br />

        <textarea name="video" id="video" cols="50" rows="2" value={post.video} placeholder="eg: https://www.youtube.com/embed/k8x3ppanVwo"
          onChange={(e) => setPost({ ...post, video: e.target.value })}></textarea>

        <p>You must take a link, eg: https://www.youtube.com/watch?v=k8x3ppanVwo</p>
        <p>change the watch of the link to embed, eg: https://www.youtube.com/embed/k8x3ppanVwo</p>

        <label htmlFor="Title">Summary</label>
        <br />
        <textarea name="summary" id="summary" cols="60" rows="2" value={post.summary} placeholder="example"
          onChange={(e) => setPost({ ...post, summary: e.target.value })}></textarea>
        <br />

        <label htmlFor="Title">Main content</label>
        <br />
        <textarea name="content" id="content" cols="60" rows="7" value={post.content} placeholder="example"
          onChange={(e) => setPost({ ...post, content: e.target.value })}></textarea>

        <br />

        <label htmlFor="Title">HIDE </label>
          <input defaultValue={post.hidden} type="checkbox" className="form-check-input stuff" id="hidden"
          onChange={(e) => {handleHideClicked()}} />
          <p>Current status: {post.hidden ? "Hidden" : "Shown" }</p>

        <br/>

        <h4>PLEASE HIDE CONTENT OVER DELETION <br/> DELETION IS A LAST RESORT AND CAN BREAK SERVICE FOR ALL <br/> IF SOMETHING NEEDS DELETING CONSULT tjs1crt@bolton.ac.uk</h4>
                            

        <button onClick={() => handleSubmitButton(post)} type="button" className="btn btn-primary submit" id="submit">Submit</button>
        <button onClick={() => handleDeleteButton()} type="button" className="btn btn-dark submit" id="submit">Delete</button>
      </form>
    </div>
  );

}