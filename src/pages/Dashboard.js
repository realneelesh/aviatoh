import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  primaryBlueColour,
  primaryGreenColour,
  primarySilverColour,
  showPage,
} from "../App";
import AIGeneral from "../components/AIGeneral";
import { SearchLoader } from "../components/Loaders";
import {
  getDocument,
  updateOrCreateDocument,
  usersCollection,
} from "../db";
import { templatePaths } from "../projectTemplates";
import { IconAviatoh } from "../assets";

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

  useEffect(() => {
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
    // alert(confirmation);
    if(confirmation.toUpperCase() == project.toUpperCase()){
    // we delete the project from 'user.projects' array along with all the related paths(documentation-scopes)
    let tempProjects = user?.projects;
    const index = tempProjects?.map(x=>x.title.toLowerCase()).indexOf(project.toLowerCase());
 
    let tempPaths = user.paths.filter(x => x.project.toLowerCase() !== project.toLowerCase())
    if(index != -1) {
      tempProjects = tempProjects.filter(x=>x.title.toLowerCase()!==project.toLowerCase());
    }

    updateOrCreateDocument(usersCollection, email, {
        activities: [...user.activities, 'Project deleted - ' + project],
        projects: tempProjects,
        paths: tempPaths
    }).then(res => {
        setUpdateUserFlag(!updateUserFlag);
    }).catch(err=>{
        alert('Something went wrong');
    })
    }
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {user === null && <SearchLoader />}

      <div style={{
        position: 'absolute',
        zIndex: '-1',
        width: '100vw',
        marginLeft: '-8px',
        backgroundColor: primaryGreenColour(0.4),
        height: '230px'
      }}></div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: "0px",
          width: "100vw",
          marginLeft: "-8px",
          background: `linear-gradient( to right, ${primarySilverColour},${primarySilverColour}`,
          padding: "7px 0px",
        }}
      >
         
        <span>
            &nbsp; &nbsp; Dashboard</span>

        <button
          onClick={() => {
            setAddNewProject(true);
            setTimeout(()=>{
              document.getElementById('booktitle').focus();
            },300);
          }}
          style={{
            backgroundColor: primaryBlueColour,
            color: "white",
            margin: "0px",
            marginRight: "10px",
            fontSize: "13px",
            zIndex: "99999",
          }}
          className="hoverbgdark"
        >
          + Add Project
        </button>
      </div>
 
      <div align="left" style={{marginTop: '30px', marginBottom: '20px'}}>
        <h1 style={{border: '0px', paddingLeft: '11px'}}>
            Your Projects
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100vw",
          marginLeft: "-8px",
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
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 7px",
                    backgroundColor: "white",
                    margin: "10px 15px",
                    color: "grey",
                  }}
                > 
                  <span style={{ fontSize: "12px", color: "grey" }}>
                    {project.type}
                  </span>

                  <div align="left" style={{ 
                  overflow: 'scroll',
                  fontSize: "20px",
                }}>
                
                    {project.title.toUpperCase()}
                  </div>
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
                target={"/project" + "/view/" + email + "/" + project.title}
                style={{
                  textDecoration: "none",
                  color: "gray",
                }}
              >
                  <h3 style={{ fontSize: "12px"}}>
                  View
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
                <h3 style={{ fontSize: "12px"}}>
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
            borderRight: "1px solid " + "grey",
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
                  " ⚠️  No projects found",
                  " Click on '+ Add Project' to add",
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
          backgroundColor: "rgb(240, 240, 240, 0.7)",
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
    
      
      <div style={{backgroundColor: 'white', width: '50%', borderRadius: '0px', boxShadow: "rgba(0, 0, 0, 0.1) 10px 10px 10px", padding: '40px 0px', position: 'relative', height: ''}}>
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
         
 
          <div style={{width: '100%', fontSize: '18px', color: 'grey'}} align="left">
           1. Project Title  
           <br/> 
          </div>
        <input
          id="booktitle"
          style={{
            border: "0px",
            marginTop: '18px',
            fontSize: "18px",
            borderBottom: '1px solid silver',
            cursor: 'text'
          }}
          onChange={(e) => {
            console.log(user.paths, email);
            setprojectToAdd({ ...projectToAdd, title: e.target.value.trim() });
          }}
          placeholder="Type here ..."
        />
        
        <br/> 
        <br/> 
        <br/> 
        <br/>

          <div style={{width: '100%', fontSize: '18px', color: 'grey'}} align="left">
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



        <button
          style={{
            backgroundColor: primaryBlueColour,
            color: "white",
            fontSize: "15px",
            margin: '0px'
          }}
          onClick={() => {
            if(user?.projects?.find(x => x.title.toLowerCase() === projectToAdd.title.toLowerCase()+projectArchiveStringSeparator ||  x.title.toLowerCase() === projectToAdd.title.toLowerCase())){
                alert("Project with this title already exists");
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
                          kanbanBoardId: email + projectToAdd.title
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
                      .catch((e) => {
                        alert(e);
                      });
                  } else {
                    alert("Title can not be empty");
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

      <Link
              id="linktoprofile"
              to="/profile" style={{color: 'grey'}}>
                <i style={{
                position: 'fixed',
                bottom: '10px',
                right: '10px',
                cursor: 'pointer',
                // boxShadow: '0px 0px 150px 30px '+ 'grey',
                backgroundColor: 'transparent',
                }} className="fa gear">
              <img style={{width: '30px'}} src={IconAviatoh} />
                  
                  </i>
              </Link>

 
    
    </div>
  );
}

export default Dashboard;
