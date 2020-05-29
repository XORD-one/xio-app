import React, { useState, useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import App from "../App";

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

  return authenticated ? (
    <App />
  ) : (
    <Box className={classes.mainContainerStyles}>
      <Typography variant="body1" className={classes.textStyle}>
        LOADING...
      </Typography>
    </Box>
  );
}
