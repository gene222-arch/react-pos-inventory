import React, {useState, useEffect, useReducer, lazy} from 'react'
import * as Pos_ from '../../../services/pos/pos'
import Charge from './PaymentMethods/Charge'
import CardPayment from './PaymentMethods/Card'
import Invoice from './PaymentMethods/Invoice'
import {POS_PAYMENT_DATAGRID_COLUMNS} from '../../../config/dataGrid'
import {CURRENCY} from '../../../config/currency'
import {processPaymentUseStyles} from '../../../assets/material-styles/styles'
import { DataGrid } from '@material-ui/data-grid';
import { Grid, Typography, Divider, Card, CardContent, TextField, Button, Avatar, CardHeader, IconButton } from '@material-ui/core';
import { ReceiptRounded, CardMembership, Money, ArrowBackIos, Clear, MoreVert as MoreVertIcon } from '@material-ui/icons'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const paymentReducer = (state, action) => 
{
    switch (action.type) 
    {
        case 'set-payment-type':
                return {...state, payment_method: action.payload.paymentMethod};
            break;

        case 'set-email':
            return {...state, customer_email: action.payload.email};
        break;

        case 'set-name':
            return {...state, customer_name: action.payload.name};
        break;

        case 'set-should-mail':
            return {...state, should_mail: action.payload.shouldMail};
        break; 

        case 'set-cash':
            return {...state, cash: parseFloat(action.payload.cash).toFixed(2)};
        break;        
    
        case 'clear-cash':
            return {...state, cash: 0.00};
        break;          

        case 'set-number-of-days':
            return {...state, number_of_days: action.payload.numberOfDays};
        break;     

        default:
            return state;
            break;
    }
}


const CUSTOMER_DEFAULT_PROPS = {
    name: '',
    email: ''
}


const ProcessPayment = ({customerId, handleOnProcessPayment, orderDetails, paymentAmountDetails}) => 
{
    const classes = processPaymentUseStyles();

    const TO_PAY = parseFloat(paymentAmountDetails.total.replaceAll(',', '')).toFixed(2);

    const [paymentProcessState, dispatchPaymentProcessState] = useReducer(paymentReducer, {
        customer_id: customerId,
        customer_email: '',
        customer_name: '',
        payment_method: '',
        should_mail: false,
        cash: 0.00,
        number_of_days: 30,
    });
    const [customer, setCustomer] = useState(CUSTOMER_DEFAULT_PROPS);

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

    const handlePaymentMethod = (paymentMethod) => 
    {
        const change = paymentProcessState.cash - TO_PAY;

        if (paymentMethod === 'cash' && Math.sign(change) === -1) 
        {
            setAlertSeverity('error');
            setAlertMessage(`Cash is not enough, remaining fees: ${CURRENCY}${Math.abs(change)}`);
            setOpenAlert(true);
        }
        else 
        {
            dispatchPaymentProcessState({
                type: 'set-payment-type',
                payload: {
                    paymentMethod: paymentMethod
                }
            })
        }

};

    const handleOnChargeAmount = (e, amount) => 
    {
        if (e.target.name === 'input-cash')
        {
            dispatchPaymentProcessState({
                type: 'set-cash',
                payload: {
                    cash: parseFloat(e.target.value)
                }
            });
        }
        else 
        {
            dispatchPaymentProcessState({
                type: 'set-cash',
                payload: {
                    cash: parseFloat(amount.toFixed(2))
                }
            });
        }
    }

    const handleOnClearAmount = () => dispatchPaymentProcessState({
        type: 'clear-cash'
    });

    const handleMailOnChange = (e) => dispatchPaymentProcessState({
        type: 'set-should-mail',
        payload: {
            shouldMail: e.target.checked
        }
    })

    const fetchCustomer = async () => 
    {
        const result = await Pos_.fetchCustomerAsync({
            customer_id: customerId
        });

        if (result.status === 'Success')
        {
            setCustomer(result.data)
        }
    }

    const validatedData = () => 
    {
        if (paymentProcessState.should_mail && customer.email !== 'NULL')
        {
            switch (paymentProcessState.payment_method) {
                case 'cash':
                        return {
                            customer_id: paymentProcessState.customer_id,
                            payment_method: paymentProcessState.payment_method,
                            cash: parseFloat(paymentProcessState.cash),
                            should_mail: paymentProcessState.should_mail
                        }
                    break;
        
                case 'credit':
                    return {
                        customer_id: paymentProcessState.customer_id,
                        payment_method: paymentProcessState.payment_method,
                        should_mail: paymentProcessState.should_mail
                    }
                    break;

                case 'invoice':
                    return {
                        customer_id: paymentProcessState.customer_id,
                        payment_method: paymentProcessState.payment_method,
                        should_mail: paymentProcessState.should_mail,
                        number_of_days: paymentProcessState.number_of_days
                    }
                    break;
                default:
                    return paymentProcessState;
                    break;
            }
        }
        else 
        {
            switch (paymentProcessState.payment_method) {
                case 'cash':
                        return {
                            customer_id: paymentProcessState.customer_id,
                            payment_method: paymentProcessState.payment_method,
                            cash: parseFloat(paymentProcessState.cash),
                            should_mail: paymentProcessState.should_mail,
                            customer_name: paymentProcessState.customer_name,
                            customer_email: paymentProcessState.customer_email
                        }
                    break;
        
                case 'credit':
                    return {
                        customer_id: paymentProcessState.customer_id,
                        payment_method: paymentProcessState.payment_method,
                        should_mail: paymentProcessState.should_mail,
                        customer_name: paymentProcessState.customer_name,
                        customer_email: paymentProcessState.customer_email
                    }
                    break;

                case 'invoice':
                    return {
                        customer_id: paymentProcessState.customer_id,
                        payment_method: paymentProcessState.payment_method,
                        should_mail: paymentProcessState.should_mail,
                        number_of_days: paymentProcessState.number_of_days,
                        customer_name: paymentProcessState.customer_name,
                        customer_email: paymentProcessState.customer_email
                    }
                    break;
                default:
                    return paymentProcessState;
                    break;
            }
        }
    }


    useEffect(() => {
        fetchCustomer();

        return () => {
            setCustomer(CUSTOMER_DEFAULT_PROPS);
        }
    }, []);


    return (
        <>
           <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={classes.dataGridContainer}>
                                <DataGrid 
                                    disableDensitySelector
                                    checkboxSelection={false}
                                    disableColumnSelector={true}
                                    disableColumnFilter={true}
                                    disableColumnMenu={true}
                                    hideFooterPagination={true}
                                    rows={orderDetails} 
                                    columns={POS_PAYMENT_DATAGRID_COLUMNS} 
                                    className={classes.dataGrid}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card>
                                <CardContent>
                                    <Grid container direction='column'>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Grid container justify='space-between'>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="initial">
                                                        Discounts
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {paymentAmountDetails.discount}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container justify='space-between'>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="initial">
                                                        Tax
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {paymentAmountDetails.tax}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid item>
                                            <Grid container justify='space-between'>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="initial">
                                                        Total
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="initial">
                                                        <strong>{paymentAmountDetails.total}</strong>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Card className={classes.paymentMethodTypeContainer}>
                        <CardHeader
                            avatar={
                                <Avatar>
                                    {(customer.name).substr(0, 1)}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="">
                                    {
                                        paymentProcessState.payment_method === '' && (
                                            <>
                                                <ArrowBackIos onClick={handleOnProcessPayment} />
                                            </>
                                        )
                                    }
                                    {
                                        paymentProcessState.payment_method && (
                                            <ArrowBackIos onClick={() => handlePaymentMethod('')}/>
                                        )
                                    }
                                </IconButton>
                            }
                            titleTypographyProps={{ 
                                    variant: 'h3'
                                }}
                            title={`${CURRENCY} ${paymentAmountDetails.total}`}
                            subheader="To pay"
                            
                        />
                        <CardContent>
                            <FormControlLabel
                                control={
                                <Switch 
                                    checked={paymentProcessState.should_mail} 
                                    onChange={handleMailOnChange} 
                                />}
                                label="Mail"
                            />
                        {
                            (   paymentProcessState.payment_method.length > 0 &&
                                paymentProcessState.payment_method === 'cash') && (
                                <Charge 
                                    change={
                                        (paymentProcessState.cash - TO_PAY).toFixed(2)
                                    }
                                    customer={customer}
                                    paymentProcessState={paymentProcessState}
                                    dispatchPaymentProcessState={dispatchPaymentProcessState}
                                    validatedData={validatedData}
                                />
                            )
                        }
                        {    paymentProcessState.payment_method.length > 0 && 
                            (paymentProcessState.payment_method === 'credit') && (
                                <CardPayment 
                                    customer={customer}
                                    total={paymentAmountDetails.total}
                                    paymentProcessState={paymentProcessState}
                                    dispatchPaymentProcessState={dispatchPaymentProcessState}
                                    validatedData={validatedData}
                                />
                            )
                        }
                        {
                            paymentProcessState.payment_method.length > 0 &&
                            (paymentProcessState.payment_method === 'invoice') && (
                                <Invoice 
                                    customer={customer}
                                    total={paymentAmountDetails.total}
                                    paymentProcessState={paymentProcessState}
                                    dispatchPaymentProcessState={dispatchPaymentProcessState}
                                    validatedData={validatedData}
                                />
                            )
                        }
                        {
                            !paymentProcessState.payment_method &&
                                <Grid container spacing={4}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Grid container spacing={1} justify='center'>
                                                <Grid item xs={11} sm={11} md={11} lg={11}>
                                                    <TextField
                                                        id=""
                                                        label=""
                                                        name='input-cash'
                                                        value={paymentProcessState.cash}
                                                        onChange={(e) => handleOnChargeAmount(e, 0)}
                                                        fullWidth
                                                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                                                    />
                                                </Grid>
                                                <Grid item xs={1} sm={1} md={1} lg={1}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.clearAmountBtn}
                                                        onClick={handleOnClearAmount}
                                                    >
                                                        <Clear  className={classes.clearAmountIcon}/>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Grid container justify='center' spacing={1}>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={(e) => handleOnChargeAmount(e, 20)}
                                                    >
                                                        20
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={(e) => handleOnChargeAmount(e, 50)}
                                                    >
                                                        50
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={(e) => handleOnChargeAmount(e, 100)}
                                                    >
                                                        100
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={(e) => handleOnChargeAmount(e, 200)}
                                                    >
                                                        200
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={(e) => handleOnChargeAmount(e, 500)}
                                                    >
                                                        500
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={(e) => handleOnChargeAmount(e, 1000)}
                                                    >
                                                        1000
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Button 
                                                variant="contained" 
                                                color="default" 
                                                className={`${classes.paymentTypeBtns} ${classes.chargeBtn}`}
                                                onClick={() => handlePaymentMethod('cash')}
                                                disabled={!Boolean(paymentProcessState.cash)}
                                            >
                                                <Grid container spacing={1} justify='center'>
                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        <Money />
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        Charge
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                className={`${classes.paymentTypeBtns} ${classes.cardBtn}`}
                                                onClick={() => handlePaymentMethod('credit')}
                                                disabled={Boolean(paymentProcessState.cash)}
                                            >
                                                <Grid container spacing={1} justify='center'>
                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        <CardMembership />
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        Card
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Button 
                                                variant="contained" 
                                                color="default" 
                                                className={`${classes.paymentTypeBtns} ${classes.invoiceBtn}`}
                                                onClick={() => handlePaymentMethod('invoice')}
                                                disabled={Boolean(paymentProcessState.cash)}
                                            >
                                                <Grid container spacing={1} justify='center'>
                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        <ReceiptRounded />
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                                        Invoice
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                    </Grid>            
                        }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default ProcessPayment
