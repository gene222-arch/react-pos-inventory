  
import React, { useState, lazy } from 'react';
import registerAsync from '../../services/auth/register/register'
import {prepareSetErrorMessages} from '../../utils/errorMessages.js'
import * as Cookie from '../../utils/cookies'
import { NavLink, useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { registrationFormUseStyles } from '../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../components/AlertMessages/AlertPopUpMessage'));



const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const REGISTRATION_DEFAULT_PROPS = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
};


const RegistrationForm = () => 
{
    const classes = registrationFormUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ credentials, setCredentials ] = useState(REGISTRATION_DEFAULT_PROPS);
    const [ errorMessages, setErrorMessages ] = useState(REGISTRATION_DEFAULT_PROPS);
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

    const handleCredentialsOnChange = (e) => setCredentials({...credentials, [e.target.name]: e.target.value})

    const handleCredentialsOnSubmit = async (e) => 
    {
        setLoading(true);
        e.preventDefault();

        const result = await registerAsync(credentials);
        
        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setAlertMessage('Registration failed. Please fix the errors and try again');
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }
        else 
        {
            setAlertSeverity('success');
            setAlertMessage('Registered successfully.');
            Cookie.setItem('access_token', result.data.access_token);

            setTimeout(() => {
                if (Cookie.has('access_token'))
                {
                    history.push('/');
                }
            }, 2000);
        }

        setTimeout(() => setLoading(false), 2000);
        setOpenAlert(true);
    }


    return (
        <Grid container component="main" className={classes.root}>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleCredentialsOnSubmit}>
                        <TextField
                            error={errorMessages.name !== ''}
                            helperText={errorMessages.name}
                            variant="outlined"
                            margin="normal"
                            
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={credentials.name}
                            onChange={handleCredentialsOnChange}
                        />

                        <TextField
                            error={errorMessages.email !== ''}
                            helperText={errorMessages.email}
                            variant="outlined"
                            margin="normal"
                        
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={credentials.email}
                            onChange={handleCredentialsOnChange}
                        />

                        <TextField
                            error={errorMessages.password !== ''}
                            helperText={errorMessages.password}
                            variant="outlined"
                            margin="normal"
                            
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={handleCredentialsOnChange}
                        />

                        <TextField
                            error={errorMessages.password_confirmation !== ''}
                            helperText={errorMessages.password_confirmation}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password_confirmation"
                            label="Confirm Password"
                            type="password"
                            id="password_confirmation"
                            autoComplete="current-password"
                            value={credentials.password_confirmation}
                            onChange={handleCredentialsOnChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Sign up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to="/auth/login" variant="body2" className={classes.loginLink}>
                                    {"Already have an account? Sign In"}
                                </NavLink>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
            
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
        </Grid>
    );
}


export default RegistrationForm