import React from 'react';
import { Demo1, Demo2, Demo3, Logo, ProjectManagementSS } from '../../assets';
import Typewriter from "typewriter-effect";
import Footer from '../../components/Footer';
import { primaryBlueColour, primaryGreenColour, primaryRedColour, primarySilverColour } from '../../App';

function MobileVersion(props) {
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
            backgroundColor: "black",
            zIndex: "999",
            overflow: 'hidden'
          }}
        >
          <div
            align="right"
            style={{
              fontSize: "20px",
              color: "rgb(150, 150, 150)",
              fontWeight: "300",
              padding: "0px 14px",
              width: "100vw",
              zIndex: "99999",
              height: "10vh",
              marginLeft: '-8px'
            }}
          > 
            <img src={Logo} style={{ width: "180px", marginTop: "15px", marginRight: '3px' }} />

            <Typewriter
              options={{
                strings: [
                  "Ideation and Documentation System ",
                  "Document your side hustles ", 
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 20,
                delay: 42,
                pauseFor: 1000,
              }}
            />
          </div>


          <br /><br /><br /><br /><br /><br /><br />

          <div style={{color: 'silver', paddingLeft: '10px', borderLeft: '11px solid gold'}} align="left">Kanban Inspired <br/>Project Management Tool </div>
          <br/>

          <img src={ProjectManagementSS} style={{width: '100%'}} />

         <br /><br /><br /><br /><br /><br /><br />

          <div style={{color: 'silver',  paddingRight: '10px', borderRight: '11px solid green'}} align="right">Effiecient and Eligant <br/> Documentation Workflow</div>
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
            <i style={{color: 'silver'}} className="fab fa-instagram"></i>
            <i style={{color: 'silver'}} className="fab fa-twitter"></i>
            <i style={{color: 'silver'}} className="fab fa-facebook"></i>
          </div>
        <br/>
        <br/>
        </div>
    );
}

export default MobileVersion;