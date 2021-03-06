import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UnAuthorizedImage from '../../assets/storage/images/Errors/_403.svg'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'



const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    width: '100%'
  },
  _403: {
      fontSize: '20rem',
      color: theme.palette.error.main,
      [theme.breakpoints.down('sm')]: {
        fontSize: '16rem', 
      }
  }
}));

export default function UnAuthorized() {
  const classes = useStyles();

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <Typography variant="h1" color="initial" className={classes._403}>403</Typography>
                <Typography variant="h4" color="initial">Access Forbidden</Typography>
                <Typography variant="subtitle1" color="initial">(Im sorry buddy...)</Typography>
            </Grid>
        </Grid>
    );
}