import React, { useState } from 'react';
import { primaryGreenColour, primarySilverColour } from '../App';

function StickyNote(props) {
    const { description, priorityLevel, title } = props;
    // priorityLevel are -1,0,1

    const priorityColor = (pl) => {
        switch(pl){
            case '-1': //low
                return 'silver';
            case '0': //normal
                return 'gold';
            case '1': //high
                return '#ff9680'
        }
    }

    return (
        <div style={{
            // backgroundColor: 'lavender',
            padding: '15px',
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 7px",
            textAlign: 'left',
            color: 'grey',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            marginBottom: '22px'
        }}>
            <div style={{backgroundColor: priorityColor(priorityLevel), width: '10px', height: '22px', position: 'absolute', top: '0px', right: '15px'}}></div>
            <div style={{backgroundColor: 'white', width: '7.07px', height: '7.07px', position: 'absolute', top: '19px', right: '17px', transform: 'rotate(45deg)'}}></div>
            <div>
                <div style={{fontSize: '18px'}}>{title}</div>
                <br/>
                <div>{description}</div>
            </div>
        </div>
    );
}

export default StickyNote;