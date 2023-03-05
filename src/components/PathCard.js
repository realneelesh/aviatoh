import React from 'react';
import { Link } from 'react-router-dom';
import { primaryBlueColour, primarySilverColour } from '../App';

function PathCard(props) {
    const { data } = props;
    return (
        <Link style={{marginRight: '20px', textDecoration: 'none'}} to={'/path/'+data.id+'/'+data.title}>

       <div 
        className='pathCard'
       align="left"
       style={{
        alignItems: 'center',
        position: 'relative',
        width: '360px',
        marginBottom: '20px',
        margintop: '30px',
        backgroundColor: 'white',
        padding: '30px'
       }}>
       <h2 style={{
                textAlign: 'left',
                color: 'black', 
                backgroundColor: 'white',
                width: '35%',
                fontSize: '23px',
                paddingLeft: '0px'
            }}>{data.title} 
            
            </h2>
            <div style={{color: 'grey'}}>
            {
                data?.description? data.description : <i>description not avaialble</i>
            }
            </div>
            <br/>
            <br/>
        <div
        align="left"
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
        }}>
           
            <div
            style={{marginBottom: '10px', textAlign: 'left', display: 'flex', alignItems: 'center', fontSize: '15px', color: 'black'}} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false" aria-hidden="true"><path d="M16.24 7.76A5.974 5.974 0 0012 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0a5.99 5.99 0 00-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="grey"></path></svg>
                &nbsp; 
                {data.duration} 
            </div>
            {/* <div
            style={{width: '10%', textAlign: 'left'}} 
             to={'/path/'+data.id+'/'+data.title}>
                <span style={{cursor: 'pointer', fontSize: '14px', color: 'black', backgroundColor: 'white'}}>
                    
                <i className="fa fa-thumbs-up"></i> 
                &nbsp;
                &nbsp;
                    {(Math.random()*100).toFixed(0)}%
                </span>
            </div>  */}
            <div
            style={{ marginBottom: '10px', fontSize: '15px', textAlign: 'left', color: 'black', display: 'flex', alignItems: 'center'}} 
             to={'/path/'+data.id+'/'+data.title}>
                {data.approver? <><img alt="Approval Verified Authorization Icon" style={{width: '22px'}} loading="lazy" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/approval-2627753-2178570.png?f=webp&w=256" class="thumb_p6OvR"></img>
                &nbsp;
                Approved</> : <><span style={{fontSize: '20px'}}>⏳ &nbsp;</span> In review</>}
              

            </div> 
            <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '15px', color: 'black'}} >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" fill="#85BB65"></path></svg>
                &nbsp; 
                Free

            </div>
             
             
        </div>
        </div>
        </Link>
    );
}
export default PathCard;