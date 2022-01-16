import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

//pages import here
import NavigationBar from './Component/NavigationBar/NavigationBar';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import SignUp from './Component/SignUp/SignUp';
import AccountError from './Function/AccountError';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ data, setData ]=useState('')

  var executedFetch = new Boolean(false);
  var errorVal = new Boolean(false);

  if (isLoading) { return <div> Loading... </div> }
  else {
    // replace this with grabbing of user
    if (isAuthenticated){
      //this loops twice for some reason
      fetch(`${window.ipAddress.ip}/User/checkAlt`, {
        method: "POST",  
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email: user.email })}) //user.email
        .then((result)=> { return result.json() })
        .catch(error =>{ 
          errorVal = true
          console.log("backend user request error")
        })
        .then((data)=>{ setData(data) })
        .then( executedFetch = true )

        

        if (data){

        }

        if (executedFetch === true){
          // intended: make user click logout and send notification of error (request not implemented yet)
          // DOESNT RUN IF REQUEST FAILS (backend is switched off)
          if(errorVal === true){
            return (
              <div className="App">
              <NavigationBar/>
              <AccountError/> 
            </div>
          );}

          //WHEN PAGE LOADS THE BELOW RUNS BEFORE THE ABOVE
          if (data === true){ // works if user has an account registered
            console.log("backend - user confirmation")
            window.user = { data };
            console.log(window.user)
            return (
              <div className="App">
                <NavigationBar/>
              </div>
            );}
          
          //first cycle goes to here
          else { // works if a user doesnt have an account
            console.log("backend - user error")
            return (
              <div className="App">
              <NavigationBar/>
              <SignUp/>
            </div>
          );}
        }
      }
    //this runs if the user is not logged in
    else{
      console.log("not logged in")
      return (
      <div className="App">
        <NavigationBar/>
      </div>
    );}
  }
}

export default App;