import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { showPage } from '../App';
import { Logo } from '../assets';

function NavigationBar(props) {
    useEffect(()=>{
        showPage();
    });

    // const title = window.location.href.split('/')[window.location.href.split('/').length - 1].replaceAll('%20', ' ');

    return (
        <div align="left" style={{color: 'white', width: '95vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link style={{color: 'white', textDecoration: 'none'}} to='/'>        
            <h1 style={{backgroundColor: 'transparent', color: 'grey', fontWeight: '800', paddingLeft: '4px', display: 'flex', alignItems: 'center'}}>
          <img src={Logo} style={{width: '150px'}} />
        </h1>
            {/* <h1 style={{marginLeft: '10px', backgroundColor: 'white', color: 'grey', fontWeight: '500'}}>{title}</h1> */}
</Link>
            <div style={{transform: 'translate(37px, 2px)'}}>
           
            <Link style={{textDecoration: 'none', fontSize: '20px'}} to='/profile'>
            <i className="fa fa-user-circle" style={{fontSize: '33px', color: 'grey'}} />
                
                </Link>
            {/* <Link style={{color: 'white', textDecoration: 'none', fontSize: '', opacity: 0}} to='/profile'>Profile</Link> */}

            <></>
            </div>
        </div>
    );
}

export default NavigationBar;