import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { primaryBlueColour, primaryRedColour, primarySilverColour, showPage } from '../App';
import { getAllDocuments, getDocument, usersCollection } from '../db';
import PathCard from './PathCard';

function PathsEnrolled(props) {

    const { email } = props;
    const [ enrolledPathsArray, setEnrolledPathsArray ] = useState([]);

    useEffect(()=>{
        showPage();
    });

    useEffect(()=>{
        getDocument(usersCollection, email).then(res => {
            if(res.data().pathsEnrolled) setEnrolledPathsArray(res.data().pathsEnrolled);
        })
    }, []);

    return ( enrolledPathsArray.length != 0?
        <div align="left" style={{width: '60vw'}}>
        <h3 style={{display: 'block', backgroundColor: primarySilverColour, color: 'black'}}> Your curriculums</h3>
         
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}> 
        
            {
                enrolledPathsArray?.map(path => {
                    return <>
                    <Link to={'/path/'+path.split('/')[0]+'/'+path.split('/')[1]} style={{
                          backgroundColor: '', cursor: 'pointer', textDecoration: 'none'}}>
                        <h3 style={{marginRight: '23px', marginBottom: '0', color: 'black', backgroundColor: 'transparent', display: 'inline-block'}}>
                        {
                            path.split('/')[1]
                        }
                        </h3>
                    </Link>
                    
                    </>
                })
            }
        </div>
        </div> : null
    );
}

export default PathsEnrolled;