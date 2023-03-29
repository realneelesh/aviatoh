import React from 'react';
import { primaryBlueColour, primarySilverColour } from '../App';

function Testimonial(props) {
    const {img, text, designation, name} = props;
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            // backgroundColor: 'rgb(255, 255, 255, 0.1)',
            padding: '30px',
            // boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 7px",
            alignItems: 'center',
            borderRadius: '13px',
            color: 'rgb(150, 150, 150)',
            maxWidth:'45vw'
        }}>
            <div style={{width: '50%'}} align="right">
                <div align="left"  style={{color: primaryBlueColour}}>We deliver what we promise, thanks {name}!<hr style={{ border: '0px', borderBottom: '1px solid '+ 'silver', backgroundColor: 'transparent'}}/></div>
                {text}
                <br/>
                <br/>
                
                - {name}
                <br/>
                {designation}
            </div> 
            &nbsp;
            &nbsp;
            &nbsp;
                <img style={{width: '105px', height: '105px', borderRadius: '50%', backgroundColor: primarySilverColour}} src={img} />
 
        </div>
    );
}

export default Testimonial;