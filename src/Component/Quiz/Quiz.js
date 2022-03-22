import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom'
import React from "react";
import { useEffect, useState } from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import Countdown from "react-countdown";

import './Quiz.css';

export default function Quiz(props) {

  const [quiz, setQuiz] = useState('')
  const [submittedQuiz, setSubmittedQuiz] = useState(false)
  const [questionList, setQuestionList] = useState([]);
  const [executedSet, setExecutedSet] = useState(false);
  const [current, setCurrent] = useState(0);
  const [timeLimit, setTimeLimit] = useState('');
  const [coppied, setCoppied] = useState(false);
  const [scoreTotal, setScoreTotal] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [show, setShow] = useState(false);
  const [submittedQuestions, setSubmittedQuestions] = useState([])
  const [submitQuizCondition, setSubmitQuizCondition] = useState(false)

  const[rating, setRating] = useState(true)

  const [missingParentData, setMissingParentData] = useState();
  const [initialDate, setInitialDate]=useState()
  
  const [timeTaken, setTimeTaken] = useState()

  useEffect(() => {
    if (props.location.state) {
      window.scrollTo(0, 0)
      setQuiz(props.location.state)
      setQuestionList(props.location.state.questions)
      var startDate = Date()
      setInitialDate(startDate)
      setTimeLimit((props.location.state.timeLimit * 1000) + Date.now()) // 1000 = seconds
      setExecutedSet(true)
    }
    else {
      setMissingParentData(true)
      window.scrollTo(0, 0)
    }
  }, [])

  const handleCopy = (e) => { // stores if the question was coppied
    setCoppied(true);
  }

  const handleAnswerButton = (question, answer) => {
    storeQuestion(answer)
    if (answer.correct) {
      setScoreTotal(prevScore => prevScore + question.value);
      setCorrectAnswers(prevScore => prevScore + 1);
      //  setScoreTotal(scoreTotal + 1);
       }
    const next = current + 1;
    if (next < questionList.length) { setCurrent(next); }
    else { finalize() }
  };
  
  const Completionist = () => <h4><span>Time has run out!</span></h4>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) { return <Completionist />; }
    else { return <h4><span>{hours}:{minutes}:{seconds}</span></h4>; } // Render countdown
  };

  useEffect(() => {
    if(submitQuizCondition){
      var val = scoreTotal
      var currentDate = new Date()
      var initial = new Date(initialDate) 
      var difference = Math.round((currentDate - initial) / 1000);
      
      setTimeTaken(difference)
      
      fetch(`${window.ipAddress.ip}/SubmittedQuiz/add`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            user: window.BackendUser,
            quizTitle : quiz.title,
            quizValue: quiz.value,
            quizSubject: quiz.subject,
            quizTimeLimit: quiz.timeLimit,
            submittedQuestions: submittedQuestions,
            quizId: quiz.id,
            rating: true,

            score: scoreTotal,
            generatedDate: currentDate,
            timeTaken: difference
          })
      })
        .then(res => res.json())
        .catch(error => {
          console.log("error: " + error);
        })
        .then((result) => {
          setShow(true)
          setSubmittedQuiz(result)
        })
    }
  }, [scoreTotal, submitQuizCondition])

  function finalize() { // this cuts the quiz via time here
    setSubmitQuizCondition(true)
  }

  const HandleRatingClicked = () =>  {
    setRating(!rating)
  }

  useEffect(() => {
    if (submittedQuiz !== false){
      fetch(`${window.ipAddress.ip}/SubmittedQuiz/vote/${submittedQuiz.id}/${rating}`,{ method: "PATCH"})
    }
},[rating])

  function storeQuestion(answer) {
    var question = questionList[current]
    var score = 0;
    if (answer.correct === true) {
      score = question.value
    }
    var submittedQuestion =
    {
      questionId: question.id,
      question: question.question,
      answerId: answer.id,
      answer: answer.content,
      explaination: question.explaination,
      correct: answer.correct,
      score: score,
      questionValue: question.value,
      // timeTaken : Date.now(), // this doesnt work
      coppied: coppied
    }
    submittedQuestions.push(submittedQuestion)
    
    setCoppied(false)
  }


  if (missingParentData === true) {
    return (<Redirect to="/Dashboard"></Redirect>);
  }

  if (executedSet) {

    
    const resultPercentage = ((correctAnswers / questionList.length) * 100).toFixed(2)
    return (
      <div className='quiz-main body'>
        <br /> <br /> <br /> <br />
        <div className='quiz-container'>

          <Countdown date={timeLimit} onComplete={finalize} controlled={false} className='timer' id="timer">
            <Completionist />
          </Countdown>

          <div className='question'>
            <h5><span>Question {current + 1}</span>/{questionList.length}</h5>
            <div className='question-text' onCopy={handleCopy}>
              <h2>{questionList[current].question}</h2>
            </div>
          </div>

          <div className='answer'>
            <ul>
              {questionList[current].answers.map((answer, index) => (
                <li key={index}>
                  <Button className='shadow btn-dark button-quiz' onClick={() => handleAnswerButton(questionList[current], answer)}>
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
                  <h4 className="card-title"> Your result is {resultPercentage} % <br/> ( {correctAnswers} of {questionList.length} ) </h4>
                </div>
                <ProgressBar className='progress-bar-success' animated now={resultPercentage} />
                <h5> It took: {timeTaken} Seconds to complete! </h5>         
                
                { resultPercentage >= 0 && resultPercentage <= 16 ? <img className="shadow emoj" src="/Image/0-16.svg" alt="" /> : <div></div>  }
                { resultPercentage >= 17 && resultPercentage <= 33 ? <div><img className="shadow emoj" src="/Image/17-33.svg" alt="" /></div> : <div></div>  }
                { resultPercentage >= 34 && resultPercentage <= 50 ? <div><img className="shadow emoj" src="/Image/34-50.svg" alt="" /></div> : <div></div>  }
                { resultPercentage >= 51 && resultPercentage <= 66 ? <div><img className="shadow emoj" src="/Image/51-66.svg" alt="" /></div> : <div></div>  }
                { resultPercentage >= 67 && resultPercentage <= 83 ? <div><img className="shadow emoj" src="/Image/67-83.svg" alt="" /></div> : <div></div>  }
                { resultPercentage >= 84 && resultPercentage <= 100 ? <div><img className="shadow emoj" src="/Image/84-100.svg" alt="" /></div> : <div></div>  }

                <div className='rating-container'>
                  <h5>Cast your vote</h5>
                  <div onClick={HandleRatingClicked}>
                    { rating === true ? 
                    <img className="shadow emoj rating-button rating-up" src="/Image/thumb-up.svg" alt="" />
                    :
                    <img className="shadow emoj rating-button rating-down" src="/Image/thumb-down.svg" alt="" />
                    }
                  </div>
                </div>

                {quiz.content !== null ? 
                                    <div className="card-footer text-muted"> 
                                        <div>{quiz.content}</div> 
                                    </div>
                                : <div></div>}

                <Link to="/Dashboard"><Button variant="btn btn-dark otherbutton">Return</Button></Link>

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


