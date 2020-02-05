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

const tableHeader={
color:'white',
}


const firstStakeSectionItem={
  border: '1px solid rgb(65, 65, 65)',
  backgroundColor: 'rgb(28, 28, 28)', 
}

const plusEqual={
  color: "#c66065" ,


}

const Stake = props => {
  const { showDropdown, setShowDropdown } = props;
  const amountXio = "AMOUNT (XIO)";
  const durationDays = "DURATION (DAYS)";
  const outputToken = "OUTPUT (TOKEN)";
  const instantInterest = "INSTANT INTEREST";
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uptrend = "UPTREND (1UP)";
  const binance = "BINANCE (BNB)";
  const bat = "BAT (BAT)";
  const ethereum = "ETHEREUM (ETH)";
  const opacit = "OPACITY (OPQ)";

  return (
    <>
      {

        <React.Fragment>
          <Dialog
            style={{ borderRadius: "5px" }}
            fullWidth={true}
            maxWidth={"xs"}
            // md={1}
            open={open}
            onClose={handleClose}
            // aria-labelledby="max-width-dialog-title"
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
                  fontWeight: "bolder",
                  color: "#030303",
                  cursor: "pointer",
                  textAlign: "center",
                  
                  padding: '0px',
                  marginTop:'18px'
                }}
              >
                <Grid container  justify="center">

                  <SearchIcon
                    style={{

                      color: "#DADADA",
                      cursor: "pointer",
                      fontSize: "24px",
                      marginRight: '18px',
                      // display:'inline !important',
                      // marginTop: "10px",

                    }}
                  // fontSize="large"
                  // viewBox="0 0 50 20"
                  />


                  <span style={{ fontSize: '12px', letterSpacing: '3px' }}>SEARCH TOKEN NAME</span>
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
                paddingTop:'25px'
              }}
            >
              <DialogContentText
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "bolder",
                  backgroundColor: "#1C1C1C",
                  color: "#D4D4D4"
                }}
              >
                {uptrend}
              </DialogContentText>

              <DialogContentText
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "bolder",
                  backgroundColor: "#1C1C1C",
                  color: "#D4D4D4"
                }}
              >
                {bat}
              </DialogContentText>
              <DialogContentText
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "bolder",
                  backgroundColor: "#1C1C1C",
                  color: "#D4D4D4"
                }}
              >
                {binance}
              </DialogContentText>
              <DialogContentText
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "bolder",
                  backgroundColor: "#1C1C1C",
                  color: "#D4D4D4"
                }}
              >
                {ethereum}
              </DialogContentText>
              <DialogContentText
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "bolder",
                  backgroundColor: "#1C1C1C",
                  color: "#D4D4D4"
                }}
              >
                {opacit}
              </DialogContentText>
            </DialogContent>



          </Dialog>
        </React.Fragment>
      }

      <Layout tabName="stake">
        <Grid container item className="firstSectionContainer " md={12}>
          <Grid
            style={{
              paddingBottom: "10px"
            }}
            container
            item
            justify="center"
            md={12}
            sm={12}
            xs={12}
          >
            <Grid container item className="tableHeader" style={tableHeader} md={2} sm={4} xs={12} justify="center" >
              <Grid item xs={12} >
                <p style={{ fontSize: "11px" }}>{amountXio}</p>
              </Grid>

              <Grid item sm={12} xs={6} className="firstStakeSectionItem" style={firstStakeSectionItem}>
                <input className="inputText" placeholder="0.0" />
              </Grid>
            </Grid>

            <Grid
              container
              item
              md={1}
              sm={12}
              xs={12}
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                className="plusEqual"
                style={plusEqual}
                align="center"
              >
                +
              </Grid>
            </Grid>

            <Grid container item className="tableHeader" style={tableHeader} md={2} sm={4} xs={12} justify="center">
              <Grid item sm={12} xs={12} >
                <p style={{ fontSize: "11px" }}>{durationDays}</p>
              </Grid>

              <Grid item sm={12} xs={6} className="firstStakeSectionItem" style={firstStakeSectionItem}>

                <input className="inputText" placeholder="0.0" xs={12} />
              </Grid>
            </Grid>

            <Grid
              container
              item
              md={1}
              sm={12}
              xs={12}
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <Grid item md={12} className="plusEqual"  style={plusEqual} align="center">
                +
              </Grid>
            </Grid>

            <Grid container item className="tableHeader" style={tableHeader} md={2} sm={4} xs={12} justify="center">
              <Grid item sm={12} xs={12} >
                <p style={{ fontSize: "11px" }}>{outputToken}</p>
              </Grid>

              <Grid
                sm={12}
                xs={6}
                container
                justify="center"
              >
                <Grid
                  className="firstStakeSectionItem"
                  style={firstStakeSectionItem}
                  onClick={handleClickOpen}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    cursor: "pointer"
                  }}
                  item
                >
                  <input
                    className="inputText"
                    placeholder="XIO"
                    disabled={true}
                    style={{ cursor: "pointer" }}
                    xs={12}
                  />
                  <ExpandMoreIcon
                    style={{
                      fontSize: 40,
                      color: "#C66065",
                      cursor: "pointer"
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              item
              md={1}
              sm={12}
              xs={12}
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <Grid item md={12} className="plusEqual"  style={plusEqual} align="center">
                =
              </Grid>
            </Grid>

            <Grid container item className="tableHeader" style={tableHeader} md={2} sm={4} xs={12} justify="center" >
              <Grid item sm={12} xs={12} >
                <p style={{ fontSize: "11px" }}>{instantInterest}</p>
              </Grid>

              <Grid item sm={12} xs={6} className="firstStakeSectionItem" style={firstStakeSectionItem} >
                <input className="inputText" placeholder="0.0" />
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
