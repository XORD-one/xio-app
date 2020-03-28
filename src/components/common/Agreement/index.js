import React, { Component } from "react";
import Dialog from "../Dialog/Dialog";
import xordLogoLight from "../../assets/images/xord-logo-black.png";
import xordLogoDark from "../../assets/images/xio-logo.svg";
import './style.css'

const index = ({ open, onClose }) => {
  return (
    <Dialog
      width="sm"
      open={open}
      onClose={onClose}
      isOnClickClose={true}
      isEscapeClickClose={true}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#1C1C1C"
        }}
      >
        <div style={{ textAlign: "center", padding: "20px 20px 0px" }}>
          <img src={xordLogoDark} height="50px" />
        </div>
        <h3 className="agreeHeader">WELCOME TO XIO</h3>
        <p className="agreeText">
          Before using this application, participants must acknowledge that XIO
          is still in beta testing mode and has not been officially audited. The
          XIO Foundation is not liable for any lost funds or digital tokens
          while using this experimental technology. By accepting these terms,
          you agree and understand the inherent risks of this application.
        </p>
        <div onClick={() => onClose()} className="acceptWrapper">
          <h4
            style={{
              color: "white",
              display: "inline-block",
              fontFamily: "'Montserrat', sans-serif",
              margin: 0
            }}
          >
            I ACCEPT
          </h4>
        </div>
      </div>
    </Dialog>
  );
};

export default index;
