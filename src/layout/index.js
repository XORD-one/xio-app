import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Link,
} from "@material-ui/core";
import RocketIcon from "@material-ui/icons/Delete";
import Logo from "../components/assets/images/xio-logo.svg";
import LogoLight from "../components/assets/images/xio-logo-light.svg";
import Rocket from "../components/assets/images/rocket.svg";
import { ThemeConsumer } from "../config/index";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faTelegram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory, withRouter } from "react-router-dom";
import xordLogoLight from "../components/assets/images/xord-logo-black.png";
import xordLogoDark from "../components/assets/images/xord-logo-white.png";
import spinnerWhite from "../components/assets/images/spinner-white.svg";
import spinnerBlack from "../components/assets/images/spinner-black.svg";
import Toast from "../components/common/Toast";
import Agreement from "../components/common/Agreement/index";
import { connect } from "react-redux";
import { onApprove, onConfirmStake } from "../store/actions/stakeActions";
import {onUnStakeXio} from "../store/actions/unstakeActions"
import {getStakerData,checkRemainingTransactions} from "../store/actions/dashboardActions"

const layoutSubHeading = {
  color: "rgb(198, 96, 101)",
};

const layoutHeadingLight = {
  color: "black",
  letterSpacing: 6,
};
const layoutHeadingDark = {
  color: "white",
  letterSpacing: 6,
};

const tableHeader = {
  color: "white",
};

const socialIcon = {
  color: "#b8b8b8",
  margin: 0,
  display: "inline-block",
  marginRight: 10,
  cursor: "pointer",
};

const headingDiv = {
  flexDirection: "column",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "bold",
  alignItems: "center",
};

const tabBody = {
  backgroundColor: "#030303",
  margin: 0,
  borderLeft: "1px solid #2d2d2d",
  borderRight: "1px solid #2d2d2d",
  borderBottom: "1px solid #2d2d2d",
};
const tabBodyLight = {
  backgroundColor: "white",
  margin: 0,
  borderLeft: "1px solid #DADADA",
  borderRight: "1px solid #DADADA",
  borderBottom: "1px solid #DADADA",
};

const Index = ({
  children,
  ...props
}) => {
  const [completed, setCompleted] = useState(false);

  const handleThemeState = (isThemeDark, themeDark) => {
    isThemeDark(!themeDark);
  };

  useEffect(()=>{
    if(props.address && props.location.pathname !== '/'){
      console.log('dashboard nhi ha yeh --><--')
      props.getStakerData(props.address)
      props.checkRemainingTransactions(props.address)
    }
  },[props.address])

  const allowedWithdraw =  props.unstakeAmount
  ? Number(props.unstakeableXIO) - Number(props.unstakeAmount) < 0
    ? 0
    : Number(props.unstakeableXIO) - Number(props.unstakeAmount)
  : props.unstakeableXIO;

  const warning = Number(props.unstakeAmount) > Number(props.unstakeableXIO)

  console.log("Layout props ==>", props);
  let history = useHistory();
  return (
    <ThemeConsumer>
      {({
        isThemeDark,
        themeDark,
        handleClick,
        open,
        toggleAgreement,
      }) => {
        const addressToShow =
          props.address &&
          props.address.slice(0, 6) + "...." + props.address.slice(props.address.length - 4);

        const agreementProps = {
          open,
          onClose: toggleAgreement,
        };
        return (
          <>
            <Agreement {...agreementProps} />
            <Toast />
            <div
              style={{
                backgroundColor: themeDark ? "#1C1C1C" : "white",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Grid>
                <Grid
                  container
                  justify="space-between"
                  style={{ padding: "20px 50px 0px" }}
                  md={12}
                >
                  <Grid
                    className="socialIcons"
                    item
                    md={3}
                    sm={3}
                    xs={12}
                    style={{ padding: "15px 0px" }}
                  >
                    <h4 style={socialIcon}>
                      <Link
                        href="https://www.linkedin.com/company/xio-incubator"
                        rel="noreferrer"
                        target="_blank"
                        style={{ color: "#b8b8b8" }}
                        className="socialIcon"
                      >
                        <FontAwesomeIcon icon={faLinkedinIn} />
                      </Link>
                      {/*  */}
                    </h4>
                    <h4 style={socialIcon}>
                      <Link
                        href="https://twitter.com/xio_network"
                        rel="noreferrer"
                        target="_blank"
                        style={{ color: "#b8b8b8" }}
                        className="socialIcon"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </Link>
                    </h4>
                    <h4 style={socialIcon}>
                      <Link
                        href="https://www.youtube.com/c/bombx/"
                        rel="noreferrer"
                        target="_blank"
                        style={{ color: "#b8b8b8" }}
                        className="socialIcon"
                      >
                        <FontAwesomeIcon icon={faYoutube} />
                      </Link>
                    </h4>
                    <h4 style={socialIcon}>
                      <Link
                        href="https://www.facebook.com/groups/xionetwork"
                        rel="noreferrer"
                        target="_blank"
                        style={{ color: "#b8b8b8" }}
                        className="socialIcon"
                      >
                        <FontAwesomeIcon icon={faFacebookF} />
                      </Link>
                    </h4>
                    <h4 style={socialIcon}>
                      <Link
                        href="https://t.me/xionews"
                        rel="noreferrer"
                        target="_blank"
                        style={{ color: "#b8b8b8" }}
                        className="socialIcon"
                      >
                        <FontAwesomeIcon icon={faTelegram} />
                      </Link>
                    </h4>
                  </Grid>
                  <Grid
                    className="logo"
                    item
                    style={{ textAlign: "center" }}
                    xs={12}
                    sm={3}
                    md={3}
                  >
                    <img
                      src={themeDark ? Logo : LogoLight}
                      height="50px"
                      width="50px"
                    />
                  </Grid>

                  <Grid
                    className="connectButtonContain"
                    item
                    md={3}
                    sm={4}
                    xs={12}
                  >
                    <div
                      style={{
                        border: themeDark
                          ? "1px solid #414141"
                          : "1px solid #DADADA",
                        display: "inline-block",
                        padding: "8px 15px 10px 10px",
                        borderRadius: 5,
                      }}
                      className={
                        themeDark ? "connectButton" : "connectButtonLight"
                      }
                      onClick={() => props.onConnect(handleClick)}
                    >
                      <img
                        src={Rocket}
                        height="20px"
                        width="20px"
                        style={{
                          margin: "0px 12px 0px 0px",
                          position: "relative",
                          top: 5,
                        }}
                      />
                      <h4
                        style={{
                          color: themeDark ? "#b8b8b8" : "#545454",
                          display: "inline-block",
                          fontFamily: "'Montserrat', sans-serif",
                          margin: 0,
                          height: "20px",
                          letterSpacing: "2px",
                        }}
                      >
                        {props.address ? addressToShow : "CONNECT WALLET"}
                      </h4>
                    </div>
                  </Grid>
                </Grid>

                <Grid container style={headingDiv} md={12}>
                  <h3
                    style={themeDark ? layoutHeadingDark : layoutHeadingLight}
                    className="layoutHeading"
                  >
                    INSTANT. UPFRONT. INTEREST.
                  </h3>
                  {/* <h3 className="layoutSubHeading" style={layoutSubHeading}>STAKE XIO. GET PAID. ZERO WAIT</h3> */}
                </Grid>

                <Grid
                  container
                  item
                  justify="center"
                  style={{ paddingBottom: 20 }}
                  md={12}
                >
                  <Grid
                    container
                    item
                    justify="space-around"
                    style={
                      themeDark
                        ? {
                            border: "1px solid #C66065",
                            borderRadius: "5px",
                            fontFamily: "'Montserrat', sans-serif",
                          }
                        : {
                            backgroundColor: "#f7f7f7",
                            border: "1px solid #C66065",
                            borderRadius: "5px",
                            fontFamily: "'Montserrat', sans-serif",
                          }
                    }
                    md={8}
                  >
                    <h4
                      style={{
                        color:
                          props.location.pathname === "/"
                            ? themeDark
                              ? "white"
                              : "black"
                            : themeDark
                            ? "#545454"
                            : "#DADADA",
                        justifyContent: "flex-start",
                        letterSpacing: "2px",
                        cursor: "pointer",
                        width:"33%",
                        textAlign:"center"
                      }}
                      className="tabarText"
                      onClick={() => history.push("/")}
                    >
                      DASHBOARD
                    </h4>
                    <h4
                      style={{
                        color:
                          props.location.pathname === "/stake"
                            ? themeDark
                              ? "white"
                              : "black"
                            : themeDark
                            ? "#545454"
                            : "#DADADA",
                        justifyContent: "center",
                        letterSpacing: "2px",
                        cursor: "pointer",
                        width:"33%",
                        textAlign:"center"
                      }}
                      className="tabarText"
                      onClick={() => history.push("/stake")}
                    >
                      STAKE
                    </h4>
                    <h4
                      style={{
                        color:
                          props.location.pathname === "/unstake"
                            ? themeDark
                              ? "white"
                              : "black"
                            : themeDark
                            ? "#545454"
                            : "#DADADA",
                        justifyContent: "flex-end",
                        letterSpacing: "2px",
                        cursor: "pointer",
                        width:"33%",
                        textAlign:"center"
                      }}
                      className="tabarText"
                      onClick={() => history.push("/unstake")}
                    >
                      UNSTAKE
                    </h4>
                  </Grid>

                  <Grid
                    className="childContainer"
                    container
                    item
                    style={themeDark ? tabBody : tabBodyLight}
                    md={8}
                  >
                    {!completed && children}

                    {completed && (
                      <Grid
                        className="layoutActionWrapper"
                        style={tableHeader}
                        item
                        xs={12}
                        style={{ alignSelf: "center" }}
                      >
                        <h6>YOU HAVE COMPLETED THE DEMO</h6>
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    className="layoutActionWrapper"
                    style={tableHeader}
                    item
                    md={6}
                    xs={12}
                    style={{ alignSelf: "center" }}
                  >
                    {props.location.pathname === "/stake" && (
                      <>
                        {props.stakeLoading ? (
                          <div style={{ margin: "17px 0px" }}>
                            <>
                              <span
                                style={{
                                  fontSize: 13,
                                  color: themeDark ? "white" : "black",
                                }}
                              >
                                {props.stakeTransactionMessage.message || (
                                  <>
                                    <span
                                      style={{
                                        color: themeDark ? "white" : "black",
                                      }}
                                    >
                                      YOUR STAKE OF{" "}
                                      <span style={{ color: "#C66065" }}>
                                        {props.stakeAmount}
                                        {" XIO"}
                                      </span>{" "}
                                      FOR{" "}
                                      <span style={{ color: "#C66065" }}>
                                        {props.stakeDuration}
                                        {" DAYS"}
                                      </span>{" "}
                                      IS PENDING, PLEASE WAIT{" "}
                                    </span>
                                  </>
                                )}{" "}
                              </span>
                              {props.stakeTransactionMessage.hash ? (
                                <Link
                                  href={`https://etherscan.io/tx/${props.stakeTransactionMessage.hash}`}
                                  rel="noreferrer"
                                  target="_blank"
                                  style={{ position: "relative", top: 7 }}
                                >
                                  <img
                                    src={
                                      themeDark ? spinnerBlack : spinnerWhite
                                    }
                                  />
                                </Link>
                              ) : (
                                <img
                                  style={{ position: "relative", top: 7 }}
                                  src={themeDark ? spinnerBlack : spinnerWhite}
                                />
                              )}
                            </>
                          </div>
                        ) : (
                          <h6 style={{ color: themeDark ? "white" : "black" }}>
                            IF YOU STAKE{" "}
                            <span style={{ color: "#C66065" }}>
                              {props.stakeAmount} {" XIO"}
                            </span>{" "}
                            FOR{" "}
                            <span style={{ color: "#C66065" }}>
                              {props.stakeDuration} {" DAYS"}
                            </span>
                            , YOU WILL IMMEDIATELY RECEIVE{" "}
                            <span style={{ color: "#C66065" }}>
                              {Number(props.interestRate).toFixed(4)}{" "}
                              {props.token.outputTokenSymbol}
                            </span>
                          </h6>
                        )}
                        <div className="actionWrapper">
                          <div
                            onClick={() =>
                              props.stakeLoading
                                ? null
                                : props.approve(props.isUnlock, props.address)
                            }
                            className={
                              props.address && !props.isUnlock
                                ? props.stakeLoading
                                  ? "confirmStakeWrapperDisable"
                                  : "confirmStakeWrapper"
                                : "confirmStakeWrapperDisable"
                            }
                          >
                            <h4
                              style={{
                                color: "white",
                                display: "inline-block",
                                fontFamily: "'Montserrat', sans-serif",
                                margin: 0,
                              }}
                            >
                              {props.isUnlock ? (
                                <span>
                                  WALLET ACTIVATED{" "}
                                  <FontAwesomeIcon
                                    color="#C66065"
                                    icon={faCheckCircle}
                                  />
                                </span>
                              ) : (
                                "ACTIVATE WALLET"
                              )}
                            </h4>
                          </div>
                        </div>
                        <div className="actionWrapper">
                          <div
                            onClick={() =>
                              props.stakeLoading
                                ? null
                                : props.onConfirmStake(props.address,props.balance,props.stakeAmount,props.initialRate,props.stakeDuration,props.token)
                            }
                            className={
                              props.address && props.isUnlock
                                ? props.stakeLoading
                                  ? "confirmStakeWrapperDisable"
                                  : "confirmStakeWrapper"
                                : "confirmStakeWrapperDisable"
                            }
                          >
                            <h4
                              style={{
                                color: "white",
                                display: "inline-block",
                                fontFamily: "'Montserrat', sans-serif",
                                margin: 0,
                              }}
                            >
                              {"CONFIRM STAKE"}
                            </h4>
                          </div>
                        </div>
                      </>
                    )}
                    {props.location.pathname === "/unstake" && (
                      <>
                        {props.unstakeLoading ? (
                          <div style={{ margin: "17px 0px" }}>
                            <img
                              src={themeDark ? spinnerBlack : spinnerWhite}
                            />
                          </div>
                        ) : (
                          <h6 style={{ color: themeDark ? "white" : "black" }}>
                            YOU HAVE{" "}
                            <span style={{ color: "#C66065" }}>
                              {allowedWithdraw}
                              {" XIO "}
                            </span>
                            {/* <span style={{ color: "#C66065" }}>XIO </span> */}
                            AVAILABLE TO UNSTAKE
                          </h6>
                        )}
                        <div
                          className={
                            !!(!warning && props.address)
                              ? props.unstakeLoading
                                ? "confirmStakeWrapperDisable"
                                : "confirmStakeWrapper"
                              : "confirmStakeWrapperDisable"
                          }
                          onClick={() =>
                            !warning && !props.unstakeLoading
                              ? props.onUnStakeXio(props.address,props.activePortal,props.unstakeAmount)
                              : null
                          }
                        >
                          <h4
                            style={{
                              color: "white",
                              display: "inline-block",
                              fontFamily: "'Montserrat', sans-serif",
                              margin: 0,
                            }}
                          >
                            CONFIRM UNSTAKE
                          </h4>
                        </div>
                      </>
                    )}

                    {completed && (
                      <>
                        <div
                          style={{
                            backgroundColor: "#C66065",
                            border: "1px solid #414141",
                            display: "inline-block",
                            padding: 10,
                            borderRadius: 5,
                            marginTop: "40px",
                          }}
                        >
                          <h4
                            style={{
                              color: "#b8b8b8",
                              display: "inline-block",
                              fontFamily: "'Montserrat', sans-serif",
                              margin: 0,
                            }}
                          >
                            START OVER
                          </h4>
                        </div>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <div style={{ display: "flex" }}>
                <Link
                  href="https://www.xord.one"
                  rel="noreferrer"
                  target="_blank"
                  style={{
                    textAlign: "center",
                    flex: 1,
                    padding: "10px 0px 15px",
                    margin: "0px 60px",
                    textDecoration: "none",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: themeDark ? "white" : "#000000",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "12px",
                        letterSpacing: "2px",
                        fontWeight: "bold",
                      }}
                    >
                      POWERED BY
                    </span>{" "}
                    <img
                      width={80}
                      style={{ verticalAlign: "middle" }}
                      src={themeDark ? xordLogoDark : xordLogoLight}
                    />
                  </div>
                </Link>
              </div>
              <Switch
                style={{ color: "#c66065" }}
                className="MuiSwitch-root"
                checked={themeDark}
                onChange={() => handleThemeState(isThemeDark, themeDark)}
                value="checkedA"
              />
            </div>
          </>
        );
      }}
    </ThemeConsumer>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.stakeReducer.token,
    address: state.layoutReducer.address,
    isUnlock: state.stakeReducer.isUnlock,
    stakeDuration: state.stakeReducer.days,
    balance: state.dashboardReducer.balance,
    stakeAmount: state.stakeReducer.xioAmount,
    initialRate: state.stakeReducer.initialRate,
    stakedXio: state.dashboardReducer.stakedXio,
    interestRate: state.stakeReducer.interestRate,
    stakeLoading: state.layoutReducer.stakeLoading,
    activePortal: state.dashboardReducer.activePortal,
    unstakeAmount: state.unstakeReducer.unstakeAmount,
    unstakeLoading: state.layoutReducer.unStakeLoading,
    unstakeableXIO: state.unstakeReducer.unstakeableXIO,
    stakeTransactionMessage: state.layoutReducer.stakeTransactionMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStakerData: (address) => dispatch(getStakerData(address)),
    approve: (isUnlock, address) => dispatch(onApprove(isUnlock, address)),
    checkRemainingTransactions: (address) => dispatch(checkRemainingTransactions(address)),
    onUnStakeXio: (address,timestamp,amount) => dispatch(onUnStakeXio(address,timestamp,amount)),
    onConfirmStake: (
      address,
      balance,
      stakeAmount,
      initialRate,
      stakeDuration,
      token
    ) =>
      dispatch(
        onConfirmStake(
          address,
          balance,
          stakeAmount,
          initialRate,
          stakeDuration,
          token
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
