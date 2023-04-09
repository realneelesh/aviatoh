import React, { useEffect, useState } from 'react';
import { primaryGreenColour, primaryBlueColour as dblue, primarySilverColour } from '../../App';
import { Logo } from '../../assets';
import { SearchLoader } from '../../components/Loaders';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const primaryBlueColour = 'rgb(35,113,236)'

function PaymentsPopUp(props) {
 

    const [hideLoader, setHideLoader] = useState(false);

    useEffect(()=>{ 
            const ele = document.getElementById('razorpaybtn');
            ele.style.display = 'inline';
            document.getElementById('oplopl').appendChild(ele);
              
    }, [])

    const planCSS = {    borderRadius: '4px',
        boxShadow: '0 4px 10px rgba(0,0,0,.15)', position: 'relative', zIndex: '99999', padding: '30px', width: '45vw', backgroundColor: 'white'};

    return (<>
    {/* {!hideLoader ? <SearchLoader /> : null} */}
    <div align="left" style={{width: '100vw', padding: '15px', marginLeft: '-8px', backgroundColor: props.inline ? 'transparent' : '', color: dblue, position: 'absolute'}}>
       <Link to="/" style={{textDecoration: 'none', cursor: 'pointer', color: dblue}}>Back to Dashboard</Link>
    </div>
   <br/>
   <br/>
   <br/>
   <br/>
   <br/>
   <br/> 
   {/*} <div style={{width: '6vw', height: '100vh', marginLeft: '-8px', right: '0px', backgroundColor: props.inline ? 'transparent' : 'rgb(230, 230, 230)', position: 'absolute'}}></div>
              <br/> */} 
        <div style={{ 
            top: '0px',
            left: '0px',
            marginLeft: '-8px',
            width: '100vw',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh'
            // border: '30px solid silver'
        }}>
            {/* Free Plan, Basic Plan, Premium Plan,  */}
           
           
            <div id="oplopl" style={{
                display: 'flex',
                justifyContent: 'space-around',
            }}>
               



                <div style={{...planCSS, marginRight: '30px', marginTop: '7px',     border: '1px solid #e3e9eb'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: primaryGreenColour(1),
                        color: 'white',
                        width: '100%',
                        padding: '20px 0px',
                        borderRadius: '3px'

                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            }}>
                            <span style={{fontSize: '20px', marginLeft: '20px'}}>Buy Premium Subscription</span> 
                            <span style={{marginRight: '20px', fontSize: '20px',}}></span> 
                        </div>
                       
                    </div>
                    <br/>
                    <br/>
                    <div style={{padding: '0px 20px'}}>                    
                        {/* <div align="left">Features</div> */}
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <div>
                                <ul align="left">
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Create Multiple Projects &nbsp;✨  </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Documentation Editor&nbsp;✨ </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Project Management Tools &nbsp;✨ </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; AI Ideation Assistant &nbsp;✨ </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Progress Tracking &nbsp;✨ </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Email Reminders &nbsp;✨ </li>
                                    <li><span style={{color: '#4BB543 '}}>&#10004;</span> &nbsp; Share Documentats &nbsp;✨ </li>
                                    {/* <li><strike style={{color: 'grey'}}>Marketing Tools</strike></li>
                                    <li><strike style={{color: 'grey'}}>Collaboration Tools</strike></li> */}
                                </ul>
                        </div>
                        <div style={{width: '33%'}}>
                        <img style={{width: '80%'}} src={Logo} /> 
                        <div style={{height: '13px'}}></div>
                        </div>

                        </div>
                        
                        <br/>
          
                </div>
                </div>





 
                
            </div>
        </div> 
        
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/> 
         <Footer/> 
        </>
    );
}

export default PaymentsPopUp;