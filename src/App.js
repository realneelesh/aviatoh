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

export const primaryBlueColour = '#2e4057';
export const primarySilverColour = 'rgb(242,242,242)';

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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

      {
        window.mobileCheck() ? 
        <div
        style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'column',
    width: '100vw',
    marginLeft: '-8px',
    height: '80vh'
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
    <div align="center" style={{ padding: '0'}}>
      <h3 style={{fontSize: '20px', paddingRight: '12px', fontWeight: '600', color: 'grey', backgroundColor: 'transparent'}}>
    {("Comprehensive")}
    </h3>  
    <h3 style={{fontSize: '20px', fontWeight: '500'}}>
    {("curriculums").toUpperCase()}
    </h3>

       {/* Open source alternative to college curriculums */}
    <br/>

   
       </div> 
       <div style={{fontSize: '14px'}}  align="center">
       {/* <div style={{fontSize: '17px'}}>
        {('Your mentor for online studies').toUpperCase()}
        </div> */}
<br/> 
<br/>
<br/>
     
       
        <div style={{width: '100%', backgroundColor: primaryBlueColour}}>
       <div align="center" id="info-home" 
       style={{width: '80%', padding: '35px', color: 'white', backgroundColor: primaryBlueColour}}>
        <div align="center" style={{backgroundColor: 'transparent'}}>Organised, topic wise collection of freely available resources, curated by experts.</div>
        <br/> 
        <h3 style={{backgroundColor: 'transparent'}}>✨ Open Source ✨</h3>
        {/* <br/>
        <br/>   */}

{/* <div align="center" style={{
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
</div> */}
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
    <br/>  
    <br/>  
    <h2 style={{ 
      position: 'relative',  
      backgroundColor: primarySilverColour,
      color: 'black',
      cursor: 'pointer'
    }}>
      Not available for mobile screens 
 </h2>

    {/* <button style={{
      position: 'absolute',
      top: '10px',
      right: '10px'
    }} onClick={ ()=>{
    signInWithPopup(auth, provider);
    }}>Sign in</button> */}


      {/* <span style={{fontFamily: 'fantasy', fontSize: '18px'}}>REVIEWS</span>  */}
    {/* <div style={{
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
   

  </div> */}
 </div>
  :
<div>
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
          flexDirection: 'column',
          width: '100vw',
          marginLeft: '-8px',
          height: '80vh'
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
          <div align="center">
            <h1 style={{fontSize: '36px', paddingRight: '12px', fontWeight: '600', color: 'grey', backgroundColor: 'transparent'}}>
          {("Comprehensive")}
          </h1>  
          <h1 style={{fontSize: '33px', fontWeight: '500'}}>
          {("curriculums").toUpperCase()}
          </h1>

             {/* Open source alternative to college curriculums */}
          <br/>
      
         
             </div> 
             <div style={{fontSize: '14px'}}  align="center">
             {/* <div style={{fontSize: '17px'}}>
              {('Your mentor for online studies').toUpperCase()}
              </div> */}
<br/> 
<br/>
<br/>
           
             
              <div style={{width: '100vw', backgroundColor: primaryBlueColour}}>
             <div align="center" id="info-home" 
             style={{width: '70%', padding: '35px', color: 'white', backgroundColor: primaryBlueColour}}>
              <h3 style={{backgroundColor: 'transparent'}}>Organised, topic wise collection of freely available resources, curated by experts.</h3>
              <br/>
              <br/> 
              <h2 style={{backgroundColor: 'transparent'}}>✨ Open Source ✨</h2>
              {/* <br/>
              <br/>   */}

{/* <div align="center" style={{
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
  </div> */}
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
          <br/>  
          <div style={{ 
            position: 'relative',
            backgroundColor: 'white',
            padding: '2px 10px',
            cursor: 'pointer'
          }}
          onClick={() => {           signInWithPopup(auth, provider);
          }}>
          <GoogleButton 
          type='light'
          label='Sign in '
          style={{
          outline: 'silver', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0px 7px',
          backgroundColor: 'white !important',
          fontSize: '16px',
          width: '120px',
          textAlign: 'left',
          height: '0px',
          marginLeft: '-10px'
        }}
  
/></div>
     
          {/* <button style={{
            position: 'absolute',
            top: '10px',
            right: '10px'
          }} onClick={ ()=>{
          signInWithPopup(auth, provider);
          }}>Sign in</button> */}

     
            {/* <span style={{fontFamily: 'fantasy', fontSize: '18px'}}>REVIEWS</span>  */}
          {/* <div style={{
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
         
      
        </div> */}
       </div>
              
        }
    </div>
      }

    </div>
  );
}

export default App;
