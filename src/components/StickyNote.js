import React, { useState } from 'react';
import { primaryGreenColour, primarySilverColour } from '../App';

function StickyNote(props) {
    const { description, priorityLevel, title, updateTask , setBeingDropped} = props;
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

    function allowDrop(e) {
        e.preventDefault();
      }

    const drag = (e) => {
       setBeingDropped(e.target.querySelector(`#id${title.trim().replaceAll(' ', '').replaceAll('.', '').replaceAll(',', '').replaceAll('/', '').replace(/[^a-zA-Z ]/g, "")}`).innerHTML)
    }

    return (
        <div style={{
            backgroundColor: 'white',
            padding: '10px 15px',
            cursor: 'grab',
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
            textAlign: 'left',
            color: 'grey',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            marginBottom: '22px',
            
        }}
        draggable="true" onDragStart={drag} onDragOver={allowDrop} onDragEnd={()=>{
            setBeingDropped(null);
        }}
        >
            <div style={{backgroundColor: priorityColor(priorityLevel), width: '10px', height: '22px', position: 'absolute', top: '0px', right: '15px',  
            cursor: 'grab',
             
        }}></div>
            <div style={{cursor: 'grab',  backgroundColor: 'white', width: '7.07px', height: '7.07px', position: 'absolute', top: '19px', right: '17px', transform: 'rotate(45deg)'}}></div>
            <div>
                <div  id={'id' + title.trim().replaceAll(' ', '').replaceAll('.', '').replaceAll(',', '').replaceAll('/', '').replace(/[^a-zA-Z ]/g, "")} style={{ cursor: 'grab',fontSize: '18px'}}>{title}</div>
                
                {description !== '' && <div style={{cursor: 'grab'}}><br/>{description}</div>}
            </div>
        </div>
    );
}

export default StickyNote;