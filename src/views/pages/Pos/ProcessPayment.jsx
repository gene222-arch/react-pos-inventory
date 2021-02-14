import React, {useState} from 'react'
import Charge from './PaymentMethods/Charge'
import CardPayment from './PaymentMethods/Card'
import Invoice from './PaymentMethods/Invoice'
import {POS_PAYMENT_DATAGRID_COLUMNS} from '../../../config/dataGrid'
import {CURRENCY} from '../../../config/currency'
import {processPaymentUseStyles} from '../../../assets/material-styles/styles'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, Grid, Typography, Divider, Card, CardContent, TextField, Button, Avatar, CardHeader, IconButton } from '@material-ui/core';
import {red, green, orange} from '@material-ui/core/colors';
import { ReceiptRounded, CardMembership, Money, ArrowBackIos, Clear } from '@material-ui/icons'


const ProcessPayment = ({handleOnProcessPayment, customerId}) => 
{
    const classes = processPaymentUseStyles();

    const [amount, setAmount] = useState(0.00);
    const [paymentMethod, setPaymentMethod] = useState('');

    const [orderDetails, setOrderDetails] = useState([
        { id: 1, product_id: 1, product_description: 'Bag', quantity: 1, price: 12, discounts: 0.00 },
        { id: 2, product_id: 2, product_description: 'Shoes', quantity: 1, price: 12, discounts: 0.00 },
        { id: 3, product_id: 3, product_description: 'Wew', quantity: 1, price: 12, discounts: 0.00 },
        { id: 4, product_id: 4, product_description: 'Shoes', quantity: 1, price: 12, discounts: 1.00 },
    ]);

    const handlePaymentMethod = (paymentMethod) => setPaymentMethod(paymentMethod);

    const handleOnChargeAmount = (amount) => setAmount(amount);
    const handleOnClearAmount = () => setAmount(0.00);

    return (
        <>
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
                                                    P0.23
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
                                                    P0.23
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
                                                        <strong>P0.23</strong>
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
                                <Avatar aria-label="">
                                
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="">
                                    {
                                        paymentMethod === '' && (
                                            <ArrowBackIos onClick={handleOnProcessPayment} />
                                        )
                                    }
                                    {
                                        paymentMethod && (
                                            <ArrowBackIos onClick={() => handlePaymentMethod('')}/>
                                        )
                                    }
                                </IconButton>
                            }
                            titleTypographyProps={{ 
                                    variant: 'h3'
                                }}
                            title={`${CURRENCY} 120.50`}
                            subheader="To pay"
                            
                        />
                        <CardContent>
                        {
                            paymentMethod === 'Charge' && (
                                <Charge customerId={customerId}/>
                            )
                        }
                        {
                            paymentMethod === 'Card' && (
                                <CardPayment customerId={customerId}/>
                            )
                        }
                        {
                            paymentMethod === 'Invoice' && (
                                <Invoice customerId={customerId}/>
                            )
                        }
                        {
                            !paymentMethod &&
                                <Grid container spacing={4}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Grid container spacing={1} justify='center'>
                                                <Grid item xs={11} sm={11} md={11} lg={11}>
                                                    <TextField
                                                        id=""
                                                        label=""
                                                        value={amount}
                                                        onChange={(e) => handleOnChargeAmount(e.target.value)}
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
                                                        onClick={() => handleOnChargeAmount(20)}
                                                    >
                                                        20
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={() => handleOnChargeAmount(50)}
                                                    >
                                                        50
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={() => handleOnChargeAmount(100)}
                                                    >
                                                        100
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={() => handleOnChargeAmount(200)}
                                                    >
                                                        200
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={() => handleOnChargeAmount(500)}
                                                    >
                                                        500
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={2} lg={2}>
                                                    <Button 
                                                        variant="text" 
                                                        color="default" 
                                                        className={classes.chargeDefAmount}
                                                        onClick={() => handleOnChargeAmount(1000)}
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
                                                onClick={() => handlePaymentMethod('Charge')}
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
                                                onClick={() => handlePaymentMethod('Card')}
                                                disabled={amount}
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
                                                onClick={() => handlePaymentMethod('Invoice')}
                                                disabled={amount}
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
