import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom'
import React, { Component } from "react";
import { useEffect, useState} from 'react';
import { Button, Modal, ProgressBar} from 'react-bootstrap';
import Countdown from "react-countdown";

export default function QuizReview(props) {

  const [quizSubmitted, setQuizSubmitted ]=useState('')
  const [executedSet, setExecutedSet]=useState(false);

  const [missingParentData, setMissingParentData] = useState();

  useEffect(() => {
    if (props.location.state){
    console.log(props.location.state)
    setQuizSubmitted(props.location.state)
    setExecutedSet(true)    
    }
    else{
      setMissingParentData(true)
    }
  },[]) 
 
  if (missingParentData === true){
    return (<Redirect to="/Dashboard2"></Redirect>);
  }

	if (executedSet){
		return (
			<div className='quiz-review-main'>
                <br/><br/><br/><br/>
                Title: {quizSubmitted.quiz.title}
                <br/>
                Quiz value: {quizSubmitted.quiz.value}
       
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


 