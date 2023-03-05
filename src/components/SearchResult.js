import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { primarySilverColour, showPage } from '../App';

function SearchResult(props) {
    const { res } = props;
    useEffect(()=>{
        showPage();
    });
    return (
        <>
        <Link 
        className='searchResult'
        to={'/path/'+res.discId+'/'+res.pathTitle}
        style={{
            display: 'inline-block',
            textDecoration: 'none',
            fontSize: '18px',
            width: '100%',
            padding: '5px 5px',
            color: 'black',
        }}>
             {res.pathTitle}
        </Link>
        <br/>
        </>
    );
}

export default SearchResult;