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
import { getCurrentGasPrices } from "../../utils";
import { connect } from "react-redux";
import {onSetUnStakeAmount,onAllowedUnstake,onSetWarning,onCalculateUnstakeXIO} from "../../store/actions/unstakeActions"

let web3js = "";

let contract = "";

let portalContract = "";

let accounts = "";

let ethereum = "";

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
  },
});

const firstWithdrawSectionItem = {
  border: "1px solid rgb(65, 65, 65)",
  backgroundColor: "rgb(28, 28, 28)",
};

const firstWithdrawSectionItemLight = {
  border: "1px solid rgb(65, 65, 65)",
  "background-color": "#d3d3d33d",
};

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const Withdraw = (props) => {
  const { showDropdown, setShowDropdown } = props;
  const amountXio = "AMOUNT (XIO)";
  const durationDays = "DURATION (DAYS)";
  const outputToken = "UNSTAKE TOKEN";
  const instantInterest = "UNSTAKE AMOUNT";
  const classes = useStyles();
  const [amount, setAmount] = useState();
  const [amountFocus, setAmountFocus] = useState(false);

  useEffect(() => {
    props.onUnstakeAmount()
    if (props.address) {
      props.onCalculateUnstakeXIO(props.address);
    }
  }, [props.address]);

  useEffect(()=>{

  },[amount])

  const onToggleFocus = (type = "") => {
    if (type === "focus" && !amount) {
      setAmount(props.stakedXio);
    }
    setAmountFocus(!amountFocus);
  };

  const onChangeAmount = (e) => {
    if (
      e.target.value.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/) ||
      e.target.value == ""
    ) {
      setAmount(e.target.value);
      props.onUnstakeAmount(e.target.value)
    } else {
      console.log("nothing");
    }
  };

  return (
    <>
      <ThemeConsumer>
        {({ isThemeDark, themeDark }) => {
          return (
            <>
              <Grid container item className="firstSectionContainer " md={12}>
                <Grid
                  style={{
                    paddingBottom: "10px",
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
                                justifyContent: "space-around",
                              }
                            : {
                                ...firstWithdrawSectionItemLight,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                              }
                        }
                        item
                      >
                        <input
                          className={themeDark ? "inputText" : "inputTextLight"}
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
                                borderColor: "#C66065",
                              }
                            : {
                                ...firstWithdrawSectionItem,
                                borderColor: "rgb(65, 65, 65)",
                              }
                          : amountFocus
                          ? {
                              ...firstWithdrawSectionItemLight,
                              borderColor: "#C66065",
                            }
                          : firstWithdrawSectionItemLight
                      }
                    >
                      <input
                        className={themeDark ? "inputText" : "inputTextLight"}
                        placeholder="0.0"
                        value={amount}
                        style={
                          Number(amount) > Number(props.stakedXio)
                            ? { color: "#C66065" }
                            : {}
                        }
                        onChange={(e) => onChangeAmount(e)}
                        onFocus={() => onToggleFocus("focus")}
                        onBlur={() => onToggleFocus()}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          );
        }}
      </ThemeConsumer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.layoutReducer.address,
    balance: state.dashboardReducer.balance,
    stakedXio: state.unstakeReducer.unstakeableXIO
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUnstakeAmount : (amount) => dispatch(onSetUnStakeAmount(amount)),
    onAllowedUnstake: (allowed) => dispatch(onAllowedUnstake(allowed)),
    onCalculateUnstakeXIO: (address) => dispatch(onCalculateUnstakeXIO(address)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Withdraw));
