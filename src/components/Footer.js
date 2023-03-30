import React from "react";
import { primarySilverColour } from "../App";
import { Logo } from "../assets";

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
        height: '45vh'
      }}
    >
      <div style={{ paddingLeft: "20px", width: "35%" }}>
        <img src={Logo} style={{ width: "50%" }} />
      </div>

      <div
        style={{
          display: "flex",
          width: "65%",
          justifyContent: "space-around",
        //   borderLeft: "1px solid rgb(230,230,230)",
        }}
      >
        <div style={{ margin: "10px", fontSize: "15px" }} align="left">
          <div style={{ fontSize: "25px" }}>Company</div>
   
          <div>About Us</div>
          <div>Careers</div>
          <div>Management Team</div>
          <div>Blog</div>
          <div>Contact Us</div>
        </div>

        <div style={{ margin: "10px", fontSize: "15px" }} align="left">
          <div style={{ fontSize: "25px" }}>Customers</div>
       
          <div>Customermupport</div>
          <div>📧 {'customercare@aviatoh.com'.toLowerCase()}</div>
          <br />
          <div style={{ fontSize: "25px" }}>Partners</div>
    
          <div>All Partner Programs</div>
          <div>App Partner Program</div>
          <div>Affiliate Program</div>
        </div>

        <div style={{ margin: "10px", fontSize: "15px" }} align="left">
          <div style={{ fontSize: "25px" }}>Social Media</div>
  
          <div>Instagram</div>
          <div>Facebook</div>
          <div>Twitter</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
