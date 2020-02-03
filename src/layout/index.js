import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from "@material-ui/core";
import RocketIcon from "@material-ui/icons/Delete";
import Logo from "../components/assets/images/xio-logo.svg";
import Rocket from "../components/assets/images/rocket.svg";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faGithub,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

const mainContainer = {
  // display: 'flex',
  // flexDirection: 'row',
  // backgroundColor: '#1C1C1C',
  // height:'100vh',
};
const headerGrid = {
  justifyContent: "space-around"
};
const socialIcon = {
  color: "#b8b8b8",
  margin: 0,
  display: "inline-block",
  marginRight: 10,
  cursor: "pointer"
};
const iconDiv = {};
const logoDiv = {};

const btnDiv = {};

const headingDiv = {
  flexDirection: "column",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "bold",
  alignItems: "center"
};

const tabConatiner = {
  flexDirection: "row",
  justifyContent: "center"
  // alignItems: "center",
};
const tabHeader = {
  flexDirection: "row",
  justifyContent: "space-around",
  border: "1px solid #C66065",
  borderRadius: "5px"
};
const tabBody = {
  backgroundColor: "#030303",
  margin: 0,
  // border:'2px solid #2a2a2a',
  // justifyContent: "space-around",
  borderLeft: "2px solid #2d2d2d",
  borderRight: "2px solid #2d2d2d",
  borderBottom: "2px solid #2d2d2d"

  // height:'50vh'
};

// export default 
 const Index=({ children, tabName, }) =>{
  const [completed, setCompleted] = useState(false)

  console.log("tabname====>", tabName)

  return (
    <>
      <Grid container>
        <Grid
          container
          justify="space-between"
          style={{ padding: "20px 50px 0px" }}
          md={12}
        >
          <Grid
            className="socialIcons"
            style={iconDiv}
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
            <img src={Logo} height="50px" width="50px" />
          </Grid>

          <Grid className="connectButton" item md={3} xs={12}>
            <div
              style={{
                border: "1px solid #414141",
                display: "inline-block",
                padding: 10,
                borderRadius: 5
              }}
            >
              <img
                src={Rocket}
                height="20px"
                width="20px"
                style={{
                  margin: "0px 10px 0px 0px",
                  position: "relative",
                  top: 5
                }}
              />
              <h4
                style={{
                  color: "#b8b8b8",
                  display: "inline-block",
                  fontFamily: "'Montserrat', sans-serif",
                  margin: 0
                }}
              >
                CONNECT WALLET
              </h4>
            </div>
          </Grid>
        </Grid>

        <Grid container style={headingDiv} md={12}>
          <h1 className="layoutHeading">Instant and Upfront Interest</h1>
          <h3 className="layoutSubHeading">STAKE XIO. GET PAID. ZERO WAIT</h3>
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
            style={{
              border: "1px solid #C66065",
              borderRadius: "5px",
              fontFamily: "'Montserrat', sans-serif"
            }}
            md={8}
          >
            <h4
              style={{
                color: tabName === "dashboard" ? "white" : "#545454",
                justifyContent: "flex-start",
                letterSpacing: "2px"
              }}
              className="tabarText"
            >
              DASHBOARD
            </h4>
            <h4
              style={{
                color: tabName === "stake" ? "white" : "#545454",
                // color: "#545454",
                justifyContent: "center",
                letterSpacing: "2px"
              }}
              className="tabarText"
            // onClick={(event) =>history.push('/stake')}

            >
              STAKE
            </h4>
            <h4
              style={{
                color: tabName === "withdraw" ? "white" : "#545454",
                // color: "#545454",
                justifyContent: "flex-end",
                letterSpacing: "2px"
              }}
              className="tabarText"
            >
              WITHDRAW
            </h4>
          </Grid>

          <Grid
            className="childContainer"
            container
            item
            style={tabBody}
            md={8}
          >

            { !completed && children}

          { completed &&   <Grid
              className=" tableHeader"
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
            item
            md={6}
            xs={12}
            style={{ alignSelf: "center" }}
          >
            {
              tabName === "stake" &&
              <>
                <h6>IF YOU STAKES <span style={{ color: '#C66065' }}>X</span> TOKENS FOR <span style={{ color: '#C66065' }}>X</span> DAYS , YOU WILL IMMEDIATELY RECEIVE <span style={{ color: '#C66065' }}>X TOKENS</span></h6>
                <div style={{ backgroundColor: '#C66065', border: "1px solid #414141", display: "inline-block", padding: 10, borderRadius: 5 }} >
                  <h4 style={{ color: "#b8b8b8", display: "inline-block", fontFamily: "'Montserrat', sans-serif", margin: 0 }} >CONFIRM STAKE</h4>
                </div>
              </>
            }
            {
              tabName === "withdraw"  &&
              <>
                <h6>
                  <span style={{ color: "#C66065" }}>XIO </span>HAS A BALANCE OF
              <span style={{ color: "#C66065" }}> 1000 </span> AVAILABLE FOR
                  WITHDRAW
            </h6>
                <div
                  style={{
                    backgroundColor: "#C66065",
                    border: "1px solid #414141",
                    display: "inline-block",
                    padding: 10,
                    borderRadius: 5
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
                    marginTop:'40px'
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
    </>
  );
}


export default Index