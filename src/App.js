import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

//pages import here
import NavigationBar from './Component/NavigationBar/NavigationBar';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import SignUp from './Component/SignUp/SignUp';
// import AccountError from './Function/AccountError';

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ executedFetch, setExecutedFetch]=useState(false);
  const [ errorVal, setErrorVal]=useState(false);
  
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
          setExecutedFetch(true);
      })
    }
},[isAuthenticated])

  if (isLoading) { return <div> Loading... </div> }
  else {
    if (executedFetch){
      // intended: make user click logout and send notification of error (request not implemented yet)
      // this runs if a user is not signed up
      if(errorVal){
        return (
          <div className="App">
          <NavigationBar/>
          <SignUp/>
        </div>
      );}
      //WHEN PAGE LOADS THE BELOW RUNS BEFORE THE ABOVE
      else if (!errorVal){ // works if user has an account registered
        console.log("backend - user confirmation")
        return ( <div className="App"><NavigationBar/></div> );
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