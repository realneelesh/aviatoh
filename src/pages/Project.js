import React, {useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  primaryBlueColour, primaryRedColour, primarySilverColour, primaryYellowColour, showPage
} from "../App";
import { SearchLoader } from '../components/Loaders';
import {
    getDocument,
  topicsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";

function Project(props) {
    const { email } = props;
    const { projecttitle } = useParams();
    const [pathToAdd, setPathToAdd] = useState({
        title: "",
        description: `<h3 align="center" style="color: rgb(149, 165, 166); font-weight: 500;" data-mce-style="color: rgb(149, 165, 166);text-align: center; font-weight: 500;"><br/><br/><br/><br/>Add or select items from the menu to enable the editor...</h3>`,
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
        {user === null && <SearchLoader /> }
             <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: '0px',
    width: '100vw',
    marginLeft: '-8px',
    padding: '7px 0px'}}>
  
  <span> 
  &nbsp;
  &nbsp;
  Projects 
  &nbsp;
  &nbsp;
  <i style={{color: 'grey', fontSize: '12px'}} className="fa">&#xf061;</i>
  &nbsp;
  &nbsp;

  { projecttitle }
 
  </span>

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
                  zIndex: '99999'
                }}
                className="hoverbgdark"
              >
                + Add a Scope
              </button>

  </div>
       <br/>
       <br/>
        <div style={{
            display: 'flex'
        }}>
      <div style={{ 
            marginLeft: "-8px",
            paddingTop: '10px',
            paddingLeft: '9px',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
          }}>
        
    {
        user?.paths?.filter(x=>x.project === projecttitle).reverse().map((path, i) => {
            return <Link
                to={"/edit/" + email + "/" + projecttitle + "/" + path.title}
                style={{
                  textDecoration: "none",
                  color: primaryBlueColour,
                  fontSize: "18px",
                  fontWeight: '700',
                  width: '32vw',
                  backgroundColor: 'rgb(245, 245, 245)',
                  margin: '15px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '80px',
                  borderLeft: '12px solid rgb(230, 230, 230)'
                  //   borderLeft: '12px solid ' + `rgb(${Math.random()*150}, ${Math.random()*102}, ${Math.random()*225})`

                }}
              > 
                <div
                align="left"
                  style={{ 
                  textAlign: 'center',
                    borderRadius: "4px", 
                    backgroundColor: 'inherit',
                    margin: "5px",
                  }}
                  className="docs"
                >
                  {path.title.toUpperCase()}
                </div>
              </Link>
        })
    }
    {
     user?.paths?.filter(x=>x.project === projecttitle).length%2 === 0 ? null : 
     <Link
     style={{
       opacity: '0',
       textDecoration: "none",
       color: "gray",
       fontSize: "29px",
        width: '32vw',
        margin: '15px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80px',
        borderLeft: '12px solid ' + `transparent`

     }}
   > 
     <div
     align="left"
       style={{ 
       opacity: '0',
       textAlign: 'center',
         borderRadius: "4px", 
         backgroundColor: 'inherit',
         margin: "5px",
       }}
       className="docs"
     > 
     </div>
   </Link>
    }
</div>


</div>




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
          setPathToAdd({ ...pathToAdd, title: e.target.value.trim() });
        }}
        placeholder="Scope title"
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
                  topics: [
                    {
                      title: "Sample Feature 1",
                      id: key,
                    },
                  ],
                  project: projecttitle
                },
              ],
            })
              .then((res) => {
                updateOrCreateDocument(topicsCollection, key, {
                  data: '<p style="color: rgb(126, 140, 141);" align="center">Feature</p><h2 style="text-align: center;"><span style="color: rgb(126, 140, 141);">Sample Feature Title</span></h2> <p><span style="color: rgb(126, 140, 141);">You can delete this text and start writing the documentation...</span> <p>&nbsp;</p> <p>&nbsp;</p>',
                }).then((res) => {
                  setPathAdded(!pathAdded);
                  setAddNewPath(false);
                  document.getElementById("doctitle").value = "";
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
        Add Scope
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

      { user?.paths?.length === 0 && <div align="right" style={{position: 'absolute', top: '30px', right: '50px',
    borderRight: '1px solid '+ primaryBlueColour, borderBottom: '1px solid '+ primaryBlueColour, height: '180px', display: 'flex', alignItems: 'flex-end', padding: '0px',
    
    }}>
        <span style={{
            borderTop: '1px solid '+ primaryBlueColour,
            borderLeft: '1px solid '+ primaryBlueColour,
            padding: '15px'
        }}>
            <b style={{fontSize: '30px'}}>❕</b>
        You do not have any documentation scopes related to this project,<br/> click on '+ Add a Scope' button to add one
         
        </span>
      </div>}
        </div>
    );
}

export default Project;