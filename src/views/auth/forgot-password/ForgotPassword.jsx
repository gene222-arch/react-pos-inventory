import React, { useState, lazy } from 'react';
import {sendResetLinkEmailAsync} from '../../../services/auth/forgot-password/forgotPassword'
import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HttpsIcon from '@material-ui/icons/Https';
import { Paper } from '@material-ui/core';
import { forgotResetPasswordUseStyles } from '../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const ForgotPassword = () => 
{
    const classes = forgotResetPasswordUseStyles();
    const [loading, setLoading] = useState(false);
    
    const [email, setEmail] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };


    const handleEmailOnChange = (e) => setEmail(e.target.value);

    const handleOnSubmitEmail = async (e) => 
    {   
        setLoading(true);
        e.preventDefault();

        const result = await sendResetLinkEmailAsync({email});
        
        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setAlertMessage(result.message);
        }
        else 
        {
            setAlertSeverity('success');
            setAlertMessage(result.message);
        }
        
        setOpenAlert(true);
        setTimeout(() => setLoading(false), 2000);
    }

    return (
        <Container component="main" maxWidth="sm" component={Paper}>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
            <CssBaseline />
            <div className={classes.paper}>
                <Box display='flex'>
                    <HttpsIcon className={classes.icon}/>
                </Box>
                <Typography component="h1" variant="h5" className={classes.title} gutterBottom>
                    Forgot Password?
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleOnSubmitEmail}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailOnChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
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