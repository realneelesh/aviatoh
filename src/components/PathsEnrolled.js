import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { primaryBlueColour, primarySilverColour, showPage } from '../App';
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
            setEnrolledPathsArray(res.data().pathsEnrolled);
        })
    }, []);

    return ( enrolledPathsArray.length != 0?
        <div align="left">
        Your curriculums:
        <br/>
        <br/>
        <div style={{display: 'flex', flexWrap: 'wrap'}}> 
        
            {
                enrolledPathsArray?.map(path => {
                    return <Link to={'/path/'+path.split('/')[0]+'/'+path.split('/')[1]} style={{
                         marginRight: '3px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px', backgroundColor: '', cursor: 'pointer', textDecoration: 'none'}}>
                        <h3>
                        {
                            path.split('/')[1]
                        }
                        </h3>
                    </Link>
                })
            }
        </div>
        </div> : null
    );
}

export default PathsEnrolled;