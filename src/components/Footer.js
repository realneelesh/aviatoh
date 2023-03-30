import React from "react";
import { Logo } from "../assets";

function Footer(props) {
  return (
    <div
      style={{
        lineHeight: 1.5,
        width: "100vw",
        backgroundColor: "#353740",
        display: "flex",
        color: "silver",
        justifyContent: "space-between",
        alignItems: "center",
        height: '45vh'
      }}
    >
      <div style={{ paddingLeft: "20px", width: "40%" }}>
        <img src={Logo} style={{ width: "40%" }} />
      </div>

      <div
        style={{
          display: "flex",
          width: "60%",
          justifyContent: "space-around",
          borderLeft: "1px solid rgb(100, 100, 100)",
        }}
      >
        <div style={{ margin: "10px", fontSize: "15px" }} align="left">
          <div style={{ fontSize: "22px" }}>Company</div>
          <br />
          <div>About Us</div>
          <div>Careers</div>
          <div>Management Team</div>
          <div>Blog</div>
          <div>Contact Us</div>
        </div>

        <div style={{ margin: "10px", fontSize: "15px" }} align="left">
          <div style={{ fontSize: "22px" }}>Customers</div>
          <br />
          <div>Customermupport</div>
          <div>Write at {'customercare@aviatoh.com'.toLowerCase()}</div>
          <br />
          <div style={{ fontSize: "22px" }}>Partners</div>
          <br />
          <div>All Partner Programs</div>
          <div>App Partner Program</div>
          <div>Affiliate Program</div>
        </div>

        <div style={{ margin: "10px", fontSize: "15px" }} align="left">
          <div style={{ fontSize: "22px" }}>Social Media</div>
          <br />
          <div>Instagram</div>
          <div>Facebook</div>
          <div>Twitter</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
