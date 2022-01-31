import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap';
import './Weekly.css';

export default function Weekly() {

    const [quiz, setQuiz] = useState("")
    const [hangman, setHangman] = useState("")
    const [match, setMatch] = useState("")

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
        fetch(`${window.ipAddress.ip}/Match/latest`)
        .then(response => response.json())
        .then(json => {
            setMatch(json)
        })
    }, [])



    return (
        <div className='all-weekly-content'>
            <h1>Latest Activities</h1>
            <ul className='weekly-list'>
                <li className='item'>
                    <Link to={{ pathname: "/Quiz", state: quiz }}>
                        <button className="elementiconbutton shadow quiz">
                            <div className='circle shadow '>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Quiz</title><path d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0116 16v288a16 16 0 01-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0116-16c131.57.59 192 32.84 208 96zM256 160v288" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                            </div>
                        </button>
                    </Link>
                    <h3>Quiz</h3>
                    <p>Read questions & <br/>click the correct answers</p>
                </li>

                <li className='item'>
                    <Link to={{ pathname: "/Hangman", state: hangman }}>
                        <button className="elementiconbutton shadow hangman">
                            <div className='circle shadow '>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Hangman</title><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /></svg>
                            </div>
                        </button>
                    </Link>
                    <h3>Hangman</h3>
                    <p>Identify the word/phase <br /> by gussing the correct characters</p>
                </li>
                
                <li className='item'>
                    <Link to={{ pathname: "/Match", state: match }}>
                        <button className="elementiconbutton shadow match">
                            <div className='circle shadow '>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Match</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M413.66 246.1H386a2 2 0 01-2-2v-77.24A38.86 38.86 0 00345.14 128H267.9a2 2 0 01-2-2V98.34c0-27.14-21.5-49.86-48.64-50.33a49.53 49.53 0 00-50.4 49.51V126a2 2 0 01-2 2H87.62A39.74 39.74 0 0048 167.62V238a2 2 0 002 2h26.91c29.37 0 53.68 25.48 54.09 54.85.42 29.87-23.51 57.15-53.29 57.15H50a2 2 0 00-2 2v70.38A39.74 39.74 0 0087.62 464H158a2 2 0 002-2v-20.93c0-30.28 24.75-56.35 55-57.06 30.1-.7 57 20.31 57 50.28V462a2 2 0 002 2h71.14A38.86 38.86 0 00384 425.14v-78a2 2 0 012-2h28.48c27.63 0 49.52-22.67 49.52-50.4s-23.2-48.64-50.34-48.64z"/></svg>
                            </div>
                        </button>
                    </Link>
                    <h3>Match</h3>
                    <p>Read the title & meaning<br />then match corisponding words and phrases</p>
                </li>

                <li className='item'>
                    <Link to={{ pathname: "/Blog" }}>
                        <button className="elementiconbutton shadow blog">
                            <div className='circle shadow '>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Blog</title><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /><path d="M216.32 334.44l114.45-69.14a10.89 10.89 0 000-18.6l-114.45-69.14a10.78 10.78 0 00-16.32 9.31v138.26a10.78 10.78 0 0016.32 9.31z" /></svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Blog</title><path d="M368 415.86V72a24.07 24.07 0 00-24-24H72a24.07 24.07 0 00-24 24v352a40.12 40.12 0 0040 40h328" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M416 464h0a48 48 0 01-48-48V128h72a24 24 0 0124 24v264a48 48 0 01-48 48z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M240 128h64M240 192h64M112 256h192M112 320h192M112 384h192"/><path d="M176 208h-64a16 16 0 01-16-16v-64a16 16 0 0116-16h64a16 16 0 0116 16v64a16 16 0 01-16 16z"/></svg>
                            </div>
                        </button>
                    </Link>
                    <h3>Blog</h3>
                    <p>Casual reading & <br/> relevant podcasts / video logs</p>
                </li>
{/* 
                <li className='item'>
                    <button className="elementiconbutton shadow filltheblanks">
                        <div className='circle shadow '>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Fill in the blanks</title><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448" /></svg>
                        </div>
                    </button>
                    <h3>Fill in the blanks</h3>
                    <p>Read the phrase / sentence <br /> select the correct missing words</p>
                </li> */}
            </ul>
        </div>
    );
}