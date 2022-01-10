import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Weekly from './Components/Weekly/Weekly';
import Quizzes from './Components/Quizzes/Quizzes';
import Hangmans from './Components/Hangmans/Hangmans'
import BlankFills from './Components/BlankFills/BlankFills'
import Updates from './Components/Updates/Updates'
import TaskPerformance from './Components/TaskPerformance/TaskPerformance'
import Progression from './Components/Progression/Progression'
import Leaderboard from './Components/Leaderboard/Leaderboard'

import './Dashboard2.css';

export default function Dashboard2() {

  // this gets the hangman
  useEffect(() => {
    // fetch(`${window.ipAddress.ip}/Hangman/${passedid}`)
    // .then(response => response.json())
    // .then(json => { 
    //     setHangman(json)
    //     setExecutedFetch(true)
    //  })
    
  },[]) 




  // var count = 0;
  
  // const handleDirection = (num) => {
  //   if (num === 1 && count !== 4) { count = count + 1; }
  //   else if (num === 0 && count !== 0) { count -= 1; }


  //   const lookup = [ "weekly", "games", "update", "performance", "progression", "leaderboard" ];
  //   const elm = document.querySelector(`#${lookup[count]}`);
  //   elm?.scrollIntoView?.({ behavior: 'smooth' });
  // }

return (    
  <div className='page'>
    <Weekly className="weekly" id="weekly"/>
    {/* <Button onClick={()=> handleDirection(0)} type="button" className="btn btn-primary submit a" id="submit">up</Button>
    <br/>
    <Button onClick={()=> handleDirection(1)} type="button" className="btn btn-primary submit a" id="submit">down</Button> */}
    <br/><br/>
    <Quizzes className="quizzes" id="games"/>
    <Hangmans className="hangmans"/>
    <BlankFills className="blankfills"/>
    <br/><br/><br/>
    <Updates className="updates" id="update"/>
    <br/><br/><br/><br/><br/>
    <TaskPerformance className="taskperformance" id="performance"/>
    <br/><br/><br/><br/><br/>
    <Progression className="progression" id="progression"/>
    <br/><br/>
    <Leaderboard className="leaderboard" id="leaderboard"/> 
    <br/><br/><br/><br/><br/><br/><br/><br/>
  </div>
  );


}