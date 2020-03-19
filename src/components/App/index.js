import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import routes from "../../routes";
import { ThemeProvider } from "../../config/index";



function App() {
  const [themeDark, setToggleTheme] = useState(
   JSON.parse(localStorage.getItem("theme")) !== null ? JSON.parse(localStorage.getItem("theme")) : true
  );
  const [checkList,setCheckList] = useState(false)
  const [openToast,setOpenToast] = useState(false)
  const [message,setMessage] = useState('')

  const isThemeDark = () => {
    let theme = themeDark;
    localStorage.setItem("theme", !theme);
    setToggleTheme(!theme);
  };

  const checkForNewList = () => {
    // console.log('chaloo NewList')
    setCheckList(!checkList)
  }

  const handleClick = (customMessage) => {
    setMessage(customMessage)
    setOpenToast(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
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
  };
  return (
    <>
      <ThemeProvider value={themeState}>
        <Router>
          <Switch>
          {routes.map(item => {
            return (
              <Route
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            );
          })}
          <Route><h6>404 Not Found</h6></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
