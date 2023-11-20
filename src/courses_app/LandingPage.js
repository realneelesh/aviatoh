import React, { useState } from "react";
import {
  Logo,
} from "../assets";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../db";
import CourseCard from "./components/CourseCard";
const provider = new GoogleAuthProvider();

function CoursesLandingPage(props) {

    const [courses, setCourses] = useState([
        {
            title: "Containerization with DOCKER",
            topics: ['Docker', 'CI/CD Piplelines', 'Computer Networking'],
            description: 'Embark on a transformative journey that will reshape your approach to software development, software packaging and deployment! Our exclusive 3-day workshop on Docker is not just a course—it\'s a hands-on experience designed to kickstart your DevOps journey with and propel your career to new heights.',
            fees: "40",
            originalFees: "100",
            duration: '3-day Workshop',
            area: 'DevOps',
            instructor: 'Neelesh Sharma, IIT Roorkee'
        },
        {
            title: "Container Orchestration with KUBERNETES",
            topics: ['Kubernetes', 'Cloud-Computing', 'GCP-Compute-Engine', 'Deployments'],
            description: 'In this 3-day workshop you\'ll learn about Cloud Computing Basics, Kubernetes Fundamentals, deploying containerized applications on Kubernetes and GCP Compute Engine. You will get to deploy application containers to Kubernetes cluster as a project in this workshop',
            fees: "80",
            originalFees: "250",
            duration: '3-day Workshop',
            area: 'DevOps',
        },
        {
            title: "Front-end Development with ReactJS + Redux",
            topics: ['HTML', 'CSS', 'Javascript', 'ReactJS', 'Redux'],
            description: 'Front-end Development with ReactJS + Redux is an immersive 3-day workshop designed to equip participants with the essential skills and knowledge required to excel in modern web development using ReactJS and Redux. This comprehensive training program covers a wide array of topics, including HTML, CSS, JavaScript, ReactJS, and Redux, ensuring participants gain a robust understanding of the entire front-end development stack.',
            fees: "50",
            originalFees: "130",
            duration: '5-day Workshop',
            area: 'Frontend',
        },
        {
            title: "Web APIs with .NET Core",
            topics: ['C#', 'Restful APIs', '.NET Core', 'Postman'],
            description: 'In this dynamic 3-day workshop, dive deep into the world of Web APIs using cutting-edge technologies. Explore the intricacies of C#, Restful APIs, .NET Core, and master the art of seamless communication between applications. Elevate your skills with hands-on exercises and real-world application using tools like Postman',
            fees: "60",
            originalFees: "250",
            duration: '3-day Workshop',
            area: 'Backend'
        },
        {
            title: "System Design",
            topics: ['Requirements', 'Design', 'CQRS', 'Internet', 'Scaling'],
            description: 'In this dynamic 3-day workshop, dive deep into the world of System Design, you\'ll learn how to create robust software systems, unlocking the secrets of building robust, scalable, and efficient systems in our System Design Course. Whether you\'re a seasoned developer looking to enhance your skills or a newcomer eager to understand the intricacies of system architecture, this course is tailored for you',
            fees: "70",
            originalFees: "290",
            duration: '5-day Workshop',
            area: 'System Design'
        },
    ]);

  return (
    <div align="center" id="documentationLandingPageView" style={{position: 'relative', width: '100vw', marginLeft: '-8px', backgroundColor: ''}}>

{/* signIn */}
      <div style={{position: 'absolute', top: '25px', right: '30px', display: 'flex', alignItems: 'center', cursor: 'pointer', zIndex: '99999'}}
            onClick={() => {
                signInWithPopup(auth, provider);
              }}
            >
            {/* <img alt="" src={Signinwithgoogleicon} style={{width: '30px', cursor: 'pointer'}} /> */}
            {/* <span style={{ color: 'black', fontSize: '16px', cursor: 'pointer'}}>&nbsp;&nbsp;Sign In</span> */}
      </div>
      <br/>
      <div align="left" style={{position: 'absolute', top: '30px', marginLeft: '20px'}}>
      <img
        src={Logo}
        width={90}
        alt=""
      />
      </div>
 
      <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            background: 'linear-gradient(white, white, white, #edeeff, #edeeff)',
        }}>
<h1 style={{fontWeight: '500', fontSize: '33px', color: 'gray'}}>
{/* Very <span style={{fontSize: '35px', color: '#a435f0'}}>effective fast paced training</span>,
<br/>
<br/> */}  
Level up your Full-stack game
<br/>
<br/>
Live training with <br/> <span style={{fontSize: '35px', color: '#a435f0'}}>one-on-one</span> training sessions

<br/>
<br/>
<br/>
<h4 style={{fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
    <img style={{
        width: '90px',
        borderRadius: '50%'
    }} src='https://avatars.githubusercontent.com/u/43935540?v=4' alt=""/>
   &nbsp;
   &nbsp;
   &nbsp; 
    <div align="left"><sub>Meet your instructor</sub><br/> Neelesh Sharma, IIT Roorkee<br/>
    <sup><a style={{
        cursor: 'pointer'
    }}
    target="_linkedin"
    href="https://www.linkedin.com/in/neelesh-sharma-6178971aa/"
    >Linkedin</a></sup></div>
    </h4>
</h1>
      </div>

      {
        courses?.map((course, i)=>{
            return <CourseCard course={course} />
        })
      }
      <div style={{
        marginTop: '-7px',
        height: '20vh',
        width: '100vw',
        background: 'linear-gradient( white, #edeeff, #edeeff)',
      }}></div>
    </div>
  );
}

export default CoursesLandingPage;
