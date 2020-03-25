import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Link
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
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";
import xordLogoLight from "../components/assets/images/xord-logo-black.png";
import xordLogoDark from "../components/assets/images/xord-logo-white.png";
import spinnerWhite from "../components/assets/images/spinner-white.svg";
import spinnerBlack from "../components/assets/images/spinner-black.svg";
import Toast from "../components/common/Toast";

const layoutSubHeading = {
  color: "rgb(198, 96, 101)"
};

const layoutHeadingLight = {
  color: "black",
  letterSpacing: 6
};
const layoutHeadingDark = {
  color: "white",
  letterSpacing: 6
};

const tableHeader = {
  color: "white"
};

const socialIcon = {
  color: "#b8b8b8",
  margin: 0,
  display: "inline-block",
  marginRight: 10,
  cursor: "pointer"
};

const headingDiv = {
  flexDirection: "column",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "bold",
  alignItems: "center"
};

const tabBody = {
  backgroundColor: "#030303",
  margin: 0,
  borderLeft: "2px solid #2d2d2d",
  borderRight: "2px solid #2d2d2d",
  borderBottom: "2px solid #2d2d2d"
};
const tabBodyLight = {
  backgroundColor: "white",
  margin: 0,
  borderLeft: "1px solid #DADADA",
  borderRight: "1px solid #DADADA",
  borderBottom: "1px solid #DADADA"
};

const Index = ({
  children,
  tabName,
  address = "",
  onConnect,
  unlock,
  approve,
  onWithdraw,
  balance,
  onConfirmClick,
  loading,
  amount,
  days,
  rate,
  outputToken,
  allowedWithdraw,
  warning,
  network
}) => {
  const [completed, setCompleted] = useState(false);

  const handleThemeState = (isThemeDark, themeDark) => {
    isThemeDark(!themeDark);
  };

  const onConfirm = () => {
    approve();
  };

  let history = useHistory();
  return (
    <ThemeConsumer>
      {({
        isThemeDark,
        themeDark,
        checkForNewList,
        handleClose,
        message,
        openToast,
        handleClick
      }) => {
        const addressToShow =
          address &&
          address.slice(0, 6) + "...." + address.slice(address.length - 4);
        const toastProps = {
          handleClose,
          message,
          open: openToast
        };
        return (
          <>
            <Toast {...toastProps} />
            <div
              style={{
                backgroundColor: themeDark ? "#1C1C1C" : "white",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {network !== "rinkeby" ? (
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: "bold",
                    backgroundColor: "#C66065",
                    color: "white",
                    textAlign: "center",
                    padding: "10px 0px"
                  }}
                >
                  NETWORK ERROR: SWITCH METAMASK'S NETWORK TO RINKEBY.
                </div>
              ) : null}
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
                        borderRadius: 5
                      }}
                      className="connectButton"
                      onClick={() => onConnect(handleClick)}
                    >
                      <img
                        src={Rocket}
                        height="20px"
                        width="20px"
                        style={{
                          margin: "0px 12px 0px 0px",
                          position: "relative",
                          top: 5
                        }}
                      />
                      <h4
                        style={{
                          color: themeDark ? "#b8b8b8" : "#545454",
                          display: "inline-block",
                          fontFamily: "'Montserrat', sans-serif",
                          margin: 0,
                          height: "20px",
                          letterSpacing: "2px"
                        }}
                      >
                        {address ? addressToShow : "CONNECT WALLET"}
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
                            fontFamily: "'Montserrat', sans-serif"
                          }
                        : {
                            backgroundColor: "#FCFCFC",
                            border: "1px solid #C66065",
                            borderRadius: "5px",
                            fontFamily: "'Montserrat', sans-serif"
                          }
                    }
                    md={8}
                  >
                    <h4
                      style={{
                        color:
                          tabName === "dashboard"
                            ? themeDark
                              ? "white"
                              : "black"
                            : themeDark
                            ? "#545454"
                            : "#DADADA",
                        justifyContent: "flex-start",
                        letterSpacing: "2px",
                        cursor: "pointer"
                      }}
                      className="tabarText"
                      onClick={() => history.push("/")}
                    >
                      DASHBOARD
                    </h4>
                    <h4
                      style={{
                        color:
                          tabName === "stake"
                            ? themeDark
                              ? "white"
                              : "black"
                            : themeDark
                            ? "#545454"
                            : "#DADADA",
                        justifyContent: "center",
                        letterSpacing: "2px",
                        cursor: "pointer"
                      }}
                      className="tabarText"
                      onClick={() => history.push("/stake")}
                    >
                      STAKE
                    </h4>
                    <h4
                      style={{
                        color:
                          tabName === "unstake"
                            ? themeDark
                              ? "white"
                              : "black"
                            : themeDark
                            ? "#545454"
                            : "#DADADA",
                        justifyContent: "flex-end",
                        letterSpacing: "2px",
                        cursor: "pointer"
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
                        className=" tableHeader"
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
                    className=" tableHeader"
                    style={tableHeader}
                    item
                    md={6}
                    xs={12}
                    style={{ alignSelf: "center" }}
                  >
                    {tabName === "stake" && (
                      <>
                        {loading ? (
                          <div style={{ margin: "17px 0px" }}>
                            {unlock ? (
                              <img
                                src={themeDark ? spinnerBlack : spinnerWhite}
                              />
                            ) : (
                              <>
                                <span
                                  style={{
                                    fontSize: 13,
                                    color: themeDark ? "white" : "black"
                                  }}
                                >
                                  PLEASE CONFIRM PERMISSION TO ACTIVATE YOUR
                                  WALLET{" "}
                                </span>
                                <img
                                  style={{ position: "relative", top: 7 }}
                                  src={themeDark ? spinnerBlack : spinnerWhite}
                                />
                              </>
                            )}
                          </div>
                        ) : (
                          <h6 style={{ color: themeDark ? "white" : "black" }}>
                            IF YOU STAKE{" "}
                            <span style={{ color: "#C66065" }}>{amount}</span>{" "}
                            TOKENS FOR{" "}
                            <span style={{ color: "#C66065" }}>{days}</span>{" "}
                            DAYS , YOU WILL IMMEDIATELY RECEIVE{" "}
                            <span style={{ color: "#C66065" }}>
                              {rate} {outputToken}
                            </span>
                          </h6>
                        )}
                        <div
                          onClick={() =>
                            loading
                              ? null
                              : onConfirmClick(checkForNewList, handleClick)
                          }
                          style={{
                            backgroundColor: address
                              ? loading
                                ? "#757474"
                                : "#C66065"
                              : "#757474",
                            cursor: "pointer",
                            border: themeDark
                              ? "1px solid #414141"
                              : "1px solid #DADADA",
                            display: "inline-block",
                            padding: 10,
                            borderRadius: 5
                          }}
                        >
                          <h4
                            style={{
                              color: "white",
                              display: "inline-block",
                              fontFamily: "'Montserrat', sans-serif",
                              margin: 0
                            }}
                          >
                            {unlock ? "CONFIRM STAKE" : "ACTIVATE WALLET"}
                          </h4>
                        </div>
                      </>
                    )}
                    {tabName === "unstake" && (
                      <>
                        {loading ? (
                          <div style={{ margin: "17px 0px" }}>
                            <img
                              src={themeDark ? spinnerBlack : spinnerWhite}
                            />
                          </div>
                        ) : (
                          <h6 style={{ color: themeDark ? "white" : "black" }}>
                            CURRENT{" "}
                            <span style={{ color: "#C66065" }}>XIO </span>
                            BALANCE IS
                            <span style={{ color: "#C66065" }}>
                              {" "}
                              {allowedWithdraw}{" "}
                            </span>{" "}
                            AVAILABLE FOR UNSTAKE
                          </h6>
                        )}
                        <div
                          style={{
                            backgroundColor: !!(!warning && address)
                              ? loading
                                ? "#757474"
                                : "#C66065"
                              : "#757474",
                            border: themeDark
                              ? "1px solid #414141"
                              : "1px solid #DADADA",
                            display: "inline-block",
                            padding: 10,
                            borderRadius: 5,
                            cursor: "pointer"
                          }}
                          onClick={() =>
                            !warning && !loading
                              ? onWithdraw(checkForNewList, handleClick)
                              : null
                          }
                        >
                          <h4
                            style={{
                              color: "white",
                              display: "inline-block",
                              fontFamily: "'Montserrat', sans-serif",
                              margin: 0
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
                            marginTop: "40px"
                          }}
                        >
                          <h4
                            style={{
                              color: "#b8b8b8",
                              display: "inline-block",
                              fontFamily: "'Montserrat', sans-serif",
                              margin: 0
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
                    textDecoration: "none"
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: themeDark ? "white" : "#000000",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "12px",
                        letterSpacing: "2px",
                        fontWeight: "bold"
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

export default Index;
