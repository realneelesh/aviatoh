import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { showPage } from '../App';
import { Logo, LogoInside } from '../assets';

function NavigationBar(props) {
    useEffect(()=>{
        showPage();
    });

    // const title = window.location.href.split('/')[window.location.href.split('/').length - 1].replaceAll('%20', ' ');

    return (
        <div align="left" style={{color: 'white', width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginLeft: '-8px'}}>
            <Link style={{color: 'white', textDecoration: 'none'}} to='/'>        
            <h1 style={{ marginTop: '3px', marginBottom: '3px',backgroundColor: 'transparent', color: 'grey', fontWeight: '800', paddingLeft: '4px', display: 'flex', alignItems: 'center'}}>
          <img src={LogoInside} style={{width: '80px', marginLeft: '3px'}} />
        </h1>
            {/* <h1 style={{marginLeft: '10px', backgroundColor: 'white', color: 'grey', fontWeight: '500'}}>{title}</h1> */}
</Link>
            <div style={{}}>
           
            <Link style={{textDecoration: 'none', color: 'black', display:'block'}} to='/profile' align="center">
            <i className="fa fa-user-circle" style={{fontSize: '33px', color: 'black', marginTop: '-5px'}} /> 
            &nbsp;
            &nbsp; 
             
                </Link>
            {/* <Link style={{color: 'white', textDecoration: 'none', fontSize: '', opacity: 0}} to='/profile'>Profile</Link> */}

            <></>
            </div>
        </div>
    );
}

export default NavigationBar;