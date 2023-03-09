import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { primarySilverColour } from '../App';
import SearchResult from './SearchResult';

function SearchBar(props) {
    const { data } = props;
    const [ searchResults, setSearchResults ] = useState([]);

    const search = (e) => {
        const query = e.target.value;
        if(!query || query == '') {
            setSearchResults([]);
        } else {
            const arr = [];

        data?.forEach(disc => {
            disc?.paths?.forEach(path => {
                path = JSON.parse(path);
                console.log((disc?.title+path?.title).toLowerCase().replaceAll(' ', '').includes(query.toLowerCase().replaceAll(' ', '')));
                if((disc?.title+path?.title).toLowerCase().replaceAll(' ', '').includes(query.toLowerCase().replaceAll(' ', ''))){
                    arr.push({
                                discTitle: disc.title,
                                discId: disc.id,
                                pathTitle: path.title,
                             }
                    )
                }
            })
        });
        arr.sort((a,b) => {
            if(b.pathTitle < a.pathTitle){
                return 1;
            } else if(b.pathTitle > a.pathTitle){
                return -1;
            } else {
                return 0;
            }
        });
        setSearchResults(arr);
        }
    }

    useEffect(()=>{
        document.getElementById('searchInput').focus();
    }, []);
    return (
        <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <i className="fas fa-search" style={{fontSize: '24px', color: 'silver'}} />
            &nbsp;
            <form autocomplete="off"
            style={{
            width: '300px'
            }}>
            
            <input
                id="searchInput"
                placeholder=' Search'
                onChange={search}
                type="search"
                style={{
                    width: '100%',
                    outline: 'none',
                    fontSize: '18px',
                    border: '0px',
                    borderBottom: '1px solid silver',
                    color: 'rgb(140, 140, 140)',
                    fontWeight: '300'
                }}
            /> 
            </form>
        </div>
        <br/>
            <br/> 
            <div style={{ width: '300px'}}  align="left">
            {
                searchResults.map(res => {
                    return <SearchResult res={res} />
                })
            }
            </div>
        </>
    );
}

export default SearchBar;