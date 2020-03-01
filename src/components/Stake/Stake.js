import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";
import Layout from "../../layout";
import { ThemeConsumer } from "../../config/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialog from "../common/Dialog";
import Web3 from "web3";
import { XIO_ABI, XIO_ADDRESS } from "../../contracts/xio";
import { PORTAL_ABI, PORTAL_ADDRESS } from "../../contracts/portal";
import { OMG_EXCHANGE, OMG_TOKEN } from "../../contracts/omg";

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
    fontWeight: 400
  }
});

const useStyles = makeStyles(theme => ({
  searchBarInput: {
    border: "none"
  },
  searchBar: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
      border: "none"
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  }
}));

const tableHeader = {
  color: "white"
};

const tableHeaderLight = {
  color: "black"
};

const firstStakeSectionItem = {
  border: "1px solid rgb(65, 65, 65)",
  backgroundColor: "rgb(28, 28, 28)"
};

const firstStakeSectionItemLight = {
  border: "1px solid rgb(65, 65, 65)",
  "background-color": "#d3d3d33d"
};

const plusEqual = {
  color: "#c66065"
};

const Stake = props => {
  const [open, setOpen] = React.useState(false);
  const [durationDaysInput, setDurationDays] = React.useState(1);
  const [amountXioInput, setAmountXIO] = React.useState("");
  const [address, setAccountAddress] = useState("");
  const [isUnlock, setIsUnlock] = useState(false);
  const [interestRate, setinterestRate] = useState("");
  const [token, setToken] = useState("OMG");

  const onChangeAmount = e => {
    var reg = new RegExp("^\\d+$");
    if (reg.test(e.target.value) || e.target.value == "") {
      setAmountXIO(e.target.value);
      if (e.target.value) getXIOtoETHs(e.target.value, durationDaysInput);
    } else {
      console.log("nothing");
    }
  };

  const onChangeDurationDays = e => {
    var reg = new RegExp("^\\d+$");
    if (reg.test(e.target.value) || e.target.value == "") {
      setDurationDays(e.target.value);
      if (e.target.value) getXIOtoETHs(amountXioInput, e.target.value);
    } else {
      console.log("nothing");
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = data => {
    setOpen(false);
    console.log(data);
    setToken(data);
  };
  useEffect(() => {
    ethereum = window.ethereum;
    if (ethereum) {
      checkWeb3();
      initXioContract();
      initPortalContract();
    }
  }, []);
  useEffect(() => {
    if (contract && address) {
      getIsUnlock();
      // approve();
    }
  }, [address]);

  async function checkWeb3() {
    // Use Mist/MetaMask's provider.
    web3js = new Web3(window.web3.currentProvider);
    console.log(web3js);
    //get selected account on metamask
    accounts = await web3js.eth.getAccounts();
    console.log(accounts);
    setAccountAddress(accounts[0]);
    //get network which metamask is connected too
    let network = await web3js.eth.net.getNetworkType();
    console.log(network);
  }

  const onConnect = async () => {
    ethereum = window.ethereum;
    await ethereum.enable();
    if (!ethereum || !ethereum.isMetaMask) {
      // throw new Error('Please install MetaMask.')
      alert(`METAMASK NOT INSTALLED!!`);
    } else {
      checkWeb3();
    }
  };

  const initPortalContract = () => {
    portalContract = new web3js.eth.Contract(PORTAL_ABI, PORTAL_ADDRESS);
  };

  const initXioContract = () => {
    contract = new web3js.eth.Contract(XIO_ABI, XIO_ADDRESS);
  };

  const getXIOtoETHs = async (amount, duration) => {
    try {
      // amount = amount ? amount : amountXioInput
      console.log("amount before ==>", amount);
      // const duration = durationDaysInput ? durationDaysInput : 1
      console.log("duration ==>", duration);
      amount = Math.ceil(0.0068 * duration * amount);
      console.log("amount ==>", amount);
      const res = await portalContract.methods.getXIOtoETH(amount).call();
      console.log("res of xiotoeth ==>", res);
      getETHtoALTs(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getETHtoALTs = async amount => {
    try {
      console.log("amount in ETHtoALT ==>", amount);
      amount = await web3js.utils.toWei(amount.toString());
      console.log("amount in ETHtoALT after ==>", amount);
      const res = await portalContract.methods
        .getETHtoALT(amount, OMG_EXCHANGE)
        .call();
      console.log("res of ethToAlt ==>", res);
      setinterestRate(res);
    } catch (e) {
      console.log(e);
      setinterestRate(0);
    }
  };

  const confirmStake = async () => {
    try {
      console.log("chala");
      const amount = await web3js.utils.toWei(amountXioInput.toString());
      const timestamp = 24 * 60 * 60 * 1000;
      const params = {
        quantity: amount,
        tokensBought: interestRate,
        timestamp: timestamp * durationDaysInput,
        portalId: 1,
        symbol: "OMG",
        tokenAddress: OMG_TOKEN
      };
      console.log(params)
      await portalContract.methods
        .stakeXIO(
          amount,
          interestRate,
          timestamp * durationDaysInput,
          1,
          "OMG",
          OMG_TOKEN
        )
        .send({ from: address })
        .on("transactionHash", hash => {
          // hash of tx
          console.log(hash);
        })
        .on("confirmation", function(confirmationNumber, receipt) {
          if (confirmationNumber === 2) {
            // tx confirmed
            console.log(receipt);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getIsUnlock = async () => {
    const res = await contract.methods
      .allowance(address, PORTAL_ADDRESS)
      .call();
    console.log("res ==>", res);
    setIsUnlock(res != 0);
  };

  const approve = async () => {
    try {
      const functionSelector = "095ea7b3";
      const allowance =
        "f000000000000000000000000000000000000000000000000000000000000000";
      let spender = get64BytesString(PORTAL_ADDRESS);
      if (spender.length !== 64) {
        return null;
      }

      let rawTransaction = {
        from: address,
        to: "0x5d3069CBb2BFb7ebB9566728E44EaFDaC3E52708",
        value: 0,
        data: `0x${functionSelector}${spender}${allowance}`,
      };

      web3js.eth.sendTransaction(rawTransaction, function(err, transactionHash) {
        if (!err)
          console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
       });
    } catch (e) {
      console.log(e);
    }
  };

  const getNonceByEthAddress = async eth_address => {
    try {
      let nonce = await web3js.eth.getTransactionCount(eth_address, "pending");
      console.log(nonce);
      return nonce;
    } catch (e) {}
  };

  const get64BytesString = string => {
    string = string.replace("0x", "");
    while (string.length < 64) {
      string = "0".concat(string);
    }
    return string;
  };

  const dialogProps = {
    open,
    handleClose
  };

  return (
    <>
      <ThemeConsumer>
        {({ isThemeDark, themeDark }) => {
          return (
            <>
              <CustomDialog {...dialogProps} />
              <Layout
                tabName="stake"
                address={address}
                onConnect={onConnect}
                approve={approve}
                unlock={isUnlock}
                confirmStake={confirmStake}
              >
                <Grid container item className="firstSectionContainer " md={12}>
                  <Grid
                    style={{
                      paddingBottom: "10px"
                    }}
                    container
                    item
                    justify="center"
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <Grid
                      container
                      item
                      className="stakeTableHeader"
                      style={themeDark ? tableHeader : tableHeaderLight}
                      md={2}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item xs={12}>
                        {/* <p style={{ fontSize: "11px" }}>{amountXio}</p> */}
                        {/* <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          AMOUNT
                        </p>
                        <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          {amountXio}
                        </p> */}
                        <p
                          className="toggleHeadText_2"
                          style={{ fontSize: "10px", height: 26 }}
                        >
                          {"STAKE AMOUNT"}
                        </p>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        xs={6}
                        className="firstStakeSectionItem"
                        style={
                          themeDark
                            ? firstStakeSectionItem
                            : firstStakeSectionItemLight
                        }
                      >
                        <input
                          onChange={onChangeAmount}
                          className={
                            themeDark ? "inputTextStake" : "inputTextStakeLight"
                          }
                          placeholder="0.0"
                          value={amountXioInput}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      md={1}
                      sm={12}
                      xs={12}
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                    >
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className="plusEqual"
                        style={plusEqual}
                        align="center"
                      >
                        +
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      className="stakeTableHeader"
                      style={themeDark ? tableHeader : tableHeaderLight}
                      md={2}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item sm={12} xs={12}>
                        {/* <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          DURATION
                        </p>
                        <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          {durationDays}
                        </p> */}
                        <p
                          className="toggleHeadText_2"
                          style={{ fontSize: "10px", height: 26 }}
                        >
                          {"DURATION (DAYS)"}
                        </p>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        xs={6}
                        className="firstStakeSectionItem"
                        style={
                          themeDark
                            ? firstStakeSectionItem
                            : firstStakeSectionItemLight
                        }
                      >
                        <input
                          onChange={onChangeDurationDays}
                          className={
                            themeDark ? "inputTextStake" : "inputTextStakeLight"
                          }
                          value={durationDaysInput}
                          placeholder="0"
                          xs={12}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      md={1}
                      sm={12}
                      xs={12}
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                    >
                      <Grid
                        item
                        md={12}
                        className="plusEqual"
                        style={plusEqual}
                        align="center"
                      >
                        +
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      className="stakeTableHeader"
                      style={themeDark ? tableHeader : tableHeaderLight}
                      md={2}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item sm={12} xs={12}>
                        {/* <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          OUTPUT
                        </p>
                        <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          {outputToken}
                        </p> */}
                        <p
                          className="toggleHeadText_2"
                          style={{ fontSize: "10px", height: 26 }}
                        >
                          {"OUTPUT (TOKEN)"}
                        </p>
                      </Grid>

                      <Grid sm={12} xs={6} container justify="center">
                        <Grid
                          className="firstStakeSectionItem"
                          style={
                            themeDark
                              ? {
                                  ...firstStakeSectionItem,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  cursor: "pointer"
                                }
                              : {
                                  ...firstStakeSectionItemLight,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  cursor: "pointer"
                                }
                          }
                          onClick={() => handleClickOpen()}
                          item
                        >
                          <input
                            className={
                              themeDark
                                ? "inputTextStake"
                                : "inputTextStakeLight"
                            }
                            placeholder={token}
                            disabled={true}
                            style={{ cursor: "pointer" }}
                            xs={12}
                          />
                          <ExpandMoreIcon
                            style={{
                              fontSize: 40,
                              color: "#C66065",
                              cursor: "pointer"
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      md={1}
                      sm={12}
                      xs={12}
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                    >
                      <Grid
                        item
                        md={12}
                        className="plusEqual"
                        style={plusEqual}
                        align="center"
                      >
                        =
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      className="stakeTableHeader"
                      style={themeDark ? tableHeader : tableHeaderLight}
                      md={2}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item sm={12} xs={12}>
                        {/* <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          INSTANT
                        </p>
                        <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          {instantInterest}
                        </p> */}
                        <p
                          className="toggleHeadText_2"
                          style={{ fontSize: "10px", height: 26 }}
                        >
                          {"INSTANT INTEREST"}
                        </p>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        xs={6}
                        className="firstStakeSectionItem"
                        style={
                          themeDark
                            ? firstStakeSectionItem
                            : firstStakeSectionItemLight
                        }
                      >
                        <input
                          className={
                            themeDark ? "inputTextStake" : "inputTextStakeLight"
                          }
                          disabled="true"
                          placeholder="0.0"
                          value={(interestRate / 1000000000000000000).toFixed(
                            2
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Layout>
            </>
          );
        }}
      </ThemeConsumer>
    </>
  );
};

Stake.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Stake);
