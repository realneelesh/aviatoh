import React from "react";
import { primarySilverColour } from "../App";
import { Logo } from "../assets";
import AviatohLogo from "./AviatohLogo";

function Footer(props) {
  return (
    <div
      style={{
        lineHeight: 1.5,
        width: "100vw",
        display: "flex",
        color: "rgb(150,150,150)",
        justifyContent: "space-between",
        alignItems: "center",
        height: '40vh'
      }}
    >
     { props.from != 'mobile' && <div style={{ paddingLeft: "20px", width: "35%", display: 'flex', justifyContent: 'center' }}>
         <img
                src={Logo}
                style={{
                  width: "180px",
                  marginTop: "20px",
                  marginLeft: "16px",
                }}
              />  
      </div>}

      <div
        style={{
          display: "flex",
          width: props.from == 'mobile' ? "100%" : "65%",
          justifyContent: "space-around",
        //   borderLeft: "1px solid rgb(230,230,230)",
        }}
      >
        <div style={{ margin: "10px", fontSize: "14px" }} align="left">
          <div style={{ fontSize: "22px", marginBottom: '7px' }}>Company</div>
   
          <div>About Us</div>
          <div>Careers</div>
          <div>Management Team</div>
          <div>Blog</div>
          <div>Contact Us</div>
        </div>

        <div style={{ margin: "10px", fontSize: "14px" }} align="left">
          <div style={{ fontSize: "22px", marginBottom: '7px' }}>Customers</div>
       
          <div>Customer support email:</div>
          <div>{'contact@aviatoh.com'.toLowerCase()}</div>
          <br />
          <div style={{ fontSize: "22px", marginBottom: '7px' }}>Partners</div>
    
          <div>All Partner Programs</div>
          <div>App Partner Program</div>
          <div>Affiliate Program</div>
        </div>

        { props.from != 'mobile' && <div style={{ margin: "10px", fontSize: "14px" }} align="left">
          <div style={{ fontSize: "22px", marginBottom: '7px' }}>Social Media</div>
  
          <div>Instagram</div>
          <div>Facebook</div>
          <div>Twitter</div>
        </div>}
      </div>
    </div>
  );
}

export default Footer;
