import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Row, Col, Overlay } from 'react-bootstrap';

import "./Profile.css"

function Profile() {
    const { user } = useAuth0();
    const [serverUser, setServerUser] = useState('');
    const [executedFetch, setExecutedFetch] = useState(false);
    const [badges, setBadges] = useState(
        [
            { id: 1, score: 15, count: 43, activity: "Quiz", description: "15 complete", avgTime: 30, show: false }
            , { id: 2, score: 52, count: 12, activity: "Hangman", description: "average time", avgTime: 30, show: false },
            , { id: 3, score: 25, count: 6, activity: "Match", description: "average time", avgTime: 25, show: false }

        ])

    const [summary, setSummary] = useState(
        {
            rank: 15,
            trending: 1,
            totalTaskCompleted: 52,
            avgTaskCorrect: 76,
            avgTaskTime: 152

        })

    var overall = 1;

    //3. passing an empty array for on mount (when the page loads)
    useEffect(() => {
        console.log(badges)

        console.log("user")
        console.log(user)
        fetch(`${window.ipAddress.ip}/User/getByEmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email })
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setServerUser(json)
            })

        // fetch(`${window.ipAddress.ip}/submittedQuiz/getAll`, {
        //         method: "POST",  
        //         headers:{"Content-Type":"application/json"},
        //         body:JSON.stringify( { email : user.email } )
        //     })
        //     .then(response => response.json())
        //     .then(json => { 
        //         console.log(json)
        //         setServerUser(json) })
        setExecutedFetch(true)

    }, [])

    if (executedFetch) {
        return (
            <div className='all-profile-contents'>
                <div className='profile-frame-container'>

                    <img className='userPicture' src={user.picture} alt={user.name} />

                    <br />
                    <div className='information' >
                        <Row className='Row1'>
                            <Col><h2>{serverUser.name}</h2></Col>
                            <Col>
                                {/* put rank here */}Rank #{summary.rank}
                            </Col>
                        </Row>

                        <Row>
                            <Col><p> Role: {serverUser.role}</p></Col>
                            <Col>

                            </Col>
                        </Row>
{/* 
                        <Row>
                            <Col>
                                <Col>
                                    <p> Modules</p>
                                </Col>

                                <Col>
                                    <p>{serverUser.modules} mod1</p>
                                </Col>
                            </Col>

                            <Col>
                                <Col>
                                    <p>Tags</p>
                                </Col>
                                <Col>
                                    <p>{serverUser.tags} tag1</p>
                                </Col>
                            </Col>
                        </Row> */}

                        {/* <h2> email {serverUser.email} </h2>
                                <p> year of birth {serverUser.yob} </p> */}

                        {/* <p> terms and conditions {serverUser.termsandconditions} </p>
                                <p> study acceptence {serverUser.studyacceptence} </p> */}
                        <p>  </p>


                        {/* <ul className="tags">
                                        <li className="tag  auto"> <p>Tags -</p> </li>
                                        {serverUser.tags.map(tag=>( 
                                            <li className="tag  auto"> <p> {tag.content} </p> </li>
                                        ))}
                                    </ul> */}
                    </div>

                    <div className='badges'><h3>Task Badges</h3>
                        <Row>
                        {badges.map((badge, index) => (
                            <Col key={index}>
                                <button className='badge' onClick={() => { setBadges(val => val.map(b => b.id === badge.id ? ({ ...b, show: !b.show }) : b)) }}>
                                    <div>
                                        {badge.show === false ?
                                            <div>
                                                {badge.score >= 0 && badge.score <= 16 ? <img className="shadow emoj" src="/Image/0-16.svg" alt="" /> : <div></div>}
                                                {badge.score >= 17 && badge.score <= 33 ? <img className="shadow emoj" src="/Image/17-33.svg" alt="" /> : <div></div>}
                                                {badge.score >= 34 && badge.score <= 50 ? <img className="shadow emoj" src="/Image/34-50.svg" alt="" /> : <div></div>}
                                                {badge.score >= 51 && badge.score <= 66 ? <img className="shadow emoj" src="/Image/51-66.svg" alt="" /> : <div></div>}
                                                {badge.score >= 67 && badge.score <= 83 ? <img className="shadow emoj" src="/Image/67-83.svg" alt="" /> : <div></div>}
                                                {badge.score >= 84 && badge.score <= 100 ? <img className="shadow emoj" src="/Image/84-100.svg" alt="" /> : <div></div>}
                                            </div>
                                            :
                                            <div className='badge-description'>
                                                <p className="badge-line">{badge.activity}</p>
                                                <p className="badge-line">Avg score: {badge.score}</p>
                                                <p className="badge-line">Avg time: {badge.avgTime}</p>
                                                <p className="badge-line">Games played: {badge.count}</p>
                                            </div>}
                                        </div>
                                    </button>
                                </Col>
                            ))}

                        </Row>

                    </div>

                    <div className='badges stats-summary'>

                        <Row>
                            <Col>
                                <h3>Statistics Overview</h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="stat-element">
                                {summary.trending == 1 ? <img className="shadow emoj summary" src="/Image/trending-up.svg" alt="" /> : <div></div>}
                                {summary.trending == 0 ? <img className="shadow emoj summary" src="/Image/trending-down.svg" alt="" /> : <div></div>}
                                <h3>{summary.trending == 1 ? <p>Positively</p> : <p>Negatively</p>} trending</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="stat-element">
                                <img className="shadow emoj summary" src="/Image/Total-completed.svg" alt="" />
                                <h3>{summary.totalTaskCompleted}<br/>Tasks completed</h3>

                            </Col>
                        </Row>
                        <Row>
                            <Col className="stat-element">
                                <img className="shadow emoj summary" src="/Image/Avg-correct.svg" alt="" />
                                <h3>{summary.avgTaskCorrect}%<br/>Avg correct</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="stat-element">
                                <img className="shadow emoj summary" src="/Image/time-outline.svg" alt="" />
                                <h3>{summary.avgTaskTime} Seconds<br/>AVG task time</h3>
                            </Col>
                        </Row>
                    </div>

                    {/* AUTH0
                            <div>
                                <img src={user.picture} alt={user.name}/>
                                <h2>{user.name}</h2>
                                <p> {user.email} </p>
                                { JSON.stringify(user, null, 2 )}
                            </div> */}
                </div>
            </div>
        );
    }

    else {
        return (
            <div className='all-profile-contents'>
                <div className='profile-frame-container'>

                    <img className='userPicture' />

                    <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                    <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />

                </div>
            </div>
        )
    }
}

export default Profile