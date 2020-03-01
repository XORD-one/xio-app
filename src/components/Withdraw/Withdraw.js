import React,{useState,useEffect} from "react";
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
  const outputToken = "WITHDRAW TOKEN";
  const instantInterest = "WITHDRAW AMOUNT";
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [address,setAccountAddress] = useState('')

  useEffect(()=>{
    ethereum = window.ethereum;
    if (ethereum) {
      checkWeb3();
      initXioContract()
      initPortalContract()
    }
  },[])

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
  }

  const initPortalContract = () => {
    portalContract = new web3js.eth.Contract(PORTAL_ABI, PORTAL_ADDRESS);
  }

  const initXioContract = () => {
    contract = new web3js.eth.Contract(XIO_ABI, XIO_ADDRESS);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

              <Layout tabName="withdraw" address={address} onConnect={onConnect}>
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
                        <p className="colHeading" style={{ fontSize: "11px" }}>{outputToken}</p>
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
                                  justifyContent: "space-around",
                                  cursor: "pointer"
                                }
                              : {
                                  ...firstWithdrawSectionItemLight,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  cursor: "pointer"
                                }
                          }
                          item
                        >
                          <input
                            className={
                              themeDark ? "inputText" : "inputTextLight"
                            }
                            placeholder="XIO"
                            disabled={true}
                            style={{ cursor: "pointer" }}
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
                        <p className="colHeading" style={{ fontSize: "11px" }}>{instantInterest}</p>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        xs={6}
                        className="firstWithdrawSectionItem"
                        style={
                          themeDark
                            ? firstWithdrawSectionItem
                            : firstWithdrawSectionItemLight
                        }
                      >
                        <input
                          className={themeDark ? "inputText" : "inputTextLight"}
                          disabled="true"
                          placeholder="0.0"
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
