import React, {useState, useEffect} from 'react';
import { Carousel, Button, Row, Col } from 'react-bootstrap';
import './TaskPerformance.css';

export default function TaskPerformance() {

    return (    
        <div>
            <h1>Task performance</h1>
            <br/><br/><br/>
            <p>
                This displays some statistics about your previously attempted tasks
            </p>

            <ul>
                <li>
                    <div className='eachelement'>
                    (svg here)
                    </div>
                    <h2>Average task time</h2>
                    <p>On average it takes you (insert time here) to complete tasks.</p>
                    (line split svg here)
                </li>

                <li>
                    <div className='eachelement'>
                    (svg here)
                    </div>
                    <h2>Accuracy</h2>
                    <p>You average (insert stat) accuracy in tasks.</p>
                    (line split svg here)
                </li>

                <li>
                    <div className='eachelement'>
                    (svg here)
                    </div>
                    <h2>Articles read</h2>
                    <p>You have read (insert stat) articles.</p>
                    (line split svg here)
                </li>

                <li>
                    <div className='eachelement'>
                    (svg here)
                    </div>
                    <h2>Tasks completed</h2>
                    <p>You have completed (insert stat) tasks.</p>
                    (line split svg here)
                </li>

                <li>
                    <div className='eachelement'>
                    (svg here)
                    </div>
                    <h2>Key focus</h2>
                    <p>You focused more on (insert stat) tasks.</p>
                    (line split svg here)
                </li>

                <li>
                    <div className='container'>
                    (svg here)
                    </div>
                    <h2>Time online</h2>
                    <p>You have spent (insert stat) time online.</p>
                    (line split svg here)
                </li>
            </ul>
        </div>
        );
    }