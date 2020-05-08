import React, { useState, useEffect,useRef } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";
import { ThemeConsumer } from "../../config/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialog from "../common/Dialog";
import { connect } from "react-redux";
import {
  getTokenData,
  onGetIsUnlock,
  onGetDaysLimit,
  onGetXioLimit,
  onGetInterestRate,
  onSetInterestRate,
  onSetInitial,
  onSetDays,
  onSetXio,
  onSetToken,
} from "../../store/actions/stakeActions";
import { getBalance } from "../../store/actions/dashboardActions";


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

const useStyles = makeStyles((theme) => ({
  searchBarInput: {
    border: "none",
  },
  searchBar: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
      border: "none",
    },
  },
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

const tableHeader = {
  color: "white",
};

const tableHeaderLight = {
  color: "black",
};

const firstStakeSectionItem = {
  border: "1px solid rgb(65, 65, 65)",
  backgroundColor: "rgb(28, 28, 28)",
};

const firstStakeSectionItemLight = {
  border: "1px solid rgb(65, 65, 65)",
  "background-color": "#d3d3d33d",
};

const plusEqual = {
  color: "#c66065",
};

const Stake = (props) => {
  const [open, setOpen] = useState(false);
  const [durationDaysInput, setDurationDays] = useState(1);
  const [amountXioInput, setAmountXIO] = useState(1);
  const [token, setToken] = useState("OMG");
  const [amountFocus, setAmountFocus] = useState(false);
  const [daysFocus, setDaysFocus] = useState(false);
  const [isAmountLimit, setIsAmountLimit] = useState(false);

  const loadingRef = useRef(props.stakeLoading)

  const onToggleFocus = (field) => {
    if (field === "amount") {
      setAmountFocus(!amountFocus);
    } else {
      setDaysFocus(!daysFocus);
    }
  };

  const onChangeAmount = (e) => {
    if (
      (e.target.value.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/) ||
        e.target.value == "") &&
      Number(e.target.value) <= props.xioLimit
    ) {
      setAmountXIO(e.target.value);
      props.onSetXio(e.target.value);
      const rate =
        Number(e.target.value) * Number(durationDaysInput) * props.unitRate;
      //console.log("ate ==>", rate);
      if (Number(e.target.value) > Number(props.balance)) {
        setIsAmountLimit(true);
        console.log("bara ==>");
      } else {
        setIsAmountLimit(false);
        console.log("chota ==>");
      }
      props.onSetInterestRate(rate);
    } else {
      //console.log("nothing");
    }
  };

  const onChangeDurationDays = (e) => {
    var reg = new RegExp("^\\d+$");
    if (
      (reg.test(e.target.value) || e.target.value == "") &&
      Number(e.target.value) <= props.daysLimit
    ) {
      setDurationDays(e.target.value);
      props.onSetDays(e.target.value);
      const rate =
        Number(e.target.value) * Number(amountXioInput) * props.unitRate;
      //console.log("ate ==>", rate);
      props.onSetInterestRate(rate);
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

  const onTokenSelect = (data) => {
    props.onSetInitial();
    setToken(data);
    props.onSetToken(data);
    handleClickClose();
  };

  useEffect(()=>{
    window.addEventListener('beforeunload',(e)=>{
      console.log('porps.stakeLoading ==>',props.stakeLoading)
      if(loadingRef.current){
        var confirmationMessage = 'Are you sure to leave the page?';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }
    })

    return () => {
      window.removeEventListener('beforeunload',(e)=>{})
    }
  },[])

  useEffect(()=>{
    loadingRef.current = props.stakeLoading
  },[props.stakeLoading])

  useEffect(() => {
    // props.onSetXio(amountXioInput);
    // props.onSetDays(durationDaysInput);
    // props.getTokensData();
    props.onGetXioLimit();
    props.onGetDaysLimit();
    if (props.address) {
      props.getBalance(props.address);
      props.onGetIsUnlock();
    }
  }, [props.address, props.balance]);

  useEffect(() => {
    if (token.outputTokenSymbol)
      props.onGetInterestRate(
        props.initial,
        amountXioInput,
        durationDaysInput,
        token
      );
  }, [token.outputTokenSymbol]);

  useEffect(() => {
    if (!token.outputTokenSymbol) setToken(props.token);
  }, [props.token]);

  useEffect(()=>{
    setAmountXIO(props.xioAmount);
    setDurationDays(props.days)
  },[props.xioAmount,props.days])

  const dialogProps = {
    open,
    handleClose: handleClickClose,
    onTokenSelect,
    tokensList: props.tokensList,
  };

  return (
    <>
      <ThemeConsumer>
        {({ isThemeDark, themeDark }) => {
          return (
            <>
              <CustomDialog {...dialogProps} />
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
                    className="stakeTableHeader"
                    style={themeDark ? tableHeader : tableHeaderLight}
                    md={2}
                    sm={4}
                    xs={12}
                    justify="center"
                  >
                    <Grid item xs={12}>
                      <p
                        className="toggleHeadText_2"
                        style={{ fontSize: "10px", height: 26 }}
                      >
                        {"QUANTITY (XIO)"}
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
                                borderColor: "#C66065",
                              }
                            : {
                                ...firstStakeSectionItem,
                                borderColor: "rgb(65, 65, 65)",
                              }
                          : amountFocus
                          ? {
                              ...firstStakeSectionItemLight,
                              borderColor: "#C66065",
                            }
                          : firstStakeSectionItemLight
                      }
                    >
                      <input
                        onChange={onChangeAmount}
                        className={
                          themeDark ? "inputTextStake" : "inputTextStakeLight"
                        }
                        style={{
                          color: isAmountLimit
                            ? "#C66065"
                            : themeDark
                            ? "white"
                            : "#414141",
                        }}
                        disabled={props.stakeLoading}
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
                                borderColor: "#C66065",
                              }
                            : {
                                ...firstStakeSectionItem,
                                borderColor: "rgb(65, 65, 65)",
                              }
                          : daysFocus
                          ? {
                              ...firstStakeSectionItemLight,
                              borderColor: "#C66065",
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
                        disabled={props.stakeLoading}
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
                                position: "relative",
                              }
                            : {
                                ...firstStakeSectionItemLight,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                cursor: "pointer",
                                position: "relative",
                              }
                        }
                        onClick={() => props.stakeLoading ? null : handleClickOpen()}
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
                            right: "-3px",
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
                        value={Number(props.interestRate).toFixed(4)}
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

Stake.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    days: state.stakeReducer.days,
    token: state.stakeReducer.token,
    initial: state.stakeReducer.initial,
    address: state.layoutReducer.address,
    unitRate: state.stakeReducer.unitRate,
    xioLimit: state.stakeReducer.xioLimit,
    xioAmount: state.stakeReducer.xioAmount,
    daysLimit: state.stakeReducer.daysLimit,
    balance: state.dashboardReducer.balance,
    tokensList: state.stakeReducer.tokenList,
    stakeLoading: state.layoutReducer.stakeLoading,
    interestRate: state.stakeReducer.interestRate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetXio: (xio) => dispatch(onSetXio(xio)),
    onSetInitial: () => dispatch(onSetInitial()),
    getTokensData: () => dispatch(getTokenData()),
    onGetXioLimit: () => dispatch(onGetXioLimit()),
    onSetDays: (days) => dispatch(onSetDays(days)),
    onGetDaysLimit: () => dispatch(onGetDaysLimit()),
    onSetToken: (token) => dispatch(onSetToken(token)),
    getBalance: (address) => dispatch(getBalance(address)),
    onGetIsUnlock: (address) => dispatch(onGetIsUnlock(address)),
    onSetInterestRate: (interest) => dispatch(onSetInterestRate(interest)),
    onGetInterestRate: (initial, xio, days, token) =>
      dispatch(onGetInterestRate(initial, xio, days, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Stake));
