import { Link } from 'react-router-dom'
import { Container, Nav, Card, Modal, Button, Row, Col, Accordion } from 'react-bootstrap';
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

                <Container>
                  <Row>
                    <Col>
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Notifications
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    </Col>
                    <Col>
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Updates
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                    </Col>
                    
                  </Row>
                  <Row>

                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">Quizzes</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">

                          <Card.Body>
                            <ul>
                              <li>
                                      <Accordion>
                                        <Card>
                                          <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">To-Do</Accordion.Toggle>
                                          </Card.Header>
                                          <Accordion.Collapse eventKey="0">

                                            <Card.Body>
                                              <ul>
                                                <li></li>
                                              </ul>
                                            </Card.Body>

                                          </Accordion.Collapse>
                                        </Card>
                                      </Accordion>

                                      
                              </li>
                              <li>
                              <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">Quizzes</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">

                          <Card.Body>
                            <ul>
                              <li></li>
                            </ul>
                          </Card.Body>

                        </Accordion.Collapse>
                      </Card>
                    </Accordion>

                              </li>
                            </ul>
                          </Card.Body>

                        </Accordion.Collapse>
                      </Card>
                    </Accordion>

                  </Row>

                  <Row>

                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">Hangman</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </Row>

                  <Row>
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">Fill in the blanks</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </Row>

                  <Row>
                    <Accordion>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">Stats</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </Row>

                </Container>

                


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