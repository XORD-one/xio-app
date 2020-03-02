import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button , Switch ,FormControlLabel} from "@material-ui/core";
import RocketIcon from "@material-ui/icons/Delete";
import Logo from "../components/assets/images/xio-logo.svg";
import LogoLight from "../components/assets/images/xio-logo-light.svg";
import Rocket from "../components/assets/images/rocket.svg";
import {ThemeConsumer} from '../config/index'
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faGithub,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";


const layoutSubHeading={
  color: "rgb(198, 96, 101)",

}

const layoutHeadingLight={
  color:'black',
  letterSpacing:6
}
const layoutHeadingDark={
  color:'white',
  letterSpacing:6
}

const tableHeader={
  color:'white',

}


const socialIcon = {
  color: "#b8b8b8",
  margin: 0,
  display: "inline-block",
  marginRight: 10,
  cursor: "pointer"
};


const headingDiv = {
  flexDirection: "column",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "bold",
  alignItems: "center"
};



const tabBody = {
  backgroundColor: "#030303",
  margin: 0,
  borderLeft: "2px solid #2d2d2d",
  borderRight: "2px solid #2d2d2d",
  borderBottom: "2px solid #2d2d2d"

};
const tabBodyLight = {
  backgroundColor: "white",
  margin: 0,
  borderLeft: "1px solid #DADADA",
  borderRight: "1px solid #DADADA",
  borderBottom: "1px solid #DADADA"

};



const Index = ({ children, tabName, address='',onConnect, unlock, approve,confirmStake,balance }) => {
  const [completed, setCompleted] = useState(false)

  const handleThemeState = (isThemeDark,themeDark) => {
    isThemeDark(!themeDark)
  }

  const onConfirm = () => {
   unlock ? confirmStake() : approve() 
  }

  let history = useHistory();
  return (
    <ThemeConsumer>
      {({ isThemeDark, themeDark }) => {
        const addressToShow = address && address.slice(0,6) + "...." + address.slice((address.length)-4)
        return(
    <div style={{backgroundColor: themeDark ? '#1C1C1C' : 'white', minHeight: '100vh' }}>
       
      <Grid  >
        <Grid
          container
          justify="space-between"
          style={{ padding: "20px 50px 0px" }}
          md={12}
        >
          <Grid
            className="socialIcons"
            item
            md={3}
            xs={12}
            style={{ paddingTop: 15 }}
          >
            <h4 style={socialIcon}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </h4>
            <h4 style={socialIcon}>
              <FontAwesomeIcon icon={faTwitter} />
            </h4>
            <h4 style={socialIcon}>
              <FontAwesomeIcon icon={faYoutube} />
            </h4>
            <h4 style={socialIcon}>
              <FontAwesomeIcon icon={faFacebookF} />
            </h4>
            <h4 style={socialIcon}>
              <FontAwesomeIcon icon={faGithub} />
            </h4>
          </Grid>
          <Grid
            className="logo"
            item
            style={{ textAlign: "center" }}
            xs={12}
            md={3}
          >
            <img src={themeDark ? Logo : LogoLight} height="50px" width="50px" />
          </Grid>

          <Grid className="connectButton" item md={3} xs={12}>
            <div
              style={{
                border: themeDark ? "1px solid #414141" : "1px solid #DADADA" ,
                display: "inline-block",
                padding: "8px 15px 10px 10px",
                borderRadius: 5
              }}
              onClick={()=>onConnect()}
            >
              <img
                src={Rocket}
                height="20px"
                width="20px"
                style={{
                  margin: "0px 12px 0px 0px",
                  position: "relative",
                  top: 5
                }}
              />
              <h4
                style={{
                  color: themeDark ? "#b8b8b8" : "#545454",
                  display: "inline-block",
                  fontFamily: "'Montserrat', sans-serif",
                  margin: 0,
                  height : '20px',
                  letterSpacing:'2px',
                }}
              >
                {address ?
                  
                  addressToShow : "CONNECT WALLET"
                }
              </h4>
            </div>
          </Grid>
        </Grid>

        <Grid container style={headingDiv} md={12}>
          <h3  style={themeDark ? layoutHeadingDark : layoutHeadingLight} className="layoutHeading">STAKE XIO. EARN ALTS. ZERO LOSS.</h3>
          {/* <h3 className="layoutSubHeading" style={layoutSubHeading}>STAKE XIO. GET PAID. ZERO WAIT</h3> */}
        </Grid>

        <Grid
          container
          item
          justify="center"
          style={{ paddingBottom: 20 }}
          md={12}
        >
          <Grid
            container
            item
            justify="space-around"
            style={themeDark ? {
              border: "1px solid #C66065",
              borderRadius: "5px",
              fontFamily: "'Montserrat', sans-serif"
            } : {
              backgroundColor:"#FCFCFC",
              border: "1px solid #C66065",
              borderRadius: "5px",
              fontFamily: "'Montserrat', sans-serif"
            }}
            md={8}
          >
            <h4
              style={{
                color: tabName === "dashboard" ?  ((themeDark) ? "white" : "black"): ((themeDark) ? "#545454" : "#DADADA"),
                justifyContent: "flex-start",
                letterSpacing: "2px",
                cursor:'pointer',
              }}
              className="tabarText"
            onClick={() =>history.push("/")}
            >
              DASHBOARD
            </h4>
            <h4
              style={{
                color: tabName === "stake" ? ((themeDark) ? "white" : "black"): ((themeDark) ? "#545454" : "#DADADA") ,
                justifyContent: "center",
                letterSpacing: "2px",
                cursor:'pointer',

              }}
              className="tabarText"
              onClick={() =>history.push("/stake")}

            >
              STAKE
            </h4>
            <h4
              style={{
                color: tabName === "withdraw" ? ((themeDark) ? "white" : "black"): ((themeDark) ? "#545454" : "#DADADA"),
                justifyContent: "flex-end",
                letterSpacing: "2px",
                cursor:'pointer',

              }}
              className="tabarText"
              onClick={() =>history.push("/withdraw")}

            >
              WITHDRAW
            </h4>
          </Grid>

          <Grid
            className="childContainer"
            container
            item
            style={themeDark ? tabBody : tabBodyLight}
            md={8}
          >

            {!completed && children}

            {completed && <Grid
              className=" tableHeader"
              style={tableHeader}
              item

              xs={12}
              style={{ alignSelf: "center" }}
            >
              <h6>
                YOU HAVE COMPLETED THE DEMO
              </h6>
            </Grid>}

          </Grid>
          <Grid
            className=" tableHeader"
            style={tableHeader}

            item
            md={6}
            xs={12}
            style={{ alignSelf: "center" }}
          >
            {
              tabName === "stake" &&
              <>
                <h6 style = {{color : themeDark ? "white" : "black" }}>IF YOU STAKE <span style={{ color: '#C66065' }}>X</span> TOKENS FOR <span style={{ color: '#C66065' }}>X</span> DAYS , YOU WILL IMMEDIATELY RECEIVE <span style={{ color: '#C66065' }}>X TOKENS</span></h6>
                <div onClick={()=>onConfirm()} style={{ backgroundColor: address ? '#C66065' : '#757474', cursor:"pointer" ,border: themeDark ? "1px solid #414141" : "1px solid #DADADA", display: "inline-block", padding: 10, borderRadius: 5 }} >
                  <h4 style={{ color:"white", display: "inline-block", fontFamily: "'Montserrat', sans-serif", margin: 0 }} >{"CONFIRM STAKE"}</h4>
                </div>
              </>
            }
            {
              tabName === "withdraw" &&
              <>
                <h6 style = {{color : themeDark ? "white" : "black" }}>
                  <span style={{ color: "#C66065" }}>XIO </span>HAS A BALANCE OF
              <span style={{ color: "#C66065" }}> 1000 </span> AVAILABLE FOR
                      WITHDRAW
            </h6>
                <div
                  style={{
                    backgroundColor: "#C66065",
                    border:  themeDark ? "1px solid #414141" : "1px solid #DADADA",
                    display: "inline-block",
                    padding: 10,
                    borderRadius: 5
                  }}
                >
                  <h4
                    style={{
                      color: "white",
                      display: "inline-block",
                      fontFamily: "'Montserrat', sans-serif",
                      margin: 0
                    }}
                  >
                    CONFIRM WITHDRAW
              </h4>

                </div>
              </>
            }

            {
              completed &&
              <>


                <div
                  style={{
                    backgroundColor: "#C66065",
                    border: "1px solid #414141",
                    display: "inline-block",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: '40px'
                  }}
                >
                  <h4
                    style={{
                      color: "#b8b8b8",
                      display: "inline-block",
                      fontFamily: "'Montserrat', sans-serif",
                      margin: 0
                    }}
                  >
                    START OVER
              </h4>

                </div>
              </>
            }
          </Grid>
        </Grid>
       
      </Grid>
      
      <Switch style={{color:"#c66065"}} className="MuiSwitch-root" checked={themeDark} onChange={()=>handleThemeState(isThemeDark,themeDark)} value="checkedA" />
    </div>
        )}}
  </ThemeConsumer>
  );
}


export default Index