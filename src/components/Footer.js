import React from "react";
import { primarySilverColour } from "../App";
import { Logo } from "../assets";
import AviatohLogo from "./AviatohLogo";

function Footer(props) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        color: "rgb(150,150,150)",
        justifyContent: "flex-end",
        alignItems: "center", 
        marginTop: '50px',
        backgroundColor: 'black',
        position: 'fixed',
        bottom: '0px',
        zIndex:'9999999',
        padding: '2px 0px'
      }}
    >
     {/* { props.from != 'mobile' && <div style={{ paddingLeft: "20px", width: "35%", display: 'flex', justifyContent: 'center' }}>
         <img
                src={Logo}
                style={{
                  width: "180px",
                  marginTop: "20px",
                  marginLeft: "16px",
                }}
              />  
      </div>} */}
 
        

        <div style={{fontSize: '16px', marginLeft: '4px', display: 'flex', alignItems: 'center'}}>
        <span>contact@aviatoh.com</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <i style={{color: 'grey'}} className="fab fa-instagram">&nbsp;&nbsp;&nbsp;</i>
            <i style={{color: 'grey'}} className="fab fa-twitter">&nbsp;&nbsp;&nbsp;</i>
            <i style={{color: 'grey'}} className="fab fa-facebook"></i> &nbsp;&nbsp;&nbsp;
            
          </div>
 
      
    </div>
  );
}

export default Footer;
