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

return (    
  <div className='page'>
    <Weekly className="weekly" id="weekly"/>
    <Quizzes className="quizzes" id="games"/>
    <Hangmans className="hangmans"/>
    <BlankFills className="blankfills"/>
    <br/><br/><br/>


 {/* V DO THIS SHIT ON OTHER PAGES */}

    {/* <Updates className="updates" id="update"/>
    <br/><br/><br/><br/><br/>
    <TaskPerformance className="taskperformance" id="performance"/>
    <br/><br/><br/><br/><br/>
    <Progression className="progression" id="progression"/>
    <br/><br/>
    <Leaderboard className="leaderboard" id="leaderboard"/> 
    <br/><br/><br/><br/><br/><br/><br/><br/> */}


  </div>
  );


}