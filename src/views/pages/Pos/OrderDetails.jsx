import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {POS_DATAGRID_COLUMNS} from '../../../config/dataGrid'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid} from '@material-ui/core'
import {Card, CardContent} from '@material-ui/core'
import {Typography, Button, Divider} from '@material-ui/core'


const OrderDetails = ({
    handleClickOpen, 
    handleOnTableSelectionChange, 
    orderDetails, 
    paymentAmountDetails,
    handleOnProcessPayment}) => 
{
    const classes = posUseStyles();

    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className={classes.dataGridContainer}>
                    <DataGrid 
                        disableDensitySelector
                        disableColumnSelector={true}
                        disableColumnFilter={true}
                        disableColumnMenu={true}
                        hideFooterPagination={true}
                        onRowClick={(params) => handleClickOpen(params.row)}
                        checkboxSelection
                        onSelectionChange={params => handleOnTableSelectionChange(params.rowIds)}
                        rows={orderDetails} 
                        columns={POS_DATAGRID_COLUMNS} 
                        className={classes.dataGrid}
                    />
                </div>
            </Grid>
            {/* Tax, Total, Discounts */}
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
            {/* Process Payment Button */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button 
                    variant="contained" 
                    color="default" 
                    className={classes.chargeBtn}
                    onClick={handleOnProcessPayment}
                >
                    Process Payment
                </Button>
            </Grid>
        </>
    )
}

export default OrderDetails
