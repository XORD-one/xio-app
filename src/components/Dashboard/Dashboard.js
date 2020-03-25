import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Tooltip } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ThemeConsumer } from "../../config/index";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";
import Layout from "../../layout";
import Web3 from "web3";
import { XIO_ABI, XIO_ADDRESS } from "../../contracts/xio";
import { PORTAL_ABI, PORTAL_ADDRESS } from "../../contracts/portal";
import { OMG_EXCHANGE } from "../../contracts/omg";

let web3js = "";

let contract = "";

let portalContract = "";

let accounts = "";

let ethereum = "";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "transparent",
    alignSelf: "cenetr"
  },
  table: {
    backgroundColor: "transparent",
    alignSelf: "cenetr",

    color: "white"
  },
  header: {
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
    paddingBottom: "20px",
    marginBottom: "40px"
  }
});

const tabBodyRow3 = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
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
  border: "1px solid #DADADA",
  backgroundColor: "#FCFCFC",
  borderRadius: "3px"
};
const tabBodyRow3_1_1 = {
  flexDirection: "row",
  justifyContent: "center"
};

const tabBodyRow3_1_2 = {
  paddingBottom: "20px"
};

const Dashboard = props => {
  const { classes } = props;
  const [address, setAccountAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [portalInterestList, setInterestList] = useState([]);
  const [stakedXio, setStakedXio] = useState(0);
  const [activePortal, setActivePortal] = useState([]);
  const [interest, setInterest] = useState(0);
  const [loadOnStake, setLoadOnStake] = useState(false);
  const [network,setNetwork] = useState('rinkeby')

  const getBalance = async () => {
    let res = await contract.methods.balanceOf(address).call();
    setBalance(res);
    //console.log(res);
  };

  const getActivePortalInfo = async () => {
    const res = await portalContract.methods.portalData(address).call();
    //console.log(res);
  };

  const getPortalInterest = async () => {
    try {
      const amount = await web3js.utils.toWei("1");
      const interestList = [];
      let i = 0;
      while (true) {
        const res = await portalContract.methods.portalData(i).call();
        //console.log(res);
        if (res.tokenAddress === "0x0000000000000000000000000000000000000000") {
          break;
        }
        let res1 = await portalContract.methods
          .getETHtoALT(amount, res.tokenExchangeAddress)
          .call();
        res1 = await web3js.utils.fromWei(res1.toString());
        res.xioStaked = await web3js.utils.fromWei(res.xioStaked.toString());
        //console.log(res, res1);
        const obj = {
          ...res,
          liquidity: Number(res1).toFixed(2)
        };
        interestList.push(obj);
        setInterestList(interestList);
        i++;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let timer;
    setLoadOnStake(false);
    ethereum = window.ethereum;
    if (ethereum) {
      timer = setInterval(() => {
        checkWeb3();
      }, 3000);
      checkWeb3();
      initXioContract();
      initPortalContract();
      getPortalInterest();
      getInterestData();
    }
    if (contract && address) {
      getBalance();
      getActivePortalInfo();
      onGetLengthOfStakerData();
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [address, loadOnStake]);

  async function checkWeb3() {
    // Use Mist/MetaMask's provider.
    web3js = new Web3(window.web3.currentProvider);
    //console.log(web3js);
    //get selected account on metamask
    accounts = await web3js.eth.getAccounts();
    //console.log(accounts);
    if (accounts[0] !== address) {
      setAccountAddress(accounts[0]);
    }
    //get network which metamask is connected too
    let getNetwork = await web3js.eth.net.getNetworkType();
    //console.log(network);
    if(getNetwork !== network)
    setNetwork(getNetwork)

  }

  const onConnect = async onSetMessage => {
    ethereum = window.ethereum;
    if (!ethereum || !ethereum.isMetaMask) {
      // throw new Error('Please install MetaMask.')
      onSetMessage(`METAMASK NOT INSTALLED!!`);
    } else {
      await ethereum.enable();
      checkWeb3();
    }
  };

  const initPortalContract = () => {
    portalContract = new web3js.eth.Contract(PORTAL_ABI, PORTAL_ADDRESS);
  };

  const initXioContract = () => {
    contract = new web3js.eth.Contract(XIO_ABI, XIO_ADDRESS);
  };

  const getInterestData = async () => {
    let res = await portalContract.methods.getInterestRate().call();
    res = await web3js.utils.fromWei(res.toString());
    res = Math.ceil(res * 365 * 100);
    //console.log("res of interest ==>", res);
    setInterest(res);
  };

  const onGetLengthOfStakerData = async () => {
    const res = await portalContract.methods
      .getArrayLengthOfStakerData(address)
      .call();
    //console.log("res ==>", res);
    getStakerData(res);
  };

  const getStakerData = async data => {
    try {
      let amount = 0;
      const portalInfo = [];
      for (let i = 0; i < data; i++) {
        const res = await portalContract.methods.stakerData(address, i).call();
        //console.log(res);
        res.stakeQuantity = await web3js.utils.fromWei(
          res.stakeQuantity.toString()
        );
        amount = amount + Number(res.stakeQuantity);

        res.Days =
          res.stakeDurationTimestamp -
          (Math.round(new Date() / 1000) - res.stakeInitiationTimestamp);
        //console.log("Days ===>", res.Days);
        if (res.Days <= 0) {
          res.Days = 0;
        } else {
          res.Days = Math.ceil(res.Days / 60);
        }

        if (res.publicKey !== "0x0000000000000000000000000000000000000000") {
          portalInfo.push(res);
        }
      }
      // amount = await web3js.utils.fromWei(amount.toString());
      setStakedXio(amount);
      setActivePortal(portalInfo);
    } catch (e) {
      console.log(e);
    }
  };
  const availableXio =
    (balance / 1000000000000000000).toString().length > 4
      ? (balance / 1000000000000000000).toString().slice(0, 4) + ".."
      : (balance / 1000000000000000000).toString();
  return (
    <>
      <ThemeConsumer>
        {({ isThemeDark, themeDark, checkList, checkForNewList }) => {
          if (checkList) {
            setLoadOnStake(true);
            checkForNewList();
          }
          return (
            <Layout tabName="dashboard" address={address} onConnect={onConnect} network={network} >
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
                      height: 22
                    }}
                    className="firstSectionHeadings"
                  >
                    AVAILABLE XIO
                  </h6>
                  <Tooltip title={balance / 1000000000000000000}>
                    <h2
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: themeDark ? "white" : "black",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "0px",
                        overflowWrap: "break-word"
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
                      height: 22
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
                      padding: "0px"
                    }}
                  >
                    {stakedXio}
                  </h2>
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
                      height: 22
                    }}
                    className="firstSectionHeadings"
                  >
                    INTEREST RATE
                  </h6>
                  <h2
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: themeDark ? "white" : "black",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "0px"
                    }}
                  >
                    {`${interest}%`}
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
                          <TableCell
                            style={{ width: "33%" }}
                            className={
                              themeDark ? "tableHeader" : "tableHeaderLight"
                            }
                          >
                            <h6 style={{ margin: 0, fontSize: 10 }}>
                              PORTAL ID
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
                              REMAINING DAYS
                            </h6>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody style={{ paddingBottom: "20px" }}>
                        {!!activePortal.length &&
                          activePortal.map(item => {
                            console.log("items ==>", item);
                            if (item.Days !== 0) {
                              return (
                                <TableRow>
                                  <TableCell
                                    style={{ fontSize: 10 }}
                                    className={
                                      themeDark ? "tableBody" : "tableBodyLight"
                                    }
                                  >
                                    {item.outputTokenSymbol}
                                  </TableCell>
                                  <TableCell
                                    style={{ fontSize: 10 }}
                                    className={
                                      themeDark ? "tableBody" : "tableBodyLight"
                                    }
                                  >
                                    {item.stakeQuantity}
                                  </TableCell>
                                  <TableCell
                                    style={{ fontSize: 10 }}
                                    className={
                                      themeDark ? "tableBody" : "tableBodyLight"
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
                          <TableCell
                            style={{ width: "33%" }}
                            className={
                              themeDark ? "tableHeader" : "tableHeaderLight"
                            }
                          >
                            <h6 style={{ margin: 0, fontSize: 10 }}>TOKEN</h6>
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
                              ETH LIQUIDITY
                            </h6>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {!!portalInterestList.length &&
                          portalInterestList.map(item => {
                            return (
                              <TableRow>
                                <TableCell
                                  style={{ fontSize: 10 }}
                                  className={
                                    themeDark ? "tableBody" : "tableBodyLight"
                                  }
                                  style={{ latterSpacing: "2px" }}
                                >
                                  {item.outputTokenSymbol}
                                </TableCell>
                                <TableCell
                                  style={{ fontSize: 10 }}
                                  className={
                                    themeDark ? "tableBody" : "tableBodyLight"
                                  }
                                >
                                  {item.xioStaked}
                                </TableCell>
                                <TableCell
                                  style={{ fontSize: 10 }}
                                  className={
                                    themeDark ? "tableBody" : "tableBodyLight"
                                  }
                                >
                                  {item.liquidity}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                    {/* </Paper> */}
                  </Grid>
                </Grid>
              </Grid>
            </Layout>
          );
        }}
      </ThemeConsumer>
    </>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Dashboard);
