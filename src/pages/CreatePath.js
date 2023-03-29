import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { primaryBlueColour, primaryRedColour, primarySilverColour, primaryYellowColour } from "../App";
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

  const onEditorChange = () => {
    setChangesSaved(false);
  }

  useEffect(() => { 
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
    updateOrCreateDocument(topicsCollection, cTopicId, {
        data: data
      })
        .then((res) => { 
            setTopicEdited(!topicEdited);
            setChangesSaved(true);
        })
        .catch((e) => {
          alert(e);
        });
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
      <p></p>`})
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

  const [topic, setTopic] = useState({
    preRequisites: null,
    author: email, //
    contactAuthor: email, //
    banner: null,
    title: null,
    description: null,
    duration: null,
    contributors: null,
    topics: [
      {
        title: "What is a Resource and a URL",
        topicId: null,
        urls: [],
        optionalUrls: [],
        guidelinesForUrls:
          "A resource on the internet is any type of digital content or information that can be accessed through the World Wide Web or other internet-based technologies. This can include websites, web pages, images, videos, audio files, documents, applications, and other forms of digital media.",
        knowledgeCheck: [],
      },
    ],
  });

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
  {/* <Link to={'/project/'+projecttitle} style={{textDecoration: 'none', color: primaryBlueColour}}>
  <i className='far fa-arrow-alt-circle-left' style={{fontSize: '19px', position: 'absolute', top: '12px'}} /> 
  &nbsp;
  &nbsp;
  &nbsp;
  &nbsp;
  
 </Link> */}
 &nbsp;
    </span>
       {projecttitle}
  &nbsp; 
  &nbsp; 
  {/* <i style={{color: 'grey', fontSize: '12px'}} className="fa">&#xf061;</i> */}
  |
  &nbsp; 

  {pathtitle}
  {/* &nbsp;
  &nbsp;
  <i style={{color: 'grey', fontSize: '12px'}} className="fa">&#xf061;</i>
  &nbsp;
  &nbsp;

  {cTopicTitle == null ? 'Editor' : cTopicTitle}
  */}
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
            justifyContent: "center",
            padding: '0px 0px',
            background:`linear-gradient(${primarySilverColour}, white)`
        }}
        >
        
    <div> 
        <div
            style={{ width: "20vw",
            background: `linear-gradient(${primarySilverColour},white)`,
            marginTop: "0px", height: '83vh', overflowY: 'scroll', overflowX:'hidden', paddingTop: '7px', paddingRight: '10px' }}
            align="center"
        >  
  <div style={{ display: "flex",height: '27px', justifyContent: 'space-between', width: '100%', marginBottom: '12px' }}>
            
            <input
                id="newTopic"
                placeholder="New topic title..."
                style={{ display: "inline", padding: '6px 12px', width: '100%',
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

                padding: '5px 15px'
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
        </div>
        </div>
        {/* <div style={{width: '80vw', background:`linear-gradient(${primarySilverColour}, white)`}}> */}
        <div style={{ width: "72vw", backgroundColor: 'white'}} align="center">
            {<TextEditor disabled={cTopicId !== null ? false : true} setDataToBeSaved={setDataToBeSaved}  onChange={onEditorChange} onSave={saveTopic} initialContent={currentTopicData} />}
        </div>
        {/* </div> */}

        </div> 
    </div>
  );
}

export default CreatePath;
