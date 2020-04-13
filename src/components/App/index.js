import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../../routes";
import { ThemeProvider } from "../../config/index";
import Layout from "../../layout";

function App() {
  const [themeDark, setToggleTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) !== null
      ? JSON.parse(localStorage.getItem("theme"))
      : true
  );
  const [checkList, setCheckList] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);

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
  return (
    <>
      <ThemeProvider value={themeState}>
        <Router>
          <Layout>
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

export default App;
