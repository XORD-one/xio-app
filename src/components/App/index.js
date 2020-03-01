import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "../../routes";
import { ThemeProvider } from "../../config/index";


function App() {
  const [themeDark, setToggleTheme] = useState(
   JSON.parse(localStorage.getItem("theme")) !== null ? JSON.parse(localStorage.getItem("theme")) : true
  );

  const isThemeDark = () => {
    let theme = themeDark;
    localStorage.setItem("theme", !theme);
    setToggleTheme(!theme);
  };
  const themeState = {
    themeDark,
    isThemeDark
  };
  return (
    <>
      <ThemeProvider value={themeState}>
        <Router>
          {routes.map(item => {
            return (
              <Route
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            );
          })}
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
