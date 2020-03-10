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
  const [open, setOpen] = React.useState(false);
  const [durationDaysInput, setDurationDays] = React.useState(1);
  const [amountXioInput, setAmountXIO] = React.useState(1);
  const [address, setAccountAddress] = useState("");
  const [isUnlock, setIsUnlock] = useState(false);
  const [interestRate, setinterestRate] = useState("");
  const [token, setToken] = useState("OMG");
  const [balance, setBalance] = useState(false);
  const [unitRate,setUnitRate] = useState(0)
  const [tokensList,setTokensList] = useState([])
  const [initial,setInitial] = useState(true)

  const onChangeAmount = e => {
    if (
      (e.target.value.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/) ||
      e.target.value == "") && Number(e.target.value) <= 10000
    ) {
      setAmountXIO(e.target.value);
      const rate = Number(e.target.value) * Number(durationDaysInput) * unitRate
      console.log('ate ==>',rate)
      setinterestRate(rate)
      // if (e.target.value) getXIOtoETHs(e.target.value, durationDaysInput);
    } else {
      console.log("nothing");
    }
  };

  const onChangeDurationDays = e => {
    var reg = new RegExp("^\\d+$");
    if ((reg.test(e.target.value) || e.target.value == "")&& Number(e.target.value) <= 30) {
      setDurationDays(e.target.value);
      const rate = Number(e.target.value) * Number(amountXioInput) * unitRate
      console.log('ate ==>',rate)
      setinterestRate(rate)
      // if (e.target.value) getXIOtoETHs(amountXioInput, e.target.value);
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

  useEffect(() => {
    initInfura()
    initPortalWithInfura()
    onGetInterestRate()
    ethereum = window.ethereum;
    if (ethereum) {
      checkWeb3();
      initXioContract();
      initPortalContract();
      getTokensData()
    }
  }, []);
  useEffect(() => {
    if (contract && address) {
      getIsUnlock()
      // if (balance) getIsUnlock();
      // approve();
    }
  }, [address, balance]);

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

  const initInfura = () => {
    const OPTIONS = {
      // defaultBlock: "latest",
      transactionConfirmationBlocks: 1,
      transactionBlockTimeout: 5
    };
    web3 = new Web3("https://rinkeby.infura.io/v3/ff4d778692ad42f7966a456564283e9d", null, OPTIONS)
    console.log('web3 ==>',web3)
  }

  const initPortalWithInfura = () => {
    infuraPortal = new web3.eth.Contract(PORTAL_ABI, PORTAL_ADDRESS);
  }

  const getXIOtoETHs = async (amount) => {
    try {
      const res = await infuraPortal.methods.getXIOtoETH(amount).call();
      console.log("res of xiotoeth ==>", res);
      return getETHtoALTs(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getETHtoALTs = async amount => {
    try {
      let res = await infuraPortal.methods
        .getETHtoALT(amount, OMG_EXCHANGE)
        .call();
      console.log("res of ethToAlt ==>", res);
      res = await web3js.utils.fromWei(res.toString())
      if(initial){
        setUnitRate(res);
        setinterestRate(res)
        setInitial(false)
      }
        res = await web3js.utils.toWei(res.toString())
      return res
    } catch (e) {
      console.log(e);
      setUnitRate(0);
      setinterestRate(0)
    }
  };

  const onGetInterestRate = async () => {
    try {
      const res = await infuraPortal.methods.getInterestRate().call();
      console.log('res ==>',res)
      initialRate = res;
      console.log('initail rate ==>',await web3js.utils.fromWei(initialRate.toString()))
      getXIOtoETHs(res)
    }
    catch(e){
      console.log(e)
    }
  }

  const getTokensData = async () => {
    try{
      const tokenList = [];
      const tokens = {}
      let index = 0;
      while(true){
        const res = await portalContract.methods.portalData(index).call()
        console.log(res)
        if(res.tokenAddress == "0x0000000000000000000000000000000000000000"){
          break;
        }
        if(tokens[res.outputTokenSymbol]){}
        else{
          tokens[res.outputTokenSymbol] = 1
          tokenList.push(res)
        }
        index++;
      }
      setTokensList(tokenList)
    }
    catch(e){
      console.log(e)
    }
  }

  const confirmStake = async () => {
    try {
      if (address) {
        const amount = await web3js.utils.toWei(amountXioInput.toString());
        const soldxio = (Number(amountXioInput) * initialRate)
        const timestamp = 24 * 60 * 60 * 1000;
        const rateFromWei = await web3js.utils.fromWei(initialRate.toString())
        const calculatedValue = Number(durationDaysInput)*Number(amountXioInput)*Number(rateFromWei)
        const tokensBought = await getXIOtoETHs(await web3js.utils.toWei(calculatedValue.toString()));
        const params = {
          tokenAddress:token.tokenAddress,
            durationDaysInput,
            amount,
            tokensBought,
            portalId:token.portalId,
            symbol:token.outputTokenSymbol
        };
        console.log('params ==>',params);
        await portalContract.methods
          .stakeXIO(
            token.tokenAddress,
            durationDaysInput,
            amount,
            tokensBought,
            token.portalId,
            token.outputTokenSymbol
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
      } else {
        alert("PLEASE CONNECT TO METAMASK WALLET !!");
      }
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

  const getBalance = async () => {
    let res = await contract.methods.balanceOf(address).call();
    setBalance(res != 0);
    res = await web3js.utils.fromWei(res.toString())
    console.log(res);
    if(Number(res) < Number(amountXioInput)){
      alert("Insufficient Funds!!")
      return;
    }
    confirmStake()
  };

  const approve = async () => {
    try {
      if (address) {
        let contract = new web3.eth.Contract(XIO_ABI,XIO_ADDRESS)
        const amount = await web3js.utils.toWei(amountXioInput.toString());

        let rawTransaction = {
          from: address,
          to: "0x5d3069CBb2BFb7ebB9566728E44EaFDaC3E52708",
          value: 0,
          data: contract.methods.transfer(PORTAL_ADDRESS,amount).encodeABI()
        };

        web3js.eth.sendTransaction(rawTransaction)
        .on('transactionHash', function(hash){
          console.log('hash ==>',hash)
      })
      .on('receipt', function(receipt){
          console.log('receipt ==>',receipt)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        if(confirmationNumber == 1){
          console.log('confirmation ==>',confirmationNumber)
        }
       })
      .on('error', console.error);
      } else {
        alert("PLEASE CONNECT TO METAMASK WALLET !!");
      }
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

  const onConfirmStakeClick = () => {
    isUnlock ? getBalance() : approve()
  }

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
                balance={balance}
                onConfirmClick={onConfirmStakeClick}
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
                            placeholder={token.outputTokenSymbol}
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
                          value={Number(interestRate).toFixed(2)}
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
