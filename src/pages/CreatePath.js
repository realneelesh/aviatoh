import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { primaryBlueColour, primaryRedColour, primarySilverColour, primaryYellowColour } from "../App";
import TextEditor from "../components/TextEditor";
import {
  getDocument,
  storage,
  topicsCollection,
  updateOrCreateDocument,
  usersCollection,
} from "../db";

function CreatePath(props) {
  const [user, setUser] = useState(null);

  const { email, projecttitle, pathtitle } = useParams();

  const [cTopicId, setCTopicId] = useState(null);
  const [cTopicTitle, setCTopicTitle] = useState(null);
  const [currentTopicData, setCurrentTopicData] = useState(null);
  const [topicEdited, setTopicEdited] = useState(false);

  const [ dataToBeSaved, setDataToBeSaved ] = useState(null);

  const [ changesSaved, setChangesSaved ] = useState(true);

  const onEditorChange = () => {
    setChangesSaved(false);
  }

  useEffect(() => { 

    if(cTopicId === null){
        setCurrentTopicData(user?.paths.find((x) => x.title === pathtitle && x.project === projecttitle)
        .description)
    }
    if (cTopicId) {

      getDocument(topicsCollection, cTopicId).then((res) => {
        setCurrentTopicData(res.data().data);
      }).catch(()=>{
        alert('something went wrong');
      });
    }
  }, [cTopicId, user]);

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
      updateOrCreateDocument(topicsCollection, key, {data: `<p align='center'>feature #</p><h1 align='center' style='color:grey;'>${topic}</h1>`})
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
              setCTopicTitle(topic);
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
        setCTopicTitle(null);
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
    background: `linear-gradient( to right, ${primarySilverColour},${primarySilverColour}, ${!changesSaved ? primaryBlueColour : 'rgb(225, 225, 225)'})`, 
    padding: '8px 9px'}}>
  
  <span> 
  &nbsp;

    Projects
  &nbsp;
  &nbsp;
  <i style={{color: 'grey', fontSize: '12px'}} className="fa">&#xf061;</i>
  &nbsp;
  &nbsp;
  <span>{projecttitle}</span>
  &nbsp;
  &nbsp;
  <i style={{color: 'grey', fontSize: '12px'}} className="fa">&#xf061;</i>
  &nbsp;
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
                marginRight: '3px',
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
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp; 

            <i onClick={()=>{
             }} className="fa fa-share-alt" style={{ zIndex: '9999', position: 'absolute', right: '13px', top:'10px', fontSize: '23px', cursor: 'pointer', color: 'grey'}}></i>
              &nbsp;
            
  </span>
  </div>
        <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            padding: '0px 0px'
        }}
        >
        <div style={{ width: "80vw", marginLeft: "10px" }}>
            {<TextEditor disabled={cTopicId !== null ? false : true} setDataToBeSaved={setDataToBeSaved}  onChange={onEditorChange} onSave={saveTopic} initialContent={currentTopicData} />}
        </div>
    <div> 
        <div
            style={{ width: "20vw",
            background: `linear-gradient(${primarySilverColour},white)`,
            marginTop: "0px", height: '83vh', overflowY: 'scroll', overflowX:'hidden', padding: '7px 10px' }}
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
                          setCTopicTitle(topic.title);
                      setChangesSaved(true);

                        }
                      } else {
                        setCTopicId(topic.id);
                        setCTopicTitle(topic.title);
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

        </div> 
    </div>
  );
}

export default CreatePath;
