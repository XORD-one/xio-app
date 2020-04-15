import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "../../config/index";
import routes from "../../routes";
import Layout from "../../layout";
import NetworkAlert from "../common/NetworkAlert";
import {connect} from "react-redux"
import {checkWeb3} from "../../store/actions/layoutActions"

function App({address,network,checkWeb3}) {
  const [themeDark, setToggleTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) !== null
      ? JSON.parse(localStorage.getItem("theme"))
      : true
  );
  const [checkList, setCheckList] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
    // console.log('app props ==>',props)

  const isThemeDark = () => {
    let theme = themeDark;
    localStorage.setItem("theme", !theme);
    setToggleTheme(!theme);
  };

  const checkForNewList = () => {
    // console.log('chaloo NewList')
    setCheckList(!checkList);
  };

  const handleClick = (customMessage) => {
    setMessage(customMessage);
    setOpenToast(true);
  };

  const toggleAgreement = () => {
    setOpen(!open);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const onConnect = async () => {
    let ethereum = window.ethereum;
    if (!ethereum || !ethereum.isMetaMask) {
      // throw new Error('Please install MetaMask.')
      alert(`METAMASK NOT INSTALLED!!`);
    } else {
      await ethereum.enable();
      checkWeb3();
    }
  };

  useEffect(()=>{
    let timer;
    let ethereum = window.ethereum;
    if (ethereum) {
      timer = setInterval(() => {
        checkWeb3();
      }, 3000);
      checkWeb3();
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  },[address])

  const themeState = {
    themeDark,
    isThemeDark,
    checkList,
    checkForNewList,
    handleClick,
    handleClose,
    openToast,
    message,
    open,
    toggleAgreement,
  };

  const layoutProps = {
    address,
    onConnect,
  }

  return (
    <>
      <ThemeProvider value={themeState}>
        <Router>
          <NetworkAlert network={network} />
          <Layout {...layoutProps} >
            <Switch>
              {routes.map((item) => {
                return (
                  <Route
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                );
              })}
              <Route>
                <h6>404 Not Found</h6>
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
}

const mapStateToProps = (state) => {
  return{
    address: state.layoutReducer.address,
    network: state.layoutReducer.network
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    checkWeb3: () => dispatch(checkWeb3())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
