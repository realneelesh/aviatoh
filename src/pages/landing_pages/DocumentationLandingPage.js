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

function DocumentationLandingPage(props) {
  const [showKanbanModal, setShowKanbanModal] = useState(false);

  return (
    <div id="documentationLandingPageView" style={{position: 'relative', width: '100vw', marginLeft: '-8px', backgroundColor: ''}}>

{/* signIn */}
      <div style={{position: 'absolute', top: '21px', right: '182px', display: 'flex', alignItems: 'center', cursor: 'pointer', zIndex: '99999'}}
            onClick={() => {
                signInWithPopup(auth, provider);
              }}
            >
            <img src={Signinwithgoogleicon} style={{width: '35px', cursor: 'pointer'}} />
            <span style={{ color: 'grey', fontSize: '16px', cursor: 'pointer'}}>&nbsp;&nbsp;Sign In</span>
      </div>
{/* blogs */}
            <div style={{ position: 'absolute', top: '21px', right: '25px', display: 'flex', alignItems: 'center', borderRight: '0px solid silver'}}
           
            > 
            <img src={Signinwithgoogleicon} style={{width: '35px', visibility: 'hidden'}} />
            <a target="blogaviatoh" href="https://medium.com/@aviatoh/managing-multiple-side-hustle-ideas-simultaneously-5df3987578e9?source=friends_link&sk=95c4c5b56b6260c2ae4c442f1272f4e6" style={{textDecoration: 'none', color: 'grey', fontSize: '16px', cursor: 'pointer'}}>&nbsp;&nbsp;Blog</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://aviatoh.com/#/aboutus" style={{textDecoration: 'none', color: 'grey', fontSize: '16px', cursor: 'pointer'}}>About Us</a>
            
            </div>

      <div align="left" style={{position: 'absolute', top: '25px', marginLeft: '20px'}}>
      <img
        src={Logo}
        width={190}
        style={{   }}
      />
      <br/>
      <h3 style={{margin: '0px', color: 'grey', marginLeft: '-7px', fontWeight: '500', padding: '0px 7px'}}>
  Ideation and Documentation Platform
</h3>

      </div>
      

      <div
      align="left"
        style={{
          height: "100vh",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: '20px', 
          justifyContent: 'center',
          // backgroundColor: primaryGreenColour(0.5),
          background:
            'url("https://images.pexels.com/photos/5594262/pexels-photo-5594262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        }}
      >
        <span align="left"  style={{fontSize: '38px', width: '50%',color: 'rgb(166, 166, 166)', padding: '10px 0px',fontWeight: '500', backgroundColor: 'rgb(255, 255, 255, 0)'}}>
 

        Ideas become reality when you <b>Retain</b>, <b>Document</b>, <b>Refine</b> and <b>Scale</b> them
        </span>
 
 
      </div>
     
      {/* <Footer from={"mobile"} /> */}
    </div>
  );
}

export default DocumentationLandingPage;
