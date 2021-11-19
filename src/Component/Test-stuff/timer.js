import React from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

const Completionist = () => <span>Countdown over!</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />; // Render completed state
  } 
  else {
    
    return <span>{hours}:{minutes}:{seconds}</span>; // Render countdown
  }
};


export default function timer() {
  
    return (
    <>  
        <br/><br/><br/><br/><br/>

        <Countdown date={Date.now() + 5000}>
            <Completionist />
        </Countdown>
    </>
);}