import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";

import './NavigationBar.css';

import Announcement from "./Announcement"
import Note from "./Note"

import Home from "../Home/Home";
import Blog from "../Blog/Blog";
import Quiz from "../Quiz/Quiz";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import Hangman from '../Hangman/Hangman';
import BlankFill from '../BlankFill/BlankFill';
import Match from '../Match/Match';

import Login from '../../Function/Login';
import Logout from '../../Function/Logout';

import EditQuiz from '../AdminDashboard/Quizzes/EditQuiz';
import EditHangman from '../AdminDashboard/Hangmans/EditHangman';
import EditMatch from '../AdminDashboard/Match/EditMatch';
import EditBlog from '../AdminDashboard/Blogs/EditBlog';
import EditAnnouncement from '../AdminDashboard/Announcement/EditAnnouncement';

import QuizReview from "../Quiz/QuizReview";

import tester2 from "../Test-stuff/tester2"
import StateEffect from "../Test-stuff/StateEffect";
import Etc from "../Test-stuff/Etc/Etc";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import RequestTest from '../Test-stuff/RequestTest';
import Planets from '../Test-stuff/React-query/Planets';
import fullpage from '../Test-stuff/fullpage';
import Parent from '../Test-stuff/ParentChild/Parent';
import timer from '../Test-stuff/timer';

function NavigationBar() {

  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {

    return (
      <div>
        <HashRouter>
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
          <Container>
          
          <Navbar.Brand href="https://moodle.bolton.ac.uk/my/" className="edowl"><img className="bolton-img" src="/Image/mixed.png" alt="Bolton Moodle" className="mixedimg"/></Navbar.Brand>

            <Navbar.Brand href="#Home" className="edowl-title">Ed Owl</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">

                <NavLink className="Main-element" to="/Home">Home</NavLink>
                <NavLink className="Main-element" to="/Blog">Blog</NavLink>
                <NavLink className="Main-element" to="/Dashboard">Dashboard</NavLink>
                
                {/* <NavDropdown className="Drop-element" title="test stuff" id="basic-nav-dropdown">
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/StateEffect">StateEffect</NavLink>  
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/Dashboard">Dashboard</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/Etc">Etc</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/Parent">Parent-Child-Test</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/RequestTest">Request Test</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/Planets">React Query Test</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/timer">timer Test</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/BlankFill">BlankFill Test</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/fullpage">BlankFill Test</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/tester2">tester2</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/AdminDashboard">AdminDashboard</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item> 
                    <NavLink className="Drop-element" to="/Match">Match</NavLink>
                  </NavDropdown.Item>
                </NavDropdown> */}

                <NavDropdown className="Drop-element" title="Quick Notes" id="basic-nav-dropdown" >
                  <Note/>
                </NavDropdown>

                <NavDropdown className="Drop-element announcement" title="Updates" id="basic-nav-dropdown">
                    <Announcement/>
                </NavDropdown>

                <div className="Main-element"> <Logout/> </div>

              </Nav>
            </Navbar.Collapse>
          </Container>

        </Navbar>

        {/* STOP THIS FROM CLICKING CONTENT ON DASHBOARD & BLOG PAGE IDK WHY */}


        <div className="wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
        </div>

          <Route path="/Home" component={Home}/>
          <Route path="/Blog" component={Blog}/>
          <Route path="/Quiz" component={Quiz}/>
          <Route path="/Profile" component={Profile}/>
          <Route path="/Dashboard" component={Dashboard}/>
          <Route path="/AdminDashboard" component={AdminDashboard}/>
          <Route path="/Hangman" component={Hangman}/>
          <Route path="/BlankFill" component={BlankFill}/>
          <Route path="/Match" component={Match}/>
          
          <Route path="/EditQuiz" component={EditQuiz}/>
          <Route path="/EditHangman" component={EditHangman}/>
          <Route path="/EditMatch" component={EditMatch}/>
          <Route path="/EditBlog" component={EditBlog}/>
          <Route path="/EditAnnouncement" component={EditAnnouncement}/>
          

          <Route path="/QuizReview" component={QuizReview}/>

          <Route path="/Etc" component={Etc}/>
          <Route path="/StateEffect" component={StateEffect}/>
          <Route path="/Parent" component={Parent}/>
          <Route path="/RequestTest" component={RequestTest}/>
          <Route path="/Planets" component={Planets}/>
          <Route path="/timer" component={timer}/>
          <Route path="/fullpage" component={fullpage}/>
          <Route path="/tester2" component={tester2}/>

        </HashRouter>
      </div>
    );

  }
  
 // THIS BELOW IS SHOWN WHEN USERS ARE NOT LOGGED IN :)
  else{
    return (
      <HashRouter>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Container>
        <Navbar.Brand href="https://moodle.bolton.ac.uk/my/" className="edowl"><img className="bolton-img" src="/Image/mixed.png" alt="Bolton Moodle" className="mixedimg"/></Navbar.Brand>
        <Navbar.Brand href="#Home" className="edowl-title">Ed Owl</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <NavLink className="Main-element" to="/Home">Home</NavLink>
              <NavLink className="Main-element" to="/Blog">Blog</NavLink>
              <div className="Main-element"><Login/> </div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
        </svg>
      </div>

        <Route path="/Home" component={Home}/>
        <Route path="/Blog" component={Blog}/>

      </HashRouter>
    );
  }

}

export default NavigationBar;
