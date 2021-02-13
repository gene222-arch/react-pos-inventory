import React from 'react';
import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { forgotResetPasswordUseStyles } from '../../../assets/material-styles/styles'
import HttpsIcon from '@material-ui/icons/Https';
import { Paper } from '@material-ui/core';


const ForgotPassword = () => 
{
    const classes = forgotResetPasswordUseStyles();

    return (
        <Container component="main" maxWidth="sm" component={Paper}>
            <CssBaseline />
            <div className={classes.paper}>
                <Box display='flex'>
                    <HttpsIcon className={classes.icon}/>
                </Box>
                <Typography component="h1" variant="h5" className={classes.title} gutterBottom>
                    Forgot Password?
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send my email
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <NavLink to="/auth/login" variant="body2" className={classes.links}>
                                {"Password was not forgotten? Sign In"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}


export default ForgotPassword