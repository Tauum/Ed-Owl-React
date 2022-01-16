import React, {useState, useEffect} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './Hangman.css';
import { Link, Redirect } from 'react-router-dom'


export default function Hangman(props) {

  const alphabet = ["A", "B", "C", "D", "E", "F", "G",
  "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const [hangman, setHangman ]=useState('')
  const [executedFetch, setExecutedFetch]=useState('')
  const [lives, setLives]=useState(5) // lives gets converted to incorrect as stored in db
  const [hintUsed, setHintUsed]=useState(false)
  const [correctGuesses, setCorrectGuesses] = useState([])   
  const [completed, setCompleted] = useState(false);
  const [show, setShow] = useState(false);
  const [submitHangman, setSubmitHangman] = useState(false);

  const [missingParentData, setMissingParentData] = useState();

  useEffect(() => {
    if (props.location.state){
        setHangman(props.location.state)
        setExecutedFetch(true)
    }
    else{
        setMissingParentData(true)
      }
  },[]) 

  // this submits the result
  useEffect(() => {
    if (submitHangman){
        var currentDate = new Date()
        fetch (`${window.ipAddress.ip}/SubmittedHangman/add`,{
            method: "POST",  
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(
                { 
                    user : window.BackendUser,
                    hangman : hangman,
                    hintUsed : hintUsed,
                    incorrect : (5 - lives), 
                    completed : completed,
                    generatedDate : currentDate
                }
            ) 
          })
        .then(res=>res.json())
        .catch(error =>{ 
        console.log("error: " + error);
        })
        .then((result)=>{
            console.log(result)
        })
        setShow(true)
    }
},[submitHangman]) 

    const handleHintClicked = (e) => {
        e.preventDefault();
        document.getElementById("hintp").style.display = "block";
        document.getElementById("hintbutton").style.display = "none";
        setHintUsed(true)
    }

    // do something with this < potentially log it and store the data 
    const handleCopy=(e)=>{
        console.log("coppied")
    }

    if (missingParentData === true){
        return (<Redirect to="/Dashboard2"></Redirect>);
    }

    if (executedFetch){

        // V this needs to be contained in here because it depends on the executed fetch to exist
        const displayWord = hangman.word.split('') // splits the word by letter
        .map(letter => correctGuesses // maps each letter and creates a function V
        .includes(letter) ? letter : "_").join(" "); // checks to see if the button clicked (letter) corrisponds with letter in word

        //this needs to be in here because it depends on displayWord declared below (idfk how to generate and re-assign it to the below properly)
        const handleLetterClicked = (character, displayWord, hangman, hintUsed, lives) => {

            if (hangman.word.includes(character)) { // if the button clicked (AKA letter) is inside the word 
                setCorrectGuesses([...correctGuesses, character]); // set correct guesses to previous & letter clicked
            }
            else{
                if (lives <= 0){ setSubmitHangman(true); }
                else{ setLives(lives - 1); }
            }

        }
        const handleSubmitClicked = () => {
            if(!displayWord.includes("_")){ // this is when the hangman is complete
                setCompleted(true);
                setSubmitHangman(true);
            }
            else{
                setSubmitHangman(true);
            }
        }
    
        return (
            <div className='hangman-container body'>
                <br/>    <br/>    <br/>

                <div className='hangman-main-content'>
                    <h1> {hangman.title}  </h1>  <br/> 
                    <p> Find the hidden word by entering letters</p>  <br/>
                    <h2> Lives: {lives} </h2> <br/>
                    
                    <div className="hint"> 
                        <Button onClick={handleHintClicked} type="buton" className="btn btn-warning submit buttonhint" id="hintbutton">Hint</Button>
                        <p id="hintp"> {hangman.hint} </p>
                    </div>

                    <br/>
                    <h2>{displayWord}</h2>

                    <div className='buttons'>
                        {alphabet.map((character, index) => 
                        <button className='letterbutton' key={index} onClick={() => handleLetterClicked(character, displayWord, hangman, hintUsed, lives)}> {character} </button>)}
                    </div>
    
                    <Button onClick={handleSubmitClicked} type="buton" className="btn btn-warning submit buttonhint" id="hintbutton">Submit</Button>
                
                </div>
                <Modal className="article-modal" show={show}>
                    <div className="card text-center shadow">
                        <div className="card-header">
                            <div className="card-body">
                                <h4 className="card-title"> Your result is </h4>
                            </div>

                            {/* <ProgressBar className='progress-bar-success' animated now={resultPercentage} /> */}

                            <br/>
                            <h5> It took you: (insert time here) to complete! </h5>
                            <br/>

                            <div className="card-footer text-muted"> 
                                You may attempt hangman as many times as you want! <br/>
                                You can do this by returning and re-entering the same task
                            </div>

                            <br/>
                            <Link to="/Dashboard2"><Button variant="btn btn-dark">Return</Button></Link>
                        </div>
                    </div>
                </Modal>   
            </div>
        );
    }
    else{
        return (
			<div>
			</div>
		);
    }
}