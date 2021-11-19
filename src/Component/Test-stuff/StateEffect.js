import React, { useState, useEffect} from 'react'

export default function StateEffect() {

    // using a default
    // useEffect(() => {
    //     console.log('render') // shows whenever a button is clicked the page is being re-rendered
    // })

    //2. passing an array (to change every time the resource type changes)
    const [resourceType, setResourceType] = useState('posts')
    // useEffect(() => {
    //     console.log('render')
    // },[resourceType]) 

    //3. passing an empty array for on mount (when the page loads)
    // useEffect(() => {
    //     console.log('On mount')
    // },[]) 

    //4. doing something with a URL
    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/${resourceType}`) // backticks allow appending to the end of the string
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    // },[resourceType]) // getting something everytime resourceType changes

    //5. storing stuff from url
    const[items, setItems] = useState([]) // empty array in use state
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`) // backticks allow appending to the end of the string
        .then(response => response.json())
        .then(json => {
            console.log(json)
            setItems(json)
        })
    },[resourceType]) // getting something everytime resourceType changes

    return(

        <div>
            <br/>
            <br/>
            <br/>
            <button onClick={() => setResourceType('posts')}> posts </button>
            <button onClick={() => setResourceType('users')}> users </button>
            <button onClick={() => setResourceType('comments')}> comments </button>

            <h1>{resourceType}</h1>
            <ul>
            
                {items.map(item=>( 
                    <li className="tag  auto"> <p> {JSON.stringify(item)} </p> </li>
                ))}

            </ul>

        </div>

    )
}


