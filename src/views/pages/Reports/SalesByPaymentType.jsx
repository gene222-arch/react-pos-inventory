import React, { useState, useEffect } from 'react'
import * as SalesByPaymentType_ from '../../../services/reports/salesByPaymentType'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import { salesByUseStyles } from '../../../assets/material-styles/styles'
import * as DateHelper from '../../../utils/dates'
import {prepareSetErrorMessages} from '../../../utils/errorMessages'


const SalesByPaymentType = () => 
{
    const classes = salesByUseStyles();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [salesByPaymentType, setSalesByPaymentType] = useState([]);
    const [errorMessages, setErrorMessages] = useState({
        startDate: '',
        endDate: ''
    })

    const columns = [
        { field: 'payment_type', headerName: 'Payment type', width: 248 },
        { field: 'gross_sales', headerName: 'Gross sales', width: 248 },
        { field: 'discounts', headerName: 'Discounts', width: 248 },
        { field: 'sales_return', headerName: 'Sales return', width: 248 },
        { field: 'net_sales', headerName: 'Net sales', width: 248 },
    ];

    const handleStartDate = (date) => setStartDate(DateHelper.prepareExtractCurDate(date));
    const handleEndDate = (date) => setEndDate(DateHelper.prepareExtractCurDate(date));

    const handleRemoveDate = () => {
        fetchSalesByPaymentType();
        setStartDate(null);
        setEndDate(null);
    }

    const fetchSalesByPaymentType = async () => 
    {
        const result = await SalesByPaymentType_.fetchReports();

        if (result.status === 'Success')
        {
            setSalesByPaymentType(result.data);
        }
    }


    const fetchSalesByPaymentTypeWithDate = async () => 
    {
        const result = await SalesByPaymentType_.fetchReports({
            startDate: startDate,
            endDate: endDate
        });

        if (result.status === 'Error')
        {
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }

        if (result.status === 'Success')
        {
            setSalesByPaymentType(result.data)
        }
        else 
        {
            setSalesByPaymentType([])
        }
    }

    useEffect(() => {
        fetchSalesByPaymentType();

        return () => {
            setSalesByPaymentType([]);
        };
    }, []);


    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container spacing={1} justify='flex-start' alignItems='center'>
                                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                                <KeyboardDatePicker
                                                    error={errorMessages.startDate !== ''}
                                                    helperText={errorMessages.startDate}
                                                    fullWidth
                                                    margin="normal"
                                                    id="From"
                                                    label="From"
                                                    format="MM/dd/yyyy"
                                                    value={startDate}
                                                    onChange={handleStartDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                                <KeyboardDatePicker
                                                    error={errorMessages.endDate !== ''}
                                                    helperText={errorMessages.endDate}
                                                    fullWidth
                                                    margin="normal"
                                                    id="to"
                                                    label="To"
                                                    format="MM/dd/yyyy"
                                                    value={endDate}
                                                    onChange={handleEndDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button 
                                                    variant="contained" 
                                                    color="primary"
                                                    onClick={fetchSalesByPaymentTypeWithDate}
                                                    disabled={
                                                        Boolean(startDate === null || endDate === null)
                                                    }
                                                >
                                                    Apply
                                                </Button>
                                            </Grid>
                                            {
                                                (startDate !== null && endDate !== null) && (
                                                    <Grid item>
                                                        <Button 
                                                            variant='contained'
                                                            className={classes.resetDateBtn}
                                                            onClick={handleRemoveDate}>
                                                            Reset
                                                        </Button>
                                                    </Grid>
                                                )
                                            }
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div style={{ width: '100%' }}>
                        <DataGrid 
                            autoHeight
                            showToolbar
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            rows={salesByPaymentType} 
                            columns={columns} 
                            rowsPerPageOptions={[5, 10, 20]}
                            pageSize={5} 
                            className={classes.dataGrid}
                        />
                    </div>  
                </Grid>
            </Grid>
        </>
    )
}


export default SalesByPaymentType
