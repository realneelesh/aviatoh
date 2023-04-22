import React, { useState } from "react";
import {
  Demo1,
  Demo2,
  Demo3,
  IdeationAssistantView,
  Logo,
  OpenaiIcon,
  Openailogo,
  ProjectView,
  Signinwithgoogleicon
} from "../../assets";
import Typewriter from "typewriter-effect";
import Footer from "../../components/Footer";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../db";
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from "../../App";
const provider = new GoogleAuthProvider();

function MobileVersion(props) {
  const [showKanbanModal, setShowKanbanModal] = useState(false);

  return (
    <div id="documentationLandingPageView" style={{position: 'relative', width: '100vw', marginLeft: '-8px', backgroundColor: ' '}}>
      <div style={{position: 'absolute', top: '15px', right: '22px', display: 'flex', alignItems: 'center'}}
            onClick={() => {
                signInWithPopup(auth, provider);
              }}
            >
            <img src={Signinwithgoogleicon} style={{width: '35px'}} />
            <span style={{ color: 'grey', fontSize: '16px', cursor: 'pointer'}}>&nbsp;&nbsp;Sign In</span>
            
            </div>
      <div align="left" style={{position: 'absolute', top: '5px', marginLeft: '-4px'}}>
      <img
        src={Logo}
        width={190}
        style={{ position: "absolute", left: "20px", top: "10px" }}
      />
      </div>
      

      <div
      align="left"
        style={{
          minHeight: "100vh",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: '18px',
          justifyContent: 'center',
          // backgroundColor: primaryGreenColour(0.5),
          background:
            'url("https://images.pexels.com/photos/5594259/pexels-photo-5594259.jpeg?auto=compress&cs=tinysrgb&w=800")',
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover', 
        }}
      >
        <h1 align="left"  style={{fontSize: '30px', width: '90%',color: 'rgb(120, 120, 120)', padding: '39px 0px',fontWeight: '500', backgroundColor: 'rgb(255, 255, 255, 0)'}}>
        The Ultimate Documentation and Project Management Tool designed for Freelancers

          </h1>
          <h1></h1>
          <h1></h1> 
          <h1></h1> 
          <h1></h1> 
 <br/> 
 <div align="center" style={{ width: '100%', marginLeft: '-8px'}}>
 <div   style={{display: 'flex', alignItems: 'center', marginLeft: '17px', justifyContent: 'center', width: '100%', marginLeft: '-8px'}}>

 
                   
<h3 style={{margin: '0px', color: 'grey', marginLeft: '-7px', fontWeight: '700', backgroundColor: 'rgb(255, 255, 255, 0.7)'}}>
  Available only on Desktop
                 </h3>
                 &nbsp; 
                    &nbsp;
 
                
      </div>
      </div>
      </div>
   
      <Footer from={"mobile"} />
    </div>
  );
}

export default MobileVersion;
