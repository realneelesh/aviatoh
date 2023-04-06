import React from "react";
import {
  primaryBlueColour,
  primaryGreenColour,
  primaryRedColour,
  primarySilverColour,
  primaryYellowColour,
} from "../../App";
import Typewriter from "typewriter-effect";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../db";
import {
  Demo1,
  Demo2,
  Demo3,
  DemoView,
  Logo,
  Openailogo,
  Signinwithgoogleicon,
} from "../../assets";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/Footer";
import MobileVersion from "./MobileVersion";
const provider = new GoogleAuthProvider();

function DocumentationLandingPage(props) {
  const { from, signedIn } = props;
  return (
    <>
      {from != "mobile" && (
        <div
          id="documentationLandingPageView"
          style={{ fontColor: "rgb(150, 150, 150)" }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100vh",
              backgroundColor: "",
              zIndex: "-1",
              marginLeft: "-8px",
            }}
          ></div>
          <div
            style={{
              // background: `url(https://images.pexels.com/photos/2078126/pexels-photo-2078126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right top",
              width: "100%",
              marginLeft: "-8px",
              marginRight: "0px",
              backgroundColor: "transparent",
              zIndex: "999",
            }}
          >
            <div
              align="left"
              style={{
                backgroundColor: "white",
                fontSize: "25px",
                color: "rgb(150, 150,150)",
                fontWeight: "300",
                width: "100vw",
                zIndex: "99999",
                height: from == "mobile" ? "10vh" : "auto",
              }}
            >
              <img
                src={Logo}
                style={{
                  width: "180px",
                  marginTop: "15px",
                  marginLeft: "14px",
                }}
              />

              <pre style={{ marginLeft: "14px", paddingBottom: "8px", fontSize: '20px', color: 'rgb(150, 150, 150)', marginTop: '-6px' }}>
                <Typewriter
                  options={{
                    strings: [
                      "Ideation and Documentation System",
                      
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 20,
                    delay: 42,
                    pauseFor: 1000,
                  }}
                />
              </pre>
            </div>

            {from !== "mobile" && (
              <div
                style={{
                  position: "absolute",
                  fontSize: "16px",
                  color: "grey",
                  bottom: "100px",
                  top: "23px",
                  right: "0px",
                  cursor: "auto"
                }}
                
              >
                <div
                onClick={() => {
                  signInWithPopup(auth, provider);
                }}
                 style={{ cursor: "pointer", marginRight: "23px" }}>
                  Sign In
                  
                  {/* <img
      style={{
        width: "50px",
      }}
      src={Signinwithgoogleicon}
    /> 
     <br/>
    Sign In */}
                </div>
                <br/> 
                  <div style={{
                    position: "absolute", 
                    right: "0px",
                    width: '30vw',
                    color: 'grey',
                    fontSize: '14px'
                  }}
                  align="right"
                  >
                    <span style={{paddingRight: '20px', backgroud: `linear-gradient(to right, white,${primaryGreenColour(0.8)},${primaryGreenColour(0.8)},${primaryGreenColour(0.8)})`, display: 'block'}}>
                     {/* Any notices etc  */}
                    </span></div>
              </div>
            )}

            {from === "mobile" && (
              <div align="center">
                <br />
                <br />
                <br />
                <h3
                  style={{
                    position: "fixed",
                    bottom: "90px",
                    width: "100vw",
                    left: "0px",
                  }}
                >
                  Only available for desktop screens
                </h3>
              </div>
            )}

            <div></div>
          </div>

          {/* {from != "mobile" ? (
            <div
              style={{
                height: "50vh",
                display: "flex",
                width: "100vw",
                marginLeft: "-8px",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Testimonial
                name="Namila"
                designation="Product Designer"
                img="https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                text="This is a sample prototype testimonial, shall be replacedThis is a sample prototype testimonial, shall be replacedThis is a sample prototype testimonial, shall be replaced"
              />
            </div>
          ) : null} */}

          {from == "mobile" ? (
            <div
              style={{
                height: "10vh",
                display: "flex",
                width: "100vw",
                marginLeft: "-8px",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            ></div>
          ) : null}

<div
              style={{
                color: "rgb(150, 150, 150)",
                height: "50vh",
                display: "flex",
                width: "100vw",
                marginLeft: "-8px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
              }}
              align='left'
            >
              <span style={{ fontWeight: "300" }}> 
                Retain, Refine, Document and Scale Your Ideas
                <br />
                <br />
              </span>
            </div> 


<div style={{  marginBottom: '190px', backgroundColor: 'rgb(245, 250, 245)', display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100vw', marginLeft: '-8px'}}>
            <div
              style={{
                color: "rgb(150, 150, 150)",
                display: "flex",
                width: "100vw",
                marginLeft: "-8px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "28px",
              }}
              align="left"
            >
              <span style={{ fontWeight: "300" }}>
              <br /> 
            
                Powered by cutting edge AI
                <br />
                <br />

              </span>
            </div>
          

          <div
            align="center"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100vw",
              justifyContent: "center",
            }}
          >
            <div align="left">
              <h2 style={{marginBottom: '15px', padding:'4px 10px', fontSize: '18px', display: 'inline-block',  color: primaryRedColour, fontWeight: '900', border: '0px'}}>Fine Tuned</h2>
             <br/>
              <img src={Openailogo} style={{ width: "70%" }} />
            </div> 
             <h1 style={{border: '0px'}}>Your Ideation Assistant </h1>
          </div>
          <br />
          <br />
          <br /> 

          </div>

 
     

          <div>
          <span style={{ fontWeight: "300", fontSize: '28px', color: 'rgb(150, 150, 150)' }}>

          <br /> 
             
            Effiecient and Eligant Documentation Workflow
            <br />
            <br />

          </span>

          <div
            style={{ display: "flex", alignItems: "center", height: "80vh", maringBottom: '30px' }}
          >
            <div
              align="center"
              style={{
                position: "relative",
                width: "80%",
                marginRight: "0",
                height: "80vh",
                transform: "scale(0.88)",
                maringBottom: '30px'
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
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px",
                }}
              />
            </div>
            
          </div>
          </div>

          

          {/* this section will be about AI powered feature */}
   
          
          <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div style={{marginLeft: '-8px', width: '100vw',  
      boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 70px",
    }}> 
      <Footer />

      </div>

        </div>
        
      )}

   


      {/* mobile */}
      {from === "mobile" ? (
        <MobileVersion signedIn={signedIn} />
      ) : null}
    </>
  );
}

export default DocumentationLandingPage;
