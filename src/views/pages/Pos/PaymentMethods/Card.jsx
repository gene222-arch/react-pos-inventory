import React from 'react'
import {useHistory} from 'react-router-dom'
import * as POS_ from '../../../../services/pos/pos'
import {CURRENCY} from '../../../../config/currency'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, TextField, Button } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { Mail } from '@material-ui/icons'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FaceIcon from '@material-ui/icons/Face';

const paymentUseStyles = makeStyles((theme) => ({
    balanceContainer: {
        width: '100%'
    },
    balanceTxtContent: {
        textAlign: 'center'
    },
    mailIcon: {
        backgroundColor: '#FFF',
        '&:hover': {
            color: theme.palette.warning.main,
        }
    },
    wallet: {
        color: green[400]
    },
    newSale: {
        width: '100%',
        color: '#FFF',
        backgroundColor: green[400],
        '&:hover': {
            backgroundColor: green[300]
        }
    }
}))


const Card = ({customer, total, paymentProcessState, dispatchPaymentProcessState, validatedData}) => 
{
    const classes = paymentUseStyles();
    const history = useHistory();
    
    const handleOnChange = (e) => {
        const {name, value} = e.target;

        if (name === 'email') {
            dispatchPaymentProcessState({
                type: 'set-email',
                payload: {
                    email: value
                }
            })
        }
        if (name === 'name') 
        {
            dispatchPaymentProcessState({
                type: 'set-name',
                payload: {
                    name: value
                }
            })
        }
    };


    const charge = async () => 
    {
        console.log(validatedData())
        const result = await POS_.processPaymentAsync(validatedData());

        if (result.status === 'Success')
        {
            history.go(0);
        }
    }


    return (
        <>
            <Grid container spacing={4} justify='center'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography 
                        variant="h4" 
                        color="initial" 
                        className={classes.balanceTxtContent} gutterBottom>
                        <AccountBalanceWalletIcon className={classes.wallet}/> Total: {CURRENCY + total}
                    </Typography>
                </Grid>
                {
                    customer.email === 'NULL' && (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={10} sm={10} md={10} lg={11}>
                                <TextField
                                    id=""
                                    label="Name" 
                                    name='name' 
                                    fullWidth
                                    value={paymentProcessState.customer_name}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={1}>
                                <Button variant="text" color="default" className={classes.mailIcon}>
                                    <FaceIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={10} sm={10} md={10} lg={11}>
                                <TextField
                                    id=""
                                    label="Email address"  
                                    name='email'
                                    fullWidth
                                    value={paymentProcessState.customer_email}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={1}>
                                <Button variant="text" color="default" className={classes.mailIcon}>
                                    <Mail />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    )
                }
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button 
                        variant="contained" 
                        color="default" 
                        className={classes.newSale}
                        onClick={charge}
                    >
                        New sale 
                    </Button>
                </Grid>
            </Grid>  
        </>
    )
}

export default Card
