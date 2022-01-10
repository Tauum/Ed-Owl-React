import React, {useState, useEffect} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './Progression.css';


export default function Progression() {

    return (    
        <div>
            <h1> Overall progression </h1>
            <div className='stuff10'>

                <div>
                    ( map chart here)
                </div>

                <h3>Explaination</h3>
                <p>This demonstrates your concurrent progression from joining the study. <br/> Updating weekly based on your contribution</p>

            </div>
        </div>
        );
    }