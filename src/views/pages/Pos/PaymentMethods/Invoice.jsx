import React, {useState, lazy} from 'react'
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateRangeIcon from '@material-ui/icons/DateRange';
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const ALERT_MESSAGES = {
    CANT_PROCESS_PAYMENT: 'Unable to process payment, please fill in the necessary requirements.'
}


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
    },
    formControl: {
        width: '100%'
    }
}))


const Invoice = ({customer, total, paymentProcessState, dispatchPaymentProcessState, validatedData, handleOnProcessPayment, fetchCustomerCart}) => 
{
    const classes = paymentUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [errorMessages, setErrorMessages] = useState({
        customer_name: '',
        customer_email: ''
    });


    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

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
        if (name === 'number_of_days')
        {
            dispatchPaymentProcessState({
                type: 'set-number-of-days',
                payload: {
                    numberOfDays: value
                }
            })
        }
    };

    const charge = async () => 
    {
        setLoading(true);
        const result = await POS_.processPaymentAsync(validatedData());

        if (result.status === 'Error')
        {
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
            setAlertSeverity('error');
            setAlertMessage(ALERT_MESSAGES.CANT_PROCESS_PAYMENT);
        }
        else 
        {
            setAlertSeverity('success');
            setAlertMessage(result.message);
            
            fetchCustomerCart();

            setTimeout(() =>  {
                handleOnProcessPayment()
            }, 2000);
        }

        setOpenAlert(true);
        setTimeout(() =>  setLoading(false), 2000);
    }


    return (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
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
                    (customer.email === 'NULL' && paymentProcessState.should_mail) && (
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                        <Grid container justify='center' spacing={2} alignItems='center'>
                            <Grid item xs={10} sm={10} md={10} lg={11}>
                                <TextField
                                    error={Boolean(errorMessages.customer_name)}
                                    helperText={errorMessages.customer_name}
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
                                    error={Boolean(errorMessages.customer_email)}
                                    helperText={errorMessages.customer_email}
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
                            <Grid item xs={10} sm={10} md={10} lg={11}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Number of days</InputLabel>
                                    <Select
                                        name='number_of_days'
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        fullWidth
                                        value={paymentProcessState.number_of_days}
                                        onChange={handleOnChange}
                                    >
                                        {
                                            [30, 45, 60, 90].map((day, index) => (
                                                <MenuItem 
                                                    key={index}
                                                    value={day}
                                                >N - {day}
                                                </MenuItem>
                                            ))
                                        }
                                    
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={1}>
                                <Button variant="text" color="default" className={classes.mailIcon}>
                                    <DateRangeIcon />
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
                        disabled={loading}
                    >
                        New sale 
                    </Button>
                </Grid>
            </Grid>  
        </>
    )
}

export default Invoice
