import { useEffect, useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import './Blog.css';

export default function Blog() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    var errorVal = new Boolean(false);

    const[searchTitle, setSearchTitle]=useState("")

    // for search function
    const handleClick=(e)=>{
        e.preventDefault() 
        
        // rework this to locally store the main list so when search is set back to "" it will just display the local list to prevent grabbing it again

        if(searchTitle !== ""){
            var refine = { title : searchTitle }
            fetch(`${window.ipAddress.ip}/Post/getPostsContainingTitle`, {
                method: "POST",  
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify( refine )
            }).then((result)=> { return result.json() })
            .catch(error =>{ 
                errorVal = true
                console.log("error: " + error)
            })
            .then((data)=>{
                setPosts(data)
            })
        }
        else{
            fetch ("http://localhost:8080/Post/allOrderByDate")
            .then(res=>res.json())
            .then((result)=>{
                setPosts(result)
            })
        }

    }

    function showArticle(post) {
        setShow(true);
        setPost(post);
    }

    //for getting posts
    const[posts, setPosts]=useState([])
    const[post, setPost]=useState([])

    useEffect(()=>{

        fetch (`${window.ipAddress.ip}/Post/allOrderByDate`)
        .then(res=>res.json())
        .then((result)=>{
            setPosts(result)
        })
    },[])

    const handleCopy=(e)=>{
        console.log("coppied")
    }

return (

    <div className='blog-container'>
        <h1>Blog Posts</h1>

        <div className="search"> 
            <form action="">
                <label htmlFor="searchF"> <h2> Refine: </h2> </label>
                <input type="text" value={searchTitle} onChange={(e)=>setSearchTitle(e.target.value)} name="search"/>

                <input type="submit" className="Send-Message-CTA shadow" value="Search" onClick={handleClick}/>
            </form>
        </div>

        <div className="list">
            {posts.map(post=>(
            <div className="card text-center shadow articlediv" key={post.id} >
                <div className="card-header">
                </div>
                <div className="card-body">
                    <h4 className="card-title articletitle"> {post.title}  </h4>
                    <p className="card-text"> {post.author}  </p>

                    <p className="card-text">{post.summary}</p>
                    <Button variant="btn btn-warning shadow blogbutton" onClick={() => showArticle(post)}>Full Article</Button>
                    <div className="card-footer text-muted"> {post.creation} </div>
                </div>
            </div>
            ))}
        </div>

{/* THIS BELOW WORKS BUT ONLY AFTER COMMENTING IT BACK IN - I THINK ITS TRYING TO LOAD IT BEFORE THE ELEMENTS EXIST */}
     <Modal className="article-modal blog-modal" show={show} onHide={handleClose}>
        <div className="card text-center shadow" key={post.id}>
                <div className="card-header"> </div>
                <div className="card-body">
                    <h4 className="card-title"> {post.title}  </h4>
                    <p className="card-text"> {post.author} - {post.creation}  </p>
                    <p className="card-text" onCopy={handleCopy}> {post.summary}</p>

                    {/* <img src={post.image} alt="post image" width="300"/> */}
                    {/* <cite><a href={post.image} target="_blank" rel="noopener noreferrer">image source</a></cite> */}
                    
                    {post.video
                    ? 
                    <iframe className="video shadow" src={post.video} title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    :  <br/>
                    }
                    <br/>

                <div className="card-footer text-muted" onCopy={handleCopy}> {post.content} </div>
                <br/>
                    
                <Button variant="btn btn-dark" onClick={handleClose}>Close</Button>
            </div>
        </div>
    </Modal> 

</div>
    
);
}


