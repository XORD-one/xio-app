import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid"
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CustomDialog = (props) => {
  const list = [
    // "UPTRENND (1UP)",
    // "BINANCE (BNB)",
    // "BAT (BAT)",
    // "ETHEREUM (ETH)",
    "OMG"
  ];
  return (
    <React.Fragment>
      <Dialog
        style={{ borderRadius: "5px" }}
        fullWidth={true}
        maxWidth={"xs"}
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle
          style={{
            border: "2px solid #3E3E3E",
            backgroundColor: "#363636",
            color: "#030303",
            padding: "0px 50px"
          }}
          justify="center"
        >
          <DialogContentText
            style={{
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "2px",
              fontWeight: "bold",
              color: "#030303",
              cursor: "pointer",
              textAlign: "center",

              padding: "0px",
              marginTop: "18px"
            }}
          >
            <Grid container direction="row" justify="center">
              <Grid item md={3} style={{ textAlign: "right", paddingRight: 7 }}>
                <SearchIcon
                  item
                  style={{
                    color: "#DADADA",
                    cursor: "pointer",
                    fontSize: "24px",
                    position: "relative",
                    top: 4
                  }}
                />
              </Grid>
              <Grid item md={9}>
                <input className="searchText" placeholder="SEARCH TOKEN NAME" />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogTitle>

        <DialogContent
          style={{
            backgroundColor: "#1C1C1C",
            color: "#D4D4D4",
            textAlign: "center",
            border: "2px solid #3E3E3E",
            borderTop: "0px",
            paddingTop: "25px"
          }}
        >
          {props.tokensList.map((item,i) => {
            return (
              <DialogContentText
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "bolder",
                  backgroundColor: "#1C1C1C",
                  color: "#D4D4D4",
                  cursor:"pointer"
                }}
                onClick={()=>props.onTokenSelect(item)}
                key={i}
              >
                {item.outputTokenSymbol}
              </DialogContentText>
            );
          })}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomDialog;
