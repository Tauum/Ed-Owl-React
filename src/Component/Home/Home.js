import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from "react";

class Home extends Component {

    

    render() {
        return (
          <div className="home">
            <section className="hero-section">

                <img className="img shadow" src="/Image/baselogo.svg" alt=""/>

                <div className="text">
                    <div className="heading">
                        <h1>ED <span/> OWL<br/> Next Generation digital learning</h1>
                    </div>
                        <div className="description"> 
                            <p>Take your university studies online. Ed Owl will be your one-stop-shop for quizzes, games, module criteria and much more! </p> 
                        </div>
                        <br/>
                        <a href="" className="btn btn-warning shadow">Join</a>
                        <a href="" className="btn btn-red shadow">Video</a>
                    </div>
            </section>


            <section className="features-section">
                
                <div className="heading"><h1>Why you should use ED OWL?</h1></div>

                <div className="description"> <p>Here at Bolton University, we use online module intergration for selected modules. Use of platform features will contribute towards your final grade!</p> </div>

                <div className="list">
                    <ul>
                        <li className="card shadow p-3 mb-5"  >
                            <div className="card-body">
                            <img className="card-img-top" src="images/quizzes.svg" alt="Quizzes"/>
                                <h2 className="card-title">Quizzes</h2>
                                <p className="card-text">Browse or Partake in class quizzes on your own time.</p>
                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                            <img className="card-img-top" src="images/milestones.svg" alt="Milestones"/>
                                <h2 className="card-title">Milstone tracking</h2>
                                <p className="card-text">View posts, Manage your progress, leave comments, and much more from one personalised platform.</p>
                                
                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                            <img className="card-img-top" src="images/sign-up-process.svg" alt="notifications"/>
                                <h2 className="card-title">Getting started</h2>
                                <p className="card-text">Open your account in minutes online and start taking control of your studies right away.</p>
                                
                            </div>
                        </li>

                    </ul>
                </div>
            </section>

            <section className="contact-Section">

                <div className="container">

                        <h2>Contact Us</h2>
                        <form action="">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name here"/>

                            <label htmlFor="Email">Email</label>
                            <input type="text" id="Email" name="Email" placeholder="Your Email here"/>

                            <label htmlFor="message">Message</label>
                            <textarea name="message" id="message" cols="30" rows="10" placeholder="Your Message here"></textarea>
                        
                            <input type="submit" className="Send-Message-CTA shadow" value="Submit Message"/>
                        </form>

                        <div className="card shadow p-3 mb-5 contact-details"> 
                        {/* this breaks the page VVVV */}
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.1216446934704!2d-2.4374426839615553!3d53.573445565377064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ba7add9a0139b%3A0x26e04dfac5ed4688!2sUniversity%20of%20Bolton!5e0!3m2!1sen!2suk!4v1629653875219!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
                        <p>01204 903178</p>
                        <p>Y4-01 , Institute of Management <br/> University of Bolton, <br/> A676 Deane Rd,<br/> Bolton BL3 5AB</p> 
                    </div>

                </div>
            </section>


            


          </div>
        );
      }
    }
 export default Home;