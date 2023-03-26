import React from "react";
import {
  primaryBlueColour,
  primaryRedColour,
  primarySilverColour,
  primaryYellowColour,
} from "../../App";
import Typewriter from "typewriter-effect";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../db";
import { Logo, Signinwithgoogleicon } from "../../assets";
const provider = new GoogleAuthProvider();

function DocumentationLandingPage(props) {
    const {from } = props;
  return (
    <div
      style={{
        minHeight: "100vh",
        // background: `url(https://images.pexels.com/photos/2078126/pexels-photo-2078126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
        width: "100vw",
        marginLeft: "-8px",
        backgroundColor: 'white',
      }}
    >
      <div style={{ fontSize: "35px", color: "silver", fontWeight:'300' }}>
        <br />
        <br />
        <br />
        <img src={Logo} style={{ width: "270px" }} />

        <br />
        <br />
        <br />

        <Typewriter
          options={{
            strings: [
              "Effortlessly document your product prototypes.",
              "Simplified documentation flow, Robust text editor.",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 20,
            delay: 45,
            pauseFor: 1000,
          }}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
     
      <br />
      {from !== 'mobile' && <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
       
      <div
          style={{ cursor: "pointer", marginRight: '33px' }}
          onClick={() => {
            signInWithPopup(auth, provider);
          }}
        >
           <i style={{ fontSize: '38px', color: 'grey' }} className="fab">
    
  </i>
        </div>


        <div
          style={{ cursor: "pointer", marginRight: '33px' }}
          onClick={() => {
            signInWithPopup(auth, provider);
          }}
        >
          <img
            style={{
              width: "50px",
            }}
            src={Signinwithgoogleicon}
          />
        </div>
      


        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            signInWithPopup(auth, provider);
          }}
        >
           <i style={{ fontSize: '42px', color: 'grey'}} className='fab'>&#xf09b;
  </i>
        </div>
      </div> }

      {
        from === 'mobile' && <div align="center">
        <br/>
        <br/>
        <br/>
        <h3 style={{
            position: 'fixed',
            bottom: '290px',
            width: '100vw',
            left: '0px'
        }}>Only available for desktop screens</h3>
        </div>
      }
    </div>
  );
}

export default DocumentationLandingPage; 
