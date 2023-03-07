import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { showPage, primarySilverColour } from "../App";
import { auth, updateOrCreateDocument, usersCollection } from "../db";
// import the react-json-view component
import ReactJson from 'react-json-view'



function CreatePath(props) {

    const [ path, setPath ] = useState({});
    const [ addTopic, setAddTopic ] = useState(false);

    const [ preRequisites, setPreRequisites ] = useState([]);
      const [ topics, setTopics ] = useState([]);
      const [ currentTopic, setCurrentTopic ] = useState({
        title: null,
        urls: [],
        optionalUrls: [],
        guidelinesForUrls: null,
        knowledgeCheck: []
      });

    useEffect(()=>{
        showPage();
    });

    useEffect(()=>{
        showPage();
        if(topics.length != 0 ){
        setPath({
            preRequisites: document.getElementsByName('prerequisite')[0].value,
            approver: document.getElementsByName('approver')[0].value,
            title: document.getElementsByName('pathtitle')[0].value,
            description: document.getElementsByName('pathdescription')[0].value,
            duration: document.getElementsByName('pathduration')[0].value,
            contributors: document.getElementsByName('contributors')[0].value,
            topics: topics
        })
    }

    }, [topics, currentTopic]);
      const { email } = props;
    
      const { register, handleSubmit, errors } = useForm();


      
    //   prerequisitesUrls: string[];
    //   approver: string;
    //   title: string;
    //   description: string;
    //   duration: string;
    //   contributors: string[];
    //   topics: Topic[];
    
      const navigate = useNavigate();
    
      const onSubmit = (data) => {
        
      };
    
      return ( 
        <div
          align="left"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
            
           
          <form align="left" style={{
            borderRight: '0px solid silver',

          }} onSubmit={handleSubmit(onSubmit)}>
             <br/>
             <br/>
          <span style={{paddingLeft: '10px'}}><h5 style={{fontWeight: '400'}}>Path Info.</h5></span>
          <br/>
          <br/>
          <div style={{padding: '0px 10px'}}>
            <textarea
              type="text"
              placeholder="pre-requisites text"
              name="prerequisite"
              {...register("prerequisite", { required: false })}
            /> 
            <br />
            <br />
            <input
              type="text"
              placeholder="Approver"
              name="approver" 
              {...register("approver", { required: false })}
            />
            <br />
            <br />
            <input
              name="title"
              type="text"
              placeholder="Path title"
              {...register("pathtitle", { required: false})}
            />
            <br />
            <br />
            <input
              name="description"
              type="text"
              placeholder="Path description"
              {...register("pathdescription", { required: false})}
            />
            <br />
            <br />
            <input
              name="duration"
              type="text"
              placeholder="Path duration"
              {...register("pathduration", { required: false})}
            />
            <br />
            <br />
            <input
              name="contributors"
              type="text"
              placeholder="Contributors(comma seperated list)"
              {...register("contributors", { required: false})}
            />
            </div>
            <br/>
            <br/>

            <h5 style={{fontWeight: '400', cursor: 'pointer', marginLeft: '10px'}}
            onClick={() => {
                setAddTopic(!addTopic);
            }}
            >{addTopic ? 'Topic data' : '+ Add path topics'}</h5> 
{ addTopic &&  <div style={{padding: '10px'}}> 
                    <input
                    name="topictitle"
                    type="text"
                    placeholder="Topic title"
                    {...register("topictitle", { required: false})}
                    onChange={(e)=>{ 
                        setCurrentTopic({...currentTopic, title: e.target.value});
                    }}
                    />
                    <br/> 
                    <br/> 
                    <textarea
                    name="guidelinesforurls"
                    type="text"
                    placeholder="Guidelines for utilizing resources ..."
                    onChange={(e) => {
                        setCurrentTopic({...currentTopic, guidelinesForUrls: e.target.value})
                    }}
                    /> 
                    <br /> 
                    <br /> 
                    Resources: 
                    <br/>
                    <br/>
                    <input
                    name="resourcetitle"
                    type="text"
                    placeholder="Resource title"
                    {...register("resourcetitle", { required: false})}
                    />
                    <br/> 
                    <input
                    name="resourceurl"
                    type="text"
                    placeholder="Resource url"
                    {...register("resourceurl", { required: false})}
                    />  
                    <button
                    onClick={()=>{
                        let url = {
                            title: document.getElementsByName('resourcetitle')[0].value,
                            url: document.getElementsByName('resourceurl')[0].value,
                        }
                        document.getElementsByName('resourcetitle')[0].value = null;
                        document.getElementsByName('resourceurl')[0].value = null;

                        setCurrentTopic({...currentTopic, urls: [...currentTopic.urls, url]})
                    }}
                    >Add Resource</button>
                    <br/>
                    <br/>
                    Optional resources: 
                    <br/>
                    <br/>
                    <input
                    name="oresourcetitle"
                    type="text"
                    placeholder="O. Resource title"
                    />
                    <br/> 
                    <input
                    name="oresourceurl"
                    type="text"
                    placeholder="O. Resource url"
                    />  
                    <button
                    onClick={()=>{
                        let ourl = {
                            title: document.getElementsByName('oresourcetitle')[0].value,
                            url: document.getElementsByName('oresourceurl')[0].value,
                        }

                        document.getElementsByName('oresourcetitle')[0].value = null;
                        document.getElementsByName('oresourceurl')[0].value = null

                        setCurrentTopic({...currentTopic, optionalUrls: [...currentTopic.optionalUrls, ourl]})
                    }}
                    >Add optional Resource</button>
                    <br/>
                    <br/>
                    <input
                    name="quizorproject"
                    type="text"
                    placeholder="Quiz/Project Link"
                    onChange={(e)=>{ 
                        setCurrentTopic({...currentTopic, exercise: e.target.value});
                    }}
                    />
                    <br/> 
                    <br/> 
                    Exercise / Knowledge Check: 
                    <br/>
                    <br/>
                    <input
                    name="question"
                    type="text"
                    placeholder="Question"
                    />
                    <br/>
                    <br/>
                    <input
                    name="answer"
                    type="text"
                    placeholder="Answer"
                    />  
                    <button
                    onClick={()=>{
                        let kc = {
                            question: document.getElementsByName('question')[0].value,
                            answer: document.getElementsByName('answer')[0].value,
                        }

                            document.getElementsByName('question')[0].value = null;
                            document.getElementsByName('answer')[0].value = null;
                            document.getElementsByName('quizorproject')[0].value = null;

                            setTopics(topics);

                        setCurrentTopic({...currentTopic, knowledgeCheck: [...currentTopic.knowledgeCheck, kc]})
                    }}
                    >Add question</button>
                    <br/>
                    <br/>
                    <button
                    style={{
                        backgroundColor: "silver",
                        margin: '0'
                    }}
                    onClick={()=>{
                        setTopics([...topics, currentTopic]);
                        setCurrentTopic({
                            title: null,
                            urls: [],
                            optionalUrls: [],
                            guidelinesForUrls: null,
                            knowledgeCheck: []
                          });
                        document.getElementsByName('topictitle')[0].value = null;
                        document.getElementsByName('guidelinesforurls')[0].value = null;

                       
                        setAddTopic(false);
                    }}
                    >Add Topic</button>
            </div>}
           {
            // use the component in your app!
            <span
            onClick={()=>{
                setTimeout(()=>{
                    showPage();
                }, 0)
            }}
            style={{ paddingRight: '100px', position: 'absolute', top: '103px', right: '10px', width: '40vw'}}>
                
                <br/>  
                <h5 style={{fontWeight: '400'}}>Preview</h5> &nbsp;&nbsp; <button style={{fontWeight: '400'}} onClick={()=>{
                    const confirmation = window.confirm('Reset form data?');
                    if(confirmation) 
                    { 
                         setPath({});
                         window.location.reload();
                    }
                }}>Discard</button>
                    <br/> 
                    <br/>
                    <br/>
                <span style={{ position: 'absolute', height: '70vh', overflowY: 'scroll'}}>
                    
                    <ReactJson collapsed src={path} />
                </span>
                </span>
           } 
          </form>
        </div> 
      );
}

export default CreatePath;