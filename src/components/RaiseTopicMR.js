import React, { useEffect, useState } from 'react';
import { primaryBlueColour, primarySilverColour, showPage } from '../App';
import { getAllDocuments, topicMRCollection, updateOrCreateDocument } from '../db';

function RaiseTopicMR(props) {

    const { discId, pathTitle, topic, email } = props;
    const [ resourceTitle, setResourceTitle ] = useState();
    const [ resourceURL, setResourceURL ] = useState();
    const [ mrArray, setMrArray ] = useState([]);
    const [ mrAdded, setMRAdded ] = useState(0);
    const [ loader, setLoader ] = useState(false);


    useEffect(()=>{
        showPage();
    })

    useEffect(()=>{
        setLoader(true);
        Promise.resolve(getAllDocuments(topicMRCollection)).then(res => {
            let arr = [];
            res.forEach(doc => {
                arr.push(doc.data());
            });
            console.log(arr);
            setMrArray(arr);
            setLoader(false);
        }).catch(err=>{
            alert(err);
            setLoader(false);
        })
    }, [topic, mrAdded]);

    return (
        <div align="left" style={{
            border: '1px solid silver',
            width: '300px', padding: '20px 20px', display: 'inline-block', backgroundColor: primarySilverColour,
        
        color: 'black'
        }}>
            
 
            {/* <>Contribute to</> 
            &nbsp;
            &nbsp;
            <h4 style={{padding:'3px', backgroundColor: 'white', color: 'black'}}>&nbsp;{topic?.title} &nbsp;</h4>
            <br/> */} 
            *Contribute resource for this topic, for in the act of giving, we receive as well!
            <br/>
            <br/> 
            <input
            onChange={(e)=>{
                setResourceTitle(e.target.value);
            }}
            value={resourceTitle}
            style={{width: '95%'}}
                type="text"
                placeholder='Resource Label (title)'

            />
            <br/>
            <br/>
            <input
            onChange={(e)=>{
                setResourceURL(e.target.value);
            }}
            value={resourceURL}
            style={{width: '95%'}}

                type="text"
                placeholder='Resource URL'
            />
            <br/>
            <br/>
            <h4 style={{cursor: 'pointer', backgroundColor: ''}}
            onClick={() => {
                if(resourceTitle && resourceURL && resourceTitle !== '' && resourceURL !== ''){
                updateOrCreateDocument(topicMRCollection, discId+topic.title+resourceURL.replaceAll("/", ""), {
                    discipline: discId,
                    curriculum: pathTitle,
                    topic: topic.title,
                    type: 'add',
                    resourceTitle: resourceTitle,
                    resourceURL: resourceURL,
                    upVotes: 1,
                    downVotes: 1,
                    email: email
                }).then(res => {
                    setMRAdded(mrAdded + 1);
                    setResourceTitle('');
                    setResourceURL('');
                }).catch(err => {
                    alert(err);
                })
            } else {
                alert('Invalid data');
            }
            }}
            >Submit</h4>
            <br/>
            <br/>
            { loader || mrArray.length == 0 ? <div style={{ minHeight: '50px', justifyContent: 'center', display: 'flex', alignItems:"center"}}>
                
            </div> : <div style={{minHeight: '50px', overflowY: 'scroll'}}>
                <br/>
                &nbsp;Community contributed resources for
                <br/> 
                 <h4 style={{padding:'3px 0px', backgroundColor: 'transparent', color: 'black'}}>&nbsp;{topic?.title} &nbsp;</h4>
            
            <br/>
            <br/> 
            {
                mrArray.map(mr => {
                    return ( mr.discipline == discId && mr.curriculum == pathTitle && mr.topic == topic?.title && 
                    <div draggable="true" style={{ padding: '5px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgb(225, 225, 225)', marginBottom: '5px'}}>
                        <a target={mr.resourceURL} style={{color: 'black', textDecoration: 'none'}} href={mr.resourceURL}>{mr.resourceTitle}</a>
                        <div
            style={{textAlign: 'left'}}>
                <span style={{cursor: 'pointer', fontSize: '12px', color: 'black'}}>
                    
                <i className="fa fa-thumbs-up"></i> 
                &nbsp;
                &nbsp;
                 <i className="fa fa-thumbs-down"></i> 
                 &nbsp;
                &nbsp; 
                <span style={{color: 'black', fontSize: '11px'}}>{((mr.upVotes/(mr.upVotes+mr.downVotes))*100).toFixed(1)}%</span>
                </span>
            </div> 
                    </div>)
                })
            } 

            </div>}
        </div>
    );
}

export default RaiseTopicMR;