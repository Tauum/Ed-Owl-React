import React from 'react';
import { Link } from 'react-router-dom'

import './AllUserTable.css'


export default function AllUserTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table AllUser-responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Name</div>
                    <div className="col col-2">Role</div>
                    <div className="col col-3">Profile</div>
                    </li>
                    {parentToChild.map((user,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Name">{user.name}</div>
                            <div className="col col-2" data-label="Role">{user.role}</div>

                            <div className="col col-3" data-label="Profile">
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