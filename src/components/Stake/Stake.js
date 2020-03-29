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

let web3 = "";

let contract = "";

let portalContract = "";

let infuraPortal = "";

let accounts = "";

let ethereum = "";

let initialRate = "";

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
  const [open, setOpen] = useState(false);
  const [durationDaysInput, setDurationDays] = useState(1);
  const [amountXioInput, setAmountXIO] = useState(1);
  const [address, setAccountAddress] = useState("");
  const [isUnlock, setIsUnlock] = useState(false);
  const [interestRate, setinterestRate] = useState("");
  const [token, setToken] = useState("OMG");
  const [balance, setBalance] = useState(false);
  const [unitRate, setUnitRate] = useState(0);
  const [tokensList, setTokensList] = useState([]);
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [amountFocus, setAmountFocus] = useState(false);
  const [daysFocus, setDaysFocus] = useState(false);
  const [network, setNetwork] = useState("main");

  const onToggleFocus = field => {
    if (field === "amount") {
      setAmountFocus(!amountFocus);
    } else {
      setDaysFocus(!daysFocus);
    }
  };

  const onChangeAmount = e => {
    if (
      (e.target.value.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/) ||
        e.target.value == "") &&
      Number(e.target.value) <= 10000
    ) {
      setAmountXIO(e.target.value);
      const rate =
        Number(e.target.value) * Number(durationDaysInput) * unitRate;
      //console.log("ate ==>", rate);
      setinterestRate(rate);
      // if (e.target.value) getXIOtoETHs(e.target.value, durationDaysInput);
    } else {
      //console.log("nothing");
    }
  };

  const onChangeDurationDays = e => {
    var reg = new RegExp("^\\d+$");
    if (
      (reg.test(e.target.value) || e.target.value == "") &&
      Number(e.target.value) <= 30
    ) {
      setDurationDays(e.target.value);
      const rate = Number(e.target.value) * Number(amountXioInput) * unitRate;
      //console.log("ate ==>", rate);
      setinterestRate(rate);
      // if (e.target.value) getXIOtoETHs(amountXioInput, e.target.value);
    } else {
      //console.log("nothing");
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const onTokenSelect = data => {
    //console.log(data);
    setToken(data);
    handleClickClose();
  };

  useEffect(() => {
    let timer;
    initInfura();
    initPortalWithInfura();
    ethereum = window.ethereum;
    if (ethereum) {
      checkWeb3();
      timer = setInterval(() => {
        checkWeb3();
      }, 3000);
      initXioContract();
      initPortalContract();
      getTokensData();
    }
    if (contract && address) {
      getIsUnlock();
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [address, balance]);

  useEffect(()=>{
    onGetInterestRate();
  },[token])

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
    if (getNetwork !== network) setNetwork(getNetwork);
    //console.log(network);
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

  const initInfura = () => {
    const OPTIONS = {
      // defaultBlock: "latest",
      transactionConfirmationBlocks: 1,
      transactionBlockTimeout: 5
    };
    web3 = new Web3(
      "https://mainnet.infura.io/v3/ff4d778692ad42f7966a456564283e9d",
      null,
      OPTIONS
    );
    //console.log("web3 ==>", web3);
  };

  const initPortalWithInfura = () => {
    infuraPortal = new web3.eth.Contract(PORTAL_ABI, PORTAL_ADDRESS);
  };

  const getXIOtoETHs = async (amount) => {
    try {
      console.log("amo getXIOtoETH ==>", amount);
      const res = await infuraPortal.methods.getXIOtoETH(amount).call();
      console.log("res of xiotoeth ==>", res);
      return getETHtoALTs(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getETHtoALTs = async (amount) => {
    try {
      console.log("amo ETHtoALT ==>", amount);
      console.log('tokens ==>',token)
      let res = await infuraPortal.methods
        .getETHtoALT(amount, token.tokenExchangeAddress)
        .call();
      console.log("res of ethToAlt ==>", res);
      res = await web3js.utils.fromWei(res.toString());
      if (initial) {
        setUnitRate(res);
        setinterestRate(res);
        setInitial(false);
      }
      res = await web3js.utils.toWei(res.toString());
      return res;
    } catch (e) {
      console.log(e);
      setUnitRate(0);
      setinterestRate(0);
    }
  };

  const onGetInterestRate = async () => {
    try {
      const res = await infuraPortal.methods.getInterestRate().call();
      //console.log("res ==>", res);
      initialRate = res;
      //console.log(
      //   "initail rate ==>",
      //   await web3js.utils.fromWei(initialRate.toString())
      // );
      getXIOtoETHs(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getTokensData = async () => {
    try {
      const tokenList = [];
      const tokens = {};
      let index = 0;
      while (true) {
        const res = await portalContract.methods.portalData(index).call();
        //console.log(res);
        if (res.tokenAddress == "0x0000000000000000000000000000000000000000") {
          break;
        }
        if (tokens[res.outputTokenSymbol]) {
        } else {
          tokens[res.outputTokenSymbol] = 1;
          tokenList.push(res);
        }
        index++;
      }
      setTokensList(tokenList);
      setToken(tokenList[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const confirmStake = async (updateList, onSetMessage) => {
    try {
      if (address) {
        setLoading(true);
        const amount = await web3js.utils.toWei(amountXioInput.toString());
        const soldxio = Number(amountXioInput) * initialRate;
        const timestamp = 24 * 60 * 60 * 1000;
        const rateFromWei = await web3js.utils.fromWei(initialRate.toString());
        let calculatedValue =
          Number(durationDaysInput) *
          Number(amountXioInput) *
          Number(rateFromWei);

        calculatedValue = calculatedValue.toFixed(18);
        const tokensBought = await getXIOtoETHs(
          await web3js.utils.toWei(calculatedValue.toString())
        );

        console.log("tokens bought ==>", tokensBought);

        const params = {
          tokenAddress: token.tokenAddress,
          durationDaysInput,
          amount,
          tokensBought,
          portalId: token.portalId,
          symbol: token.outputTokenSymbol
        };
        console.log("params ==>", params);
        await portalContract.methods
          .stakeXIO(
            token.tokenAddress,
            durationDaysInput,
            amount,
            tokensBought,
            token.portalId
          )
          .send({ from: address, gasPrice: 25 * 1000000000, gasLimit: 1000000 })
          .on("transactionHash", hash => {
            // hash of tx
            //console.log(hash);
          })
          .on("confirmation", function(confirmationNumber, receipt) {
            if (confirmationNumber === 1) {
              // tx confirmed
              //console.log(receipt);
              setLoading(false);
              onSetMessage("XIO Successfully Staked");
              setAmountXIO(1);
              setDurationDays(1);
              updateList();
            }
          });
      } else {
        onSetMessage("PLEASE CONNECT TO METAMASK WALLET");
      }
    } catch (e) {
      console.log(e);
      onSetMessage("Oops, something went wrong please try again");
      setLoading(false);
    }
  };

  const getIsUnlock = async () => {
    const res = await contract.methods
      .allowance(address, PORTAL_ADDRESS)
      .call();
    console.log("res ==>", res);
    setIsUnlock(res != 0);
  };

  const getBalance = async (param, msg) => {
    let res = await contract.methods.balanceOf(address).call();
    setBalance(res != 0);
    res = await web3js.utils.fromWei(res.toString());
    //console.log(res);
    if (Number(res) < Number(amountXioInput)) {
      msg("Insufficient Funds!!");
      return;
    }
    confirmStake(param, msg);
  };

  const approve = async onSetMessage => {
    try {
      if (address) {
        setLoading(true);
        let contract = new web3.eth.Contract(XIO_ABI, XIO_ADDRESS);
        const amount = await web3js.utils.toWei(amountXioInput.toString());
        const functionSelector = "095ea7b3";
        const allowance =
          "f000000000000000000000000000000000000000000000000000000000000000";
        let spender = get64BytesString(PORTAL_ADDRESS);
        if (spender.length !== 64) {
          return null;
        }

        let rawTransaction = {
          from: address,
          to: XIO_ADDRESS,
          value: 0,
          data: `0x${functionSelector}${spender}${allowance}`
        };

        web3js.eth
          .sendTransaction(rawTransaction)
          .on("transactionHash", function(hash) {
            //console.log("hash ==>", hash);
          })
          .on("receipt", function(receipt) {
            //console.log("receipt ==>", receipt);
          })
          .on("confirmation", function(confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              //console.log("confirmation ==>", confirmationNumber);
              getIsUnlock();
              onSetMessage(
                "Wallet Successfully Activated, You Can Now Stake XIO"
              );
              setLoading(false);
            }
          })
          .on("error", console.error);
      } else {
        onSetMessage("PLEASE CONNECT TO METAMASK WALLET");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      onSetMessage("Oops, something went wrong please try again");
    }
  };

  const getNonceByEthAddress = async eth_address => {
    try {
      let nonce = await web3js.eth.getTransactionCount(eth_address, "pending");
      //console.log(nonce);
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

  const onConfirmStakeClick = (param, msg) => {
    isUnlock ? getBalance(param, msg) : approve(msg);
  };

  const dialogProps = {
    open,
    handleClose: handleClickClose,
    onTokenSelect,
    tokensList
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
                network={network}
                onConnect={onConnect}
                approve={approve}
                unlock={isUnlock}
                confirmStake={confirmStake}
                balance={balance}
                onConfirmClick={onConfirmStakeClick}
                loading={loading}
                amount={amountXioInput}
                days={durationDaysInput}
                rate={Number(interestRate).toFixed(4)}
                outputToken={token.outputTokenSymbol}
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
                            ? amountFocus
                              ? {
                                  ...firstStakeSectionItem,
                                  borderColor: "#C66065"
                                }
                              : {
                                  ...firstStakeSectionItem,
                                  borderColor: "rgb(65, 65, 65)"
                                }
                            : amountFocus
                            ? {
                                ...firstStakeSectionItemLight,
                                borderColor: "#C66065"
                              }
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
                          onFocus={() => onToggleFocus("amount")}
                          onBlur={() => onToggleFocus("amount")}
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
                            ? daysFocus
                              ? {
                                  ...firstStakeSectionItem,
                                  borderColor: "#C66065"
                                }
                              : {
                                  ...firstStakeSectionItem,
                                  borderColor: "rgb(65, 65, 65)"
                                }
                            : daysFocus
                            ? {
                                ...firstStakeSectionItemLight,
                                borderColor: "#C66065"
                              }
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
                          onFocus={() => onToggleFocus("days")}
                          onBlur={() => onToggleFocus("days")}
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
                                  cursor: "pointer",
                                  position: "relative"
                                }
                              : {
                                  ...firstStakeSectionItemLight,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  cursor: "pointer",
                                  position: "relative"
                                }
                          }
                          onClick={() => handleClickOpen()}
                          item
                        >
                          <input
                            className={
                              themeDark
                                ? "inputTextStake setIpad"
                                : "inputTextStakeLight setIpad"
                            }
                            placeholder={token.outputTokenSymbol}
                            disabled={true}
                            style={{ cursor: "pointer" }}
                            xs={12}
                          />
                          <ExpandMoreIcon
                            style={{
                              fontSize: 40,
                              color: "#C66065",
                              cursor: "pointer",
                              position: "absolute",
                              right: "-3px"
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
                          value={Number(interestRate).toFixed(4)}
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
