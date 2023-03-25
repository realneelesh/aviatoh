import React from 'react';
import { primaryBlueColour } from '../App';

function AppCard(props) {
    const { appName, description, color, img } = props;
    return ( 
        <div
        align="left"
        style={{
            // background: `url("https://cdn.pixabay.com/photo/2018/07/13/04/51/marble-3534940_1280.jpg")`,
            cursor: 'pointer',
            borderRadius: '12px',
            padding: '35px 30px',
            margin: '15px 40px',
            backgroundColor: 'white',
            width:'50vw',
            boxShadow: 'rgba(0, 0, 0, 0.27) 0px 0px 7px',
            color: 'black'
        }}
        >
             
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        
            <div
            style={{ 
                backgroundColor: 'rgb(255, 255, 255, 0.5)',
                width: '70%'
                }}
            >
            <h1 style={{ 
                backgroundColor: 'transparent',
                color: primaryBlueColour,
                paddingLeft: '0px',
                marginLeft: '-20px',
                fontSize: '30px'
            }}>{appName}</h1>
            <br/>
            <br/>
            <span style={{fontSize: '14px'}}>
                {description}
                </span>
                </div>
            <div style={{fontSize: '80px'}}>{img}</div>
            </div>
        </div> 
    );
}

export default AppCard;