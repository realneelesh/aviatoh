import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  primaryBlueColour,
  primaryRedColour,
  primarySilverColour,
  primaryYellowColour,
  showPage,
} from "../App";
import { Empty, Tick } from "../assets";
import {
  getDocument,
  topicsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";

function YourPaths(props) {
  const { email } = props;
  const [user, setUser] = useState({
    paths: [],
    projects: [],
  });
  const [projectToAdd, setprojectToAdd] = useState({
    title: "",
  });

  const [pathAdded, setPathAdded] = useState(false);

  const [ addNewProject, setAddNewProject] = useState(false);

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
    <div style={{position: 'relative', minHeight: '100vh', padding: '0px'}}>
    
      
      <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: '0px',
    width: '100vw',
    marginLeft: '-8px',
    background: `linear-gradient( to right, ${primarySilverColour},${primarySilverColour}`, 
    padding: '7px 0px'}}>
  
  <span> 
  &nbsp;
  &nbsp; 
  Projects
 
  </span>

 
              <button
               onClick={()=>{
                setAddNewProject(true);
              }}
                style={{
                  backgroundColor: primaryBlueColour,
                  color: 'white',
                  margin: '0px',
                  marginRight: '10px',
                  fontSize: '13px'
                }}
                className="hoverbgdark"
              >
                + Add Project
              </button>
     </div>
     
      <br />
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
            <Link
              to={"/project" + "/" + project.title}
              style={{
                textDecoration: "none",
                color: "gray",
                fontSize: "17px",
              }}
            >
              {" "}
              <div
                style={{
                  padding: "15px 20px",
                  borderRadius: "4px",
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 7px",
                  backgroundColor: "white",
                  margin: "10px 15px",
                }}
              >
                {project.title}
              </div>
            </Link>
          );
        })}


      </div> 
      <div style={{
        display: addNewProject ? 'block': 'none', 
        
        backgroundColor: "rgb(217, 217, 217)",
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        width: '100vw',
        marginLeft: '-8px',
        zIndex: '99999'
    }}
    align="center"
    >
        <br/>
        <br/> 
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
          if (projectToAdd.title && projectToAdd.title !== "") {
            var key = email + new Date().toString().replaceAll(" ", "");
            updateOrCreateDocument(usersCollection, email, {
              projects: [
                ...user.projects,
                {
                  ...projectToAdd,
                  topics: [
                    {
                      title: "Sample Feature 1",
                      id: key,
                    },
                  ],
                },
              ],
            })
              .then((res) => {
                updateOrCreateDocument(topicsCollection, key, {
                  data: '<p style="color: rgb(126, 140, 141);" align="center">Feature</p><h2 style="text-align: center;"><span style="color: rgb(126, 140, 141);">Sample Feature Title</span></h2> <p><span style="color: rgb(126, 140, 141);">You can delete this text and start writing the documentation...</span> <p>&nbsp;</p> <p>&nbsp;</p>',
                }).then((res) => {
                  setPathAdded(!pathAdded);
                setAddNewProject(false);
                  document.getElementById("booktitle").value = "";
                });
              })
              .catch((e) => {
                alert(e);
              });
          } else {
            alert("Title can not be empty");
          }
        }}
      >
        Add Project
      </button>
      <br/>
      Enter the name of the project that you want to document
      &nbsp; &nbsp; 
      &nbsp; &nbsp; 
      &nbsp; &nbsp; 
      &nbsp; &nbsp; 
      &nbsp; &nbsp; 
      <br/> 
        <br/>
      <br/> 

      </div>
    </div>
  );
}

export default YourPaths;
