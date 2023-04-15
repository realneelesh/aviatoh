import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  primaryBlueColour,
  primaryGreenColour,
  primarySilverColour,
  showPage,
} from "../App";
import { SearchLoader } from "../components/Loaders";
import {
  getDocument,
  kanbanBoardsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";
import { templatePaths } from "../projectTemplates";
import { IconAviatoh } from "../assets";
import toaster from "../components/toaster";

function Dashboard(props) {
  const { email } = props;
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

    showPage();
    console.log(email);
    if (email) {
      document.getElementById("booktitle").focus();
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
 
    let tempPaths = user.paths.filter(x => x.project.toLowerCase() !== project.toLowerCase())
    if(index != -1) {
      tempProjects = tempProjects.filter(x=>x.title.toLowerCase()!==project.toLowerCase());
    }

    // delete related kanban board
    // maybe do not delete, just update the title to /title+archived/
    updateOrCreateDocument(kanbanBoardsCollection, email+project, {
      data: []
    }).then(()=>{
        updateOrCreateDocument(usersCollection, email, {
          activities: [...user.activities, 'Project deleted - ' + project],
          projects: tempProjects,
          paths: tempPaths
        }).then(res => {
          setUpdateUserFlag(!updateUserFlag);
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
    <div style={{ position: "relative", width: '100vw', marginLeft: '-8px', minHeight: "100vh", 
    justifyContent: 'center',
    background:
            'url("")',
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover',
    alignItems: 'center', backgroundAttachment: 'fixed' }}>
      {user === null && <SearchLoader />}

      {/* <div style={{
        position: 'absolute',
        zIndex: '-1',
        width: '100vw',
        marginLeft: '-8px',
        backgroundColor: primaryGreenColour(0.4),
        height: '230px'
      }}></div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: "0px",
          width: "70%",
          background: `linear-gradient( to right, ${primarySilverColour},${'transparent'},${'transparent'}`,
          padding: "7px 0px",
        }}
      >
         
        <span>
            &nbsp; &nbsp; Dashboard</span>

        <button 
          style={{
            backgroundColor: 'transparent',
            color: "transparent",
            margin: "0px",
            marginRight: "10px",
            fontSize: "13px",
            zIndex: "99999",
            visibility: 'none'
          }}
        >
          + Add Project
        </button>
      </div>
 
      <div align="left" style={{marginTop: '30px', marginBottom: '20px'}} >
        <h1  style={{border: '0px', paddingLeft: '11px'}}>
            Your Projects
        </h1>
        <Link
              style={{
                  cursor: 'pointer',
                  padding: '7px 10px',
                  paddingTop: '8px',
                  boxShadow: `${'silver'} 0px 0px 3px`,
                  backgroundColor: "white", 
                  color: primaryBlueColour,
                  fontSize: '18px',
                  textDecoration: 'none',
                  zIndex: '999',
                  borderRadius: '50%',
                  transform: 'scale(0.4)'
              }}
              onClick={() => {
                setAddNewProject(true);
                setTimeout(()=>{
                  document.getElementById('booktitle').focus();
                },300);
              }}
            >  
           <i className='fas fa-plus' style={{cursor: 'pointer'}}></i>

              
            </Link>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "98vw",
          marginLeft: '-8px', 
          paddingBottom: '50px',
          paddingLeft: '13px',
        }}
      >
        {user?.projects?.filter(x=>!x.title.includes('%arch')).map((project, i) => {
          return (
            <div style={{
                maxWidth: '98vw',
            }}> 
                <div
                  align="left"
                  style={{
                    paddingBottom: "23px",
                    paddingTop: "17px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    boxShadow: "rgba(0, 0, 0, 0.14) 0px 0px 20px",
                    // border: '1px solid rgb(200, 200, 200)',
                    backgroundColor: "white",
                    margin: "8px 8px",
                    color: "grey",
                  }}
                > 
                  <span style={{ fontSize: "12px", color: "grey" }}>
                    {project.type}
                  </span>

                  <div align="left" style={{ 
                  overflow: 'hidden',
                  fontSize: "20px",
                }}>
                
                    {project.title.toUpperCase()}
                  </div>
                  <br /> 
                  <br /> 
                  <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  >

<div>
                  <Link
                to={"/project" + "/view/" + email + "/" + project.title}
                style={{
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                  <h3 className="hbtn" style={{ fontSize: "12px", border: '1px solid #bbbbbb'}}>
                  Share 
                </h3>  
                </Link>
                &nbsp;
                &nbsp; 
                <Link
                to={"/project" + "/" + project.title}
                style={{
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                <h3 className="hbtn" style={{ fontSize: "12px", border: '1px solid #bbbbbb'}}>
                  Edit
                </h3>  
                </Link>
                </div>

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
 
                <i
                    style={{ color: "silver" }}
                    onClick={() => { 
                        deleteProject(project.title);
                    }}
                    className="fa fa-trash"
                >
                </i>
                </div>
                </div>
            </div>
          );
        })}
      </div>

      {user?.projects?.filter(x=>!x.title.includes(projectArchiveStringSeparator)).length === 0 && (
        <div
          align="right"
          style={{
            position: "absolute",
            top: "37px",
            right: "50px",
            borderRight: "0px solid " + "grey",
            height: "120px",
            display: "flex",
            alignItems: "flex-end",
            padding: "0px"
          }}
        >
          <span
            style={{
              padding: "5px",
              fontSize: "25px",
            }}
          >
            <Typewriter
              options={{
                strings: [
                  " No projects found",
                  " Click on '+' to add",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 20,
                delay: 40,
                pauseFor: 900,
              }}
            />
          </span>

       
        </div>
      )}







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
    <label for="test1">Default</label>
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
                        ...templatePaths(email, template, projectToAdd.title)
                      ]
                    })
                      .then((res) => {
                        setUpdateUserFlag(!updateUserFlag);
                        setAddNewProject(false);
                        document.getElementById("booktitle").value = "";
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

      

                {/* SUBSCRIBE BUTTON */}
              {/* {
  !isPremium &&  <Link to="/p" target={'paymentfafa'} style={{textDecoration: 'none', color: 'black', fontSize: '20px', position: 'fixed', bottom: '-25px', cursor: 'pointer', left: '35px'}}>&nbsp;&nbsp;<img src="https://t4.ftcdn.net/jpg/00/21/08/95/240_F_21089512_WOyLlOQG9huHMnsEClGiH8RkKzl3JTcf.jpg" style={{width: '90px', cursor: 'pointer'}} /></Link>
} */}
    
    </div>
  );
}

export default Dashboard;