import React, { useState } from 'react';
import { Demo1, Demo2, Demo3, Logo, OpenaiIcon, Openailogo, ProjectManagementSS, Signinwithgoogleicon } from '../../assets';
import Typewriter from "typewriter-effect";
import Footer from '../../components/Footer';
import { primaryBlueColour, primaryGreenColour, primarySilverColour } from '../../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../db';
const provider = new GoogleAuthProvider();


function MobileVersion(props) {

    const [ showKanbanModal, setShowKanbanModal ] = useState(false);

    return (
        <div
          style={{
            // background: `url(https://images.pexels.com/photos/2078126/pexels-photo-2078126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
            width: "100vw",
            marginLeft: '-8px',
            minHeight: '100vh',
            marginRight: "0px",
            backgroundColor: 'white',
            zIndex: "999",
            overflowX: 'hidden',
          }}
        >

            
          <div
            align="right"
            style={{
               position: 'sticky', top: '0px',
              fontSize: "20px",
              color: "rgb(150, 150, 150)",
              fontWeight: "300",
              padding: "0px 14px",
              width: "100vw",
              zIndex: "99999",
              height: "10vh",
              marginLeft: '-8px',
              
            }}
          > 
          <br/>
            <img src={Logo} style={{ width: "230px", marginTop: "15px", marginRight: '9px' }} />

            <Typewriter
              options={{
                strings: [
                  "Document your side hustles "
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 20,
                delay: 42,
                pauseFor: 1000,
              }}
            />
          </div>


          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <br /><br /><br /><br /> 
          <div align="center" style={{color: 'grey', fontSize: '18px'}}>
           {
           !props.signedIn && <div style={{width:'40%', display: 'flex', alignItems: 'center', border: '0px solid white', justifyContent: 'center'}}
            onClick={() => {
                signInWithPopup(auth, provider);
              }}
            >
            <img src={Signinwithgoogleicon} style={{width: '40px'}} />
            <span>&nbsp;&nbsp;Sign In</span>
            
            </div>
            }

            {
                props.signedIn && <div style={{backgroundColor: primarySilverColour, width: '80%', borderRadius: '0px', color: 'black', padding: '0px 24px'}} align="left">
                   <br/>
                    Welcome! 
                    <br/> 
                    <br/> 
                    <span style={{fontSize: '15px'}}>
                    ⚠️ &nbsp; Screen size is too small, please sign in from a laptop or desktop
                    </span>
                    
                   <br/>
                   <br/>

                </div>
            }
          </div>
          <br /><br /><br /><br />
          <br /><br /><br /><br /> 
          <br /><br /><br /><br />  

            <div align="left" style={{position: 'sticky', top: '0', width: '100vw', paddingLeft: '10px',  borderLeft: '10px solid ' + primaryGreenColour(1), fontSize: '17px'}}>
            Retain, Refine, Document and Scale <br/>Your Ideas
            </div>
            <br/>

            <div align="right" style={{color: 'grey', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
             <div style={{fontSize: '20px', padding: '0px 15px'}}>
              Integrated with Artificial Intelligence
             </div>
             
             <div style={{backgroundColor: 'white', padding: '0px 12px'}}>   <br/>
                Powered by
            <br/>
            <img src={Openailogo} style={{width: '100px'}}/>
            <br/>
            <br/>
            </div>
            </div>
            <br /><br /><br /><br />

            <br/>
          <br /><br /><br /> 

          <div style={{  paddingLeft: '10px', borderLeft: '10px solid ' + primaryGreenColour(1), fontSize: '17px'}} align="left">Kanban Inspired <br/>Project Management Tools </div>
          <br/>
            <div align="left" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <img src={ProjectManagementSS} style={{width: '80%', boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 7px",}} />
                <div style={{width: '20%'}} align="center">
                    <i onClick={()=>{
            setShowKanbanModal(true);
                    }} style={{color: primaryGreenColour(1), fontSize: '30px'}} className='fas fa-info-circle'></i>
                </div>
            </div>

         <br /><br /><br /><br /><br /><br /><br />

          <div style={{  paddingRight: '10px', borderRight: '10px solid ' + primaryGreenColour(1), fontSize: '17px'}} align="right">Effiecient and Eligant <br/> Documentation Workflow</div>
        <br/>
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: 'left' }}
          >
            <div
              align="center"
              style={{
                position: "relative",
                width: "82%",
                marginRight: "0",
                transform: "scale(1.1)",
              }}
            >
              <img
                src={Demo1}
                style={{
                  width: "60%",
                  position: "absolute",
                  left: "1.3%",
                  top: "110px",
                  zIndex: "9",
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 7px",
                }}
              />
              <img
                src={Demo2}
                style={{
                  width: "80%",
                  position: "absolute",
                  left: "12%",
                  top: "55px",
                  zIndex: "99",
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 5px",
                }}
              />
              <img
                src={Demo3}
                style={{
                  width: "100%",
                  position: "absolute",
                  left: "23.8%",
                  zIndex: "999",
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px"
                }}
              />
            </div>
          </div>
          

          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br />
          <div style={{}}>
          <Footer from={'mobile'} />
          </div>
          <div style={{
            display: 'flex', width: '35%', justifyContent: 'space-around', fontSize: '26px', marginLeft: '13px'
          }}>
            <i style={{color: 'grey'}} className="fab fa-instagram"></i>
            <i style={{color: 'grey'}} className="fab fa-twitter"></i>
            <i style={{color: 'grey'}} className="fab fa-facebook"></i>
          </div>
        <br/>
        <br/>
        


        {/* modal kanban */}
        {showKanbanModal && <div align="left" style={{ borderLeft: '30px solid ' + primaryGreenColour(0.6), position: 'fixed', width: '100vw', height: '100vh', backgroundColor: 'white', padding: '20px 10px', top: '0px', zIndex: '99999'}}>
            <div style={{position: 'absolute', top: '17px', right: '65px'}}>
            <i style={{fontSize: '19px'}} className='far fa-times-circle'
          onClick={()=>{
            setShowKanbanModal(false);
          }}
          ></i>
            </div>
            <div style={{width: '69%', paddingLeft:'20px'}} align="left">
            <br/>
            <br/>

            <h2 style={{border: '0px', padding: '0px'}}>What is Kanban</h2>
            <br/>
            <br/>
            <br/>
            Kanban is a visual method for managing work processes and workflows. It uses cards or other visual signals to represent work items and helps to ensure that the right work is done at the right time.
        
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

          <h2 style={{border: '0px', padding: '0px'}}>What is a Kanban Board</h2>
         <br/>
         <br/>
        <br/>
        A Kanban board is a visual tool that helps you manage tasks and projects. 
        <br/>
        It is typically divided into three columns: 
        <br/>
        <br/>
        <br/>
        <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '10px', color: 'grey'}}>
          <div align="center" style={{width: '27vw', borderRight: '1px solid silver', height: '70px'}}>To Do
          <br/>
          <br/>
          <div style={{backgroundColor: 'lavender', width: '80%', height: '20px'}}></div>
          </div>
          <div align="center" style={{width: '27vw', borderRight: '1px solid silver', height: '70px'}}>In Progress
          <br/>
          <br/>
          <div style={{backgroundColor: primaryGreenColour(0.3), width: '80%', height: '20px'}}></div>
          </div>
          <div align="center" style={{width: '27vw', height: '70px'}}>Completed
          <br/>
          <br/>
          <div style={{backgroundColor: primarySilverColour, width: '80%', height: '20px'}}></div>
          <br/>
          <div style={{backgroundColor: primarySilverColour, width: '80%', height: '20px'}}></div>
          </div>
    
</div>
        <br/>
        <br/>
        Each task is represented by a card that moves across the board as it progresses through different stages of completion.

            </div>
  


            </div>}
        </div>
    );
}

export default MobileVersion;