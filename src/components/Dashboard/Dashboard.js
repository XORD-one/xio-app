import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Tooltip } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ThemeConsumer } from "../../config/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";
import { truncateValue } from "../../utils";
import spinnerWhite from "../assets/images/spinner-white.svg";
import spinnerBlack from "../assets/images/spinner-black.svg";
import {
  getBalance,
  getStakerData,
  onGetInterestRate,
  onGetPortalData,
  checkHashesAndExtractTimestamp
} from "../../store/actions/dashboardActions";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: "transparent",
    alignSelf: "cenetr",
  },
  table: {
    backgroundColor: "transparent",
    alignSelf: "cenetr",

    color: "white",
  },
  container: {
    maxHeight: 280,
  },
  header: {
    fontWeight: "bold",
    color: "white",
    border: "0px",
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "2px",
    textAlign: "center",
    paddingTop: 0,
  },
  tableBody: {
    color: "white",

    fontSize: "12px",
    border: "0px",
    textAlign: "center",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400,
    paddingBottom: "20px",
    marginBottom: "40px",
  },
});

const tabBodyRow3 = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const tabBodyRow3_1 = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #414141",
  backgroundColor: "#1C1C1C",
  borderRadius: "3px",
};
const tabBodyRow3_1_Light = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #DADADA",
  backgroundColor: "#f7f7f7",
  borderRadius: "3px",
};
const tabBodyRow3_1_1 = {
  flexDirection: "row",
  justifyContent: "center",
};

const tabBodyRow3_1_2 = {
  paddingBottom: "20px",
};

const Dashboard = (props) => {
  const { classes } = props;
  const [loadOnStake, setLoadOnStake] = useState(false);
  const [balance, setBalance] = useState(0);
  const [stakedXio, setStakedXio] = useState(0);
  const [interest, setInterest] = useState(0);
  const [activePortal, setActivePortal] = useState([]);
  const [portalInterestList, setPortalInterestList] = useState([]);
  const [portalLoading, setPortalLoading] = useState();

  useEffect(() => {
    setLoadOnStake(false);
    const ethereum = window.ethereum;
    if (ethereum) {
      // props.onGetPortalData();
      props.onGetInterestRate();
    }
    if (props.address) {
      props.getBalance(props.address);
    }
    props.checkHashesAndExtractTimestamp(props.address)
  }, [props.address, loadOnStake]);

  // const balanceFromWei = props.balance / 1000000000000000000;
  const availableXio = truncateValue(props.balance);
  const stakedXioValue = truncateValue(props.stakedXio);
  return (
    <>
      <ThemeConsumer>
        {({ isThemeDark, themeDark, checkList, checkForNewList }) => {
          if (checkList) {
            setLoadOnStake(true);
            checkForNewList();
          }
          return (
            <Grid
            container
            item
            className="firstSectionContainer"
            md={12}
            xs={12}>
              <Grid
                container
                item
                className="firstSectionContainer"
                md={12}
                xs={12}
              >
                <Grid
                  item
                  className={
                    themeDark ? "firstSectionItemDark" : "firstSectionItemLight"
                  }
                  md={3}
                  xs={4}
                  style={{ flexBasis: "calc(33% - 10px)" }}
                >
                  <h6
                    style={{
                      color: "#C66065",
                      fontFamily: "'Montserrat', sans-serif",
                      fontStyle: "italic",
                      letterSpacing: "2px",
                      textAlign: "center",
                      height: 22,
                    }}
                    className="firstSectionHeadings"
                  >
                    AVAILABLE XIO
                  </h6>
                  <Tooltip title={props.balance}>
                    <h2
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: themeDark ? "white" : "black",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "0px",
                        overflowWrap: "break-word",
                      }}
                    >
                      {availableXio}
                    </h2>
                  </Tooltip>
                </Grid>

                <Grid
                  item
                  className={
                    themeDark ? "firstSectionItemDark" : "firstSectionItemLight"
                  }
                  md={3}
                  xs={4}
                  style={{ flexBasis: "calc(33% - 10px)" }}
                >
                  <h6
                    style={{
                      color: "#C66065",
                      fontFamily: "'Montserrat', sans-serif",
                      fontStyle: "italic",
                      letterSpacing: "2px",
                      textAlign: "center",
                      height: 22,
                    }}
                    className="firstSectionHeadings"
                  >
                    STAKED XIO
                  </h6>
                  <Tooltip title={props.stakedXio}>
                    <h2
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: themeDark ? "white" : "black",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      {stakedXioValue}
                    </h2>
                  </Tooltip>
                </Grid>

                <Grid
                  item
                  className={
                    themeDark ? "firstSectionItemDark" : "firstSectionItemLight"
                  }
                  md={3}
                  xs={4}
                  style={{ flexBasis: "calc(33% - 10px)" }}
                >
                  <h6
                    style={{
                      color: "#C66065",
                      fontFamily: "'Montserrat', sans-serif",
                      fontStyle: "italic",
                      letterSpacing: "2px",
                      textAlign: "center",
                      height: 22,
                    }}
                    className="firstSectionHeadings"
                  >
                    MINIMUM INTEREST RATE
                  </h6>
                  <h2
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: themeDark ? "white" : "black",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "0px",
                    }}
                  >
                    {/* {`${props.interest}%`} */}
                    5%
                  </h2>
                </Grid>
              </Grid>

              <Grid
                container
                item
                style={tabBodyRow3}
                md={12}
                className="section"
              >
                <Grid
                  container
                  item
                  style={themeDark ? tabBodyRow3_1 : tabBodyRow3_1_Light}
                  md={11}
                >
                  <Grid container item style={tabBodyRow3_1_1} md={12}>
                    <h6
                      style={{
                        color: "#C66065",
                        fontFamily: "'Montserrat', sans-serif",
                        fontStyle: "italic",
                        letterSpacing: "2px",
                      }}
                    >
                      USER ACTIVE STAKE INFORMATION
                    </h6>
                  </Grid>

                  <Grid container item style={tabBodyRow3_1_2} md={10}>
                    <TableContainer className={classes.container}>
                      <Table
                        stickyHeader
                        className={classes.table}
                        align="center"
                      >
                        <TableHead style={{ background: "#1c1c1c" }}>
                          <TableRow>
                            <TableCell
                              style={{ width: "40%" }}
                              className={
                                themeDark ? "tableHeader" : "tableHeaderLight"
                              }
                            >
                              <h6 style={{ margin: 0, fontSize: 10 }}>
                                STAKE REWARDS TOKEN
                              </h6>
                            </TableCell>
                            <TableCell
                              className={
                                themeDark ? "tableHeader" : "tableHeaderLight"
                              }
                              align="center"
                            >
                              <h6 style={{ margin: 0, fontSize: 10 }}>
                                STAKED XIO
                              </h6>
                            </TableCell>

                            <TableCell
                              className={
                                themeDark ? "tableHeader" : "tableHeaderLight"
                              }
                              align="center"
                            >
                              <h6 style={{ margin: 0, fontSize: 10 }}>
                                DAYS UNTIL XIO RELEASED
                              </h6>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ paddingBottom: "20px" }}>
                          {!!props.activePortal.length &&
                            props.activePortal.map((item) => {
                              if (item.Days !== 0) {
                                return (
                                  <TableRow>
                                    <TableCell
                                      style={{ fontSize: 10 }}
                                      className={
                                        themeDark
                                          ? "tableBody"
                                          : "tableBodyLight"
                                      }
                                    >
                                      {item.outputTokenSymbol}
                                    </TableCell>
                                    <TableCell
                                      style={{ fontSize: 10 }}
                                      className={
                                        themeDark
                                          ? "tableBody"
                                          : "tableBodyLight"
                                      }
                                    >
                                      {item.quantity}
                                    </TableCell>
                                    <TableCell
                                      style={{ fontSize: 10 }}
                                      className={
                                        themeDark
                                          ? "tableBody"
                                          : "tableBodyLight"
                                      }
                                    >
                                      {item.Days}
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {props.portalLoading && (
                      <div style={{ width: "100%", textAlign: "center" }}>
                        {" "}
                        <img
                          src={themeDark ? spinnerBlack : spinnerWhite}
                        />{" "}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                style={tabBodyRow3}
                md={12}
                className="section"
              >
                <Grid
                  container
                  item
                  style={themeDark ? tabBodyRow3_1 : tabBodyRow3_1_Light}
                  md={11}
                >
                  <Grid container item style={tabBodyRow3_1_1} md={12}>
                    <h6
                      style={{
                        color: "#C66065",
                        fontFamily: "'Montserrat', sans-serif",
                        fontStyle: "italic",
                        letterSpacing: "2px",
                      }}
                    >
                      USER COMPLETED STAKE INFORMATION
                    </h6>
                  </Grid>

                  <Grid container item style={tabBodyRow3_1_2} md={10}>
                    {/* <Paper className={classes.root} align="center"> */}
                    <TableContainer className={classes.container}>
                      <Table
                        stickyHeader
                        className={classes.table}
                        align="center"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{ width: "40%" }}
                              className={
                                themeDark ? "tableHeader" : "tableHeaderLight"
                              }
                            >
                              <h6 style={{ margin: 0, fontSize: 10 }}>
                                STAKE REWARDS TOKEN
                              </h6>
                            </TableCell>
                            <TableCell
                              className={
                                themeDark ? "tableHeader" : "tableHeaderLight"
                              }
                              align="center"
                            >
                              <h6 style={{ margin: 0, fontSize: 10 }}>
                                STAKED XIO
                              </h6>
                            </TableCell>
                            <TableCell
                              className={
                                themeDark ? "tableHeader" : "tableHeaderLight"
                              }
                              align="center"
                            >
                              <h6 style={{ margin: 0, fontSize: 10 }}>
                                TOTAL TOKENS EARNED
                              </h6>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {props.portalLoading
                            ? null
                            : !!props.activePortal.length &&
                              props.activePortal.map((item) => {
                                if (item.Days == 0) {
                                  return (
                                    <TableRow>
                                      <TableCell
                                        style={{ fontSize: 10 }}
                                        className={
                                          themeDark
                                            ? "tableBody"
                                            : "tableBodyLight"
                                        }
                                        style={{ latterSpacing: "2px" }}
                                      >
                                        {item.outputTokenSymbol}
                                      </TableCell>
                                      <TableCell
                                        style={{ fontSize: 10 }}
                                        className={
                                          themeDark
                                            ? "tableBody"
                                            : "tableBodyLight"
                                        }
                                      >
                                        {item.quantity}
                                      </TableCell>
                                      <TableCell
                                        style={{ fontSize: 10 }}
                                        className={
                                          themeDark
                                            ? "tableBody"
                                            : "tableBodyLight"
                                        }
                                      >
                                        <Tooltip title={item.boughAmount}>
                                          <p style={{margin:0}} >
                                            {truncateValue(item.boughAmount)}
                                          </p>
                                        </Tooltip>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {props.portalLoading && (
                      <div style={{ width: "100%", textAlign: "center" }}>
                        {" "}
                        <img
                          src={themeDark ? spinnerBlack : spinnerWhite}
                        />{" "}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        }}
      </ThemeConsumer>
    </>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    address: state.layoutReducer.address,
    balance: state.dashboardReducer.balance,
    interest: state.dashboardReducer.interest,
    stakedXio: state.dashboardReducer.stakedXio,
    portalLoading: state.dashboardReducer.loading,
    activePortal: state.dashboardReducer.activePortal,
    portalInterestList: state.dashboardReducer.interestList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (address) => dispatch(getBalance(address)),
    getStakerData: (address) => dispatch(getStakerData(address)),
    checkHashesAndExtractTimestamp: (address) => dispatch(checkHashesAndExtractTimestamp(address)),
    // checkRemainingTransactions: (address) => dispatch(checkRemainingTransactions(address)),
    onGetInterestRate: () => dispatch(onGetInterestRate()),
    onGetPortalData: () => dispatch(onGetPortalData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
