import { Link } from 'react-router-dom'
import React from 'react';


export default function UserModerationTable({parentToChild}) {
   

    return (    

        <div>
            <div className="table-container">
                <ul className="responsive-table user-moderation-table">
                    <li className="table-header">
                    <div className="col col-1">Name</div>
                    <div className="col col-2">Email</div>
                    <div className="col col-3">Role</div>
                    <div className="col col-4">T & C</div>
                    <div className="col col-5">Study</div>
                    <div className="col col-6">Modules</div>
                    <div className="col col-7">Dashboard</div>
                    <div className="col col-8">Profile</div>
                    </li>
                    {parentToChild.map((user,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Name">{user.name}</div>
                            <div className="col col-2" data-label="Email">{user.email}</div>
                            <div className="col col-3" data-label="Role">{user.role}</div>
                            <div className="col col-4" data-label="Termsandconditons">{user.termsandconditions  + " "}</div>
                            <div className="col col-5" data-label="Study">{user.studyacceptence  + " "}</div>
                            <div className="col col-6" data-label="Modules">{user.hidden + " "}</div>

                            <div className="col col-7" data-label="Dashboard">
                            <Link to={ { pathname:"/Dashboard", state: user.id }}>
                                    <button>
                                        View
                                    </button>

                                </Link> 
                            </div>

                            <div className="col col-8" data-label="Profile">
                                <Link to={ { pathname:"/Profile", state: user.email }}>
                                    <button>
                                        Profile
                                    </button>

                                </Link> 
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        


        </div>
    );
}