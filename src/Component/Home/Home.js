import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

export default function Weekly() {

    const [contactUs, setContactUs] = useState({ name:"", message: "", email: "", generatedDate: "" });

    const handleSubmitButton = (e) => {
        e.preventDefault();
        if (contactUs.name !== "" && contactUs.email !== "" && contactUs.message !== ""){

        var todayDate = new Date().toISOString().slice(0, 10);
        fetch(`${window.ipAddress.ip}/ContactUs/add`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                name: contactUs.name,
                email: contactUs.email,
                message: contactUs.message,
                generatedDate: todayDate
            })
        })
            .then(res => res.json())
            .catch(error => {
                console.log("error: " + error);
            })
        
            setContactUs({ name:"", message: "", email: "", generatedDate: "" });
        }

      }

    return (
        <div className="home">
            <section className="hero-section">

                <img className="img shadow" src="/Image/baselogo.svg" alt="" />

                <div className="text">
                    <div className="heading">
                        <h1>ED <span /> OWL<br />The HE digital learning companion app</h1>
                    </div>
                    <div className="description">
                        <p>Take university studies online. Ed Owl could be your next stop for games, learning, updates and more for your course! </p>
                    </div>
                    <br />
                    <a href="" className="btn btn-red shadow">Video</a>

                    <a href="https://forms.gle/PtLd3raF7q2WpnAH7" className="btn btn-dark shadow">Survey</a>
                    
                </div>
            </section>


            <section className="features-section">

                <div className="heading"><h1>Why you should use ED OWL?</h1></div>

                <div className="description"> <p>Here at Bolton University, we use online module intergration for selected modules. Check with your tutors about access.</p> </div>

                <div className="list">
                    <ul>
                        <li className="card shadow p-3 mb-5"  >
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/games-and-learning.svg" alt="games and learning" />
                                <h2 className="card-title">Games, learning and HE</h2>
                                <p className="card-text">Browse or Partake in subject specific tasks on your own time.</p>
                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/varied-formats.svg" alt="notifications" />
                                <h2 className="card-title">Varied formats</h2>
                                <p className="card-text">Blogs, video logs, podcasts and up to date information curated by tutors</p>
                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/calendar-outline.svg" alt="Milestones" />
                                <h2 className="card-title">Frequent updates</h2>
                                <p className="card-text">You will discover new content weekly or monthly, being topically relevant to your current studies.</p>

                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/notes.svg" alt="Milestones" />
                                <h2 className="card-title">Quick notes</h2>
                                <p className="card-text">View, add and delete quick notes in-platform as future reminders</p>

                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/progression-tracking.svg" alt="Milestones" />
                                <h2 className="card-title">Progression tracking</h2>
                                <p className="card-text">Partake in tasks, review your scores and analyse your previous attempts.</p>

                            </div>
                        </li>

                        <li className="card shadow p-3 mb-5">
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/hat.svg" alt="notifications" />
                                <h2 className="card-title">Getting started</h2>
                                <p className="card-text">Open your account in seconds by clicking login / sign up in the drop down menu and complete the sign-up form.</p>

                            </div>
                        </li>

                    </ul>
                </div>
            </section>

            <section className="contact-Section">

                <div className="container">

                    <h2>Contact Us</h2>
                    <form action="" className='contact-us-form'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Name here" 
                        value={contactUs.name} onChange={(e) => setContactUs({ ...contactUs, name: e.target.value })} />

                        <label htmlFor="Email">Email</label>
                        <input type="text" id="Email" name="Email" placeholder="Your Email here" 
                        value={contactUs.email} onChange={(e) => setContactUs({ ...contactUs, email: e.target.value })}/>

                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" cols="30" rows="10" placeholder="Your Message here"
                        value={contactUs.message} onChange={(e) => setContactUs({ ...contactUs, message: e.target.value })}></textarea>

                        <input type="submit" className="Send-Message-CTA shadow" onClick={handleSubmitButton} />
                    </form>

                    <div className="card shadow p-3 mb-5 contact-details">
                        {/* this breaks the page VVVV */}
                        <p>01204 903178</p>
                        <p>Y4-01 , Institute of Management <br /> University of Bolton, <br /> A676 Deane Rd,<br /> Bolton BL3 5AB</p>

                        <iframe allowFullScreen="" loading="lazy" className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.1216446934704!2d-2.4374426839615553!3d53.573445565377064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ba7add9a0139b%3A0x26e04dfac5ed4688!2sUniversity%20of%20Bolton!5e0!3m2!1sen!2suk!4v1629653875219!5m2!1sen!2suk"></iframe>

                    </div>

                  
                </div>
            </section>





        </div>
    );
}
