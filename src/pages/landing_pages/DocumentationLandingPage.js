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
    <div id="documentationLandingPageView" style={{position: 'relative', width: '100vw', marginLeft: '-8px', backgroundColor: ' '}}>
{/* signIn */}
      <div style={{position: 'absolute', top: '9px', right: '182px', display: 'flex', alignItems: 'center', cursor: 'pointer', zIndex: '99999'}}
            onClick={() => {
                signInWithPopup(auth, provider);
              }}
            >
            <img src={Signinwithgoogleicon} style={{width: '35px', cursor: 'pointer'}} />
            <span style={{ color: 'grey', fontSize: '16px', cursor: 'pointer'}}>&nbsp;&nbsp;Sign In</span>
            
            </div>

{/* blogs */}
            <div style={{  position: 'absolute', top: '9px', right: '25px', display: 'flex', alignItems: 'center', borderRight: '0px solid silver'}}
           
            > 
            <img src={Signinwithgoogleicon} style={{width: '35px', visibility: 'hidden'}} />
            <a href="https://aviatoh.com/#/insights" style={{textDecoration: 'none', color: 'grey', fontSize: '16px', cursor: 'pointer'}}>&nbsp;&nbsp;Blogs</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://aviatoh.com/#/aboutus" style={{textDecoration: 'none', color: 'grey', fontSize: '16px', cursor: 'pointer'}}>About Us</a>
            
            </div>

      <div align="left" style={{position: 'absolute', top: '15px', marginLeft: '20px'}}>
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
          minHeight: "100vh",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: '20px',
          paddingTop: '60px',
          justifyContent: 'center',
          // backgroundColor: primaryGreenColour(0.5),
          background:
            'url("https://images.pexels.com/photos/5594262/pexels-photo-5594262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        }}
      >
        <span align="left"  style={{fontSize: '38px', width: '50%',color: 'rgb(166, 166, 166)', padding: '10px 0px',fontWeight: '500', backgroundColor: 'rgb(255, 255, 255, 0)'}}>
 

        Ideas hold no value unless you <b>Retain</b>, <b>Document</b>, <b>Refine</b> and <b>Scale</b> them
        </span>
 
 <br/>
 <br/>
 <br/>
 <br/> <br/>
 <br/> 
 <div align="center" style={{ width: '100%', marginLeft: '-8px'}}>
 <div   style={{display: 'flex', alignItems: 'center', marginLeft: '17px', justifyContent: 'center', width: '100%', marginLeft: '-8px'}}>




 <i onClick={()=>{
                  document.getElementById('aiAss').scrollIntoView({
                    behavior: 'smooth'
                  });
                    }} style={{cursor: 'pointer', color: primaryGreenColour(1), fontSize: '25px'}} className='fas fa-info-circle'></i>
<h1 style={{margin: '0px', color: 'grey', marginLeft: '-7px', fontWeight: '500'}}>Powered by AI  </h1>
                
      </div>
      </div>
      </div>

      <div
        style={{
          minHeight: "60vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
         <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around'}}>
          <div style={{width: '50%'}} align="left">
            Retain Ideas 
            <br/>
            <br/>

            <h1 style={{padding: '0px', color: primaryBlueColour}}>Create Projects</h1>
            <br/>
            <br/>
            <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            {/* With Aviatoh, you can create as many projects as you need, each with a unique name and description. 
            <br/>
            <br/> */}
            Nurturing a thought into an idea in itself is a project.

            You can create a project on Aviatoh Dashboard which will help you to retain and collect related information
            <br/>
            <br/>
            To start with, we provide project templates of following types<br/>
            <ul>
              <li className="list">Business/Startup Idea</li>
              <li className="list">Book Writing</li>
            </ul>
            </div>
          </div> 
          {/* <img  src={Demo1} className="floating h" style={{ width: '35%', cursor: 'not-allowed', wrap: '0px 20px 20px 0px'}} /> */}
 

        </div>
      </div>




      <div
        style={{
          minHeight: "60vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(to right, lavender, white)`
        }}
      >
        <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around'}}>
        {/* <img className="floating" src={Demo3} style={{ width: '45%', cursor: 'not-allowed', wrap: '0px 20px 20px 0px'}} /> */}

          <div style={{width: '50%'}} align="left">
            Document Ideas<br/><br/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>Create Projects</h1>
            <br/>
            <br/>
            <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            {/* With Aviatoh, you can create as many projects as you need, each with a unique name and description. 
            <br/>
            <br/> */}
            Nurturing a thought into an idea in itself is a project.

            You can create a project on Aviatoh Dashboard which will help you to retain and collect related information
            <br/>
            <br/>
            To start with, we provide project templates of following types<br/>
            <ul>
              <li className="list">Business/Startup Idea</li>
              <li className="list">Book Writing</li>
            </ul>
            </div>
          </div>

        </div>
      </div>






      <div
      id="aiAss"
        style={{
          minHeight: "60vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
   <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around'}}>

         <div style={{width: '50%'}} align="left">
          Refine Ideas<br/><br/>
          <h1 style={{padding: '0px', color: primaryBlueColour}}>Create Projects</h1>
            <br/>
            <br/>
            <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            {/* With Aviatoh, you can create as many projects as you need, each with a unique name and description. 
            <br/>
            <br/> */}
            Nurturing a thought into an idea in itself is a project.

            You can create a project on Aviatoh Dashboard which will help you to retain and collect related information
            <br/>
            <br/>
            To start with, we provide project templates of following types<br/>
            <ul>
              <li className="list">Business/Startup Idea</li>
              <li className="list">Book Writing</li>
            </ul>
            </div>
          </div>

   {/* <img className="floating" src={IdeationAssistantView} style={{ width: '32%', cursor: 'not-allowed'}} /> */}

        
        </div>
      </div>







      <div
        style={{
          minHeight: "60vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(to right, lavender, white)`
        }}
      >
        <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around'}}>
       
          {/* <img className="floating" src={ProjectView} style={{ width: '45%', cursor: 'not-allowed', wrap: '20px 0px 0px 20px'}} /> */}
          <div style={{width: '50%'}} align="left">
            Scale Ideas <br/><br/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>Create Projects</h1>
            <br/>
            <br/>
            <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            {/* With Aviatoh, you can create as many projects as you need, each with a unique name and description. 
            <br/>
            <br/> */}
            Nurturing a thought into an idea in itself is a project.

            You can create a project on Aviatoh Dashboard which will help you to retain and collect related information
            <br/>
            <br/>
            To start with, we provide project templates of following types<br/>
            <ul>
              <li className="list">Business/Startup Idea</li>
              <li className="list">Book Writing</li>
            </ul>
             </div>
          </div>
        </div>
      </div>





      <div
        style={{
          minHeight: "60vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
        }}
      >
        <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around'}}>
       
          <div style={{width: '50%'}} align="left">
            Share Ideas <br/><br/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>The Social Media</h1>
            <br/>
            <br/>
            <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            {/* With Aviatoh, you can create as many projects as you need, each with a unique name and description. 
            <br/>
            <br/> */}
            Nurturing a thought into an idea in itself is a project.

            You can create a project on Aviatoh Dashboard which will help you to retain and collect related information
            <br/>
            <br/>
            To start with, we provide project templates of following types<br/>
            <ul>
              <li className="list">Business/Startup Idea</li>
              <li className="list">Book Writing</li>
            </ul>
             </div>
          </div>
          {/* <img className="floating" src={ProjectView} style={{ width: '45%', cursor: 'not-allowed', wrap: '20px 0px 0px 20px'}} /> */}

        </div>
      </div>





     





      <Footer from={"mobile"} />
    </div>
  );
}

export default DocumentationLandingPage;
