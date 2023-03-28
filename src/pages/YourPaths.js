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
  topicsCollection,
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

  const [pathAdded, setPathAdded] = useState(false);

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
  }, [email, pathAdded]);

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
        {user?.projects?.map((project, i) => {
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
                  Preview
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
            if(user?.projects?.find(x => x.title.toLowerCase() === projectToAdd.title.toLowerCase())){
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

      {user?.projects?.length === 0 && (
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
