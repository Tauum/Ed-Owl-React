import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom'

const INITIAL_DEFINITION_STATE = { title: "", value: 0, explaination: ""};

export default function EditMatch(props) {

  const [match, setMatch] = useState({ title: "", match:"", content:"", value: 0, hidden: true, definitions: [] });
  const [definition, setDefinition] = useState(INITIAL_DEFINITION_STATE);
  const [show, setShow] = useState(false);
  const [newDefinition, setNewDefinition] = useState(false);
  const [oldDefinitionId, setOldDefinitionId] = useState();

  const [completed, setCompleted] = useState(false);
  const [missingParentData, setMissingParentData] = useState(false);

  useEffect(() => {
    if (props.location.state) {
        console.log(props.location.state)
      setMatch(props.location.state)
    }
    else{
      setMissingParentData(true);
    }
  }, [])

  const finalize = () => {
    console.log(match)
    var todayDate = new Date().toISOString().slice(0, 10);
    if (missingParentData) {
      fetch(`${window.ipAddress.ip}/Match/add`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            title: match.title,
            subject: match.subject,
            content: match.content,
            value: match.value,
            hidden: match.hidden,
            definitions: match.definitions,
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
      fetch(`${window.ipAddress.ip}/Match/update/${match.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            title: match.title,
            subject: match.subject,
            timeLimit: match.timeLimit,
            value: match.value,
            content: match.content,
            hidden: match.hidden,
            definitions: match.definitions,
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

  };

  const handleDeleteMatchButton = () => {
    if (!missingParentData) {
      var id = props.location.state.id
      console.log(id)

      fetch(`${window.ipAddress.ip}/Match/delete/${id}`, {
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

  const handleHideClicked = () => {
    setMatch((prev) => ({...prev, hidden:!match.hidden }));
  }

  const editDefinitionButton = (definition) => {
    setDefinition(definition);
    setOldDefinitionId(match.definitions.indexOf(definition))
    setShow(true);
  }

  const addDefinitionButton = () => {
    setShow(true);
    setNewDefinition(true);
  }

  const removeDefinitionButton = (match, definition) => {
    var defintitionsOld = match.definitions;
    defintitionsOld.splice(defintitionsOld.indexOf(definition),1)
    setMatch((prev) => ({...prev, definitions: defintitionsOld}))
  }

  const handleSubmitDefinition = (definition) => {

    var fail = Boolean(false)
    // this condition is not being met so validation isnt good V
    if (definition.title === '' || definition.explaination === "" || definition.value < 1)
    {
        fail = true;
    }
    
    if (fail === false){
      if (newDefinition){
        setMatch((prev) => ({ ...prev, definitions: prev.definitions.concat(definition) }));
        setDefinition(INITIAL_DEFINITION_STATE);
        setNewDefinition(false);
        setShow(false);
      }
      else{
        const oldDefinitions = match.definitions;
        oldDefinitions[oldDefinitionId] = definition;
        setMatch((prev)=> ({...prev, definitions: oldDefinitions}))
        setDefinition(INITIAL_DEFINITION_STATE);
        setShow(false);
        }
    }
}

    const printInfo = () => {
    console.log(match)
    console.log(definition)
    }


  if (completed){
    return (<Redirect to="/AdminDashboard"></Redirect>);
  }

  else{
    return (
      <div className="page">
        <br />
        <h1>Match input / Edit Page</h1>

        <form>
          <label htmlFor="Title">Title</label>
          <br />
          <input type="text" id="title" name="title" required="required"
          value={match.title} onChange={(e) => setMatch({ ...match, title: e.target.value })}/>
          <br />
          <label htmlFor="Subject">Subject</label>
          <br />
          <input type="text" id="subject" name="subject" required="required"
          value={match.subject} onChange={(e) => setMatch({ ...match, subject: e.target.value })}/>
          <br />
          <label htmlFor="Content">Content</label>
          <br />
          <input type="text" id="content" name="content" required="required"
          value={match.content} onChange={(e) => setMatch({ ...match, content: e.target.value })}/>
          <br />
          <label htmlFor="Value">Value (Set to all question value combined)</label>
          <br />
          <input type="number" id="Value" name="Value" required="required"
          value={match.value} onChange={(e) => setMatch({ ...match, value: e.target.value })} />
          <br/>
          <label htmlFor="Title">HIDE </label>
          <input defaultValue={match.hidden} type="checkbox" className="form-check-input stuff" id="hidden"
          onChange={(e) => {handleHideClicked()}} />
          <p>Current status: {match.hidden ? "Hidden" : "Shown" }</p>
        </form>     
        <h4>PLEASE HIDE CONTENT OVER DELETION <br /> DELETION IS A LAST RESORT AND CAN BREAK SERVICE FOR ALL <br /> IF SOMETHING NEEDS DELETING CONSULT tjs1crt@bolton.ac.uk</h4>
        <br />
        <h2>Definitions</h2>
        
        <Button className="btn btn-warning submit" onClick={() => addDefinitionButton()}>Add Definition</Button>
        <Button className="btn btn-dark submit" onClick={() => printInfo()}>Print info</Button>

        {match.definitions.map((definition, index) => (
          <div key={index}>
            Defininition: {definition.title} = {definition.explaination}
            <button onClick={() => editDefinitionButton(definition)}> Edit Definition </button>
            <button onClick={() => removeDefinitionButton(match, definition)}> Remove Definition </button>
          </div>
        ))}

        <br /> <br />
      <Button className="btn btn-warning submit" onClick={() => finalize()}> Submit Definition</Button>

      <Button className="btn btn-dark submit" onClick={() => handleDeleteMatchButton()}> Delete Definition</Button>
      
      <Modal show={show} backdrop="static" keyboard={false} state={definition}>
          <Modal.Header>
            <Modal.Title>Adding Question Form</Modal.Title>
          </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="question">Definition</label>
              <input value={definition.title} onChange={(e) => setDefinition({ ...definition, title: e.target.value }) }
              type="text" className="form-control stuff" id="question" placeholder="Enter question name" required="required"/>
            </div>

            <div className="form-group">
              <label htmlFor="explaination">Explaination</label>
              <input
              value={definition.explaination} onChange={(e) => setDefinition({ ...definition, explaination: e.target.value }) }
              type="text" className="form-control stuff" id="explaination" placeholder="Enter Correct Explaination" required="required"/>
            </div>

            <div className="form-group">
              <label htmlFor="value">Value</label>
              <input value={definition.value} onChange={(e) => setDefinition({ ...definition, value: e.target.value }) }
              type="number"  className="form-control stuff" id="value" required="required"/>
            </div>
          </form>
                </Modal.Body>

            <Modal.Footer>
            <Button type="submit" className="btn btn-dark" onClick={() => setShow(false)} > Close </Button>
            <Button  onClick={() => (handleSubmitDefinition(definition))} type="button" className="btn btn-warning submit" id="submit" > Submit </Button>
            </Modal.Footer>
        </Modal>
        </div>
        );
    }
}

