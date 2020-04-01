import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";
import Layout from "../../layout";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeConsumer } from "../../config/index";
import CustomDialog from "../common/Dialog";
import Web3 from "web3";
import { XIO_ABI, XIO_ADDRESS } from "../../contracts/xio";
import { PORTAL_ABI, PORTAL_ADDRESS } from "../../contracts/portal";

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

const firstWithdrawSectionItem = {
  border: "1px solid rgb(65, 65, 65)",
  backgroundColor: "rgb(28, 28, 28)"
};

const firstWithdrawSectionItemLight = {
  border: "1px solid rgb(65, 65, 65)",
  "background-color": "#d3d3d33d"
};

const useStyles = makeStyles(theme => ({
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

const Withdraw = props => {
  const { showDropdown, setShowDropdown } = props;
  const amountXio = "AMOUNT (XIO)";
  const durationDays = "DURATION (DAYS)";
  const outputToken = "UNSTAKE TOKEN";
  const instantInterest = "UNSTAKE AMOUNT";
  const classes = useStyles();

  const [token, setToken] = useState("OMG");
  const [open, setOpen] = React.useState(false);
  const [address, setAccountAddress] = useState("");
  const [amount, setAmount] = useState();
  const [tokensList, setTokensList] = useState([]);
  const [stakedXio, setStakedXio] = useState(0);
  const [amountFocus, setAmountFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState("main");

  useEffect(() => {
    let timer;
    ethereum = window.ethereum;
    if (ethereum) {
      checkWeb3();
      timer = setInterval(() => {
        checkWeb3();
      }, 3000);
      initPortalContract();
      initXioContract();
      onGetLengthOfStakerData();
      // getTokensData()
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [address]);

  const onToggleFocus = (type = "") => {
    if (type === "focus" && !amount) {
      setAmount(stakedXio);
    }
    setAmountFocus(!amountFocus);
  };

  const onGetLengthOfStakerData = async () => {
    try {
      console.log("check ==>", portalContract, address);
      const res = await portalContract.methods
        .getArrayLengthOfStakerData(address)
        .call();
      console.log("res ==>", res);
      getStakerData(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getStakerData = async data => {
    try {
      let amount = 0;
      for (let i = 0; i < data; i++) {
        const res = await portalContract.methods.stakerData(address, i).call();
        console.log(res);
        console.log(Math.round(new Date() / 1000));
        console.log(
          !!(
            res.stakeInitiationTimestamp + res.stakeDurationTimestamp <=
              Math.round(new Date() / 1000) &&
            res.publicKey != "0x0000000000000000000000000000000000000000"
          )
        );
        if (
          Number(res.stakeInitiationTimestamp) +
            Number(res.stakeDurationTimestamp) <=
            Math.round(new Date() / 1000) &&
          res.publicKey != "0x0000000000000000000000000000000000000000"
        ) {
          res.stakeQuantity = await web3js.utils.fromWei(
            res.stakeQuantity.toString()
          );
          amount = amount + Number(res.stakeQuantity);
        }
      }
      console.log("amount ==>", amount);
      setStakedXio(amount);
    } catch (e) {
      console.log(e);
    }
  };
  // const getTokensData = async () => {
  //   try{
  //     const tokenList = [];
  //     const tokens = {}
  //     let index = 0;
  //     while(true){
  //       const res = await portalContract.methods.portalData(index).call()
  //       console.log(res)
  //       if(res.tokenAddress == "0x0000000000000000000000000000000000000000"){
  //         break;
  //       }
  //       if(tokens[res.outputTokenSymbol]){}
  //       else{
  //         tokens[res.outputTokenSymbol] = 1
  //         tokenList.push(res)
  //       }
  //       index++;
  //     }
  //     setTokensList(tokenList)
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }

  async function checkWeb3() {
    // Use Mist/MetaMask's provider.
    web3js = new Web3(window.web3.currentProvider);
    //get selected account on metamask
    accounts = await web3js.eth.getAccounts();
    if (accounts[0] !== address) {
      setAccountAddress(accounts[0]);
    }
    //get network which metamask is connected too
    let getNetwork = await web3js.eth.net.getNetworkType();
    if (getNetwork !== network) setNetwork(getNetwork);
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

  const onCanWidthdrawXio = async () => {
    try {
      let weiAmount = await web3js.utils.toWei(amount.toString());
      console.log("weiAmount and Address ==>", weiAmount, address);
      const res = await portalContract.methods
        .canWithdrawXIO(weiAmount, address)
        .call();
      console.log(res);
      if (res) {
        onWithdrawXio();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onWithdrawXio = async (updateList, onSetMessage) => {
    try {
      if (address) {
        if (amount && Number(amount) < 1) {
          onSetMessage("Please enter the amount of XIO you want to unstake.");
          return;
        }
        setLoading(true);
        const amountToSend = await web3js.utils.toWei(amount.toString());
        console.log("amountToSend and amount", amountToSend, amount);
        let rawTransaction = {
          from: address,
          to: PORTAL_ADDRESS,
          value: 0,
          gasPrice : web3js.eth.getGasPrice(),
          gasAmount : await portalContract.methods.withdrawXIO(amountToSend).estimateGas({from: address}),
          data: portalContract.methods.withdrawXIO(amountToSend).encodeABI()
        };
        console.log(rawTransaction);
        web3js.eth
          .sendTransaction(rawTransaction)
          .on("transactionHash", function(hash) {
            console.log("hash ==>", hash);
          })
          .on("receipt", function(receipt) {
            console.log("receipt ==>", receipt);
          })
          .on("confirmation", function(confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              onGetLengthOfStakerData();
              setTimeout(() => {
                setLoading(false);
                setAmount(0);
                onSetMessage("Staked XIO Successfully Unstaked.");
                updateList();
              }, 3000);
              console.log("confirmation ==>", confirmationNumber);
            }
          })
          .on("error", e => {
            console.log(e);
            setLoading(false);
            onSetMessage("Oops, something went wrong please try again.");
          });
      } else {
        onSetMessage("PLEASE CONNECT TO METAMASK WALLET !!");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      onSetMessage("Oops, something went wrong please try again.");
    }
  };

  const onChangeAmount = e => {
    if (
      e.target.value.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/) ||
      e.target.value == ""
    ) {
      setAmount(e.target.value);
    } else {
      console.log("nothing");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTokenSelect = data => {
    console.log(data);
    setToken(data);
    handleClose();
  };

  const dialogProps = {
    open,
    handleClose,
    onTokenSelect,
    tokensList
  };

  return (
    <>
      <ThemeConsumer>
        {({ isThemeDark, themeDark }) => {
          const allowed = amount
            ? Number(stakedXio) - Number(amount) < 0
              ? 0
              : Number(stakedXio) - Number(amount)
            : stakedXio;
          return (
            <>
              <Layout
                tabName="unstake"
                loading={loading}
                network={network}
                allowedWithdraw={allowed}
                address={address}
                onConnect={onConnect}
                onWithdraw={onWithdrawXio}
                warning={Number(amount) > Number(stakedXio)}
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
                      className={
                        themeDark
                          ? "tableWithdrawHeader"
                          : "tableWithdrawHeaderLight"
                      }
                      md={3}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item sm={12} xs={12}>
                        <p className="colHeading" style={{ fontSize: "11px" }}>
                          {outputToken}
                        </p>
                      </Grid>

                      <Grid sm={12} xs={6} container justify="center">
                        <Grid
                          className="firstWithdrawSectionItem"
                          // onClick={handleClickOpen}
                          style={
                            themeDark
                              ? {
                                  ...firstWithdrawSectionItem,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around"
                                }
                              : {
                                  ...firstWithdrawSectionItemLight,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around"
                                }
                          }
                          item
                        >
                          <input
                            className={
                              themeDark ? "inputText" : "inputTextLight"
                            }
                            placeholder={"XIO"}
                            disabled={true}
                            xs={12}
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
                      <Grid item md={12} className="plusEqual" align="center">
                        =
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      className={
                        themeDark
                          ? "tableWithdrawHeader"
                          : "tableWithdrawHeaderLight"
                      }
                      md={3}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item sm={12} xs={12}>
                        <p className="colHeading" style={{ fontSize: "11px" }}>
                          {instantInterest}
                        </p>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        xs={6}
                        className="firstWithdrawSectionItem"
                        style={
                          themeDark
                            ? amountFocus
                              ? {
                                  ...firstWithdrawSectionItem,
                                  borderColor: "#C66065"
                                }
                              : {
                                  ...firstWithdrawSectionItem,
                                  borderColor: "rgb(65, 65, 65)"
                                }
                            : amountFocus
                            ? {
                                ...firstWithdrawSectionItemLight,
                                borderColor: "#C66065"
                              }
                            : firstWithdrawSectionItemLight
                        }
                      >
                        <input
                          className={themeDark ? "inputText" : "inputTextLight"}
                          placeholder="0.0"
                          value={amount}
                          style={
                            Number(amount) > Number(stakedXio)
                              ? { color: "red" }
                              : {}
                          }
                          onChange={e => onChangeAmount(e)}
                          onFocus={() => onToggleFocus("focus")}
                          onBlur={() => onToggleFocus()}
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

export default withStyles(styles)(Withdraw);
