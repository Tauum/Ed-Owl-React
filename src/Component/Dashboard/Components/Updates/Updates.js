import React, {useState, useEffect} from 'react';
import { Carousel, Button } from 'react-bootstrap';
import './Updates.css';

export default function Updates() {

    return (    
        <div>
            <h1>Updates</h1>
            <br/><br/>
            {/* map this to a feed of updates */}
            <Carousel className="d-flex justify-content-center header">
                <Carousel.Item className="item">
                    <div className='frame shadow '>
                    <h3>Progression <br/> ( map Date)</h3>
                    <p>Dont forget to check out the weekly progression!</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item className="item">
                    <div className='frame shadow '>
                    <h3>Features <br/> (map date) </h3>
                    <p>Dont forget there is a new feature X!</p>
                    </div>
                </Carousel.Item>

            </Carousel>
        </div>
        );
    }