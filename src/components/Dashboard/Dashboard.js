import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {ThemeConsumer} from '../../config/index'
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./style.css"
import Layout from "../../layout";

const styles = theme => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
    backgroundColor: "transparent",
    alignSelf: "cenetr"
    // boxShadow: 'none'
  },
  table: {
    // minWidth: 700,
    // border: '1px solid lightgrey',
    backgroundColor: "transparent",
    alignSelf: "cenetr",

    color: "white"
  },
  header: {
    // fontSize: 12,
    fontWeight: "bold",
    color: "white",
    border: "0px",
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "2px",
    textAlign: "center",
    paddingTop: 0
  },
  tableBody: {
    color: "white",

    fontSize: "12px",
    border: "0px",
    textAlign: "center",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400,
    paddingBottom:'20px',
    marginBottom:'40px'
  }
});
const getDateFormatted = time => {
  const formatDate = new Date(time);
  // console.log(formatDate)
  const date = formatDate.getDate();
  let month = formatDate.getMonth() + 1;
  let year = formatDate.getFullYear().toString();
  return `${date}/${month < 10 ? "0" + month : month}/${year.slice(2)}`;
};

const tabBodyRow1 = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around"
};

const tabBodyRow1_1 = {
  flexDirection: "row",
  justifyContent: "center",
  // alignItems: "center",
  border: "1px solid #2a2a2a",
  backgroundColor: "#1C1C1C",
  borderRadius: "3px",
  // height:'100px'
  padding: "0"
};

const tabBodyRow1_2 = {
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #2a2a2a",
  backgroundColor: "#1C1C1C",
  borderRadius: "3px"
};

const tabBodyRow1_3 = {
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #2a2a2a",
  backgroundColor: "#1C1C1C",
  borderRadius: "3px"
};

const tabBodyRow2 = {
  display: "flex",
  flexDirection: "column",
  // border: "1px solid #d6cbcb",
  alignItems: "center"
};

const tabBodyRow3 = {
  display: "flex",
  flexDirection: "column",
  //   border: "1px solid #d6cbcb",
  alignItems: "center"
};
const tabBodyRow2_1 = {
  // border: '1px solid #2a2a2a',
  // backgroundColor: '#1C1C1C',
  // borderRadius: '3px',

  flexDirection: "row",
  // alignItems: "center",
  border: "1px solid #414141",
  backgroundColor: "#1C1C1C",
  borderRadius: "3px"
};

const tabBodyRow2_1_1 = {
  flexDirection: "row",
  justifyContent: "center"
};
const tabBodyRow2_1_2 = {
  flexDirection: "row",
  justifyContent: "space-around",
  flexWrap: "no-wrap"
  // alignItems:"center",
};

const tabBodyRow2_1_3 = {
  flexDirection: "row",

  justifyContent: "space-between"
};

const tabBodyRow3_1 = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #414141",
  backgroundColor: "#1C1C1C",
  borderRadius: "3px"
};
const tabBodyRow3_1_Light = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #414141",
  backgroundColor: "#d3d3d33d",
  borderRadius: "3px"
};
const tabBodyRow3_1_1 = {
  flexDirection: "row",
  justifyContent: "center"
};

const tabBodyRow3_1_2 = {
  paddingBottom:"20px",
}


const XordId = props => {
  const { classes } = props;

  return (
    <>
      <ThemeConsumer>
      {({ isThemeDark, themeDark }) => {
        {console.log(themeDark)}
        return(
       
      <Layout tabName="dashboard">
        <Grid container item className="firstSectionContainer" md={12} xs={12} >
      
          <Grid
        
            item
            className={themeDark ? "firstSectionItemDark" : "firstSectionItemLight"}
            md={3}
            xs={4}
          
          >
            <h6
              style={{
                color: "#C66065",
                fontFamily: "'Montserrat', sans-serif",
                fontStyle: "italic",
                letterSpacing: "2px",
                textAlign: "center",
              
              }}
              className="firstSectionHeadings"
            >
              AVAILABLE XIO
            </h6>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: themeDark ? "white" : "black",
                fontWeight: "bold",
                textAlign: "center",
                padding:'0px',
              }}
            >
              0
            </h2>
          </Grid>

          <Grid
            item
            className={themeDark ? "firstSectionItemDark" : "firstSectionItemLight"}
            md={3}
            xs={4}

          >
            <h6
              style={{
                color: "#C66065",
                fontFamily: "'Montserrat', sans-serif",
                fontStyle: "italic",
                letterSpacing: "2px",
                textAlign: "center",
              }}
              className="firstSectionHeadings"
            >
              STAKED XIO
            </h6>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: themeDark ? "white" : "black",
                fontWeight: "bold",
                textAlign: "center",
                padding:'0px',

              }}
            >
              0
            </h2>
          </Grid>

          <Grid
            item
            className={themeDark ? "firstSectionItemDark" : "firstSectionItemLight"}
            md={3}
            xs={4}

          >
            <h6
              style={{
                color: "#C66065",
                fontFamily: "'Montserrat', sans-serif",
                fontStyle: "italic",
                letterSpacing: "2px",
                textAlign: "center",
              }}
              className="firstSectionHeadings"
            >
              ACTIVE PORTALS
            </h6>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: themeDark ? "white" : "black",
                fontWeight: "bold",
                textAlign: "center",
                padding:'0px',

              }}
            >
              0
            </h2>
          </Grid>
        </Grid>


{/* ///////////// */}

        <Grid container item style={tabBodyRow3} md={12} className="section" >
          <Grid container item style={themeDark ? tabBodyRow3_1 : tabBodyRow3_1_Light} md={11}>
            <Grid container item style={tabBodyRow3_1_1} md={12}>
              <h6
                style={{
                  color: "#C66065",
                  fontFamily: "'Montserrat', sans-serif",
                  fontStyle: "italic",
                  letterSpacing: "2px"
                }}
              >
                ACTIVE PORTAL INFORMATION
              </h6>
            </Grid>

            <Grid container item style={tabBodyRow3_1_2} md={10}>
                <Table className={classes.table} align="center">
                  <TableHead>
                    <TableRow>
                      <TableCell className={themeDark ? "tableHeader" : "tableHeaderLight"} ><h6 style={{ margin: 0 }} >PORTAL ID</h6></TableCell>
                      <TableCell className={themeDark ? "tableHeader" : "tableHeaderLight"} align="center">
                        <h6 style={{ margin: 0 }} >STAKED XIO</h6>
                      </TableCell>
                      <TableCell className={themeDark ? "tableHeader" : "tableHeaderLight"} align="center">
                        <h6 style={{ margin: 0 }} >OUTPUT TOKEN</h6>
                      </TableCell>
                      <TableCell className={themeDark ? "tableHeader" : "tableHeaderLight"} align="center">
                        <h6 style={{ margin: 0 }} >REMAINING DAYS</h6>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{paddingBottom:"20px"}}>
                    <TableRow style={{ cursor: "pointer" }}>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"} >3626</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>1000</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>BAT</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>100</TableCell>
                    </TableRow>
                

                   
                  </TableBody>
                </Table>
            </Grid>
          </Grid>
          </Grid>
{/* ///////////////// */}
        <Grid container item style={tabBodyRow3} md={12} className="section" >
          <Grid container item style={themeDark ? tabBodyRow3_1 : tabBodyRow3_1_Light} md={11}>
            <Grid container item style={tabBodyRow3_1_1} md={12}>
              <h6
                style={{
                  color: "#C66065",
                  fontFamily: "'Montserrat', sans-serif",
                  fontStyle: "italic",
                  letterSpacing: "2px"
                }}
              >
                PORTAL INTEREST RATE
              </h6>
            </Grid>

            <Grid container item style={tabBodyRow3_1_2} md={10}>
              {/* <Paper className={classes.root} align="center"> */}
                <Table className={classes.table} align="center">
                  <TableHead>
                    <TableRow>
                      <TableCell className={themeDark ? "tableHeader" : "tableHeaderLight"} ><h6 style={{ margin: 0 }} >TOKEN</h6></TableCell>
                      <TableCell className={themeDark ? "tableHeader" : "tableHeaderLight"} align="center">
                        <h6 style={{ margin: 0 }} >COLLATERAL</h6>
                      </TableCell>
                      <TableCell className={themeDark ? "tableHeader" : "tableHeaderLight"} align="center">
                        <h6 style={{ margin: 0 }} >STAKED XIO</h6>
                      </TableCell>
                      <TableCell className={themeDark ? "tableHeader" : "tableHeaderLight"} align="center">
                        <h6 style={{ margin: 0 }} >INTEREST</h6>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow style={{ cursor: "pointer" }}>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"} style={{ latterSpacing: '2px' }}>1UP</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>500,362</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>23,643</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>48% </TableCell>
                    </TableRow>
                    <TableRow style={{ cursor: "pointer",marginTop:'0px' }}>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"} style={{ latterSpacing: '2px' }}>1UP</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>500,362</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>23,643</TableCell>
                      <TableCell className={themeDark ? "tableBody" : "tableBodyLight"}>48%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              {/* </Paper> */}
            </Grid>
          </Grid>



        </Grid>
      </Layout>
       )
      }}
        </ThemeConsumer>
    </>
  );
};

XordId.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(XordId);
