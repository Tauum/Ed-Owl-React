import React, {useState, useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';


export default function BlankFill() {

  var passedid = 2; //need to replace this with passed quiz ID

  const [blankFill, setBlankFill ]=useState('')
  const [executedFetch, setExecutedFetch]=useState(false)
  const [executedSet, setExecutedSet]=useState(false)
  const [lives, setLives]=useState(5) // lives gets converted to incorrect as stored in db
  const [correctGuesses, setCorrectGuesses] = useState([])   
  const [completed, setCompleted] = useState(false);
  const [show, setShow] = useState(false);
  const [submitBlankFill, setSubmiBlankfill] = useState(false);
  const [hiddenWords, setHiddenWords] = useState([])
  const [displayWord, setDisplayWord] = useState([])
  
  useEffect(() => {
    fetch(`${window.ipAddress.ip}/BlankFill/${passedid}`)
    .then(response => response.json())
    .then(json => { 
        setBlankFill(json)
        setExecutedFetch(true)
     })
  },[]) 



  useEffect(() => {
      if (executedFetch){
        var wordArray = blankFill.content.split(' ');
        console.log(wordArray)

        for (let i = 0; i < wordArray.length /3; i++) { 
            var multiplier = Math.round(randomNumber(0, wordArray.length -1))
            if (!hiddenWords.includes(multiplier)){
                //var hidden = { result: multiplier ,word : wordArray[multiplier] }
                // hiddenWords.push([hidden]);
                var hidden = { result: multiplier }
                hiddenWords.push(multiplier);
               // hiddenWords.push(hidden);
            }  
        }
        console.log(hiddenWords)
        var dw = blankFill.content
        console.log(dw)
        for (let i = 0; i < hiddenWords.length; i++) { 
            
            if(hiddenWords[i] === wordArray.indexOf(hiddenWords[i])){
                console.log("found")
            }
            else{
                console.log("not found")
            }
        }

        // const uniques = wordArray.filter(w => !hiddenWords.includes(w));
        // console.log(uniques)
        // setDisplayWord(uniques)
        //wordArray.sort((a,b)=>{ return a-b  }) // sorts entries by value large to small // doesnt even work

        // setExecutedSet(true)
      }
  },[executedFetch]) 

  function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
} 
  // this submits the result
//   useEffect(() => {
//     if (submitBlankFill){
//         var currentDate = new Date()
//         fetch (`${window.ipAddress.ip}/BlankFill/add`,{
//             method: "POST",  
//             headers:{'Content-Type':'application/json'},
//             body: JSON.stringify(
//                 { 
//                     user : window.BackendUser,
//                     blankFill : blankFill,
//                     incorrect : (5 - lives), 
//                     completed : completed,
//                     submissionDate : currentDate
//                 }
//             ) 
//           })
//         .then(res=>res.json())
//         .catch(error =>{ 
//         console.log("error: " + error);
//         })
//         .then((result)=>{
//             console.log(result)
//         })
//         setShow(true)
//     }
// },[submitHangman]) 

    const handleSubmitClicked = (e) => {
        e.preventDefault();
        document.getElementById("hintp").style.display = "block";
        document.getElementById("hintbutton").style.display = "none";
    }

    // do something with this < potentially log it and store the data 
    const handleCopy=(e)=>{
        console.log("coppied")
    }

    if (executedFetch){

        //this needs to be in here because it depends on displayWord declared below (idfk how to generate and re-assign it to the below properly)
        const handleLetterClicked = (character, displayWord, hangman, hintUsed, lives) => {
            //character, displayWord, hangman, hint_used, lives

            // if (hangman.word.includes(character)) { // if the button clicked (AKA letter) is inside the word 
            //     setCorrectGuesses([...correctGuesses, character]); // set correct guesses to previous & letter clicked
                
            //     // this doesnt get called unless a correct letter is clicked again after all are revealed         
            //     if(!displayWord.includes("_")){ // this is when the hangman is complete
            //         console.log("completed")
            //         setCompleted(true);
            //        // setSubmitHangman(true);
            //     }
            // }
            // else{
            //     if (lives <= 0){ setSubmitHangman(true); }
            //     else{ setLives(lives - 1); }
            // }
        }
    
        return (
            <div>
                <br/> <br/> <br/> <br/>  <br/> <br/>
                aaa
                <br/> <br/> <br/> <br/>
                <p> {blankFill.content} </p>
                <br/> <br/> <br/>

                {/* <iframe src="https://h5p.org/h5p/embed/611" width="1090" height="555" frameborder="0" title="Fill in the Blanks"/> */}


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
                            <Button variant="btn btn-dark">Return</Button>
                            <Button variant="btn btn-primary">Review</Button>
                        </div>
                    </div>
                </Modal>   
            </div>
        );
    }
    else{
        return (
			<div className='app'>
			</div>
		);
    }
}