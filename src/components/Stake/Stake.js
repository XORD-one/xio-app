import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";
import Layout from "../../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
    backgroundColor: "transparent",
    alignSelf: "cenetr"
    // boxShadow: 'none'
  },
  table: {
    // minWidth: 700,
    // border: '1px solid lightgrey',
    backgroundColor: "transparent",
    alignSelf: "cenetr",

    color: "white"
  },
  header: {
    // fontSize: 12,
    fontWeight: "bold",
    color: "white",
    border: "0px",
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "2px",
    textAlign: "center",
    paddingTop: 0
  },
  tableBody: {
    color: "white",

    fontSize: "12px",
    border: "0px",
    textAlign: "center",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400
  }
});

const tabBodyRow3 = {
  display: "flex",
  flexDirection: "column"
  //   border: "1px solid #d6cbcb",
  // alignItems: "center"
};

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  }
}));

const Stake = props => {
  const { showDropdown, setShowDropdown } = props;
  const amountXio = "   AMOUNT (XIO)";
  const durationDays = "   DURATION (DAYS)";
  const outputToken = "  OUTPUT (TOKEN)";
  const instantInterest = "  INSTANT INTEREST";
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {
        // showDropdown &&
        <React.Fragment>
          <Dialog
          style={{borderRadius:"5px"}}
            fullWidth={true}
            maxWidth={"xs"}
            // md={1}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle
              style={{
                border: "2px solid #3E3E3E",
                backgroundColor: "#363636",
                color: "#030303",
                padding:"2px 50px",
              }}
            >
              <DialogContentText style={{ padding:'1px 5px',fontFamily: "'Montserrat', sans-serif",letterSpacing:'2px',fontWeight:'bolder', fontSize: "10px",color: "#030303",cursor: "pointer",textAlign: "center",verticalAlign:'center' }}>
                <SearchIcon style={{ color: "#DADADA", cursor: "pointer", fontSize:'17px',marginTop:'10px'}}  />
                <span>SEARCH TOKEN NAME</span>
              </DialogContentText>
            </DialogTitle>

            <DialogContent
              style={{ backgroundColor: "#1C1C1C", color: "#D4D4D4",textAlign: "center" ,border: "2px solid #3E3E3E",borderTop:'0px'}}
            >
             
              <DialogContentText
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight:'bolder', backgroundColor: "#1C1C1C", color: "#D4D4D4" }}
              >
                UPTREND 1UP
              </DialogContentText>

              <DialogContentText
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight:'bolder', backgroundColor: "#1C1C1C", color: "#D4D4D4" }}
              >
                UPTREND 1UP
              </DialogContentText>
              <DialogContentText
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight:'bolder', backgroundColor: "#1C1C1C", color: "#D4D4D4" }}
              >
                UPTREND 1UP
              </DialogContentText>
              <DialogContentText
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight:'bolder', backgroundColor: "#1C1C1C", color: "#D4D4D4" }}
              >
                UPTREND 1UP
              </DialogContentText>
              <DialogContentText
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight:'bolder', backgroundColor: "#1C1C1C", color: "#D4D4D4" }}
              >
                UPTREND 1UP
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      }

      <Layout>
        <Grid container item className="firstSectionContainer" md={12}>
          <Grid
            container
            item
            style={tabBodyRow3}
            md={12}
            className="section"
            md={10}
          >
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
                alignContent: "center"
              }}
            >
              <Grid
                className="tableHeader"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Grid className="tableHeader">
                  <h6>{durationDays}</h6>
                  <Grid style={{ display: "flex", flexDirection: "row" }}>
                    <Grid className="firstSectionItem">
                      <input className="inputText" placeholder="0.0" />
                    </Grid>
                    <Grid className="plusEqual">+</Grid>
                  </Grid>
                </Grid>

                <Grid className="tableHeader">
                  <h6>{durationDays}</h6>
                  <Grid style={{ display: "flex", flexDirection: "row" }}>
                    <Grid className="firstSectionItem">
                      <input className="inputText" placeholder="0.0" />
                    </Grid>
                    <Grid className="plusEqual">+</Grid>
                  </Grid>
                </Grid>

                <Grid className="tableHeader">
                  <h6>{outputToken}</h6>
                  <Grid style={{ display: "flex", flexDirection: "row" }}>
                    <Grid
                      className="firstSectionItem"
                      onClick={handleClickOpen}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        className="inputText"
                        placeholder="XIO"
                        disabled={true}
                        style={{ cursor: "pointer" }}
                      />
                      <ExpandMoreIcon
                        style={{
                          fontSize: 40,
                          color: "#C66065",
                          cursor: "pointer"
                        }}
                      />
                    </Grid>

                    <Grid className="plusEqual">=</Grid>
                  </Grid>
                </Grid>

                <Grid className="tableHeader">
                  <h6>{instantInterest}</h6>
                  <Grid className="firstSectionItem">
                    <input className="inputText" placeholder="1000" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

Stake.propTypes = {
  // classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Stake);
