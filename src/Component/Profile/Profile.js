import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import "./Profile.css"
import StatisticsOverview from './StatisticsOverview';

function Profile(props) {
    const { user } = useAuth0();
    const [serverUser, setServerUser] = useState('');
    const [executedFetch, setExecutedFetch] = useState(false);
    const [badges, setBadges] = useState([]);
    const[ parentToChildData, setParentToChildData]=useState({rank: 0, trending: 0, totalTaskCompleted: 0, avgTaskScore: 0, avgTaskTime: 0})

    useEffect(async () => {
        var serverUserJson;
        var sQStats;
        var sHStats;
        var sMStats;

        if (props.location.state) {
            const getServerUser = await fetch(`${window.ipAddress.ip}/User/getByEmail`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: props.location.state }) })
            if (getServerUser.ok) {
                 serverUserJson = await getServerUser.json();
                 setServerUser(serverUserJson);
                }
            else { console.log("error") }
        }
        else {
            const getServerUser = await fetch(`${window.ipAddress.ip}/User/getByEmail`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: user.email }) })
            if (getServerUser.ok) { 
                serverUserJson = await getServerUser.json();
                setServerUser(serverUserJson);
             }
            else { console.log("error") }
        }

        const getSQStats = await fetch(`${window.ipAddress.ip}/SubmittedQuiz/getSQStatsForUser/${serverUserJson.id}`)
        if (getSQStats.ok) {
            sQStats = await getSQStats.json();
            sQStats = {
                id: 1, avgScore: sQStats.avgScore, origValue: sQStats.origValue, avgPercentage: ((sQStats.avgScore / sQStats.origValue) * 100),
                amount: sQStats.amount, task: sQStats.task, avgTime: sQStats.avgTime, show: false
            };}
        else { 
            sQStats = { id: 1, avgScore: 0, amount: 0, task: "Quiz", avgTime: 0, origValue: 0, avgPercentage: 0, show: false }
            console.log("error")
         }

        const getSHStats = await fetch(`${window.ipAddress.ip}/SubmittedHangman/getSHStatsForUser/${serverUserJson.id}`)
        if (getSHStats.ok) {
            sHStats = await getSHStats.json();
            sHStats = { id: 2, avgScore: sHStats.avgScore, origValue: sHStats.origValue, avgPercentage: ((sHStats.avgScore / sHStats.origValue) * 100),
                amount: sHStats.amount, task: sHStats.task, avgTime: sHStats.avgTime, show: false
            };}

        else { 
            sHStats = { id: 2, avgScore: 0, amount: 0, task: "Hangman", avgTime: 0, origValue: 0, avgPercentage: 0, show: false }
            console.log("error")
         }

        const getSMStats = await fetch(`${window.ipAddress.ip}/SubmittedMatch/getSMStatsForUser/${serverUserJson.id}`)
        if (getSMStats.ok) {
            sMStats = await getSMStats.json();
            sMStats = { id: 3, avgScore: sMStats.avgScore, origValue: sMStats.origValue, avgPercentage: ((sMStats.avgScore / sMStats.origValue) * 100),
                amount: sMStats.amount, task: sMStats.task, avgTime: sMStats.avgTime, show: false
            };}

        else { 
            sMStats = { id: 3, avgScore: 0, amount: 0, task: "Match", avgTime: 0, origValue: 0, avgPercentage: 0, show: false }
            console.log("error")
         }
         setParentToChildData(
             {rank: "coming soon", trending : 1, 
         totalTaskCompleted: (sMStats.amount +  sHStats.amount + sQStats.amount),
         avgTaskScore: (sMStats.avgScore + sHStats.avgScore + sQStats.avgScore),


         avgTaskTime: (sMStats.avgTime + sHStats.avgTime + sQStats.avgTime) / 3
          })

        setBadges([sQStats, sHStats, sMStats])
        setExecutedFetch(true)
    }, [])

    if (executedFetch) {
        return (
            <div className='all-profile-contents'>
                
                <div className='profile-frame-container'>

                    <img className='userPicture' src={user.picture} alt={user.name} />

                    <br />
                    <div className='information' >
                        <Row>
                            <Col><h2>{serverUser.name}</h2></Col>
                            <Col>
                                Rank ({parentToChildData.rank})
                            </Col>
                        </Row>

                        <Row>
                            <Col><p> Role: {serverUser.role}</p></Col>
                            <Col> </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Col>
                                    <p> Modules</p>
                                </Col>

                                <Col>
                                    <p> (coming soon)  {/*  {serverUser.modules} */}</p>
                                </Col>
                            </Col>

                            <Col>
                                <Col>
                                    <p>Tags</p>
                                </Col>
                                <Col>
                                    <p> (coming soon)  {/*  {serverUser.tags} tag1*/}</p>
                                </Col>
                            </Col>
                        </Row>

                        {/* <h2> email {serverUser.email} </h2>
                            <p> year of birth {serverUser.yob} </p> */}

                        {/* <p> terms and conditions {serverUser.termsandconditions} </p>
                            <p> study acceptence {serverUser.studyacceptence} </p> */}

                        {/* <ul className="tags">
                            <li className="tag  auto"> <p>Tags -</p> </li>
                            {serverUser.tags.map(tag=>( 
                            <li className="tag  auto"> <p> {tag.content} </p> </li>
                            ))}
                        </ul> */}
                    </div>

                    <div className='badges'><h3>Task Badges</h3>
                        <Row>
                            {badges.map((badge) => (
                                <Col key={badge.id}>
                                    <button className='badge' onClick={() => { setBadges(val => val.map(b => b.id === badge.id ? ({ ...b, show: !b.show }) : b)) }}>
                                        <div>
                                            {badge.show === false ?
                                                <div>
                                                    {badge.amount < 1 ? <img className="shadow emoj" src="/Image/Missing-stat.svg" alt=""></img> : <div></div>}
                                                    {badge.avgPercentage >= 0 && badge.avgPercentage <= 16 ? <img className="shadow emoj" src="/Image/0-16.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 17 && badge.avgPercentage <= 33 ? <img className="shadow emoj" src="/Image/17-33.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 34 && badge.avgPercentage <= 50 ? <img className="shadow emoj" src="/Image/34-50.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 51 && badge.avgPercentage <= 66 ? <img className="shadow emoj" src="/Image/51-66.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 67 && badge.avgPercentage <= 83 ? <img className="shadow emoj" src="/Image/67-83.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 84 && badge.avgPercentage <= 100 ? <img className="shadow emoj" src="/Image/84-100.svg" alt="" /> : <div></div>}

                                                </div>
                                                :
                                                <div className='badge-description'>

                                                    {badge.avgScore > 0 ?
                                                        <div>
                                                            <p className="badge-line"> {badge.task}</p>
                                                            <p className="badge-line"> Avg score: {(badge.avgPercentage).toFixed(1)}%</p>
                                                            <p className="badge-line"> Avg time: {(badge.avgTime).toFixed(0)}</p>
                                                            <p className="badge-line"> Games played: {badge.amount}</p>
                                                        </div>

                                                    : <div>
                                                        <br />Take part in <br />more {badge.task}<br /> to generate <br />analytics and <br /> track badge <br />progression
                                                    </div>}

                                                </div>}
                                        </div>
                                    </button>
                                </Col>
                            ))}

                        </Row>

                    </div>

                    <div className='badges stats-summary'>

                        <h3>Statistics Overview</h3>

                        <div>
                            <StatisticsOverview  parentToChild={parentToChildData} />
                        </div>
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