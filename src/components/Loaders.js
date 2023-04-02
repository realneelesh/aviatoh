import React from 'react';
import { Loader as Load } from '../assets';

export const SearchLoader = (props) => {
    return (
        <div align="center" style={{top: '0px', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: '100vw', marginLeft: '-8px', left: '0px', position: 'fixed'}}>
         <img style={{width: '40%'}} src={Load} />
        </div>
    );
}

 