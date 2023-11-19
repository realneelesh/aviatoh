import React, { useState } from "react";
import {
  Logo,
  Signinwithgoogleicon
} from "../assets";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../db";
import { primaryGreenColour } from "../App";
import CourseCard from "./components/CourseCard";
const provider = new GoogleAuthProvider();

const courses = [
    {
        title: "Containerization with DOCKER",
        topics: ['Docker', 'CI/CD Piplelines', 'Computer Networking'],
        description: 'Embark on a transformative journey that will reshape your approach to software development, software packaging and deployment! Our exclusive 3-day workshop on Docker is not just a course—it\'s a hands-on experience designed to kickstart your DevOps journey with and propel your career to new heights.',
        fees: "60",
        originalFees: "100",
        duration: '3-day Workshop',
    },
    {
        title: "Container Orchestration with KUBERNETES",
        topics: ['Kubernetes', 'Cloud-Computing', 'GCP-Compute-Engine', 'Deployments'],
        description: 'In this 3-day workshop you\'ll learn about Cloud Computing Basics, Kubernetes Fundamentals, deploying containerized applications on Kubernetes and GCP Compute Engine. You will get to deploy application containers to Kubernetes cluster as a project in this workshop.',
        fees: "100",
        originalFees: "250",
        duration: '3-day Workshop',
    },
]

function CoursesLandingPage(props) {

  return (
    <div align="center" id="documentationLandingPageView" style={{position: 'relative', width: '100vw', marginLeft: '-8px', backgroundColor: ''}}>

{/* signIn */}
      <div style={{position: 'absolute', top: '18px', right: '30px', display: 'flex', alignItems: 'center', cursor: 'pointer', zIndex: '99999'}}
            onClick={() => {
                signInWithPopup(auth, provider);
              }}
            >
            {/* <img alt="" src={Signinwithgoogleicon} style={{width: '30px', cursor: 'pointer'}} /> */}
            <span style={{ color: 'black', fontSize: '16px', cursor: 'pointer'}}>&nbsp;&nbsp;Sign In</span>
      </div>


      <div align="left" style={{position: 'absolute', top: '25px', marginLeft: '20px'}}>
      <img
        src={Logo}
        width={143}
        alt=""
      />
      </div>

      <br/> 
      <br/>
      <div style={{
            height: '65vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            background: 'linear-gradient(white, white, white, #edeeff, #edeeff)',
        }}>
<h1 style={{fontWeight: '500', fontSize: '38px', color: 'gray'}}>
{/* Very <span style={{fontSize: '35px', color: '#a435f0'}}>effective fast paced training</span>,
<br/>
<br/> */}
Online Workshops and training with <br/> <span style={{fontSize: '35px', color: '#a435f0'}}>one-on-one</span> instructor meetings
</h1>
      </div>
      {
        courses?.map((course, i)=>{
            return <CourseCard course={course} />
        })
      }
    </div>
  );
}

export default CoursesLandingPage;
