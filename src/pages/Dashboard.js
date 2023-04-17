import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";  
import {
  primaryBlueColour,
  primarySilverColour,
  showPage,
} from "../App";
import { SearchLoader } from "../components/Loaders";
import {
  getDocument,
  kanbanBoardsCollection,
  projectsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";
import { templatePaths } from "../projectTemplates";
import { IconAviatoh, Loader, Logo, LogoInside } from "../assets";
import toaster from "../components/toaster";
import BlogCard from "../components/BlogCard";
import { signOut } from "firebase/auth";
import { browserStorage, userInfoKey } from "../BrowserStorage";
import Dashboardp from "./Dashboardp";

function Dashboard(props) {
  const { email, auth } = props;
  const [user, setUser] = useState(null);
  const [projectToAdd, setprojectToAdd] = useState({
    title: "",
    description: "",
    kanbanBoardId: ""
  });


  const [ template, setTemplate ] = useState('Project');

  const [updateUserFlag, setUpdateUserFlag] = useState(false);

  const [addNewProject, setAddNewProject] = useState(false);

  
  const [ isPremium, setIsPremium ] = useState(false);

  useEffect(() => {
    getDocument('Checks', 'check').then((res)=>{
      setIsPremium(true);
    })

    window.name = 'dashboard';

    showPage();
    console.log(email);
    if (email) {
    //   document.getElementById("booktitle").focus();
      getDocument(usersCollection, email).then((res) => {
        console.log(res.data());
        if (!res.data().paths || !res.data().projects) {
          let usr = res.data();
          if (!res.data().paths) {
            usr.paths = [];
          }
          if (!res.data().projects) {
            usr.projects = [];
          }

          setUser(usr);
        } else {
          setUser(res.data());
        }
      });
    }
  }, [email, updateUserFlag]);

  const projectArchiveStringSeparator = "%arch%archived" + new Date().toDateString();

  const deleteProject= (project) => {
    const confirmation = window.prompt('Are you sure? This action will archive the project, if you are sure, please type in the title of the project you are trying to delete.');
    // toaster(0, confirmation);
    if(confirmation.toUpperCase() == project.toUpperCase()){
    // we delete the project from 'user.projects' array along with all the related paths(documentation-scopes)
    let tempProjects = user?.projects;
    const index = tempProjects?.map(x=>x.title.toLowerCase()).indexOf(project.toLowerCase());
 
    let tempPaths = user.paths?.filter(x => x.project.toLowerCase().trim() !== project.toLowerCase().trim())
    if(index != -1) {
      tempProjects = tempProjects.filter(x=>x.title.toLowerCase()!==project.toLowerCase());
    }

    // delete related kanban board
    // maybe do not delete, just update the title to /title+archived/
    updateOrCreateDocument(kanbanBoardsCollection, email+project, {
      data: []
    }).then(()=>{
        updateOrCreateDocument(usersCollection, email, {
        //   activities: [...user.activities, 'Project deleted - ' + project],
          projects: tempProjects,
          paths: tempPaths
        }).then(res => {
          setUpdateUserFlag(!updateUserFlag);
          updateOrCreateDocument(projectsCollection, email+'emailproject'+project, {
            deleted: true
           }).then((res)=>{

           }).catch((err)=>{
               console.log(err);
               toaster(0, err.message);
           });
        }).catch(err=>{
          toaster(0, err.message);
        })
    }).catch(err=>{
      console.log(err.message);
      toaster(-1, err.message);
    })
    }
  }


    return (
        <div style={{display: 'flex', width: '100vw', marginLeft: '-8px', overflow: 'hidden', height: '100vh'}}>
            <div style={{width: '21%', height: '100vh', backgroundColor: primarySilverColour}}>
          
                
            
            </div>


          

 




            <div align="left" style={{width: '79%', minHeight: '100vh'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', boxShadow: `${'silver'} 1px 0px 3px`,}}>
               
                <img src={Logo} style={{width: '140px', borderRadius: '4px'}}  />
       <div style={{display: 'flex', alignItems: 'center'}}>
       <span style={{cursor: 'pointer', fontSize: '15px'}}>About </span>
        &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp;
        <span style={{cursor:'pointer', fontSize: '15px'}} onClick={()=>{
          toaster(0, <div>Email: <b>contact@aviatoh.com</b></div>);
        }}>Help! </span>
        &nbsp;&nbsp;
        &nbsp;&nbsp; &nbsp; 
                <i onClick={()=>{
                  var flag = window.confirm('You will be logged out! Do you wish to continue?');
                  if(flag){
                    signOut(auth).then(() => {
                      // Sign-out successful.
                      browserStorage.removeItem(userInfoKey);
                      window.location.reload();
                    }).catch((error) => {
                      // An error happened.
                    });
                  }
                  
                }} className="fas fa-power-off" style={{fontSize: '17px', color: 'red', cursor: 'pointer'}} />
                </div>
                {/* <Link to="/profile"><i className='fas fa-user-circle' style={{fontSize: '25px', color: 'white', cursor: 'pointer', backgroundColor: 'silver', borderRadius: '50%', padding: '3px'}}></i></Link> */}
                </div>  
                {/* <div align="left" style={{width: '100%', padding: '15px', backgroundColor: primaryBlueColour}}>
                            <span style={{marginLeft: '0px'}}>Recommended Feed</span>
                            <span style={{marginLeft: '0px'}}>Filters</span>
                        </div>
                        <br/> */}
                <div align="center" style={{}}>
                <div align="center" style={{width: '95%', marginLeft: '10px'}}>
                    <Dashboardp email={email}/>
                    </div>
                 
                </div>
      
            </div>

         

























            {/* add project modal */}
       
      <div
        style={{
         display: addNewProject? "flex" : "none",
           right: true ? "0px" : "-101vw",
          transition: 'right 0.7s',
          justifyContent: 'center',
          backgroundColor: "white",
          position: "fixed",
          bottom: "0px",
          width: "100vw",
          height: '100vh',
          marginLeft: '-8px',
          zIndex: "99999",
          alignItems: 'center',
          flexDirection: 'column'
        }}
        align="center"
      >
    
      
      <div style={{backgroundColor: 'white', width: '50%', borderRadius: '0px', padding: '40px 0px', position: 'relative', height: ''}}>
      <i
          onClick={() => {
            setAddNewProject(false);
          }}
          style={{
            position: "absolute",
            right: "15px",
            cursor: "pointer",
            top: "15px",
            fontSize: "18px",
          }}
          className="fas fa-times-circle"
        ></i>

<div style={{position: 'absolute', width: '15%', height: '100%', top: '0px', backgroundColor: primaryBlueColour}}></div>


  
 <div style={{display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'flex-start'}}>
         
          <div style={{width: '100%', color: 'grey'}} align="left">
 <span style={{color: 'grey'}}>1. Project Title</span> <br/> 
         
          <input
          id="booktitle"
          style={{
            border: "0px",
            marginTop: '7px',
            fontSize: "17px",
            borderBottom: '1px solid silver',
            cursor: 'text'
          }}
          onChange={(e) => {
            console.log(user.paths, email);
            setprojectToAdd({ ...projectToAdd, title: e.target.value.trim() });
          }}
          placeholder="Type here ..."
        />
          </div>
        
        
        <br/> 
        <br/>  
          <div style={{width: '100%', color: 'grey'}} align="left">
           2. Choose a template  
          <br/>
        
          
  <p>
    <input type="radio"
    value='Project'
    checked={template === 'Project'}
    onChange={(e)=>{
      if(e.target.checked){
        setTemplate(e.target.value);
      }
    }}
    id="test1" name="template"/>
    <label for="test1">Default (Customizable Docs)</label>
  </p>

  <p>
    <input type="radio" 
    value='Startup/Business'
    onChange={(e)=>{
      if(e.target.checked){
        setTemplate(e.target.value);
      }
    }}
    id="test2" name="template" />
    <label for="test2">Startup/Business Idea</label>
  </p> 
  <p>
    <input type="radio" 
    value='Book'
    onChange={(e)=>{
      if(e.target.checked){
        setTemplate(e.target.value);
      }
    }}
    id="test3" name="template" />
    <label for="test3">Write a Book </label>
  </p>
        <br/>  
        </div>


        <br/>  
        <br/>  

        <button
          style={{
            backgroundColor: primaryBlueColour,
            color: "white",
            fontSize: "13px",
            margin: '0px'
          }}
          onClick={() => {
            if(user?.projects?.find(x => x.title.toLowerCase() === projectToAdd.title.toLowerCase()+projectArchiveStringSeparator ||  x.title.toLowerCase() === projectToAdd.title.toLowerCase())){
                toaster(-1, "Project with this title already exists");
            } else {
                if (projectToAdd.title && projectToAdd.title !== "") {
                    // var key = email + new Date().toString().replaceAll(" ", "");
                    let templatePathsArray = [...templatePaths(email, template, projectToAdd.title)];
                    updateOrCreateDocument(usersCollection, email, {
                      activities: [...user.activities, 'Project added - ' + projectToAdd.title],
                      projects: [
                        ...user.projects,
                        {
                          ...projectToAdd,
                          type: template,
                          kanbanBoardId: email + new Date().toString().replaceAll(" ", "")
                        },
                      ],
                      paths: [
                        ...user.paths,
                        ...templatePathsArray
                      ]
                    })
                      .then((res) => {
                        setUpdateUserFlag(!updateUserFlag);
                        setAddNewProject(false);
                        document.getElementById("booktitle").value = "";
                        updateOrCreateDocument(projectsCollection, email+'emailproject'+projectToAdd.title, {
                         preview: templatePathsArray.find(x=>x.title === 'Introduction').topics[0].id,
                         type: template,
                         deleted: false
                        }).then((res)=>{

                        }).catch((err)=>{
                            console.log(err);
                            toaster(0, err.message);
                        });
                      })
                      .catch((err) => {
                        toaster(0, err.message);
                      });
                  } else {
                    toaster(-1, "Title can not be empty");
                  }
            }
          }}
        >
          Add Project
        </button>
        </div>
      </div>
      <br/><br/>
      <br/><br/>
      </div>
        </div>
    );
}

export default Dashboard;