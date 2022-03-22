import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom'
import React from "react";
import { useEffect, useState } from 'react';

import "./QuizReview.css"

export default function QuizReview(props) {

  const [submittedQuiz, setSubmittedQuiz] = useState('')
  const [executedSet, setExecutedSet] = useState(false);

  const [missingParentData, setMissingParentData] = useState();

  useEffect(() => {
    if (props.location.state) {
      setSubmittedQuiz(props.location.state)
      setExecutedSet(true)
      window.scrollTo(0, 0)
    }
    else {
      setMissingParentData(true)
      window.scrollTo(0, 0)
    }
  }, [])

  if (missingParentData === true) {
    return (<Redirect to="/Dashboard"></Redirect>);
  }

  if (executedSet) {
    return (
      <div className='quiz-review-main'>

        <div className='quiz-review-container'>
          <h1>{submittedQuiz.quizTitle} - Quiz Review</h1>
          <br />
          Score: {submittedQuiz.score} / {submittedQuiz.quizValue}
          <br /> <br />
          Time: {submittedQuiz.timeTaken} / {submittedQuiz.quizTimeLimit} Seconds
          <br /> <br /> <br />
          <div className='review-question-list'>
            {submittedQuiz.submittedQuestions.map((submittedQuestion, index) => (
              <div key={index}>
Question {index + 1}
                <li className="review-question-entries" >
                    <div>
                      <div className="" data-label="question"> Worth {submittedQuestion.questionValue} </div>
                      <div className="" data-label="question">{submittedQuestion.question}</div>
                    </div>
                    
                    <div></div>
                  <br />

                  {submittedQuestion.answer ? <div>You answered: <br /> {submittedQuestion.answer}</div> : <div></div>}

                  <br />

                  {submittedQuestion.correct === true
                    ?
                    <div>This is Correct! :D</div>
                    : <div>This is Incorrect :( </div>
                  }

                  <br />
                  <div>{submittedQuestion.explaination ? submittedQuestion.explaination : <div></div>}</div>

                </li>
              </div>
            ))}

          </div>
        </div>
        <br />
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


