import React from 'react';
import QuizModeration from "./Quizzes/QuizModeration"
import HangmanModeration from "./Hangmans/HangmanModeration"
import BlogModeration from "./Blogs/BlogModeration"
import BlankFillModeration from "./BlankFill/BlankFillModeration"
import UserModeration from './User/UserModeration';


export default function AdminDashboard() {


return (    
  <div className='page'>
    <br/><br/><br/><br/><br/><br/>
    <QuizModeration className="quizzes"/>
    <HangmanModeration className="hangmans"/>
    <BlogModeration className="blogs"/>
    <BlankFillModeration className="blankFills"/>
    <UserModeration className="users"/>
  </div>
  );

}