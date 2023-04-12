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
import { primaryBlueColour, primaryGreenColour } from "../../App";
const provider = new GoogleAuthProvider();

function DocumentationLandingPage(props) {
  const [showKanbanModal, setShowKanbanModal] = useState(false);

  return (
    <div id="documentationLandingPageView" style={{position: 'relative', width: '100vw', marginLeft: '-8px', backgroundColor: ' '}}>
      <div style={{position: 'absolute', top: '9px', right: '25px', display: 'flex', alignItems: 'center'}}
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
        style={{ position: "absolute", left: "23px", top: "10px" }}
      />
      </div>
      

      <div
      align="left"
        style={{
          minHeight: "100vh",
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
        <h1 align="left"  style={{fontSize: '40px', width: '55%',color: 'rgb(120, 120, 120)', padding: '39px 0px',fontWeight: '500', backgroundColor: 'rgb(255, 255, 255, 0)'}}>
        Idea are worthless unless you <b>Retain</b>, <b>Document</b>, <b>Refine</b> and <b>Scale</b> them</h1>
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
                    }} style={{cursor: 'pointer', color: primaryGreenColour(1), fontSize: '30px'}} className='fas fa-info-circle'></i>
<h1 style={{margin: '0px', color: 'grey', marginLeft: '-7px', fontWeight: '500'}}>Powered by AI 
                   
                 </h1>
                
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
          <div style={{width: '40%'}} align="left">
            Retain Ideas<hr/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>Create Projects</h1>
            <br/>
            <br/>
            <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            {/* With Aviatoh, you can create as many projects as you need, each with a unique name and description. 
            <br/>
            <br/> */}
            Once you have created a project, you can add <b>documentation blocks</b> to it, track progress, and share it with anyone if needed. 
            
            <br/>
            <br/>
            To start with, we provide project templates of following types<br/>
            <ul>
              <li className="list">Business/Startup Idea</li>
              <li className="list">Book Writing</li>
            </ul>
            Our intuitive user interface makes it easy to manage multiple projects at once, so you can focus on bringing your ideas to life.
            </div>
          </div> 
          <img  src={Demo1} className="floating h" style={{ width: '35%', cursor: 'not-allowed', wrap: '0px 20px 20px 0px'}} />
 

        </div>
      </div>




      <div
        style={{
          minHeight: "60vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around'}}>
        <img className="floating" src={Demo3} style={{ width: '45%', cursor: 'not-allowed', wrap: '0px 20px 20px 0px'}} />

          <div style={{width: '40%'}} align="left">
            Document Ideas<hr/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>Rich Text Editor</h1>
            <br/>
            <br/>
            <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            Your one-stop-shop for all your project documentation needs! Here, you can create rich-text documents with images and hierarchies, making it easy to organize your ideas.
            <br/> 
            <br/> 
            Perfect for anyone who needs to keep track of the ideation process, from entrepreneurs to creative professionals and writers.
 
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

         <div style={{width: '40%'}} align="left">
          Refine Ideas<hr/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>AI Powered Ideation Assist</h1>
            <div align="left" style={{paddingRight: '30px', paddingTop: '30px', color: 'grey', fontSize: '16px'}}>
            Available with the documentation editor, is your personal AI-powered assistant for all your ideation assists! Our platform is designed to help you take your ideas to the next level by providing quick and easy access to smart AI technology. 
            <br/>
            <br/>
            Whether you need help with fact-checking or want to enhance your idea with innovative insights, our AI assistant is here to help, just ask away!
            
            <br/>
            <br/>
            Sign up today!</div>
          </div>

   <img className="floating" src={IdeationAssistantView} style={{ width: '32%', cursor: 'not-allowed'}} />

        
        </div>
      </div>







      <div
        style={{
          minHeight: "60vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around'}}>
       
          <img className="floating" src={ProjectView} style={{ width: '45%', cursor: 'not-allowed', wrap: '20px 0px 0px 20px'}} />
          <div style={{width: '40%'}} align="left">
            Scale Ideas <hr/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>Tasks Management</h1>
            <br/>
            <br/>

            <div align="left" style={{  color: 'grey', fontSize: '16px'}}>
            The hub of your project documentation and task management!
            
            <br/>
            <br/>
            {/* Our platform is designed to help you stay organized and focused in the most simplest and minimalistic way possible.
            <br/>
            <br/> */}
            For every project, you get a seperate <b>kanban-style</b> board to track the tasks in three categories i.e.
            <ul>
              <li className="list">To Do</li>
              <li className="list">In Progress</li>
              <li className="list">Completed</li>
            </ul> 
             </div>
          </div>
        </div>
      </div>








     





      <Footer from={"mobile"} />
    </div>
  );
}

export default DocumentationLandingPage;
