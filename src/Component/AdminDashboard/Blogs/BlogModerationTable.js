import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Button} from 'react-bootstrap';

export default function BlogModerationTable({parentToChild}) {

    return (    
        <div>
            <div className="table-container">
                <ul className="responsive-table">
                    <li className="table-header">
                    <div className="col col-1">Title</div>
                    <div className="col col-2">Date</div>
                    <div className="col col-3">Author</div>
                    <div className="col col-4">Edit</div>
                    </li>
                    {parentToChild.map((post,index)=>( 
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Title">{post.title}</div>
                            <div className="col col-2" data-label="Date">{post.creation}</div>
                            <div className="col col-3" data-label="Time limit">{post.author}</div>
                            <div className="col col-5" data-label="Edit">
                                <Link to={ { pathname:"/EditBlog", state: post }}>
                                    <button>
                                        Edit
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