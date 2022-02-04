import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import Weekly from './Components/Weekly/Weekly';
import Quizzes from './Components/Quizzes/Quizzes';
import Hangmans from './Components/Hangmans/Hangmans'
import Matches from "./Components/Matches/Matches"

import BlankFills from './Components/BlankFills/BlankFills'


import TaskPerformance from './Components/TaskPerformance/TaskPerformance'
import Leaderboard from './Components/Leaderboard/Leaderboard'


import './Dashboard.css';

export default function Dashboard() {

return (    
  <div className='page'>
    <Weekly className="weekly" id="weekly"/>
    <Quizzes className="quizzes" id="games"/>
    <Hangmans className="hangmans"/>
    <Matches className="matches"/>
    {/* <BlankFills className="blankfills"/> */}
    <br/><br/><br/>


 {/* V DO THIS SHIT ON OTHER PAGES */}

    {/* <br/><br/><br/><br/><br/>
    <TaskPerformance className="taskperformance" id="performance"/>
    <br/><br/><br/><br/><br/>
    <br/><br/>
    <Leaderboard className="leaderboard" id="leaderboard"/> 
    <br/><br/><br/><br/><br/><br/><br/><br/>  */}


  </div>
  );


}