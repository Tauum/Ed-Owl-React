import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Carousel} from 'react-bootstrap';
import './Weekly.css';

export default function Weekly() {

    const [quiz, setQuiz] = useState("")
    const [hangman, setHangman] = useState("")

    useEffect(() => {
        fetch(`${window.ipAddress.ip}/Quiz/latest`)
        .then(response => response.json())
        .then(json => {   
          setQuiz(json)
         })
         fetch(`${window.ipAddress.ip}/Hangman/latest`)
         .then(response => response.json())
         .then(json => {  
           setHangman(json)
          })
      },[]) 

      

    return (    
        <div className='all-weekly-content'>
            <h1>Latest Activities</h1>
            <ul className='weekly-list'>
                <li className='item'>
                    <Link to={ { pathname:"/Quiz", state:quiz } }>
                        <button className="elementiconbutton shadow quiz">
                            <div className='circle shadow '>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Quiz</title><path d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0116 16v288a16 16 0 01-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0116-16c131.57.59 192 32.84 208 96zM256 160v288" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
                            </div>
                        </button>    
                    </Link>
                    <h3>Quiz</h3>
                    <p>Read questions and click the correct answer <br/> until task end</p>
                </li>   

                <li className='item'>
                    <button className="elementiconbutton shadow filltheblanks">
                        <div className='circle shadow '>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Fill the blanks</title><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/></svg>
                        </div>
                    </button>
                        <h3>Fill the blanks</h3>
                        <p>Read the phrase/sentence <br/> then select the correct missing words</p>
                </li>

                        <li className='item'>
                            <Link to={ { pathname:"/Hangman", state:hangman } }>
                                <button className="elementiconbutton shadow hangman">
                                    <div className='circle shadow '>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Hangman</title><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/></svg>
                                    </div>
                                </button>
                            </Link>
                            <h3>Hangman</h3>
                            <p>Identify the word/phase <br/> by clicking the correct characters</p>
                        </li>

                    <li className='item'>
                        <Link to={ { pathname:"/Blog" } }>
                            <button className="elementiconbutton shadow blog">
                                <div className='circle shadow '>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Blog</title><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path d="M216.32 334.44l114.45-69.14a10.89 10.89 0 000-18.6l-114.45-69.14a10.78 10.78 0 00-16.32 9.31v138.26a10.78 10.78 0 0016.32 9.31z"/></svg>
                                </div>
                            </button>
                        </Link>
                        <h3>Blog</h3>
                        <p>Casual reading<br/>Relevant podcasts</p>   
                    </li>
            </ul>
        </div>
        );
    }