import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import baselogo from "../../../public/Image/baselogo.svg" 

import React, { Component } from "react";

class Home extends Component {

    render() {
        return (
          <div className="home">
            <section className="hero-section">

                <img className="img shadow" src="/Image/baselogo.svg" alt="" />

                <div className="text">
                    <div className="heading">
                        <h1>ED <span/> OWL<br/> Next Generation digital learning</h1>
                    </div>
                        <div className="description"> 
                            <p>Take your university studies online. Ed Owl will be your one-stop-shop for quizzes, games, module criteria and much more! </p> 
                        </div>
                        <br/>
                        <a href="" className="btn btn-dark shadow">Join</a>
                        <a href="" className="btn btn-primary shadow">Video</a>
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
                            <img className="card-img-top" src="images/notifications.svg" alt="notifications"/>
                                <h2 className="card-title">Notifications</h2>
                                <p className="card-text">Visit the notifications tab to keep track of progress wherever you are. See exactly what work needs completing and enable push notifications to know when close to deadlines.</p>
                                
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
{/* 
            <section class="testimonials-section">
                <div>
                    <ul>
                        <li>
                            <img src="Images/Person.jpg" alt="Person"/>
                            <blockquote>"aaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbbb cccccccccccccccccccc"</blockquote>
                            <cite> - User1</cite>
                        </li>
                        
                        <li>
                            <img src="Images/Person.jpg" alt="Person"/>
                            <blockquote>"bbbbbbbbbbbbbbbbbbb  cccccccccccccccccccc dddddddddddddddd"</blockquote>
                            <cite> - User2</cite>
                        </li>

                        <li>
                            <img src="Images/Person.jpg" alt="Person"/>
                            <blockquote>"cccccccccccccccccccc ddddddddddddddddddd eeeeeeeeeeeeeeeeee"</blockquote>
                            <cite> - User3</cite>
                        </li>
                    </ul>
                </div>
            </section> */}

            <section className="posts-section" id="blog">
                <div className="heading"><h1>Latest Articles</h1></div>
                <div className="list">
                    <ul>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                            <img className="card-img-top" src="images/image-currency.jpg" alt="Money"/>
                                <h2 className="card-title">Whats in store for the new term?</h2>
                                <cite>By Nurun Nahar</cite>
                                <p className="card-text">The world is getting smaller and we're becoming more mobile. So why should you  be forced to only recieve money in a single ....</p>
                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                            <img className="card-img-top" src="images/image-restaurant.jpg" alt="Restaraunt"/>
                                <h2 className="card-title">New GDPR regulation, what it means for new buisnesses?</h2>
                                <cite>By Nurun Nahar</cite>
                                <p className="card-text">Our simple budgeting feature allows you to seperate out your spending and set realistic limits each month. That means you ....</p>
                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                            <img className="card-img-top" src="images/image-plane.jpg" alt="Plane"/>
                                <h2 className="card-title">Tips on where to start with ED OWL</h2>
                                <cite>By Nurun Nahar</cite>
                                <p className="card-text">We want you to suceed with your studies. We'll even show you how to with the following ....</p>
                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                            <img className="card-img-top" src="images/image-confetti.jpg" alt="Confetti"/>
                                <h2 className="card-title">Our Services are now Live!</h2>
                                <cite>By Nurun Nahar</cite>
                                <p className="card-text">After a lot of hard work by the whole team, we're excited to launch our first supported module!....</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="contact-Section">

                <div className="container">

                    <div className="Contact-Left"> 
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
                    </div>

                    <div className="Contact-Right" id="about us"> 
                        {/* this breaks the page VVVV */}
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.1216446934704!2d-2.4374426839615553!3d53.573445565377064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ba7add9a0139b%3A0x26e04dfac5ed4688!2sUniversity%20of%20Bolton!5e0!3m2!1sen!2suk!4v1629653875219!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
                        <p>Contact number: 01204 903178</p>
                        <p>Address: <br/> Y4-01 , Institute of Management <br/> University of Bolton, <br/> A676 Deane Rd,<br/> Bolton BL3 5AB</p> 
                    </div>


                </div>
            </section>


            


          </div>
        );
      }
    }
 export default Home;