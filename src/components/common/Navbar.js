import React from 'react';
import { Grid, Typography, Container } from "@material-ui/core"
import {withRouter} from "react-router-dom"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from '@material-ui/core/Icon';
import XordImg from '../assets/images/Logo.png'

const Default = (props) => {
    console.log(props)
    const matches = useMediaQuery('(max-width:600px)');
    const containerStyle = matches ? { backgroundColor: "white", paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, justifyContent: "center" } : { backgroundColor: "white", paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }
    const iconStyle = {
        border: "1px solid lightgrey",
        borderRadius: 5,
        color: "#878787",
        padding: 1
    }
    const redirect = () => {
        props.history.goBack()
    }
    return (
        <>
            <Grid container style={containerStyle} >
               {matches && <Grid item style={{ position: "absolute", left: 20 }} onClick={redirect} >
                    <Icon style={iconStyle} >arrow_back</Icon>
                </Grid>}
                {!props.isXord ? <Grid item >
                    <Typography variant="h5" component="span" style={{ color: "#f15a2d", fontWeight: 600 }} >Kist</Typography>
                    <Typography variant="h5" component="span" style={{ color: "#535353", fontWeight: 300 }} > Pay</Typography>
                </Grid> : <img src={XordImg} height="40px" />}
            </Grid>
        </>
    );
};

Default.defaultProps = {
    isXord:false
}

export default withRouter(Default);