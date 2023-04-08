import React, { useEffect } from 'react';
import { primaryGreenColour, primaryBlueColour as dblue, primarySilverColour } from '../../App';
import { Logo } from '../../assets';

const primaryBlueColour = 'rgb(35,113,236)'

function PaymentsPopUp(props) {

    useEffect(()=>{
        const ele = document.getElementById('razorpaybtn');
        ele.style.display = 'inline';
        document.getElementById('oplopl').appendChild(ele);
    }, [])

    const planCSS = {    borderRadius: '4px',
        boxShadow: '0 4px 10px rgba(0,0,0,.15)', position: 'relative', zIndex: '99999', padding: '30px', backgroundColor: 'white'};

    return (<>
    
    <div style={{width: '100vw', height: '211px', marginLeft: '-8px', backgroundColor: props.inline ? 'transparent' : primaryGreenColour(0.4), position: 'absolute'}}>
        
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/> 
        <div style={{ 
            top: '0px',
            left: '0px',
            marginLeft: '-8px',
            width: '100vw',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Free Plan, Basic Plan, Premium Plan,  */}
           
           
            <div id="oplopl" style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
               



                <div style={{...planCSS, marginRight: '30px', marginTop: '7px',     border: '1px solid #e3e9eb'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: primaryBlueColour,
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
                            <span style={{fontSize: '20px', marginLeft: '20px'}}>Premium Subscription</span> 
                            <span style={{marginRight: '20px', fontSize: '20px',}}></span> 
                        </div>
                       
                    </div>
                    <br/>
                    <br/>
                    <div style={{padding: '0px 20px'}}>                    
                        <div align="left">Features</div>
                        <ul align="left">
                            <li>Upto 25 Projects &nbsp; <span style={{color: '#4BB543 '}}>&#10004;</span></li>
                            <li>Documentation Editor&nbsp; <span style={{color: '#4BB543 '}}>&#10004;</span></li>
                            <li>Project Management Tools &nbsp; <span style={{color: '#4BB543 '}}>&#10004;</span></li>
                            <li>AI Ideation Assistant &nbsp; <span style={{color: '#4BB543 '}}>&#10004;</span></li>
                            <li>Share Documentats &nbsp; <span style={{color: '#4BB543 '}}>&#10004;</span></li>
                            <li><strike style={{color: 'grey'}}>Marketing Tools</strike></li>
                            <li><strike style={{color: 'grey'}}>Collaboration Tools</strike></li>
                        </ul>
                        <br/>
          
                </div>
                </div>





 
                
            </div>
        </div>
        </>
    );
}

export default PaymentsPopUp;