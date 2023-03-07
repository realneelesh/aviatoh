import React, { useEffect, useState } from 'react';
import './App.css';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import GoogleButton from 'react-google-button'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserStorage, userInfoKey } from './BrowserStorage';
import ExperienceForm from './pages/ExperienceForm';
import { firebaseConfig } from './db';
import EducationForm from './pages/EducationForm';
import ParticularsForm from './pages/ParticularsForm';
import Profile from './pages/Profile';

import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileShow from './pages/ProfileShow';
import NavigationBar from './pages/NavigationBar';
import Home from './pages/Home';
import { MyClock } from './components/Clock';
import PathPage from './pages/PathPage';
import { AviatohPronunciation, FreeTrial, Logo, logo } from './assets';
import CreatePath from './components/CreatePath';
import axios from 'axios';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const primaryBlueColour = '#303179';
export const primarySilverColour = 'rgb(246,246,246)';

export const showPage = () => {
  setTimeout(()=>{
  const elements = document.querySelectorAll('*');
  console.log(elements);

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.opacity = '1';
  }
  }, 0)
  
}

function App() {
  useEffect(()=>{
    showPage();
});

const [ email, setEmail ] = useState(null);

  useEffect( ()=>{
     
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setEmail(user.email);
        console.log(user.email);
        if(!browserStorage.getItem(userInfoKey)){
          browserStorage.setItem(userInfoKey, user);
         // window.location.reload();
        }
        // ...
      } else {
        console.log('user is logged out');
        // User is signed out
        // ...
      }
    });
  }, [])

  return (
    <div className="App">

    { browserStorage.getItem(userInfoKey) && <BrowserRouter>
      <NavigationBar />

            <Routes>
            <Route exact path="/" element={<>
              <Home />
            </>}
            />
            <Route path="/profile" element={<>
              <Profile email={email} auth={auth} />
              </>} /> 
              <Route path="/edu" element={<>
                <EducationForm email={email} />
              </>} /> 
              <Route path="/exp" element={<>
                <ExperienceForm email={email} />
              </>} />
              <Route path="/profile/:email" element={<>
                <ProfileShow />
              </>} />
              <Route path="/path/:discid/:title" element={<>
                <PathPage email={email} />
              </>} />
              <Route path="/editprofile" element={<>
                <ParticularsForm email={email} />
              </>} />
              <Route path="/createpath" element={<>
                <CreatePath />
              </>} />
              </Routes>
    </BrowserRouter>}


    { !browserStorage.getItem(userInfoKey) && 
              <div
              style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', 
          flexDirection: 'column'
        }}> 
        <div align="left" style={{position: 'absolute', top: '-10px', left: '10px'}}>
        <h1 style={{marginTop: '17px', backgroundColor: 'transparent', color: 'grey', fontWeight: '800', paddingLeft: '4px', display: 'flex', alignItems: 'center'}}>
          <img src={Logo} style={{width: '80px'}} />
        &nbsp; 
        &nbsp; 
         {/* <sub
         id="aviatohPronunciationIcon"
         style={{cursor: 'pointer', fontSize: '16px', position: 'absolute', top: '10px', left: '-7px'}}
         onClick={()=>{
          document.getElementById('aviatohPronunciation').play();
          document.getElementById('aviatohPronunciationIcon').innerHTML = "🔊";
          setTimeout(()=>{
          document.getElementById('aviatohPronunciationIcon').innerHTML = "🗣️";
          }, 1500)
         }}
         >🗣️</sub> */}
         </h1>
<audio id="aviatohPronunciation" src={AviatohPronunciation} style={{opacity: '0'}} />
        </div>
        <br/> 
        <br/> 
        <br/> 
        <br/> 
        <br/>  
          <div>
            <h1 style={{fontSize: '34px', fontWeight: '600', color: 'grey', backgroundColor: 'transparent'}}>
          {("Comprehensive")}
          </h1>  
          <h1 style={{fontSize: '33px', fontWeight: '500'}}>
          {("Study curriculums").toUpperCase()}
          </h1>

             {/* Open source alternative to college curriculums */}
          <br/>
          <br/>
          <br/>
             </div> 
             <div style={{fontSize: '14px'}}  align="center">
             <div style={{fontSize: '17px'}}>
              {('Your mentor for online studies').toUpperCase()}
              </div>
          <br/>
          <br/> 
             
              <div style={{width: '100vw', backgroundColor: primaryBlueColour}}>
             <div align="center" id="info-home" 
             style={{width: '50%', padding: '35px', color: 'white', backgroundColor: primaryBlueColour}}>
              Curriculums with links to freely available academic resources on internet
              <br/>
              Content curated by experts
              <br/>
              Schedule weekly meetings with the instructors
              <br/>
              <br/>  

<div align="center" style={{
  color: 'white',
  backgroundColor: primaryBlueColour
}}
>
  
  <br/>
  <img style={{width: '165px', cursor: 'pointer', display: 'block'}} alt="Trial Icon" src={FreeTrial}
  onClick={()=>{
    signInWithPopup(auth, provider);
 }}
  ></img>
  <br/>
  <sup style={{ display: 'block', marginTop: '-13px'}}>
   ✨ No credit card required ✨
  </sup>
  </div>
{/* <div style={{backgroundColor: 'white', color: primaryBlueColour, padding: '10px 5px'}}>
<u>What Aviatoh is NOT:</u>
<br/> 
1. We don't replace online learning platforms like Coursera/Edx, rather, we integrate their courses into our curriculums.
 
<br/> 
<br/> 

<u>What Aviatoh IS:</u>
<br/> 
1. We gather resources from various sources by topic to provide a thorough learning experience.
<br/>
2. We offer expert-approved curriculums for various topics.
<br/>
3. Our platform is open-source, allowing users to suggest edits/additions to curriculums.
<br/>
</div> */}

             </div>
             </div>
             </div>
          <br/>  
          <span style={{
            position: 'absolute',
            top: '10px',
            right: '-5px',
            transform: 'scale(0.7)'
          }}>
          <GoogleButton 
          type='light'
          label='Sign in '
          style={{outline: 'silver', boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 7px',
          fontSize: '19px',
          width: '150px'
        }}
  onClick={() => {           signInWithPopup(auth, provider);
  }}
/></span>
          {/* <button style={{
            position: 'absolute',
            top: '10px',
            right: '10px'
          }} onClick={ ()=>{
          signInWithPopup(auth, provider);
          }}>Sign in</button> */}

     
            {/* <span style={{fontFamily: 'fantasy', fontSize: '18px'}}>REVIEWS</span>  */}
          <div style={{
          display: 'flex',
          flexWrap: 'no-wrap',
          overflowX: 'scroll' ,
          width: '100%',
          position: 'relative',
          fontFamily: 'cursive',
          fontSize: '16px'
        }}>
          <div style={{minWidth: '400px', margin: '35px', padding: '30px', backgroundColor: primarySilverColour, borderRadius: '7px'}}>
          I would say, exceptional digital platform which gives access to the learning curriculums curated by experts, I did not have to worry about 'what next?' at any point during the curriculum. I took "Data Science-CS001".

          </div>

          <div style={{minWidth: '400px' , margin: '35px ', padding: '30px', backgroundColor: primarySilverColour, borderRadius: '7px'}}>
          However very theoretical process in the digital world more reform like videos and infographics way.

          </div>
          <div style={{minWidth: '400px' , margin: '35px ', padding: '30px', backgroundColor: primarySilverColour, borderRadius: '7px'}}>
          What I liked the most is that their curriculums are not like individual courses but an ordered collection of multiple courses,
  
          </div>
          <div style={{minWidth: '400px' , margin: '35px ', padding: '30px', backgroundColor: primarySilverColour, borderRadius: '7px'}}>
          What I liked the most is that their curriculums are not like individual courses but an ordered collection of multiple courses,
 
          </div>
         
      
        </div>
       </div>
              
        }
 


<br/>
<br/>
 
    </div>
  );
}

export default App;
