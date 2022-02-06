import React from 'react';
import Weekly from './Components/Weekly/Weekly';
import Quizzes from './Components/Quizzes/Quizzes';
import Hangmans from './Components/Hangmans/Hangmans'
import Matches from "./Components/Matches/Matches"
import Users from './Components/Users/Users';

import './Dashboard.css';
import { useEffect, useState } from 'react';

export default function Dashboard(props) {

  const [executed, setExecuted] = useState(false);
  const [parentToChildData, setParentToChildData] = useState();

  useEffect(() => {
    if (props.location.state){ setParentToChildData(props.location.state); }
    setExecuted(true);
  }) 

  if (executed){
    return (    
      <div className='page'>
        <Weekly className="weekly"/>
        <Quizzes className="quizzes" parentToChild={parentToChildData}/>
        <Hangmans className="hangmans" parentToChild={parentToChildData}/>
        <Matches className="matches" parentToChild={parentToChildData}/>
        <Users className="users"/>
        {/* <BlankFills className="blankfills"/> */}
        <br/><br/><br/>
      </div>
    );
  }
  else{
    return (    
      <div className='page'>
        <br/><br/><br/>
    
      </div>
    );
  }
}