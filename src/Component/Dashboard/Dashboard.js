import { Link } from 'react-router-dom'
import { Container, Nav, Card, Modal, Button, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router';
import Quiz from "../Quiz/Quiz";

import './Dashboard.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";

class Dashboard extends Component {

    render() {
        return (
            <div className="all">
                <h1>Dashboard</h1>
                <Button> aaaaa </Button>
                <Link to="/Quiz"> Quiz </Link>
                <br/>
                <a href="/Quiz" target="_blank" rel="noopener noreferrer"> other Quiz</a>
          </div>
        );
      }
    }
export default Dashboard;

// function submit(i) {
//     i.preventDefault();
//     setValue(inputRef.current.value);
//     <Navigate to="./detail" state={{ id: inputRef.current.value}}/>
//   }