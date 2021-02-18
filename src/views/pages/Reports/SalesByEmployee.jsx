import React, { useState, useEffect } from 'react'
import * as SalesByEmployee_ from '../../../services/reports/salesByEmployee'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import { salesByUseStyles } from '../../../assets/material-styles/styles'
import * as DateHelper from '../../../utils/dates'


const SalesByEmployee = () => 
{
    const classes = salesByUseStyles();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [salesByEmployees, setSalesByEmployees] = useState([]);

    const columns = [
        { field: 'cashier', headerName: 'Name', width: 320 },
        { field: 'gross_sales', headerName: 'Gross sales', width: 310.5, valueFormatter: params => params.value.toFixed(2) },
        { field: 'discount', headerName: 'Discounts', width: 310.5, valueFormatter: params => params.value.toFixed(2) },
        { field: 'net_sales', headerName: 'Net sales', width: 310.5, valueFormatter: params => params.value.toFixed(2) },
    ];

    const handleStartDate = (date) => setStartDate(DateHelper.prepareExtractCurDate(date));
    const handleEndDate = (date) => setEndDate(DateHelper.prepareExtractCurDate(date));
    const handleRemoveDate = () => {
        setStartDate(null);
        setEndDate(null);
        fetchSalesByEmployeeReports();
    }

    const fetchSalesByEmployeeReports = async () =>
    {
        const result = await SalesByEmployee_.fetchReports();

        if (result.status === 'Success')
        {
            setSalesByEmployees(result.data);
            console.log(result.data)
        }
    }


    const fetchSalesByEmployeeReportsWithDate = async () =>
    {
        const result = await SalesByEmployee_.fetchReports();

        if (result.status === 'Success')
        {
            setSalesByEmployees(result.data);
        }
    }

    useEffect(() => 
    {
        fetchSalesByEmployeeReports();

        return () => fetchSalesByEmployeeReports();
    }, []);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container spacing={1} justify='flex-start' alignItems='center'>
                                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                                <KeyboardDatePicker
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
                                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                                <KeyboardDatePicker
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
                                                    onClick={fetchSalesByEmployeeReportsWithDate}
                                                >
                                                    Apply
                                                </Button>
                                            </Grid>
                                            {
                                                (startDate !== null || endDate !== null) && (
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
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            rows={salesByEmployees} 
                            columns={columns} 
                            className={classes.dataGrid}
                        />
                    </div>  
                </Grid>
            </Grid>
        </>
    )
}


export default SalesByEmployee
