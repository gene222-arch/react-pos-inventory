import React, { useState, lazy } from 'react';
import * as QueryString from '../../../utils/query-string.js'
import {resetPasswordAsync} from '../../../services/auth/forgot-password/forgotPassword'
import {NavLink, useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { forgotResetPasswordUseStyles } from '../../../assets/material-styles/styles'
import LoopIcon from '@material-ui/icons/Loop';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const PASSWORD_RESET_PROPS = {
    email: QueryString.get('email') || '',
    token: QueryString.get('token'),
    password: '',
    password_confirmation: '',
};


const ResetPassword = () =>  
{
    const classes = forgotResetPasswordUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [passwordReset, setPasswordReset] = useState(PASSWORD_RESET_PROPS);
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


    const handlePasswordsOnChange = (e) => setPasswordReset({...passwordReset, [e.target.name]: e.target.value});

    const handlePasswordReset = async (e) => 
    {
        setLoading(true);
        e.preventDefault();

        const result = await resetPasswordAsync(passwordReset);
        
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
        setTimeout(() => {
            history.push('/auth/login');
            setLoading(false)
        }, 2000);
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
                        <LoopIcon className={classes.icon}/>
                    </Box>
                <Typography component="h1" variant="h5" className={classes.title} gutterBottom>
                    Reset Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={handlePasswordReset}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={passwordReset.email}
                        onChange={handlePasswordsOnChange}
                        disabled={true}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        type='password'
                        value={passwordReset.password}
                        onChange={handlePasswordsOnChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirm_password"
                        label="Confirm Password"
                        name="password_confirmation"
                        autoComplete="confirm_password"
                        autoFocus
                        type='password'
                        value={passwordReset.password_confirmation}
                        onChange={handlePasswordsOnChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        Reset
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

export default ResetPassword