import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button} from 'react-bootstrap';

function Profile() {
    const { user } = useAuth0();
    const [ serverUser, setServerUser ]=useState('')

    //3. passing an empty array for on mount (when the page loads)
    useEffect(() => {
        fetch(`${window.ipAddress.ip}/User/getByEmail`, {
            method: "POST",  
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify( { email : user.email } )
        })
        .then(response => response.json())
        .then(json => { 
            console.log(json)
            setServerUser(json) })
    },[]) 

    const handleClick=(e)=>{
        e.preventDefault();
    }
    
        return(
            <div>
            <br/>
            <br/>
            <br/>
            BACKEND
            <input type="submit" className="Send-Message-CTA shadow" value="Search" onClick={handleClick}/>
            <br/>
            <br/>

            <div>
                <h2> name {serverUser.name} </h2>
                <h2> email {serverUser.email} </h2>
                <p> year of birth {serverUser.yob} </p>
                <p> role {serverUser.role} </p>
                <p> terms and conditions {serverUser.termsandconditions} </p>
                <p> study acceptence {serverUser.studyacceptence} </p>
                <p> tags {serverUser.tags} </p>
                <p> modules {serverUser.modules} </p>

                {/* <ul className="tags">
                        <li className="tag  auto"> <p>Tags -</p> </li>
                        {serverUser.tags.map(tag=>( 
                            <li className="tag  auto"> <p> {tag.content} </p> </li>
                        ))}
                    </ul> */}

            </div>

            AUTH0
            <div>
                <img src={user.picture} alt={user.name}/>
                <h2>{user.name}</h2>
                <p> {user.email} </p>
                { JSON.stringify(user, null, 2 )}
            </div>

        </div>
    );//}
}

    
     


// const Profile = () => {
//     const { user } = useAuth0();
//     const { data, status } = useQuery("profile", async (user) => {
//         const res = await fetch(`${window.ipAddress.ip}/User/getByEmail`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: user.email })
//         });
//         return res.json();
//     });

//     console.log(data)
  
//     return (
//       <div>
//         <h2>Profile</h2>
  
//         {status === 'loading' && (
//           <div>Loading data</div>
//         )}
  
//         {status === 'error' && (
//           <div>Error fetching data</div>
//         )}
  
//         {status === 'success' && (
//           <div>

//             { data.results.map(serverUser => 
//             <div> 
//                 <h2> name {serverUser.name} </h2>
//                 <h2> email {serverUser.email} </h2>
//                 <p> year of birth {serverUser.yob} </p>
//                 <p> role {serverUser.role} </p>
//                 <p> terms and conditions {serverUser.termsandconditions} </p>
//                 <p> study acceptence {serverUser.studyacceptence} </p>
//                 <p> tags {serverUser.tags} </p>
//                 <p> modules {serverUser.modules} </p>
//             </div>
//              ) }
            
//             {/* AUTH0
//             <div>
//                 <img src={user.picture} alt={user.name}/>
//                 <h2>{user.name}</h2>
//                 <p> {user.email} </p>
//                 { JSON.stringify(user, null, 2 )}
//             </div> */}

//           </div>
//         )} 
//       </div>
//     );
//   }

  
 export default Profile