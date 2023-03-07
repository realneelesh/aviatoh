import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { primaryBlueColour, primarySilverColour, showPage } from '../App';
import { Calendar, Exercise, PathPageView } from '../assets';
import { browserStorage, discDataKey } from '../BrowserStorage';
import { disciplinesCollection, getAllDocuments, getDocument, updateOrCreateDocument, usersCollection } from '../db';


function PathPage(props) {
    useEffect(()=>{
        showPage();
    });

    const { email } = props;
    const { discid, title } = useParams();
    const [ activeTopic, setActiveTopic ] = useState(null);
    const [ activeQuestion, setActiveQuestion ] = useState(null);
    const [ completedResourcesUrls, setCompletedResourcesUrls ] = useState(null);
    
    const [ currentUser, setCurrentUser ] = useState(null);

    const [data, setData] = useState(null); // array of { title, id, paths[] }
    // template for "path" is available in path.json in json_formats folder

    const pathsArray = [];

    useEffect(()=>{

        if(!browserStorage.getItem(discDataKey)){
        Promise.resolve(getAllDocuments(disciplinesCollection)).then(res => {
            let arr = [];
            res.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
                arr.push({...doc.data(), id: doc.id})
            });
            setData(arr); 
        })} else {
            setData(browserStorage.getItem(discDataKey));
        }

       if(email) {
         getDocument(usersCollection, email).then(res => {
            setCurrentUser(res.data());
            console.log(res.data());
            setCompletedResourcesUrls(res.data().completedResourcesUrls);
        });
    }
    }, [email]);

    const checkTopic = (topic) => { 
     
            let flag = true;
            topic.urls.map(url => { 
                if(!completedResourcesUrls?.includes(url.url)){
                    flag = false;
                }
            });
            
            return flag; 
    }

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }

    const pathData = data ? JSON.parse(data.find(x=>x.id===discid).paths.find(p=>JSON.parse(p).title===title)) : null;

    return (
        <div>
            <br/>
            <br/>
            {/* <pre>{JSON.stringify(pathData)}</pre> */}
            {/* <div id="mySidenav" className="sidenav" align="left">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
 
<div align="left" style={{fontSize:'38px', cursor:'pointer'}} onClick={openNav}>&#9776;</div>
 <hr/>
         */}
 
         <div style={{
            display: 'flex',
            justifyContent: 'space-between'
         }}>
           
            <div align="left" style={{overflowY: 'scroll', height: '83vh', width: '20vw', backgroundColor: '', paddingTop: '0px'}}>
                {/* &nbsp;Topics:
                <br/>
                <br/> */}
                 {  
                <>
                <><button
                style={{
                    position: 'relative',
                    textAlign: 'left',
                    width: '95%',
                    backgroundColor: activeTopic?.title == null ? primaryBlueColour : primarySilverColour,
                    color: activeTopic?.title == null ? 'white' : 'black',
                    margin: '2px',
                    fontSize: '13px'
                }}
                onClick={()=>{
                    setActiveTopic(null);
                }}
                ><input className="checkboxInput" type="checkbox"
                checked={true}
                style={{cursor: 'pointer', display: 'inline-block', width: '16%', position: 'absolute', right: '5px', bottom: '5px'}} />Introduction</button>
                <br/>
                <br/>
                </>
                <div align="center"></div>
                    {pathData?.topics.map((topic, i) => {
                        return <><button
                        style={{
                            position: 'relative',
                            textAlign: 'left',
                            width: '95%',
                            backgroundColor: topic.title === activeTopic?.title ? primaryBlueColour : primarySilverColour,
                            color: topic.title === activeTopic?.title ? 'white' : 'black',
                            margin: '2px',
                            fontSize: '13px'
                        }}
                        onClick={()=>{
                            setActiveTopic(topic);
                        }}
                        ><input className="checkboxInput" type="checkbox"
                        checked={checkTopic(topic)}
                        style={{cursor: 'pointer', display: 'inline-block', width: '16%', position: 'absolute', right: '5px', bottom: '5px'}} /> {i+1}. {topic.title}</button></>
                    })}
                    </>
                  
            }

            </div>  
            <div style={{overflowY: 'scroll', height: '82vh', width: '75vw', paddingTop: '0', paddingRight: '20px'}} align="left">
                {
                    !activeTopic && <div>  
                 <div style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{color: '#254B62'}}>{title}</span></div>
                    <hr/>
                    <br/>
                        <sub style={{marginBottom: '7px', display: 'block'}}>Created / Approved by:</sub>
                        <h4 style={{color: 'black', backgroundColor: 'white', paddingLeft: '0px'}}>
                            {pathData?.approver}
                        </h4>
                        <br/>
                        <br/>
                       {pathData?.contributors &&<><sub>Contributors:</sub>
                       <br/>
                        {
                            pathData?.contributors?.split(',').map(cont => {
                                return <>{cont} | </>
                            })
                        }</>
                       }
                        
                         <br/>
                         <br/>
                        <br/> 
                        <h4 style={{
                            color:'black',
                            backgroundColor: 'white',
                            paddingLeft: '0px'
                        }}>Book an appointment with the instructor</h4>
                        <br/>
                        <br/>
                        <a target={pathData?.contactApprover} href={pathData?.contactApprover} style={{
                            textDecoration: 'none'
                        }}><img width="50" src={Calendar}></img></a>
                        <br/> 
                        

                    </div>
                }
                {activeTopic && <><div style={{fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{color: '#254B62'}}>{title} - {activeTopic?.title}</span><i title="contribute" className='fas fa-edit' style={{color: 'grey', cursor: 'pointer'}}></i></div>
                <hr/></>}
               {activeTopic && <h4 style={{display: 'block', padding: '10px 15px', backgroundColor: '#254B62'}}> {
                    activeTopic?.guidelinesForUrls
                }
                </h4>}
<br/> 
                
                {
                    activeTopic && activeTopic?.urls.length != 0 && <span> &nbsp;Resources:
                        &nbsp;<i onClick={()=>{
              document.getElementById('info-resources').style.display = 'inline';
             }} className="fa fa-info-circle" style={{ zIndex: '9999', display: 'inline', fontSize: '13px', color: '#254B62', cursor: 'pointer'}}></i>
             <span id="info-resources" style={{display: 'none', width: '300px', padding: '15px', paddingRight: '30px', textAlign: 'left', position: 'absolute', color: primarySilverColour, backgroundColor: '#254B62', marginLeft: '-18px'}}>
                <span onClick={()=>{
              document.getElementById('info-resources').style.display = 'none';
             }}  style={{position: 'absolute', top: '14px', right: '15px', cursor: 'pointer'}}><b>x</b></span>
                
                Curated list of useful resources for {activeTopic.title}
             </span> ( You can use the checkboxes to mark them completed )
           
             <br/>
                <br/>
                    </span>
                }
                 
               
                
                {
                    activeTopic?.urls.map(url => {
                        return <>
                                <a
                                    target={url.url}
                                    href={url.url}
                                    style={{
                                        textDecoration: 'none',
                                        textAlign: 'left',
                                        margin: '2px',
                                        color: 'black',
                                        fontSize: '12px'
                                    }}
                                    >
                                        <h3 style={{backgroundColor: primarySilverColour, color: 'black', paddingLeft: '13px'}}>
                                            <input key={url.url}
                                            defaultChecked={false}
                                            checked={completedResourcesUrls?.includes(url.url)}
                                            onChange={(e) => {
                                                let cU = currentUser;
                                                if(!currentUser.hasOwnProperty('pathsEnrolled')){
                                                    cU = {...currentUser, pathsEnrolled: []};
                                                }
                                                if(!currentUser.pathsEnrolled.includes(discid+'/'+title)){
                                                updateOrCreateDocument(usersCollection, email, { ...currentUser, pathsEnrolled: [...cU.pathsEnrolled, discid+'/'+title] }).then(res=>{
                                                    if(email) {
                                                        getDocument(usersCollection, email).then(res => {
                                                        setCurrentUser(res.data());
                                                        setCompletedResourcesUrls(res.data().completedResourcesUrls);
                                                    });
                                                    }
                                                }).catch(err => {
                                                    alert(err);
                                                });
                                            }
                                                // e.target.checked gives boolean
                                                if(e.target.checked) {
                                                    if(email) {
                                                        let cRU = completedResourcesUrls;
                                                        if(!completedResourcesUrls){
                                                            cRU = [];
                                                        }
                                                        updateOrCreateDocument(usersCollection, email, {...setCurrentUser, completedResourcesUrls: [...cRU, url.url]})
                                                        .then(res => {
                                                            if(email) {
                                                                getDocument(usersCollection, email).then(res => {
                                                                   setCurrentUser(res.data());
                                                                   setCompletedResourcesUrls(res.data().completedResourcesUrls);
                                                               });
                                                            }
                                                        }).catch(err => {
                                                            alert(err);
                                                        })
                                                    }
                                                } else {
                                                    if(email) {
                                                        const arr = completedResourcesUrls;
                                                        const index = arr.indexOf(url.url);
                                                        const x = arr.splice(index, 1);
                                                        updateOrCreateDocument(usersCollection, email, {...setCurrentUser, completedResourcesUrls: arr})
                                                        .then(res => {
                                                            if(email) {
                                                                getDocument(usersCollection, email).then(res => {
                                                                   setCurrentUser(res.data());
                                                                   setCompletedResourcesUrls(res.data().completedResourcesUrls);
                                                               });
                                                            }
                                                        }).catch(err => {
                                                            alert(err);
                                                        })
                                                    }
                                                }
                                            }}
                                            title='Mark as completed' className='checkboxInputTopic' type="checkbox" name={url.url} style={{display: 'inline-block', width: 'auto'}} />
                                              &nbsp;
                                              {url.title}
                                        </h3>
                                </a>
                                <br/><br/>
                               </>
                    })
                }
               
                 {
                    activeTopic?.exercise ? <span>
                         <br/>
                <br/>
                     
                        <span> &nbsp; Exercise:

&nbsp;<i onClick={()=>{
              document.getElementById('info-exercise').style.display = 'inline';
             }} className="fa fa-info-circle" style={{ zIndex: '9999', display: 'inline', fontSize: '13px', color: '#254B62', cursor: 'pointer'}}></i>
             <span id="info-exercise" style={{display: 'none', width: '300px', padding: '15px', paddingRight: '30px', textAlign: 'left', position: 'absolute', color: primarySilverColour, backgroundColor: '#254B62', marginLeft: '-18px'}}>
                <span onClick={()=>{
              document.getElementById('info-exercise').style.display = 'none';
             }}  style={{position: 'absolute', top: '14px', right: '15px', cursor: 'pointer'}}><b>x</b></span>
                
               This is not a graded exercise, the purpose is to learn so in case you find this exercise too hard then it's good! Do some research on internet about the topics you struggle with.
             </span>
</span>
                        <br/>
                        <br/>
                    <a href={activeTopic?.exercise} target={activeTopic?.exercise} style={{textDecoration: 'none'}}>
                        <img style={{width: '80px'}} src={Exercise} title="Exercise" />
                        
                    </a>
                    <br/>  </span> : null
                }
                <br/>  
                <br/> 
                {/* {
                    activeTopic && <span>Lecture:</span>
                }
                <br/><br/>
                {
                    activeTopic?.guidelinesForUrls
                } */}

{
                    activeTopic && activeTopic?.knowledgeCheck.length != 0 &&  <span> &nbsp; Knowledge check:

&nbsp;<i onClick={()=>{
              document.getElementById('info-kc').style.display = 'inline';
             }} className="fa fa-info-circle" style={{ zIndex: '9999', display: 'inline', fontSize: '13px', color: '#254B62', cursor: 'pointer'}}></i>
             <span id="info-kc" style={{display: 'none', width: '300px', padding: '15px', paddingRight: '30px', textAlign: 'left', position: 'absolute', color: primarySilverColour, backgroundColor: '#254B62', marginLeft: '-18px'}}>
                <span onClick={()=>{
              document.getElementById('info-kc').style.display = 'none';
             }}  style={{position: 'absolute', top: '14px', right: '15px', cursor: 'pointer'}}><b>x</b></span>
                
                Before you move on to the next topic, you should know the answers to the following questions
             </span>
</span>
                }
                <br/> 
                {
                    activeTopic?.knowledgeCheck.map((kc, i) => {
                        return <><span
                        style={{
                            textDecoration: 'none',
                            textAlign: 'left',
                            margin: '2px',
                            color: 'black',
                            fontSize: '13px'
                        }}
                        ><div 
                        className="question"

                        onClick={()=>{
                            setActiveQuestion(activeQuestion === kc.question ? null : kc.question)
                        }}
                        style={{cursor: 'pointer', backgroundColor: activeQuestion === kc.question ? 'silver' : primarySilverColour, color: 'black', padding: '15px'}}><b>&#187;</b> &nbsp;{kc.question}
                      
                        <div id={kc.question} 
                        style={{ marginTop: '18px', display: activeQuestion === kc.question ? 'block' : 'none', cursor: 'pointer', backgroundColor: primarySilverColour, color: 'black', padding: '15px'}}
                        >
                        {
                            kc.answer
                        }
                        </div>
                        </div>
                        </span>
                        
                        </>
                    })
                }
            </div>
         </div>

        </div>
    );
}

export default PathPage;