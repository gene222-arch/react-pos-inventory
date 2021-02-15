import React, {useState} from 'react';
import {resetPasswordAsync} from '../../../services/auth/forgot-password/forgotPassword'
import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { forgotResetPasswordUseStyles } from '../../../assets/material-styles/styles'
import LoopIcon from '@material-ui/icons/Loop';


const ResetPassword = () =>  
{
    const classes = forgotResetPasswordUseStyles();

    const [passwords, setPasswords] = useState({
        password: '',
        password_confirmation: '',
    });

    const handlePasswordsOnChange = (e) => 
    {
        const {name, value} = e.target;
        setPasswords({...passwords, [name]: value})
    }

    const handlePasswordReset = (e) => 
    {
        e.preventDefault();

        const result = resetPasswordAsync(passwords);
        console.log(result);
    }

    return (
        <Container component="main" maxWidth="sm" component={Paper}>
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
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        type='password'
                        value={passwords.password}
                        onChange={handlePasswordsOnChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirm_password"
                        label="Confirm Password"
                        name="confirm_password"
                        autoComplete="confirm_password"
                        autoFocus
                        type='password'
                        value={passwords.password_confirmation}
                        onChange={handlePasswordsOnChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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