import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom'
import React, { Component } from "react";
import { useEffect, useState } from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import Countdown from "react-countdown";

import './Quiz.css';

export default function Quiz(props) {

  const [quiz, setQuiz] = useState('')
  const [submittedQuiz, setSubmittedQuiz] = useState("")
  const [questionList, setQuestionList] = useState([]);
  const [executedSet, setExecutedSet] = useState(false);
  const [current, setCurrent] = useState(0);
  const [timeLimit, setTimeLimit] = useState('');
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const [coppied, setCoppied] = useState(false);
  const [result, setResult] = useState(0);
  const [show, setShow] = useState(false);
  const [resultPercentage, setResultPercentage] = useState(0);
  const [submittedQuestions, setSubmittedQuestions] = useState([])

  const [totalScore, setTotalScore] = useState(0)


  const [missingParentData, setMissingParentData] = useState();

  useEffect(() => {
    if (props.location.state) {
      setQuiz(props.location.state)
      setQuestionList(props.location.state.questions)
      setTimeLimit((props.location.state.timeLimit * 1000) + Date.now()) // 1000 = seconds
      setExecutedSet(true)
    }
    else {
      setMissingParentData(true)
    }
  }, [])

  // this submits the result
  useEffect(() => {
    if (submitQuiz) {
      setSubmittedQuiz({
        user: window.BackendUser, quiz: quiz, submittedQuestions: submittedQuestions,
        score: quiz.value, submissionDate: currentDate, timeTaken: 0
      })

      var currentDate = new Date()
      fetch(`${window.ipAddress.ip}/SubmittedQuiz/add`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            user: window.BackendUser,
            quiz: quiz,
            submittedQuestions: submittedQuestions,
            score: totalScore,
            generatedDate: currentDate,
            timeTaken: 0
          })
      })
        .then(res => res.json())
        .catch(error => {
          console.log("error: " + error);
        })
        .then((result) => {
          setShow(true)
        })
    }
  }, [submitQuiz])


  function storeQuestion(answer) {
    var question = questionList[current]
    var score = 0
    if (answer.correct === true) {
      score = question.value
      setTotalScore(prev => prev + question.value)
      console.log(totalScore)
    }
    var submittedQuestion =
    {
      question: question.question,
      answer: answer.content,
      explaination: question.explaination,
      correct: answer.correct,
      score: score,
      // timeTaken : Date.now(), // this doesnt work
      coppied: coppied
    }
    submittedQuestions.push(submittedQuestion)
    
    setCoppied(false)
  }

  const handleAnswerButton = (answer) => {
    storeQuestion(answer)
    if (answer.correct) { setResult(result + 1); }
    const next = current + 1;
    if (next < questionList.length) { setCurrent(next); }
    else { finalize() }
  };

  function finalize() { // this cuts the quiz via time here
    setSubmitQuiz(true) //post request here
    setResultPercentage((result / questionList.length).toFixed(2) * 100)                                                       // this needs doing
    // ^ this doesnt display correctly, it misses the last question unless waiting a few seconds then updates correctly
    setShow(true)
  }

  const handleCopy = (e) => { // stores if the question was coppied
    setCoppied(true);
    console.log("coppied")
  }

  const Completionist = () => <h4><span>Time has run out!</span></h4>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) { return <Completionist />; }
    else { return <h4><span>{hours}:{minutes}:{seconds}</span></h4>; } // Render countdown
  };

  if (missingParentData === true) {
    return (<Redirect to="/Dashboard2"></Redirect>);
  }

  if (executedSet) {
    return (
      <div className='quiz-main body'>
        <br /> <br /> <br /> <br />
        <div className='quiz-container'>

          <Countdown date={timeLimit} onComplete={finalize} className='timer'>
            <Completionist />
          </Countdown>

          <div className='question'>
            <h4><span>Question {current + 1}</span>/{questionList.length}</h4>
            <div className='question-text' onCopy={handleCopy}>
              <h2>{questionList[current].question}</h2>
            </div>
          </div>

          <div className='answer'>
            <ul>
              {questionList[current].answers.map((answer, index) => (
                <li key={index}>
                  <Button className='shadow btn-dark button-quiz' onClick={() => handleAnswerButton(answer)}>
                    <h3 className='answer-text'>{answer.content}</h3>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* V this shows when quiz is complete */}
          <Modal className="article-modal" show={show}>
            <div className="card text-center shadow">
              <div className="card-header">
                <div className="card-body">
                  <h4 className="card-title"> Your result is {resultPercentage} %  <br /> ( {result} of {questionList.length} ) </h4>
                </div>
                <ProgressBar className='progress-bar-success' animated now={resultPercentage} />
                <br />
                <h5> It took you: (insert time here) to complete! </h5>                                                                         {/* this needs doing */}
                <br />
                <div className="card-footer text-muted">
                  You may re-attempt by returning and re-entering the same task. <br/> Alternatively you can view your results by clicking review
                </div>
                <br />
                <Link to="/Dashboard2"><Button variant="btn btn-dark otherbutton">Return</Button></Link>

                <Link to={{ pathname: "/QuizReview", state: submittedQuiz }}> <Button variant="btn btn-warning otherbutton">Review</Button> </Link>

              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }

  else {
    return (
      <div className='app'>
        aaaa
      </div>

    );
  }

}


