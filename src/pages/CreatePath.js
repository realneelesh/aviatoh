import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { primaryBlueColour, primarySilverColour } from "../App";
import { OpenaiIcon } from "../assets";
import AIGeneral from "../components/AIGeneral";
import TextEditor from "../components/TextEditor";
import {
  getDocument,
  topicsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";

function CreatePath(props) {
  const [user, setUser] = useState(null);

  const { email, projecttitle, pathtitle } = useParams();

  const [cTopicId, setCTopicId] = useState(null);
  // const [cTopicTitle, setCTopicTitle] = useState(null);
  const [currentTopicData, setCurrentTopicData] = useState(null);
  const [topicEdited, setTopicEdited] = useState(false);

  const [ dataToBeSaved, setDataToBeSaved ] = useState(null);

  const [ changesSaved, setChangesSaved ] = useState(true);

  const [ showAiGeneral, setShowAiGeneral ] = useState(false);

  const [ isCollectionType, setIsCollectionType ] = useState(false);

  const onEditorChange = () => {
    setChangesSaved(false);
  }

  useEffect(() => { 
    setTimeout(()=>{
      setShowAiGeneral(true);
    }, 3000);
    setIsCollectionType(user?.paths
            .find((x) => x.title === pathtitle && x.project === projecttitle).type === 'collection')
    document.getElementById('linktoprofile').style.display = 'none';
    document.title = !changesSaved ? 'Unsaved changes' : pathtitle + ' | ' + projecttitle;

    if(cTopicId === null){
        setCTopicId(user?.paths.find((x) => x.title === pathtitle && x.project === projecttitle).topics?.length > 0 ?
        user?.paths.find((x) => x.title === pathtitle && x.project === projecttitle).topics[0]?.id:
        null );
        if(user?.paths.find((x) => x.title === pathtitle && x.project === projecttitle).topics[0]?.id){
          getDocument(topicsCollection, user?.paths.find((x) => x.title === pathtitle && x.project === projecttitle).topics[0].id).then((res) => {
            setCurrentTopicData(res.data().data);
          }).catch(()=>{
           // alert('something went wrong');
          });
        }
       
    }
    if (cTopicId) {

      getDocument(topicsCollection, cTopicId).then((res) => {
        setCurrentTopicData(res.data().data);
      }).catch(()=>{
        // alert('something went wrong');
      });
    }
  }, [cTopicId, user, changesSaved]);

  useEffect(() => {
    if (email) {
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
  }, [email, topicEdited]);

  const saveTopic = (data) => {
    if(data != null){
      updateOrCreateDocument(topicsCollection, cTopicId, {
        data: data,
        
      })
        .then((res) => { 
            setTopicEdited(!topicEdited);
            setChangesSaved(true);
        })
        .catch((e) => {
          alert(e);
        });
    }
  }

  const addTopic = (topic) => {
    let cPaths = user?.paths;
    if (
      cPaths
        ?.find((x) => x.title === pathtitle && x.project === projecttitle)
        .topics.find((x) => x.title === topic) || topic === ""
    ) {
      alert("Title must be unique and non-empty");
    } else {
      var key = email + new Date().toString().replaceAll(" ", "");
      updateOrCreateDocument(topicsCollection, key, {data: `<div style="background-color: ${'white'};">
      <h1 style="margin: 0px;color:grey;">${topic}</h1>
      <div style="color:grey;">A short description of the topic</div>
      </div>
      <p></p>`,
      })
        .then((res) => {
          cPaths
            ?.find((x) => x.title === pathtitle && x.project === projecttitle)
            .topics.push({
              title: topic,
              id: key,
            });
          updateOrCreateDocument(usersCollection, email, {
            paths: user?.paths,
          })
            .then((res) => {
              setTopicEdited(!topicEdited);
              setCTopicId(key);
              // setCTopicTitle(topic);
              document.getElementById('newTopic').value = '';
            })
            .catch((e) => {
              alert(e);
            });
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const deleteTopic = (topic) => {
    let cPaths = user?.paths;

    var index = cPaths
      ?.find((x) => x.title === pathtitle && x.project === projecttitle)
      .topics.map((x) => x.title)
      .indexOf(topic);

    cPaths?.find((x) => x.title === pathtitle && x.project === projecttitle).topics.splice(index, 1);
    updateOrCreateDocument(usersCollection, email, {
      paths: user?.paths,
    })
      .then((res) => {
        setTopicEdited(!topicEdited);
        setCTopicId(null);
        // setCTopicTitle(null);
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (<div id="writebook" style={{marginLeft: '-10px', position: 'absolute', width: '100vw', top: '0px', backgroundColor: 'white'}} onClick={()=>{
    document.getElementById('writebook').scrollIntoView();
  }}> 
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '-2px', 
    background: changesSaved ? `linear-gradient( to right, ${'rgb(225, 225, 225)'},${primarySilverColour},${primarySilverColour})`:`linear-gradient( to right,${primarySilverColour},${primarySilverColour},${primaryBlueColour})`, 
    padding: '8px 9px'}}>
  
  <span> 
 
  &nbsp;
  <span style={{display: 'inline'}}>
  
 &nbsp;
    </span>
       {projecttitle}
  &nbsp; 
  &nbsp;  
  |
  &nbsp; 

  {pathtitle} 
  </span>
    
  <span>
  { <button
                style={{ 
                textAlign: "left",
                fontSize: "14px",
                margin: "0px",
                background: !changesSaved ? 'white' : 'transparent',
                color: !changesSaved ? primaryBlueColour : 'transparent',
                fontWeight: 400,
                display: "inline",
                padding: '5px 15px'
                }}
                onClick={() => {
                  saveTopic(dataToBeSaved);
                }}
                disabled={changesSaved}

            >
                Save
            </button> }
            &nbsp; 

{/* Preview, -> opens a new tab  */}
{/* 
            {changesSaved && <Link target={'_preview'} to={"/project/view/"+email+"/"+projecttitle}>
              <span onClick={()=>{
                }} style={{ zIndex: '9999', position: 'absolute', right: '13px', top:'10px', fontSize: '17px', cursor: 'pointer', color: 'grey'}}>
                  Preview
             </span> 
              </Link>} */}
            
  </span>
  </div>
        <div
        style={{
            display: "flex",
            justifyContent: isCollectionType ? "space-around" : "center",
            padding: '0px 0px',
            background:`linear-gradient(${primarySilverColour}, white)`
        }}
        >
        
    <div align="center"> 
       { isCollectionType  &&
             <div
            style={{ 
            width: "20vw",
            paddingLeft: '1vw',
            background: `linear-gradient(${primarySilverColour},white)`,
            marginTop: "0px", height: '83vh', overflowY: 'scroll', overflowX:'hidden', paddingTop: '7px', paddingRight: '10px' }}
            align="left"
        >  
  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '7px', alignItems :'center', marginRight: '-2px'}}>
            <input
                id="newTopic"
                placeholder="New document title..."
                style={{ display: "inline", padding: '7px 12px', width: '60%',
                border: '0', borderBottom: '1px solid transparent', marginLeft: '2px'
              }}
            /> 
            <button
                style={{
                fontSize: "14px",
                margin: "0px",
                backgroundColor: primaryBlueColour,
                color: "white",
                display: "inline",
                color: 'white',
                width: '35%',
                padding: '7px 15px'
                }}
                onClick={() => {
                addTopic(document.getElementById("newTopic").value);
                }}
            >
                Add
            </button>
            
            </div> 
             
            {user?.paths
            .find((x) => x.title === pathtitle && x.project === projecttitle)
            .topics?.map((topic, i) => {
                return (
                <button
                    onClick={() => {
                      if(!changesSaved){
                        var switchOrNot = window.confirm('Unsaved changes detected, press Cancel to go back, press OK to continue');
                        if(switchOrNot){
                          setCTopicId(topic.id);
                          // setCTopicTitle(topic.title);
                      setChangesSaved(true);

                        }
                      } else {
                        setCTopicId(topic.id);
                        // setCTopicTitle(topic.title);
                      setChangesSaved(true);

                      }
                    }}
                    style={{
                    backgroundColor: cTopicId === topic.id ? primaryBlueColour : 'white',
                    color: cTopicId === topic.id ? 'white' : 'black',
                    width: "100%",
                    margin: "2px",
                    fontSize: "13px",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    <span>
                    {topic.title}{" "}
                    </span>
                    <i
                    style={{ color: "silver" }}
                    onClick={() => {
                        deleteTopic(topic.title);
                    }}
                    className="fa fa-trash"
                    ></i>
                </button>
                );
            })}
        </div>}
        </div>
        {/* <div style={{width: '80vw', background:`linear-gradient(${primarySilverColour}, white)`}}> */}
        <div style={{ width: "75vw", marginRight: isCollectionType ? '1vw' : '0px', backgroundColor: 'white'}} align="center">
            {<TextEditor isCollection={isCollectionType} disabled={cTopicId !== null ? false : true} setDataToBeSaved={setDataToBeSaved}  onChange={onEditorChange} onSave={saveTopic} initialContent={currentTopicData} />}
        </div>
        {/* </div> */}

        </div> 
        <div style={{position: 'fixed', width: '100vw', margin: '0px', left: '0px', bottom: showAiGeneral ? '0px' : '-90vh', transition: 'bottom 0.8s', backgroundColor: primarySilverColour, zIndex: '9999'}}>
          <AIGeneral />
          <div><i className='far fa-times-circle' style={{ color:'grey', position:'absolute', top: '15px', right: '15px', fontSize: '23px', cursor: 'pointer'}}
          onClick={()=>{
            setShowAiGeneral(false);
          }}
          ></i></div>
        </div>


        <span style={{position: 'fixed', height: '40px', left: !showAiGeneral ? '10px' : '-20vw', bottom: '10px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', transition: 'left 1s',}}>
         <span style={{ 
          fontSize: '20px',
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 10px", paddingTop:'5px', paddingLeft:'10px', paddingRight:'10px', cursor: 'pointer'}} onClick={()=>{
          setShowAiGeneral(true);
          document.getElementById('askanything').focus();
         }}>
           <img src={OpenaiIcon} style={{width: '35px', cursor: 'pointer'}} />
          
         </span>
         &nbsp; 
         &nbsp; 
         <span style={{fontSize: '17px', color: 'grey'}}>AI Assist</span>
        
        </span> 
    </div>
  );
}

export default CreatePath;
