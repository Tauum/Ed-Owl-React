import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from "react";
import { useEffect, useState} from 'react';
import { Button} from 'react-bootstrap';

export default function Quiz() {

  var passedid = 1; //need to replace this with passed quiz ID
  const [quiz, setQuiz ]=useState('')
  const [executedFetch, setExecutedFetch]=useState('')

  useEffect(() => {
    fetch(`${window.ipAddress.ip}/Quiz/${passedid}`)
    .then(response => response.json())
    .then(json => { 
      console.log(json)
      setQuiz(json)
      setExecutedFetch(true)
     })
  },[]) 

  const [questionList, setQuestionList]=useState([])
  const [executedSet, setExecutedSet]=useState('')
  const [current, setCurrent] = useState(0);

  useEffect(() => {

    if (executedFetch){
      setQuestionList("quiz.question")
      setQuestionList(quiz.questions)
      setExecutedSet(true)
    }
  })

	const [result, setResult] = useState(0);
	const [showResult, setShowResult] = useState(false);

  const handleAnswerButton = (correct) => {

		if (correct) { setResult(result + 1); }
    //Store question, answer and ammount of time to complete here locally
		const next = current + 1;

		if (next < questionList.length) { 	setCurrent(next);  } 
    
    else { 
      setShowResult(true);
      // submit attempt here
    }

    
	};

  // do something with this < potentially log it and store the data 
  const handleCopy=(e)=>{
    console.log("coppied")
}

	if (executedSet){

		return (
			<div className='app'>

        <br/> <br/> <br/> <br/>
        
        {showResult ? (
          <div className='result'>
            Your result is {result} of {questionList.length}
          </div>
        ) : (
          <>
            <div className='question'>

              <div className='index'>
                <span>Question {current + 1}</span>/{questionList.length}
              </div>

              <div className='text' onCopy={handleCopy} >{questionList[current].question}</div>

            </div>

            <div className='answer-section'>
              
              {questionList[current].answers.map((answer, index) => (
                <button key={answer.id} onClick={()=> handleAnswerButton(answer.correct)}>{answer.content}</button>
              ))}

            </div>
          </>
        )}

			</div>
		);
	}

	else {
		return (
			<div className='app'>
			
			</div>
		);
	}

}


