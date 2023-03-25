import React from 'react';
import { primaryBlueColour, primaryRedColour, primarySilverColour, primaryYellowColour } from '../../App';
import Typewriter from 'typewriter-effect';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../db';
import { Logo, Signinwithgoogleicon } from '../../assets';
const provider = new GoogleAuthProvider();


function DocumentationLandingPage(props) {
    return (
        <div style={{
            minHeight: '100vh',
         background: `url(https://images.pexels.com/photos/7262790/pexels-photo-7262790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
         backgroundSize: '100%',
         backgroundRepeat: 'no-repeat',
         backgroundPosition: 'center center',
            width: '100vw',
            marginLeft: '-8px',
            backgroundColor: primaryBlueColour
        }}> 
        <div style={{fontSize: '35px', color: 'rgb(55, 55, 55)'}}>
            <br/>
            <br/>
            <br/>
        <img src={Logo} style={{width: '270px'}}/>

            <br/>
            <br/>
            <br/>

<Typewriter
  options={{
    strings: ['Streamline your documentation process.', 'Create professional-grade documents effortlessly.'],
    autoStart: true,
    loop: true,
    deleteSpeed: 20,
    delay: 35,
    pauseFor: 800
  }}
/>
        </div>
        <br/> 
        <br/> 
        <br/> 
        <br/> 
        <br/> 
        <br/> 
   
<div style={{cursor:'pointer'}}
onClick={()=>{
    signInWithPopup(auth, provider);
}}

>
         <img
          style={{
            width: '50px'
         }}
         src={Signinwithgoogleicon} 
         
         /> <br/><b style={{color: 'rgb(55, 55, 55)'}}>Sign In</b>
         </div>

        </div>
    );
}

export default DocumentationLandingPage;