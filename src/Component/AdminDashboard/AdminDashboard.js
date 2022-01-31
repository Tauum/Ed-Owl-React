import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import QuizModeration from "./Quizzes/QuizModeration";
import HangmanModeration from "./Hangmans/HangmanModeration";
import BlogModeration from "./Blogs/BlogModeration";
import BlankFillModeration from "./BlankFill/BlankFillModeration";
import UserModeration from './User/UserModeration';
import AnnouncementModeration from './Announcement/AnnouncementModeration';
import ContactUsModeration from './ContactUs/ContactUsModeration';
import MatchModeration from './Match/MatchModeration';

export default function AdminDashboard() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ executedFetch, setExecutedFetch]=useState(false);
  const [ errorVal, setErrorVal]=useState(false);
  
  const [allowed, setAllowed] = useState(false)
  
  useEffect(()=>{
    // this needs to be here because the user doesnt exist on first render
    if (user){
      fetch (`${window.ipAddress.ip}/User/getByEmail`,{
        method: "POST",  
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email: user.email }) 
      })
      .then(res=>res.json())
      .catch(error =>{ 
        setErrorVal(true);
        console.log("error: " + error);
      })
      .then((result)=>{
          window.BackendUser = result; // setting a global variable
          if (result.role === "ADMIN") { setAllowed(true) }
          else if (result.role === "STAFF") { setAllowed(true) }
          setExecutedFetch(true);
      })
    }
},[isAuthenticated])

  if (isLoading) { return <div> Loading... </div> }
  else {
    if (executedFetch){
      if (allowed) {
        return (
          <div className='page'>
            <br /><br /><br /><br /><br /><br />
            <QuizModeration className="quizzes" />
            <HangmanModeration className="hangmans" />
            <BlogModeration className="blogs" />
            <MatchModeration className="matches"/>
            <BlankFillModeration className="blankFills" />
            <UserModeration className="users" />
            <AnnouncementModeration className="announcement" />
            <ContactUsModeration className="contactUs" />
          </div>
        );
      }
      else {
        return (<Redirect to="/Dashboard"></Redirect>);
      }
    }
    else{
      return (
      <div> Loading... </div>
      );
    }
   
  }
}

