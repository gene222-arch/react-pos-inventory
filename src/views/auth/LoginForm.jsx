  
import React, { useState } from 'react';
import {loginAsync} from '../../services/auth/login/login'
import {prepareSetErrorMessages} from '../../utils/errorMessages'
import { NavLink, useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { loginFormUseStyles } from '../../assets/material-styles/styles';
import * as Cookie from '../../utils/cookies'


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


const DEFAULT_CREDENTIAL_PROPS = {
    email: '',
    password: '',
    remember_me: false,
};

const DEFAULT_ERROR_MESSAGE_PROPS = {
    email: '',
    password: ''
};


const LoginForm = () => 
{
    const classes = loginFormUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [credentials, setCredentials] = useState(DEFAULT_CREDENTIAL_PROPS);
    const [errorMessages, setErrorMessages] = useState(DEFAULT_ERROR_MESSAGE_PROPS);

    const [mismatch, setMismatch] = useState('');

    
    const handleCredentialsOnChange = (e) => 
    {   
        const {name, value, checked} = e.target;
        if (name === 'remember_me')
        {
            setCredentials({...credentials, remember_me: checked})
        }
        else 
        {
            setCredentials({...credentials, [name]: value})
        }
    };

    const handleOnClickLogin = async (e) => 
    {   
        setLoading(true);
        e.preventDefault();

        const result = await loginAsync(history, credentials);
   
        if (result.status === 'Error')
        {
            setErrorMessages(DEFAULT_ERROR_MESSAGE_PROPS);
            setMismatch(result.message);   
        }

        else if (result.status === 'Success') 
        {
            setMismatch('');
            Cookie.setItem('access_token', result.data.access_token);

            if (Cookie.has('access_token'))
            {
                history.push('/');
            }
        }
        else 
        {
            setErrorMessages(prepareSetErrorMessages(result.errors, errorMessages));
        }
        setLoading(false);
    }



    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {
                        mismatch && (
                            <Alert 
                                className={classes.mismatchErrorMessage}
                                severity="error" 
                                onClose={() => setMismatch('')}
                            >{mismatch}!</Alert>
                        )
                    }
                    <form className={classes.form} noValidate onSubmit={handleOnClickLogin}>
                        <TextField
                            error={errorMessages.email !== ''}
                            helperText={errorMessages.email}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
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
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={handleCredentialsOnChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    name='remember_me'
                                    value={credentials.remember_me} 
                                    onChange={handleCredentialsOnChange}
                                    checked={credentials.remember_me}
                                    color="primary" 
                            />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            {
                                loading 
                                    ? 'Signing in...'
                                    : 'Sign in'
                            }
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <NavLink to={'/forgot-password/email'} variant="body2" className={classes.links}>
                                    Forgot password?
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to="/auth/register" variant="body2" className={classes.links}>
                                    {"Don't have an account? Sign Up"}
                                </NavLink>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}


export default LoginForm