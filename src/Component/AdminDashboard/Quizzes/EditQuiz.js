import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom'

const INITIAL_QUESTION_STATE = { question: "", value: 0, explaination: "",  answers: Array.from({ length: 2 }, () => ({  content: "", correct: false }))};

export default function EditQuiz(props) {

  const [quiz, setQuiz] = useState({ title: "", subject:"", timeLimit: 0, value: 0, hidden: true, questions: [] });
  const [question, setQuestion] = useState(INITIAL_QUESTION_STATE);
  const [show, setShow] = useState(false);
  const [newQuestion, setNewQuestion] = useState(false);
  const [oldQuestionId, setOldQuestionId] = useState();

  const [completed, setCompleted] = useState(false);
  const [missingParentData, setMissingParentData] = useState(false);

  useEffect(() => {
    if (props.location.state) {
      console.log(props.location.state)
      setQuiz(props.location.state)
    }
    else{
      setMissingParentData(true);
    }
  }, [])


  const finalize = () => {
    console.log(quiz)
    var todayDate = new Date().toISOString().slice(0, 10);
    if (missingParentData) {
      fetch(`${window.ipAddress.ip}/Quiz/add`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            title: quiz.title,
            timeLimit: quiz.timeLimit,
            subject:quiz.subject,
            value: quiz.value,
            hidden: quiz.hidden,
            questions: quiz.questions,
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
      fetch(`${window.ipAddress.ip}/Quiz/update/${quiz.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            title: quiz.title,
            timeLimit: quiz.timeLimit,
            value: quiz.value,
            subject: quiz.subject,
            hidden: quiz.hidden,
            questions: quiz.questions,
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

  const handleDeleteQuizButton = () => {
    if (!missingParentData) {
      var id = props.location.state.id
      fetch(`${window.ipAddress.ip}/Quiz/delete/${id}`, {
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
    setQuiz((prev) => ({...prev, hidden:!quiz.hidden }));
  };

  const handleCorrectClicked = () => {
    setQuiz((prev) => ({...prev, hidden:!quiz.hidden }));
  };

  const editQuestionButton = (question) => {
    setQuestion(question);
    setOldQuestionId(quiz.questions.indexOf(question))
    setShow(true);
  };

  const addQuestionButton = () => {
    setShow(true);
    setNewQuestion(true);
  };

  const addAnswerButton = () => {
    setQuestion((prev) => ({ ...question, answers: prev.answers.concat({ content: "", correct: false }) } ))
  };

  const removeAnswerButton = (question, answer) => {
    var answersOld = question.answers;
    answersOld.splice(answersOld.indexOf(answer),1)
    setQuestion({...question, answers: answersOld})
  };

  const removeQuestionButton = (quiz, question) => {
    var questionsOld = quiz.questions;
    questionsOld.splice(questionsOld.indexOf(question),1)
    setQuiz((prev) => ({...prev, questions: questionsOld}))
  };

  const handleSubmitQuestion = (question) => {

    var fail = Boolean(false)
    // this condition is not being met so validation isnt good V
    for (let i = 0; i < question.answers; i++) 
    {
      console.log(question.answers[i])
      if (question.answers[i].content = '')
      {
          fail = true;
      }
    }

    if (fail === false){
      if (newQuestion){
        setQuiz((prev) => ({ ...prev, questions: prev.questions.concat(question) }));
        setQuestion(INITIAL_QUESTION_STATE);
        setNewQuestion(false);
        setShow(false);
      }
      else{
        const oldQuestions = quiz.questions;
        oldQuestions[oldQuestionId] = question;
        setQuiz((prev)=> ({...prev, questions: oldQuestions}))
        setQuestion(INITIAL_QUESTION_STATE);
        setShow(false);
        }
    }
  };

    const printInfo = () => {
    console.log(quiz)
    console.log(question)
    }


    if (completed){
      return (<Redirect to="/AdminDashboard"></Redirect>);
    }
    else{
      return (
        <div className="page">
          
          <br />
          <h1>Quiz input / Edit Page</h1>

          <form>
            <label htmlFor="Title">Title</label>
            <br />
            <input type="text" id="title" name="title" required="required"
            value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}/>
            <br />            
            <label htmlFor="Subject">Subject</label>
            <br />
            <input type="text" id="subject" name="title" required="required"
            value={quiz.subject} onChange={(e) => setQuiz({ ...quiz, subject: e.target.value })}/>
            <br />
            <label htmlFor="Time-limit">Time limit (seconds)</label>
            <br />
            <input type="number" id="Time-limit" name="Time-limit" required="required"
            value={quiz.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })} />
            <br />
            <label htmlFor="Value">Value (Set to all question value combined)</label>
            <br />
            <input type="number" id="Value" name="Value" required="required"
            value={quiz.value} onChange={(e) => setQuiz({ ...quiz, value: e.target.value })} />
            <br/>
            <label htmlFor="Title">HIDE </label>
            <input defaultValue={quiz.hidden} type="checkbox" className="form-check-input stuff" id="hidden"
            onChange={(e) => {handleHideClicked()}} />
            <p>Current status: {quiz.hidden ? "Hidden" : "Shown" }</p>
          </form>     
          <h4>PLEASE HIDE CONTENT OVER DELETION <br /> DELETION IS A LAST RESORT <br /> IF SOMETHING NEEDS DELETING CONSULT tjs1crt@bolton.ac.uk</h4>
          <br />
          <h2>Questions</h2>
          
          <Button className="btn btn-warning submit" onClick={() => addQuestionButton()}>Add Question</Button>
          <Button className="btn btn-dark submit" onClick={() => printInfo()}>Print info</Button>

          {quiz.questions.map((question, index) => (
            <div key={index}>
              Question: {question.question}
              <button onClick={() => editQuestionButton(question)}> Edit Question </button>
              <button onClick={() => removeQuestionButton(quiz, question)}> Remove Question </button>
            </div>
          ))}

          <br /> <br />
        <Button className="btn btn-warning submit" onClick={() => finalize()}> Submit Quiz</Button>

        <Button className="btn btn-dark submit" onClick={() => handleDeleteQuizButton()}> Delete Quiz</Button>
        
        <Modal show={show} backdrop="static" keyboard={false} state={question}>
            <Modal.Header>
              <Modal.Title>Adding Question Form</Modal.Title>
            </Modal.Header>

          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="question">Question</label>
                <input value={question.question} onChange={(e) => setQuestion({ ...question, question: e.target.value }) }
                type="text" className="form-control stuff" id="question" placeholder="Enter question name" required="required"/>
              </div>

              <div className="form-group">
                <label htmlFor="value">Value</label>
                <input value={question.value} onChange={(e) => setQuestion({ ...question, value: e.target.value }) }
                type="number"  className="form-control stuff" id="value" required="required"/>
              </div>

              <div className="form-group">
                <label htmlFor="explaination">Explaination</label>
                <input
                value={question.explaination} onChange={(e) => setQuestion({ ...question, explaination: e.target.value }) }
                type="text" className="form-control stuff" id="explaination" placeholder="Enter Correct Explaination" required="required"/>
              </div>

              <br/>
              Minimum answers required (2)<br/>Do not leave an answer blank (remove if un-needed)!
              <br/>
              <Button onClick={addAnswerButton}>Add Answer</Button>
              {question.answers.map((answer, index) => (
                <div key={index}>

                  <label htmlFor="explaination">Answer {index + 1} - </label>

                  <input defaultValue={answer.correct} type="checkbox" className="form-check-input stuff" id="hidden"
                  onChange={(e) => setQuestion((prev) => ({ ...prev, answers: prev.answers.map((answer, i) =>
                  index === i ? { ...answer, correct: !answer.correct } : answer ) })) } />

                  <label htmlFor="correct answer">Current status: {answer.correct ? "Correct" : "False" }</label>
              
                  <button onClick={() => (removeAnswerButton(question, answer))}>Remove </button>

                  <input onChange={(e) =>  setQuestion((prev) => ({ ...prev, answers: prev.answers.map((answer, i) =>
                  index === i ? { ...answer, content: e.target.value } : answer ) })) } 
                  value={answer.content}
                  type="text" className="form-control stuff" id="explaination" placeholder="Enter answer display words" required="required"/>

                </div>
              ))}
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" className="btn btn-dark" onClick={() => { setQuestion(INITIAL_QUESTION_STATE); setShow(false)} } > Close  </Button>
            <Button  onClick={() => (handleSubmitQuestion(question))} type="button" className="btn btn-warning submit" id="submit" > Submit </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
