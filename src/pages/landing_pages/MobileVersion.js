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
        Ideas are worthless unless you <b>Retain</b>, <b>Document</b>, <b>Refine</b> and <b>Scale</b> them
          </h1>
 <br/>
 <br/>
 <br/> <br/>
 <br/> 
 <div align="center" style={{ width: '100%', marginLeft: '-8px'}}>
 <div   style={{display: 'flex', alignItems: 'center', marginLeft: '17px', justifyContent: 'center', width: '100%', marginLeft: '-8px'}}>

 
                   
<h1 style={{margin: '0px', color: 'grey', marginLeft: '-7px', fontWeight: '500', backgroundColor: 'rgb(255, 255, 255, 0.8)'}}>Powered by AI 

                 </h1>
                 &nbsp; 
                    &nbsp;

                 <i onClick={()=>{
                  document.getElementById('aiAss').scrollIntoView({
                    behavior: 'smooth'
                  });
                    }} style={{cursor: 'pointer', color: primaryGreenColour(1), fontSize: '40px', backgroundColor: 'white', borderRadius: '50%'}} className='fas fa-info-circle'></i>
                
      </div>
      </div>
      </div>
      <div
        style={{
          minHeight: "50vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
         <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around', flexDirection: 'column'}}>
          <div style={{width: '90%'}} align="left">
          Retain Ideas<hr/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>Create Projects</h1>
            <br/> 
            First step in the process is to initiate a project, nurturing an idea in itself is a project!
            {/* <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            With Aviatoh, you can create as many projects as you need, each with a unique name and description. 
            <br/>
            <br/>
            Once you have created a project, you can easily add new ideas to it, track progress, and share it with anyone if needed. 
            
            <br/>
            <br/>
            Our intuitive user interface makes it easy to manage multiple projects at once, so you can focus on bringing your ideas to life.
            </div> */}
          </div> 
          <br/> 

          <img  src={Demo1} className=" h" style={{ width: '94%', cursor: 'not-allowed', wrap: '0px 20px 20px 0px'}} />
 

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
        <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around', flexDirection: 'column'}}>

          <div align="left" style={{width: '90%'}}>
            Document Ideas <hr/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>Rich Text Documentation</h1>
            <br/>
            Document your ideas with upto 3 levels of documents hierarchy
            {/* <div align="left" style={{ color: 'grey', fontSize: '16px'}}>
            Your one-stop-shop for all your project documentation needs! Here, you can create rich-text documents with images and hierarchies, making it easy to organize your ideas.
            <br/> 
            <br/> 
            Perfect for anyone who needs to keep track of project documentation, from entrepreneurs and startups to creative professionals and writers.
            </div> */}
          </div>
          <br/>
          <br/>

          <img className="" src={Demo3} style={{ width: '90%', cursor: 'not-allowed', wrap: '0px 20px 20px 0px'}} />

        </div>
      </div>







      <div
      id="aiAss"
        style={{
          minHeight: "70vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
   <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around', flexDirection: 'column'}}>

         <div style={{width: '90%'}} align="left">
          Refine Ideas<hr/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>AI Ideation Assist</h1>
            <br/>
            Discuss with integrated AI chat to unlock the potential of AI to refine your ideas, AI is more capable than ever!
            {/* <div align="left" style={{paddingRight: '30px', paddingTop: '30px', color: 'grey', fontSize: '16px'}}>
            Available with the documentation editor, is your personal AI-powered assistant for all your ideation needs! Our platform is designed to help you take your ideas to the next level by providing quick and easy access to smart AI technology. 
            <br/>
            <br/>
            Whether you need help with fact-checking or want to enhance your idea with innovative insights, our AI assistant is here to help.
            
            <br/>
            <br/>
            Sign up today and start enhancing your ideas with the power of AI technology!</div> */}
          </div>
          <br/>
          <br/>

   <img className="" src={IdeationAssistantView} style={{ width: '90%', cursor: 'not-allowed'}} />

        
        </div>
      </div>

      



      <div
        style={{
          minHeight: "70vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(to right, lavender, white)`
        }}
      >
                  <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-around', flexDirection: 'column'}}>
       
          <div style={{width: '90%'}} align="left">
            Scale Ideas<hr/>
            <h1 style={{padding: '0px', color: primaryBlueColour}}>Tasks Management</h1>
            <br/>
            Break down the idea execution into smaller tasks and executing them one by one,
             
             We provide a kanban-style board to track the tasks in three categories i.e.
           
            <ul style={{display: 'flex', justifyContent: 'space-around'}}>
              <li className="list">To Do</li>
              <li className="list">In Progress</li>
              <li className="list">Completed</li>
            </ul>

            {/* <div align="left" style={{  color: 'grey', fontSize: '16px'}}>
            The hub of your project documentation and task management!
            
            <br/>
            <br/>
            Our platform is designed to help you stay organized and focused in the most simplest and the best minimalistic way possible.
            <br/>
            <br/>
            Our <b>Kanban-style</b> task board lets you track the progress of your tasks in real-time, so you always know where your project stands.
             </div> */}
          </div> 
          <img className="" src={ProjectView} style={{ width: '90%', cursor: 'not-allowed', wrap: '20px 0px 0px 20px'}} />

        </div>
      </div>


      



     

       

     




      <Footer from={"mobile"} />
    </div>
  );
}

export default MobileVersion;
