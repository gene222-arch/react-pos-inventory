import React, {useState, lazy, useContext} from 'react'
import {Card, CardContent, Grid, TextField, Button, Divider, Typography} from '@material-ui/core'
import { accountUseStyles } from '../../../assets/material-styles/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserContext } from './../../../hooks/useContext/UserContext';
import CheckPasswordDialog from './CheckPasswordDialog.jsx'
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));

const Account = () => 
{
    const classes = accountUseStyles();
    const [loading, setLoading] = useState(false);

    const {authenticatedUser} = useContext(UserContext);

    const [credentials, setCredentials] = useState({
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        password: authenticatedUser.password
    });
    const [openCheckPassword, setOpenCheckPassword] = useState(false);
    const [toChange, setToChange] = useState('');

    const handleClickChangeCredentials = (toChange) => {
        setOpenCheckPassword(true);
        setToChange(toChange);
    };

    const handleCloseCheckPassword = () => setOpenCheckPassword(false);

    const handleCredentialsOnChange = (e) => 
        setCredentials({...credentials, [e.target.name]: e.target.value}); 


    return (
        <>
            <CheckPasswordDialog 
                open={openCheckPassword} 
                handleClose={handleCloseCheckPassword}
                toChange={toChange}
            />
            <Grid container spacing={1} direction='column'>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Card className={classes.textFieldContainer}>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <AccountCircleIcon className={classes.userIcon}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                            <TextField
                                                name='name'
                                                label="Name"
                                                fullWidth
                                                value={credentials.name}
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <Button 
                                                variant="text" 
                                                color="default"
                                                onClick={() => handleClickChangeCredentials('name')}
                                            >
                                                Change
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                            <TextField
                                                name='email'
                                                label="Email"
                                                fullWidth
                                                value={credentials.email}
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <Button 
                                                variant="text" 
                                                color="default"
                                                onClick={() => handleClickChangeCredentials('email')}
                                            >
                                                Change
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                            <TextField
                                                name='password'
                                                label="Password"
                                                fullWidth
                                                type='password'
                                                value={'password'}
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <Button 
                                                variant="text" 
                                                color="default"
                                                onClick={() => handleClickChangeCredentials('password')}
                                            >
                                                Change
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField
                                        variant='filled'
                                        label="Role"
                                        fullWidth
                                        value={authenticatedUser.role}
                                        disabled={true}
                                    />
                                </Grid>
                            </Grid>
                            <Divider />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
        </>
    )
}

export default Account
