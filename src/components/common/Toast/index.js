import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from "react-redux"
import {handleToastClose} from "../../../store/actions/layoutActions"

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function ConsecutiveSnackbars({handleClose,message,open}) {
  // console.log('props ==>',open,message,handleClose)
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message ? message : undefined}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}



const mapStateToProps = (state) => {
  return{
    open: state.layoutReducer.toastState,
    message: state.layoutReducer.toastMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    handleClose: () => dispatch(handleToastClose())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ConsecutiveSnackbars)