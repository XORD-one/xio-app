import React, { useState, useEffect, lazy, Suspense } from "react";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const App = lazy(() => import("../App"));
// import App from "../App";

const useStyles = makeStyles((theme) => ({
  mainContainerStyles: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  textStyle: {
    color: "#ffffff",
    fontWeight: "bold",
    fontStyle: "italic",
  },
}));

export default function LoadingFullPage() {
  const classes = useStyles();
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const userInput = prompt("Please Enter XIO Beta Password");
      if (userInput == process.env.REACT_APP_PASSWORD) {
        setAuthenticated(true);
      }
    }, 500);
  }, []);

  const loadingMessage = (msg) => (
    <Box className={classes.mainContainerStyles}>
      <Typography variant="body1" className={classes.textStyle}>
        {msg || "LOADING..."}
      </Typography>
    </Box>
  );
  return authenticated ? (
    <Suspense
      fallback={loadingMessage("AUTHENTICATION SUCCESSFUL, PLEASE WAIT...")}
    >
      <App />
    </Suspense>
  ) : (
    loadingMessage()
  );
}
