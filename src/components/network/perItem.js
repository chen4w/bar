import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    fabProgress: {
        color: green[500],
        position: 'absolute',
        margin: 20,
        opacity: '0.8',
        zIndex: 1,
    },
    root: {
        //paddingTop: theme.spacing.unit * 2,
        //paddingBottom: theme.spacing.unit * 2,
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        position: 'relative',
        rounded: true,
        borderRadius: '50%',
        backgroundColor: "#33cccc"
    },
    title: {
        paddingTop: 40,
        color: 'white'
    },
    description: {
        textAlign: 'center',
    }

});

const PaperSheet = ({ label, value, total, classes })  => {
    const font_size =["display3","display2","display2","display1","headline"];
    const font_top = [15,25,30,35,40];
    let len = value.length;
    let fsize = (len<=font_size.length)? font_size[len-1]:"title";
    let ftop =  (len<=font_size.length)? font_top[len-1]: 40;
    
    return (
    <div >
        <CircularProgress className={classes.fabProgress}  variant="static" value={value*100/total} size={100} />
        <Paper className={classes.root} square={false}>
            <Typography className={classes.title} variant={fsize} style={{paddingTop:ftop}}>
            {value}
            </Typography>
        </Paper>
        <Typography className={classes.description} variant="subheading">
            {label}
        </Typography>
    </div>
)
    }
export default withStyles(styles)(PaperSheet);
