import React, {useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  primaryBlueColour, primaryGreenColour, primaryRedColour, primarySilverColour, primaryYellowColour, showPage
} from "../App";
import { SearchLoader } from '../components/Loaders';
import {
    getDocument,
    topicsCollection,
    updateOrCreateDocument,
    usersCollection,
} from "../db";
import Typewriter from "typewriter-effect";
import KanbanBoard from '../components/KanbanBoard';


function Project(props) {
    const { email } = props;
    const { projecttitle } = useParams();

    const navigate = useNavigate();

    const [pathToAdd, setPathToAdd] = useState({
        title: "",
        description: ``,
        topics: [{}],
        project: null
      });

      const [user, setUser] = useState(null);
      const [addNewPath, setAddNewPath] = useState(false);
      const [ pathAdded, setPathAdded ] = useState(false);

      const [ typeOfBlock, setTypeOfBlock ] = useState('single');

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

      const deleteDocumentationBlock = (block) => {
        var confirmation = window.confirm(`The documentation block '${block}' shall be deleted permanently, are you sure?`);
        if(confirmation) {
          // 'paths' in user are blocks
        let tempPaths = user.paths;
        tempPaths = tempPaths.filter(x => x.project !== projecttitle ||  x.title !== block);
        updateOrCreateDocument(usersCollection, email, {
          paths: tempPaths
        }).then(res =>{
          //just to retrigger useEffect
          setPathAdded(!pathAdded);
        }).catch((err)=>{
          alert(err);
        })
        }
      }


const renameProject = (title) => {
    if(title.trim()==""){
        title=projecttitle;
    }
    const indexToUpdate = user.projects.map(x=>x.title).indexOf(projecttitle);
    const tempProjes = user.projects;
    tempProjes[indexToUpdate].title = title;
    const tempPaths = user.paths.map(x=>{
        if(x.project === projecttitle){
            return {
                ...x,
                project: title
            }
        } else {
            return x
        }
    })
    updateOrCreateDocument(usersCollection, email, {
        activities: [...user.activities, `Project ${projecttitle} renamed to ${title}`],
        projects: tempProjes,
        paths: tempPaths
    }).then(res=>{
        setPathAdded(!pathAdded);
        navigate("/project/" + title);
        window.location.reload();
    }).catch((e)=>{
        alert(e);
        window.location.reload();
    })
}


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
    padding: '7px 0px',
    zIndex: '999999999'
    }}>
  
  <span>
  &nbsp; &nbsp;
    <Link to={'/'} style={{textDecoration: 'none', color: primaryBlueColour}}>
    &nbsp; 
  <i className='far fa-arrow-alt-circle-left' style={{fontSize: '19px', position: 'absolute', top: '12px'}} /> 
 
   </Link> &nbsp; &nbsp;&nbsp;&nbsp;</span>

   <button
          style={{
            margin: "0px",
            marginRight: "10px",
            backgroundColor: 'transparent',
            fontSize: "13px",
            opacity: "0",
            color: 'transparent',
            cursor: 'default'
          }}
        >
          + Add Project
        </button>
  </div>
       
  <div align="left" style={{marginTop: '30px', marginBottom: '20px'}}>
      <h1 id="projectTitle" style={{border: '0px', paddingLeft: '11px', paddingRight: '3px'}}>
      { projecttitle.toUpperCase() }
        </h1>
        <h1 id="projectTitleEdit" style={{padding:'0px', display: 'none', margin: '0px', border: '0px', paddingLeft: '5px'}}>
            <input
            id={'projectTitleEditInput'}
            placeholder={projecttitle.toUpperCase()} style={{all: 'inherit'}} type="text">
            </input></h1>
            &nbsp; 
            &nbsp; 
        <i
        onClick={(e)=>{
            document.getElementById('projectTitle').style.display = 'none';
            document.getElementById('projectTitleEdit').style.display = 'inline';
            document.getElementById('titileSave').style.display = 'inline';
            document.getElementById('projectTitleEditInput').focus();
            e.target.style.display = 'none';
        }}
        title="Rename" style={{color: 'grey', cursor: 'pointer'}} className="fa fa-edit"></i>

        <button id="titileSave" style={{display: 'none', margin: '0px', padding: '5px 10px'}}
        onClick={()=>{
            renameProject(document.getElementById('projectTitleEditInput').value)
        }}
        >Save</button>
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
            width: '100vw',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
            // alignItems: 'center'
          }}>
            
        
    {
        user?.paths?.filter(x=>x.project === projecttitle).map((path, i) => {
            var asciiValueSumOfTitle = 0;
            path.title.split('').forEach(i=>{
                asciiValueSumOfTitle+=i.charCodeAt(0);
            }); 
            asciiValueSumOfTitle=(asciiValueSumOfTitle*i)%90; 
            return <Link 
                target={"/edit/" + email + "/" + projecttitle + "/" + path.title}
                to={"/edit/" + email + "/" + projecttitle + "/" + path.title}
                className="scopes"
                style={{
                    paddingBottom: "15px",
                    paddingTop: "15px",
                    paddingLeft: "25px",
                    paddingRight: "35px",
                    boxShadow: "rgba(0, 0, 0, 0.18) 0px 0px 7px",
                    backgroundColor: "white", 
                    color: "grey",
                    fontSize: '18px',
                    textDecoration: 'none',
                    marginBottom: '1px',
                    position: 'relative',
                }}
              > 

              <div 
              className='deleteblock'
               style={{zIndex: '99', position: 'absolute', right: '4px', top: '6px', padding: '0px 5px',  display: 'flex', alignItems: 'center', fontSize: '12px'}}>
                <i
                onClick={(e)=>{
                  e.preventDefault();
                  deleteDocumentationBlock(path.title);
                }}
                    style={{ color: "silver" }} 
                    className="fa fa-trash"
                    ></i> 
              </div>
                <div
                align="left"
                  style={{ 
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  textAlign: 'center',
                    borderRadius: "4px", 
                    backgroundColor: 'inherit',
                  }}
                >
                  
                  <div style={{
                    marginRight: '10px'
                }}>{path.type === 'collection' ? <i style={{color: primaryGreenColour(0.6), fontSize: '15px'}} className="fa fa-server"></i> : null}</div> 
                {path.title}
                </div>
              </Link>
        })
    }

{
              <Link
              style={{
                  cursor: 'pointer',
                  paddingTop: "16px",
                  paddingBottom: "11px",
                  paddingLeft: "25px",
                  paddingRight: "23px",
                  boxShadow: `${primarySilverColour} -8px 0px 20px`,
                  backgroundColor: "white", 
                  color: "grey",
                  fontSize: '18px',
                  textDecoration: 'none',
                  marginBottom: '1px',
                  position: 'relative',
                  backgroundColor: primaryBlueColour,
                  color: 'white',
                  marginLeft: '10px',
                  position: 'sticky',
                  right: '0px',
                  borderRadius: '5px',
                  zIndex: '999'
              }}
              onClick={()=>{
                setAddNewPath(true);
                setTimeout(()=>{
                  document.getElementById('doctitle').focus();
                }, 300)
              }}
            >  
           <i className='fas fa-plus'></i>

              
            </Link>
            }
   
</div> 
</div>

<br/>
<br/>
<br/>










<div style={{ 
        backgroundColor: primarySilverColour,
        position: 'fixed',
        bottom: addNewPath ? '0px': '-30vh', 
        transition: 'bottom 0.7s',
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
          padding: '5px 10px'
        }}
        onChange={(e) => {
          console.log(user.paths, email);
          setPathToAdd({ ...pathToAdd, title: e.target.value.trim().replaceAll('/', '|') });
        }}
        placeholder="Block title"
      />

      &nbsp; 
      &nbsp; 
    <input type="radio"
    value='single'
    checked={typeOfBlock === 'single'}
    onChange={(e)=>{
      setTypeOfBlock(e.target.value);
    }}
    id="single" name="typeofblock"/>


    <label for="single">Single Document</label>
    &nbsp; 
      &nbsp; 
  
    <input type="radio"
    value='collection'
    checked={typeOfBlock === 'collection'}
    onChange={(e)=>{
      setTypeOfBlock(e.target.value);
    }}
    id="collection" name="typeofblock"/>
    <label for="collection">Collection of Documents</label>
  

    &nbsp; 
      &nbsp; 
      
      <button
        style={{
          backgroundColor: primaryBlueColour,
          color: "white",
          fontSize: "13px",
        }}
        onClick={() => {
          if(user.paths.map(x=>x.title).map(x=>x.toLowerCase().trim()).indexOf(pathToAdd.title.toLowerCase().trim()) != -1){
            alert('Title must be unique');
          } else {
          if (pathToAdd.title && pathToAdd.title !== "") {
            var key = email + new Date().toString().replaceAll(" ", "");
            updateOrCreateDocument(usersCollection, email, {
              paths: [
                ...user.paths,
                {
                  ...pathToAdd,
                  project: projecttitle,
                  topics: typeOfBlock === 'single' ? [
                    {
                     id: key,
                     title: pathToAdd.title 
                    }
                  ] : [],
                  description: "",
                  type: typeOfBlock
                },
              ],
            })
              .then((res) => {
                setPathAdded(!pathAdded);
                 setAddNewPath(false);
                  document.getElementById("doctitle").value = "";
                  if(typeOfBlock === 'single'){
                    updateOrCreateDocument(topicsCollection, key, {
                      data: `<h2 style="text-align: left;"><span style="color: rgb(126, 140, 141);">${pathToAdd.title}</span></h2> <p><span style="color: rgb(126, 140, 141);">You can delete this text and start writing the documentation...</span> <p>&nbsp;</p> <p>&nbsp;</p>`,
                    }).then((res) => {
                      setPathAdded(!pathAdded);
                      setAddNewPath(false);
                      document.getElementById("doctitle").value = "";
                    });
                  }
              })
              .catch((e) => {
                alert(e);
              });
          } else {
            alert("Title can not be empty");
          }
        }}

      }
      >
        Add Block
      </button>
      <br/> 
       
        <br/>
      <br/>
      <br/>

      </div>

      { user?.paths?.filter(x=>x.project === projecttitle)?.length === 0 && <div align="right" style={{position: 'absolute', top: '37px', right: '50px',
    borderRight: '1px solid '+ 'grey', height: '120px', display: 'flex', alignItems: 'flex-end', padding: '0px',
    zIndex: '9'
    
    }}>
        <span style={{
            padding: '5px',
            fontSize: '25px'
        }}> 
            <Typewriter
          options={{
            strings: [
               " ⚠️  No documentation blocks found", 
               " Click on '+' to add"
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

   {/* kanabn */}
   <div style={{width: '100vw', marginLeft: '-8px', height: '60vh', background: `linear-gradient(${'white'}, white)`}}>
    <KanbanBoard email={email} user={user} projecttitle={projecttitle}/>
   </div>
        </div>
    );
}

export default Project;