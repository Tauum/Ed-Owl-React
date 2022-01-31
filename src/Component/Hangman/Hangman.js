import React, {useState, useEffect} from 'react';
import { Button, ProgressBar, Modal } from 'react-bootstrap';
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
  const [score, setScore] = useState(0);

  const [timeTaken, setTimeTaken] = useState()
  const [initialDate, setInitialDate]=useState()
  const [missingParentData, setMissingParentData] = useState();

  useEffect(() => {
    if (props.location.state){

        setHangman(props.location.state)
        setExecutedFetch(true)
        var startDate = Date()
        setInitialDate(startDate)
    }
    else{
        setMissingParentData(true)
      }
  },[]) 

  // this submits the result
  useEffect(() => {
    if (submitHangman){
        var currentDate = new Date()
        var initial = new Date(initialDate) 
        var difference = Math.round((currentDate - initial) / 1000);
        setTimeTaken(difference)

        console.log(initial)
        console.log(currentDate)
        console.log(difference)
        var submitScore = 0;

        if (correctGuesses.length > 0 ){

            //incorrect aka (5 - lives) = 5%  (25% total)
            var incorrectModifier = (hangman.value / 10) * (5 - lives);  // incorrect

            if (hintUsed){ var hintModifier = (hangman.value / 10); } // hint
            else{ var hintModifier = 0; } 
        
            submitScore = (hangman.value - (incorrectModifier + hintModifier));
        }   

        setScore(submitScore)
        
        fetch (`${window.ipAddress.ip}/SubmittedHangman/add`,{
            method: "POST",  
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(
                { 
                    user : window.BackendUser,
                    hangmanId: hangman.id,
                    hangmanTitle : hangman.title,
                    hangmanValue : hangman.value,
                    hintUsed : hintUsed,
                    incorrect : (5 - lives), 
                    completed : completed,
                    score: submitScore,
                    timeTaken : difference,
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
        return (<Redirect to="/Dashboard"></Redirect>);
    }

    if (executedFetch){


         const resultPercentage = (score / hangman.value).toFixed(2) * 100;
         
         console.log(resultPercentage)


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
                            <h4 className="card-title"> Your result is {resultPercentage} %  ( {score} of {hangman.value} ) </h4>
                        </div>

                            <ProgressBar className='progress-bar-success' animated now={resultPercentage} />

                            { resultPercentage >= 0 && resultPercentage <= 16 ? <img className="shadow emoj" src="/Image/0-16.svg" alt="" /> : <div></div>  }
                            { resultPercentage >= 17 && resultPercentage <= 33 ? <div><img className="shadow emoj" src="/Image/17-33.svg" alt="" /></div> : <div></div>  }
                            { resultPercentage >= 34 && resultPercentage <= 50 ? <div><img className="shadow emoj" src="/Image/34-50.svg" alt="" /></div> : <div></div>  }
                            { resultPercentage >= 51 && resultPercentage <= 66 ? <div><img className="shadow emoj" src="/Image/51-66.svg" alt="" /></div> : <div></div>  }
                            { resultPercentage >= 67 && resultPercentage <= 83 ? <div><img className="shadow emoj" src="/Image/67-83.svg" alt="" /></div> : <div></div>  }
                            { resultPercentage >= 84 && resultPercentage <= 100 ? <div><img className="shadow emoj" src="/Image/84-100.svg" alt="" /></div> : <div></div>  }

                            <br/>
                            <h5> It took: {timeTaken} seconds to complete! </h5>
                            <br/>

                            <div className="card-footer text-muted"> 
                                You may re-attempt by returning <br/> Then re-entering the same task. 
                            </div>

                            <br/>
                            <Link to="/Dashboard"><Button variant="btn btn-dark">Return</Button></Link>
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