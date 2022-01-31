import React, { useState, useEffect, Fragment  } from 'react';
import { nanoid } from "nanoid";
// import "./App.css";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import { Button, Form } from 'react-bootstrap';

export default function Tester2(props) {
  
    const [quiz, setQuiz] = useState({ title: "", timeLimit: 0, value: 0, hidden: false, questions:[] });
  const [questionList, setQuestionList] = useState([
      { id: 1, question : "question1", value:5, explaination : "answer1", 
      answers: [ {content: "aaa", correct: true},{content: "bbb", correct: false},{content: "ccc", correct: false},{content: "ddd", correct: false}]
    } ,
      { id: 2, question : "question2", value:10, explaination : "answer1", 
      answers: [ {content: "eee", correct: true},{content: "fff", correct: false},{content: "ggg", correct: false},{content: "hhhh", correct: false} ]
      }
  ])

    const [addFormData, setAddFormData] = useState({
        question : "", 
        value:0, 
        explaination : "", 
        answers: [ {content: "", correct: true},{content: "", correct: false},{content: "", correct: false},{content: "", correct: false} ]
    })

    const handleAddformChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    }

    const handleAddformSubmit = (e) => {
        e.preventDefault();

        const newQuestion = { question : addFormData.Question, value:addFormData.Value, explaination : addFormData.Explaination, Answers:[] };
        // const newQuestion = { question : addFormData.question, value:addFormData.value, explaination : addFormData.explaination, answers: addFormData.answers };

        setQuestionList((prevQuestionList)=>([...prevQuestionList, newQuestion]))
    }

    useEffect(() => {
        console.log(questionList)
    }, [questionList])
 
    return (
        <div className="app-container">
            <br/>        <br/>        <br/>        <br/>        <br/>        <br/>        <br/>
            <table>
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Value</th>
                    <th>Correct Value</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
    
                {questionList.map((question, index) => (
                    // <ReadOnlyRow question={question} key={index}/>
                    <tr key={index}>
                        <td>{question.value}</td>
                        <td>insert here</td>
                        <td>
                        {/* <button type="button" onClick={(event) => handleEditClick(event, question)}> Edit </button>
                        <button type="button" onClick={() => handleDeleteClick(question.id)}> Delete </button> */}
                        </td>
                    </tr>

                ))}

                </tbody>
            </table>

            <h2>Input question</h2>
            <Form onSubmit={handleAddformSubmit}>
                <input type="text" name="Question" required="required" placeholder="Enter a title..." onChange={handleAddformChange}/>
                <br/>
                <input type="number" name="Value" required="required" placeholder="Enter a value..." onChange={handleAddformChange}/>
                <br/>
                <input type="text" name="Explaination" required="required" placeholder="Enter an explaination..." onChange={handleAddformChange}/>
                <br/>

                <Button type="submit" className="btn btn-warning">Add</Button>
            </Form>
        </div>
        );
}
