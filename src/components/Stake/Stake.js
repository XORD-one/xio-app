import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./style.css";
import Layout from "../../layout";
import { ThemeConsumer } from "../../config/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialog from "../common/Dialog"

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "transparent",
    alignSelf: "cenetr"
  },
  table: {
    backgroundColor: "transparent",
    alignSelf: "cenetr",

    color: "white"
  },
  header: {
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
  searchBarInput: {
    border: "none"
  },
  searchBar: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
      border: "none"
    }
  },
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

const tableHeader = {
  color: "white"
};

const tableHeaderLight = {
  color: "black"
};

const firstStakeSectionItem = {
  border: "1px solid rgb(65, 65, 65)",
  backgroundColor: "rgb(28, 28, 28)"
};

const firstStakeSectionItemLight = {
  border: "1px solid rgb(65, 65, 65)",
  "background-color": "#d3d3d33d"
};

const plusEqual = {
  color: "#c66065"
};

const Stake = props => {
  const { showDropdown, setShowDropdown } = props;
  const amountXio = "(XIO)";
  const durationDays = "(DAYS)";
  const outputToken = "(TOKEN)";
  const instantInterest = "INTEREST";
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [durationDaysInput, setDurationDays] = React.useState("");
  const [amountXioInput, setAmountXIO] = React.useState("");

  const onChangeAmount = e => {
    var reg = new RegExp("^\\d+$");
    if (reg.test(e.target.value) || e.target.value == "") {
      setAmountXIO(e.target.value);
    } else {
      console.log("nothing");
    }
  };

  const onChangeDurationDays = e => {
    var reg = new RegExp("^\\d+$");
    if (reg.test(e.target.value) || e.target.value == "") {
      setDurationDays(e.target.value);
    } else {
      console.log("nothing");
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogProps = {
    open,
    handleClose
  }

  return (
    <>
      <ThemeConsumer>
        {({ isThemeDark, themeDark }) => {
          return (
            <>
              <CustomDialog {...dialogProps} />
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
                    <Grid
                      container
                      item
                      className="stakeTableHeader"
                      style={themeDark ? tableHeader : tableHeaderLight}
                      md={2}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item xs={12}>
                        {/* <p style={{ fontSize: "11px" }}>{amountXio}</p> */}
                        {/* <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          AMOUNT
                        </p>
                        <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          {amountXio}
                        </p> */}
                        <p
                          className="toggleHeadText_2"
                          style={{ fontSize: "10px",height:26 }}
                        >
                          {"DURATION (DAYS)"}
                        </p>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        xs={6}
                        className="firstStakeSectionItem"
                        style={
                          themeDark
                            ? firstStakeSectionItem
                            : firstStakeSectionItemLight
                        }
                      >
                        <input
                          onChange={onChangeAmount}
                          className={themeDark ? "inputTextStake" : "inputTextStakeLight"}
                          placeholder="0.0"
                          value={amountXioInput}
                        />
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

                    <Grid
                      container
                      item
                      className="stakeTableHeader"
                      style={themeDark ? tableHeader : tableHeaderLight}
                      md={2}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item sm={12} xs={12}>
                        {/* <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          DURATION
                        </p>
                        <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          {durationDays}
                        </p> */}
                        <p
                          className="toggleHeadText_2"
                          style={{ fontSize: "10px",height:26 }}
                        >
                          {"DURATION (DAYS)"}
                        </p>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        xs={6}
                        className="firstStakeSectionItem"
                        style={
                          themeDark
                            ? firstStakeSectionItem
                            : firstStakeSectionItemLight
                        }
                      >
                        <input
                          onChange={onChangeDurationDays}
                          className={themeDark ? "inputTextStake" : "inputTextStakeLight"}
                          value={durationDaysInput}
                          placeholder="0.0"
                          xs={12}
                        />
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
                        className="plusEqual"
                        style={plusEqual}
                        align="center"
                      >
                        +
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      className="stakeTableHeader"
                      style={themeDark ? tableHeader : tableHeaderLight}
                      md={2}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item sm={12} xs={12}>
                        {/* <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          OUTPUT
                        </p>
                        <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          {outputToken}
                        </p> */}
                        <p
                          className="toggleHeadText_2"
                          style={{ fontSize: "10px",height:26 }}
                        >
                          {"OUTPUT (TOKEN)"}
                        </p>
                      </Grid>

                      <Grid sm={12} xs={6} container justify="center">
                        <Grid
                          className="firstStakeSectionItem"
                          style={
                            themeDark
                              ? {
                                  ...firstStakeSectionItem,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  cursor: "pointer"
                                }
                              : {
                                  ...firstStakeSectionItemLight,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  cursor: "pointer"
                                }
                          }
                          onClick={()=>handleClickOpen()}
                          item
                        >
                          <input
                            className={
                              themeDark ? "inputTextStake" : "inputTextStakeLight"
                            }
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
                      <Grid
                        item
                        md={12}
                        className="plusEqual"
                        style={plusEqual}
                        align="center"
                      >
                        =
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      className="stakeTableHeader"
                      style={themeDark ? tableHeader : tableHeaderLight}
                      md={2}
                      sm={4}
                      xs={12}
                      justify="center"
                    >
                      <Grid item sm={12} xs={12}>
                        {/* <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          INSTANT
                        </p>
                        <p
                          className="toggleHeadText_1"
                          style={{ fontSize: "11px" }}
                        >
                          {instantInterest}
                        </p> */}
                        <p
                          className="toggleHeadText_2"
                          style={{ fontSize: "10px",height:26 }}
                        >
                          {"INSTANT INTEREST"}
                        </p>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        xs={6}
                        className="firstStakeSectionItem"
                        style={
                          themeDark
                            ? firstStakeSectionItem
                            : firstStakeSectionItemLight
                        }
                      >
                        <input
                          className={themeDark ? "inputTextStake" : "inputTextStakeLight"}
                          disabled="true"
                          placeholder="0.0"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Layout>
            </>
          );
        }}
      </ThemeConsumer>
    </>
  );
};

Stake.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Stake);
