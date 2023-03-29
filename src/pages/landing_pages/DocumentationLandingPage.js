import React from "react";
import {
  primaryBlueColour,
  primaryGreenColour,
  primarySilverColour
} from "../../App";
import Typewriter from "typewriter-effect";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../db";
import { Demo1, Demo2, Demo3, Logo, Signinwithgoogleicon } from "../../assets";
import Testimonial from "../../components/Testimonial";
const provider = new GoogleAuthProvider();

function DocumentationLandingPage(props) {
    const {from } = props;
  return (<div style={{fontColor: 'grey'}}> 
  <div style={{
    position: 'fixed',
    width: '100%',
    height: '0vh',
    backgroundColor: primaryBlueColour,
    zIndex: "-1",
    marginLeft: '-8px'
  }}></div>
    <div
      style={{
        // background: `url(https://images.pexels.com/photos/2078126/pexels-photo-2078126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
        width: "100%",
        marginLeft: "-8px",
        marginRight: '0px',
        backgroundColor: 'transparent',
        zIndex: '999'
      }}
    >
      <div align="left" style={{ fontSize: "25px", color: "silver", fontWeight:'300', padding: '0px 14px', width: '70%', zIndex: '99999', height:from=='mobile'? '10vh':'auto' }}>
 
  
        <img src={Logo} style={{ width: "180px", marginTop: '15px' }} /> 
 

        <Typewriter
          options={{
            strings: [
              "Ideation and Documentation System",
              "Document your side hustles",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 20,
            delay: 42,
            pauseFor: 1000,
          }}
        /> 
      </div>
 
 
{/* {from !== 'mobile' && <div style={{position :'absolute', fontSize: '16px', color: 'grey', bottom: '100px'}}>

 


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
    <br/>
    Sign In
  </div>



 
</div> } */}

 
      
      {
        from === 'mobile' && <div align="center">
        <br/>
        <br/>
        <br/>
        <h3 style={{
            position: 'fixed',
            bottom: '90px',
            width: '100vw',
            left: '0px'
        }}>Only available for desktop screens</h3>
        </div>
      }

<div >


</div>

    </div>



    {from!="mobile" ? <div style={{height: '65vh', display: 'flex', width: '100vw', marginLeft: '-8px', justifyContent: 'space-around', alignItems: 'center'}}>
       <Testimonial name="Namila" designation="Product Designer" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoe-c3Sj6BIHRIc22XqHSEH-2rMk4Kil4jBexY30kmWPU4coom9xVomxNKc92_RHsebzYWDMQB_w4&usqp=CAU&ec=48600112" text="This is going to be related to how she was able to focus on her side hustle ideas better after starting to use Aviatoh, earlier she couldn't work on an idea for more than a week and now Aviatoh provides her a path and a system to follow for refining her ideas" />
       {/* <Testimonial name="Crsitkop" designation="C.E.O. Bitsjoy" img="https://cdn.pixabay.com/photo/2015/01/06/16/14/woman-590490__340.jpg" text="Th , I was struck w and cater to  well, Iplatform that can serve so well and cater to my needs so well, I wish it was free to use, but its okay I guess" /> */}
    </div>: null}

    {from=="mobile" ? <div style={{height: '10vh', display: 'flex', width: '100vw', marginLeft: '-8px', justifyContent: 'space-around', alignItems: 'center'}}>
    </div>: null}


    <div style={{display: 'flex', flexDirection: 'column', width: '100vw', marginLeft: '-8px', justifyContent: 'center', alignItems: 'center', fontSize: '25px', color: "silver"}}>
      <span>
        <br/>
        <br/>
        Retain and Refine Your Business Ideas with AI Powered Assistance</span>  
      </div>
 
 
      <div align="center" style={{position: 'relative', width: '80%', marginRight: '0', height: '80vh', transform: 'scale(0.88)'}}>
            <img src={Demo1} style={{width: '60%', position: 'absolute', left: '1.3%', top: '110px', zIndex: '9', boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 7px",}} />
            <img src={Demo2} style={{width: '80%', position: 'absolute', left: '12%',top: '55px', zIndex: '99', boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 5px",}} />
            <img src={Demo3} style={{width: '100%', position: 'absolute', left: '23.8%', zIndex: '999', boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 20px",}} />
      
      </div>






    </div>
  );
}

export default DocumentationLandingPage; 
