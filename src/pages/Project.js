import React, {useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  primaryBlueColour, primaryGreenColour, primaryRedColour, primarySilverColour, primaryYellowColour, showPage
} from "../App";
import { SearchLoader } from '../components/Loaders';
import {
    getDocument,
    updateOrCreateDocument,
    usersCollection,
} from "../db";
import Typewriter from "typewriter-effect";

function Project(props) {
    const { email } = props;
    const { projecttitle } = useParams();
    const [pathToAdd, setPathToAdd] = useState({
        title: "",
        description: ``,
        topics: [{}],
        project: null
      });

      const [user, setUser] = useState(null);
      const [addNewPath, setAddNewPath] = useState(false);
      const [ pathAdded, setPathAdded ] = useState(false);

      useEffect(() => {
        showPage();
        console.log(email);
        if (email) {
          document.getElementById("doctitle").focus();
          getDocument(usersCollection, email).then((res) => {
            console.log(res.data());
            if (!res.data().paths) {
              const usr = res.data();
              usr.paths = [];
              setUser(usr);
            } else {
              setUser(res.data());
            }
          });
        }
      }, [email, pathAdded]);


    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            minHeight: '100vh'
        }}>  
         <div style={{
        position: 'absolute',
        zIndex: '-1',
        width: '100vw',
        marginLeft: '-8px',
        backgroundColor: primaryGreenColour(0.38),
        height: '170px'
      }}></div>
        {user === null && <SearchLoader /> }
             <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: '0px',
    width: '100vw',
    marginLeft: '-8px',
    backgroundColor: primarySilverColour,
    padding: '7px 0px'}}>
  
  <span>
  &nbsp; &nbsp;
    <Link to={'/'} style={{textDecoration: 'none', color: primaryBlueColour}}>
  <i className='far fa-arrow-alt-circle-left' style={{fontSize: '19px', position: 'absolute', top: '12px'}} /> 
   </Link> &nbsp; &nbsp;&nbsp;&nbsp;</span>

  <button
               onClick={()=>{
                setAddNewPath(true);
              }}
                style={{
                  backgroundColor: primaryBlueColour,
                  color: 'white',
                  margin: '0px',
                  marginRight: '10px',
                  fontSize: '13px',
                  zIndex: '999999 !important'
                }}
                className="hoverbgdark"
              >
                + Add a Block
              </button>

  </div>
       
  <div align="left" style={{marginTop: '30px', marginBottom: '20px'}}>
      <h1 style={{border: '0px', paddingLeft: '11px'}}>
      { projecttitle }
        </h1>
      </div>
      <div align="left" style={{paddingLeft: '10px'}}>Documentation Blocks  </div>  
        <div style={{
            display: 'flex'
        }}>
      <div style={{ 
            marginLeft: "0px",
            paddingTop: '3px',
            paddingLeft: '9px',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%', 
          }}>
        
    {
        user?.paths?.filter(x=>x.project === projecttitle).map((path, i) => {
            var asciiValueSumOfTitle = 0;
            path.title.split('').forEach(i=>{
                asciiValueSumOfTitle+=i.charCodeAt(0);
            }); 
            asciiValueSumOfTitle=(asciiValueSumOfTitle*i)%90; 
            return <Link
                to={"/edit/" + email + "/" + projecttitle + "/" + path.title}
                className="scopes"
                style={{
                    paddingBottom: "15px",
                    paddingTop: "15px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 6px",
                    backgroundColor: "white", 
                    color: "grey",
                    fontSize: '18px',
                    textDecoration: 'none',
                    marginBottom: '1px'
                }}
              > 
                <div
                align="left"
                  style={{ 
                  textAlign: 'center',
                    borderRadius: "4px", 
                    backgroundColor: 'inherit'
                  }}
                >
                  {path.title}
                </div>
              </Link>
        })
    }
   
</div> 
</div>

<br/>
<br/>
<br/>
{/* <br/>
<div align="left" style={{paddingLeft: '10px'}}>Activity  </div>   */}













<div style={{
        display: addNewPath ? 'block': 'none', 
        
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
        <i 
        onClick={()=>{
            setAddNewPath(false);
        }}
        style={{
            position: 'absolute',
            right: '20px',
            cursor: 'pointer',
            top: '15px',
            fontSize: '20px',
        }} className='fas fa-times-circle'></i>
        <br/> 
      
        <br/> 
      <input
        id="doctitle"
        style={{
          border: "0px",
          fontSize: "17px",
        }}
        onChange={(e) => {
          console.log(user.paths, email);
          setPathToAdd({ ...pathToAdd, title: e.target.value.trim().replaceAll('/', '|') });
        }}
        placeholder="Block title"
      />
      &nbsp; 
      &nbsp;
      
      
      <button
        style={{
          backgroundColor: primaryBlueColour,
          color: "white",
          fontSize: "13px",
        }}
        onClick={() => {
          if (pathToAdd.title && pathToAdd.title !== "") {
            var key = email + new Date().toString().replaceAll(" ", "");
            updateOrCreateDocument(usersCollection, email, {
              paths: [
                ...user.paths,
                {
                  ...pathToAdd,
                  project: projecttitle,
                  topics: [],
                  description: ""
                },
              ],
            })
              .then((res) => {
                setPathAdded(!pathAdded);
                 setAddNewPath(false);
                  document.getElementById("doctitle").value = "";
                // updateOrCreateDocument(topicsCollection, key, {
                //   data: '<p style="color: rgb(126, 140, 141);" align="center">Feature</p><h2 style="text-align: center;"><span style="color: rgb(126, 140, 141);">Sample Feature Title</span></h2> <p><span style="color: rgb(126, 140, 141);">You can delete this text and start writing the documentation...</span> <p>&nbsp;</p> <p>&nbsp;</p>',
                // }).then((res) => {
                //   setPathAdded(!pathAdded);
                //   setAddNewPath(false);
                //   document.getElementById("doctitle").value = "";
                // });
              })
              .catch((e) => {
                alert(e);
              });
          } else {
            alert("Title can not be empty");
          }
        }}
      >
        Add Block
      </button>
      <br/> 
      &nbsp; &nbsp; 
      &nbsp;  
      &nbsp; &nbsp;  
      e.g. Technical Documentation, Project Plan, Training Plan, API Docs etc. 
      &nbsp;
      &nbsp; 
        <br/>
      <br/>
      <br/>

      </div>

      { user?.paths?.filter(x=>x.project === projecttitle)?.length === 0 && <div align="right" style={{position: 'absolute', top: '37px', right: '50px',
    borderRight: '1px solid '+ primaryBlueColour, height: '120px', display: 'flex', alignItems: 'flex-end', padding: '0px',
    zIndex: '9'
    
    }}>
        <span style={{
            padding: '5px',
            fontSize: '25px'
        }}> 
            <Typewriter
          options={{
            strings: [
               " ⚠️  No documentation blocks found for this project", 
               " Click on '+ Add a Block' to add"
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 20,
            delay: 40,
            pauseFor: 900,
          }}
        />
        
         
        </span>
      </div>}
        </div>
    );
}

export default Project;