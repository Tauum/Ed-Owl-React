import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function EditQuiz(props) {

    const [quiz, setQuiz]=useState()
    const [questionList, setQuestionList]=useState([]);

    // const [quiz, setQuiz] = useState({title:"example", timeLimit:300, value:200})

    // const [questionList, setQuestionList]=useState( [ 
    //   { id: 1, question : "question1", value:5, explaination : "answer1", 
    //   answers: [ {content: "aaa", correct: true},{content: "bbb", correct: false},{content: "ccc", correct: false},{content: "ddd", correct: false}]
    // } ,
    //   { id: 2, question : "question2", value:10, explaination : "answer1", 
    //   answers: [ {content: "eee", correct: true},{content: "fff", correct: false},{content: "ggg", correct: false},{content: "hhhh", correct: false} ]
    //   }
    // ])

    const [submitQuiz, setSubmitQuiz] = useState(false);
    const [executedSet, setExecutedSet] = useState(false);
  
    const [missingParentData, setMissingParentData] = useState();
  
    useEffect(() => {
      if (props.location.state){
        console.log(props.location.state)

        setQuiz(props.location.state)
        setQuestionList(props.location.state.questions)
        setExecutedSet(true)    
      }
      else{
        setMissingParentData(true)
      }
      console.log(quiz)
      console.log("ccc")
    },[]) 
  
    // this submits the result
    useEffect(() => {                                                                                                
      if (submitQuiz){  
        var currentDate = new Date()
        fetch (`${window.ipAddress.ip}/QuizSubmitted/add`,{
          method: "POST",  
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(
          { 
            // user : window.BackendUser,
            // quiz : quiz,
            // submittedQuestions : submittedQuestions,
            // score : quiz.value,
            // submissionDate : currentDate,
            // timeTaken : 0
          })})
          .then(res=>res.json())
          .catch(error =>{ 
          console.log("error: " + error);
          })
          .then((result)=>{
            console.log(result)
          })
      }
    },[submitQuiz]) 

  const addQuestionButton = () => {
    setQuestion({question: "", value:0, explaination: "", answers :  [ {content: "", correct: false},{content: "", correct: false},{content: "", correct: false},{content: "", correct: false} ] })
    setShow(true)
  };

  // V this doesnt work properly
  const removeQuestionButton = (question) => {
    var newQuestionList = questionList.pop(question)
    // setQuestionList(questionList =>  questionList.pop(question))
    // setQuestionList(questionList => [...questionList.pop(question)])

    setQuestionList(value => value.slice(question));

    // setQuestionList(questionList => questionList.pop(question))
  }

  const editQuestionButton = (question) =>{
    console.log(question)
    setQuestion(question)
    setShow(true)
  }

  const handleSubmitQuestion  = () => {

    for (let i = 0; i < 3; i++) {

      var correct = false
      if (dropdown = i + 1){
        correct = true
      }
      // var answer = { content: answer1, correct: correct }
    }

    // var newAnswers = { answer1}
    // var newQuestion = { question: "", explaination : "", value: "", answers : newAnswers }

  }

  const printQuizButton = () => {
    console.log(quiz)
  };

  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [explaination, setExplaination] = useState("");
  const [question, setQuestion]=useState('')

  const [dropdown, setDropdown]=useState("")

	return (
    <div className='page'>
      <br/>
      <h1>Quiz input / Edit Page</h1>
      <br/><br/><br/>
      <h2>Quiz</h2>
      <form action="">
        <label htmlFor="Title">Title</label>
        <br/>
        <input type="text" id="title" name="title" value={ quiz ? quiz.title : ''} onChange={(e)=>setQuiz({...quiz, title: e.target.value})}/>
        <br/>
        <label htmlFor="Time-limit">Time limit (seconds)</label>
        <br/>
        <input type="number" id="Time-limit" name="Time-limit" value={quiz ? quiz.timeLimit : ''} onChange={(e)=>setQuiz({...quiz, timeLimit: e.target.value})}/>
        <br/>
        <label htmlFor="Value">Value</label>
        <br/>
        <input type="number" id="Value" name="Value" value={quiz ? quiz.value : ''} onChange={(e)=>setQuiz({...quiz, value: e.target.value})}/>
        <br/><br/>
        <input type="submit" className="Send-Message-CTA shadow" value="Submit Quiz"/>
      </form>

      <h2>Questions</h2>
      
      <button onClick={()=> printQuizButton()}>print Quiz</button>   
      <button onClick={()=> addQuestionButton()}>Add Question</button>   

      {questionList.map((question, index)=>(
          <div key={index}>
            ID: {question.id} Question: {question.question}
            <br/>
            <button onClick={()=> editQuestionButton(question)}>Edit Question</button>  
            <button onClick={()=> removeQuestionButton(question)}>Remove Question</button>  
            <br/>
            <br/>
            
          </div>
      ))}

    <Modal show={show} backdrop="static" keyboard={false} state={question ? question : ""}>

      <Modal.Header>
        <Modal.Title>Adding Question Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input value={question ? question.question: ''} onChange={(e)=>setQuestion({...question, question: e.target.value})} type="text" 
            className="form-control stuff" id="question" placeholder="Enter question name" required/>
          </div>

          <div className="form-group">
            <label htmlFor="value">Value</label>
            <input value={question ? question.value: ''} onChange={(e)=>setQuestion({...question, value: e.target.value})} type="number" className="form-control stuff" id="value" required/>
          </div>

          <div className="form-group">
            <label htmlFor="explaination">Explaination</label>
            <input value={question ? question.explaination: ''} onChange={(e)=>setQuestion({...question, explaination: e.target.value})} type="text" 
            className="form-control stuff" id="explaination" placeholder="Enter Correct Explaination" required/>
          </div>
          <br/>
          You may enter up to 4 answers below:
          <br/>
          (Leave blank if un-wanted, requires atleast 2)
          <br/><br/>

          { question.answers ? question.answers.map((answer, index)=>(
          <div key={index}>
            <div className="form-group">
              <label htmlFor="explaination">Answer {index + 1}</label>

              <input onChange={ (e) => setQuestion({...question, question: e.target.value})} value={ answer ? answer.content : ''} type="text" 
              className="form-control stuff" id="explaination" placeholder="Enter answer display words" required/>

            </div>
          </div>
          )) : <br/> }

          <div className="form-check">
            <label className="form-check-label" htmlFor="correct">The correct answer:</label>
            <br/>
            <select value={dropdown} onChange={(e)=>{ setDropdown(e.target.value) }}>
                <option value="1">Answer 1 </option>
                <option value="2">Answer 2 </option>
                <option value="3">Answer 3 </option>
                <option value="4">Answer 4 </option>
            </select>
          </div>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" className="btn btn-dark" onClick={()=> setShow(false)}> Close </Button>
        <Button onClick={handleSubmitQuestion} type="button" className="btn btn-primary submit" id="submit">Submit</Button>
      </Modal.Footer>

    </Modal>

    </div>);

}