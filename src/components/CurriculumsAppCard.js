import React from 'react';
import { primaryBlueColour } from '../App';

function AppCard(props) {
    const { appName, description, color } = props;
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
            width:'20vw',
            height: '100%',
            boxShadow: 'rgba(0, 0, 0, 0.27) 0px 0px 7px',
            color: 'black'
        }}
        >
            <h1 style={{ 
                backgroundColor: 'transparent',
                color: primaryBlueColour,
                paddingLeft: '0px'
            }}>{appName}</h1>
            <br/> 
            <br/> 
            <div
            style={{ 
                backgroundColor: 'rgb(255, 255, 255, 0.5)',
                }}
            >{description}</div>
        </div> 
    );
}

export default AppCard;