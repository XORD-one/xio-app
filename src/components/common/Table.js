import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        boxShadow: 'none'
    },
    table: {
        // minWidth: 700,
        border: '1px solid lightgrey'
    },
});

const data = [
    {
        month: "3 Months",
        money: "Rs. 58,333",
    },
    {
        month: "6 Months",
        money: "Rs. 29,166",
    },
    {
        month: "12 Months",
        money: "Rs. 14,583",
    }
]


function SimpleTable(props) {
    const { classes } = props;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead style={{ backgroundColor: "#f15a2d" }} >
                    <TableRow>
                        <TableCell style={{padding:10,color:"white"}} >Tenure</TableCell>
                        <TableCell style={{padding:10,color:"white"}} >Monthly Installment</TableCell>
                        <TableCell style={{padding:10}} ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => {
                        return <TableRow>
                            <TableCell style={{padding:10}} >{item.month}</TableCell>
                            <TableCell style={{padding:10}} >{item.money}</TableCell>
                            <TableCell style={{padding:10}} >{<input type="radio" name="package" />}</TableCell>
                        </TableRow>
                    })
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
