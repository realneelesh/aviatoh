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
  projectsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";
import { templatePaths } from "../projectTemplates";
import { IconAviatoh, Loader, Logo, LogoInside } from "../assets";
import toaster from "../components/toaster";
import AviatohLogo from "../components/AviatohLogo";
import Feed from "../components/Feed";
import BlogCard from "../components/BlogCard";
import ProfileCard from "../components/ProfileCard";

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
            <div style={{width: '18%', height: '100vh', backgroundColor: primaryBlueColour}}>
          
                <div align="left" style={{marginTop: '0px', color: 'white', height: '85vh', overflowY: 'scroll', paddingTop: '17px'}}>
                    <div align="left">
                    <span style={{color: 'silver', paddingLeft: '15px', margin: '0px'}}> YOUR PROJECTS </span>
                     &nbsp;
                    <Link
              style={{
                  cursor: 'pointer',
                //   boxShadow: `${'silver'} 0px 0px 3px`, 
                  color: "white",
                  fontSize: '14px',
                  textDecoration: 'none',
                  zIndex: '999',
                  borderRadius: '50%',
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
         {/* <hr style={{marginLeft: '15px'}}/>    */}
         <br/>
            
                    {
                        user?.projects?.filter(x=>!x.title.includes('%arch'))?.length == 0 ? <div align="center" style={{padding: '15px', color: 'rgb(155, 155, 155)'}}><br/>No Projects Found</div> : null
                    }
                    {user?.projects?.filter(x=>!x.title.includes('%arch')).map((project, i) => {
                        return (
                            <Link
                            target={"/project" + "/" + project.title}
                            to={"/project" + "/" + project.title} className="proj-list-item" style={{display: 'flex', padding: '12px 15px', justifyContent: 'space-between', alignItems: 'flex-end', cursor: 'pointer',
                  textDecoration: 'none'
                }}> 
                                <span style={{ fontSize: "12px", color: 'silver', cursor: 'pointer' }}>
                                    {project.type}
                                    <br/>
                                    <span style={{color: 'white', fontSize: '15px', width: '13vw', border: '0px solid silver', display: 'inline-block', overflow: 'overlay', scrollbar: 'hidden', whiteSpace:'no-wrap', cursor: 'pointer'}}>{project.title.toUpperCase()}</span>
                                </span>
                
                
                    
                  

{/* <div>
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
                </div> */}
 
 {/* <Link
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
                 */}
                <i
                    style={{ color: "silver", paddingBottom: '6px', fontSize: '12px', visibility: 'hidden'}}
                    onClick={(e) => { 
                        e.preventDefault();
                        deleteProject(project.title);
                    }}
                    className="fa fa-trash"
                > 
                </i>  
            </Link>
          );
        })}
                </div>
            
            </div>


          

 




            <div align="left" style={{width: '82%', minHeight: '100vh', backgroundColor: ' '}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 15px', boxShadow: `${'silver'} 0px 0px 3px`,}}>
               
                <img src={Logo} style={{width: '120px', borderRadius: '4px'}}  />
       
                <Link to="/profile"><i className='fas fa-user-circle' style={{fontSize: '25px', color: 'white', cursor: 'pointer', backgroundColor: 'silver', borderRadius: '50%', padding: '3px'}}></i></Link>
                </div> 
                <br/>
                {/* <div align="left" style={{width: '100%', padding: '15px', backgroundColor: primaryBlueColour}}>
                            <span style={{marginLeft: '0px'}}>Recommended Feed</span>
                            <span style={{marginLeft: '0px'}}>Filters</span>
                        </div>
                        <br/> */}
                <div align="center" style={{}}>
                <div align="center" style={{width: '80%'}}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                      <BlogCard /> 
                    </div>
                  {/* <div align="center" style={{width: '37%', height: '100vh', overflow: 'scroll', background: 'linear-gradient(white, rgb(241, 241, 241))'}}>
                    
                    <Feed email={email}/>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/>  

                        <ProfileCard email={email} />
                    </div>   */}

                    
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