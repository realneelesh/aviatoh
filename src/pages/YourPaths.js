import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  primaryBlueColour,
  primaryGreenColour,
  primaryRedColour,
  primarySilverColour,
  primaryYellowColour,
  showPage,
} from "../App";
import { Empty, Tick } from "../assets";
import { SearchLoader } from "../components/Loaders";
import {
  getDocument,
  updateOrCreateDocument,
  usersCollection,
} from "../db";

function YourPaths(props) {
  const { email } = props;
  const [user, setUser] = useState(null);
  const [projectToAdd, setprojectToAdd] = useState({
    title: "",
    description: ""
  });

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

  const archiveProject= (project) => {
    const confirmation = window.prompt('Are you sure? This action will archive the project, if you are sure, please type in the title of the project you are trying to delete.');
    // alert(confirmation);
    if(confirmation.toUpperCase() == project.toUpperCase()){
         // as projects is an array of project objects with title and description, we would append "%arch%archived" to a project's title to mark it as archived
    const tempProjects = user?.projects;
    const index = tempProjects?.map(x=>x.title).indexOf(project);
    const tempPaths = user.paths.map((path)=>{
        if(path.project === project){
            return {
                ...path,
                project: path.project + projectArchiveStringSeparator
            }
        } else {
            return path
        }
    })
    if(index != -1) tempProjects[index].title += projectArchiveStringSeparator;

    updateOrCreateDocument(usersCollection, email, {
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
        {/* {user?.paths.map((path, i) => {
            return (
              <Link
                to={"/edit" + "/" + email + "/" + path.title}
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontSize: "17px",
                }}
              >
                {" "}
                <div
                  style={{
                    padding: "5px 20px",
                    borderRadius: "4px",
                    boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 7px",
                    backgroundColor: "white",
                    margin: "20px 15px",
                  }}
                >
                  {path.title} 
                </div>
              </Link>
            );
          })} */}
        {user?.projects?.filter(x=>!x.title.includes(projectArchiveStringSeparator)).map((project, i) => {
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
                    Project {i + 1}
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
                        archiveProject(project.title);
                    }}
                    className="fa fa-trash"
                    ></i> 


                  </div>
               
                </div> 
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: addNewProject ? "block" : "none",

          backgroundColor: "rgb(217, 217, 217)",
          position: "fixed",
          bottom: "0px",
          width: "100%",
          width: "100vw",
          marginLeft: "-8px",
          zIndex: "99999",
        }}
        align="center"
      >
        <i
          onClick={() => {
            setAddNewProject(false);
          }}
          style={{
            position: "absolute",
            right: "20px",
            cursor: "pointer",
            top: "15px",
            fontSize: "20px",
          }}
          className="fas fa-times-circle"
        ></i>
        <br />
        <br />
        <input
          id="booktitle"
          style={{
            border: "0px",
            fontSize: "17px",
          }}
          onChange={(e) => {
            console.log(user.paths, email);
            setprojectToAdd({ ...projectToAdd, title: e.target.value.trim() });
          }}
          placeholder="New Project Title"
        />
        &nbsp; &nbsp;
        <button
          style={{
            backgroundColor: primaryBlueColour,
            color: "white",
            fontSize: "13px",
          }}
          onClick={() => {
            if(user?.projects?.find(x => x.title.toLowerCase() === projectToAdd.title.toLowerCase()+projectArchiveStringSeparator ||  x.title.toLowerCase() === projectToAdd.title.toLowerCase())){
                alert("Project with this title already exists");
            } else {
                if (projectToAdd.title && projectToAdd.title !== "") {
                    // var key = email + new Date().toString().replaceAll(" ", "");
                    updateOrCreateDocument(usersCollection, email, {
                      projects: [
                        ...user.projects,
                        {
                          ...projectToAdd
                        },
                      ],
                      paths: [
                        ...user.paths,
                        {
                          title: 'Introduction',
                          project: projectToAdd?.title,
                          description: '',
                          topics: []
                        },
                        {
                          title: 'Product Design',
                          project: projectToAdd?.title,
                          description: '',
                          topics: []
                        },
                        {
                          title: 'Technical Documentation',
                          project: projectToAdd?.title,
                          description: '',
                          topics: []
                        },
                        {
                          title: 'Quality Assurance',
                          project: projectToAdd?.title,
                          description: '',
                          topics: []
                        },
                        {
                          title: 'FAQs',
                          project: projectToAdd?.title,
                          description: '',
                          topics: []
                        }
                      ]
                    })
                      .then((res) => {
                        setUpdateUserFlag(!updateUserFlag);
                        setAddNewProject(false);
                        document.getElementById("booktitle").value = "";
                        // updateOrCreateDocument(topicsCollection, key, {
                        //   data: '<h2><span style="color: rgb(126, 140, 141);">Introduction</span></h2> <p><span style="color: rgb(126, 140, 141);">Thank you for visiting...</span> <p>&nbsp;</p> <p>&nbsp;</p>',
                        // }).then((res) => {
                        //   setPathAdded(!pathAdded);
                        //   setAddNewProject(false);
                        //   document.getElementById("booktitle").value = "";
                        // });
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
        <br />
        Enter the name of the project that you want to document &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <br />
        <br />
        <br />
      </div>

      {user?.projects?.filter(x=>!x.title.includes(projectArchiveStringSeparator)).length === 0 && (
        <div
          align="right"
          style={{
            position: "absolute",
            top: "37px",
            right: "50px",
            borderRight: "1px solid " + "silver",
            height: "120px",
            display: "flex",
            alignItems: "flex-end",
            padding: "0px",
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

      {user?.projects?.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "245px",
            width: "100%",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span>Steps to Follow</span>
          <br />
          <br />
          <span
            style={{
              color: "silver",
            }}
          >
            <span style={{ fontSize: "20px" }}>Add project</span>
            &nbsp; &nbsp; &nbsp;
            <i style={{ color: "grey", fontSize: "17px" }} className="fa">
              &#xf061;
            </i>
            &nbsp; &nbsp; &nbsp;
            <span style={{ fontSize: "20px" }}>Add scopes to the project</span>
            &nbsp; &nbsp; &nbsp;
            <i style={{ color: "grey", fontSize: "17px" }} className="fa">
              &#xf061;
            </i>
            &nbsp; &nbsp; &nbsp;
            <span style={{ fontSize: "20px" }}>
              Create and Edit documentation
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export default YourPaths;
