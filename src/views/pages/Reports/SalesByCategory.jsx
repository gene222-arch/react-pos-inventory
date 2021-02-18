import React, { useState, useEffect } from 'react'
import * as SalesByCategory_ from '../../../services/reports/salesByCategory'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import * as DateHelper from '../../../utils/dates'
import {salesByUseStyles} from '../../../assets/material-styles/styles'


const SalesByCategory = () => 
{
    const classes = salesByUseStyles();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [salesByCategory, setSalesByCategory] = useState([]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'category', headerName: 'Category', width: 320 },
        { field: 'items_sold', headerName: 'Items sold', width: 217 },
        { field: 'sales', headerName: 'Sales', width: 217, valueFormatter: params => params.value.toFixed(2) },
        { field: 'cost_of_goods_sold', headerName: 'Cost of goods sold', width: 217 },
        { field: 'gross_profit', headerName: 'Gross profit', width: 217,
            valueFormatter: params => params.value.toFixed(2)
        },
        { field: 'net_sales', headerName: 'Net sales', width: 217,
        valueFormatter: params => params.value.toFixed(2) },
    ];

    const handleStartDate = (date) => setStartDate(DateHelper.prepareExtractCurDate(date));
    const handleEndDate = (date) => setEndDate(DateHelper.prepareExtractCurDate(date));
    const handleRemoveDate = () => {
        setStartDate(null);
        setEndDate(null);
        fetchSalesByCategory();
    }

    const fetchSalesByCategory = async () => 
    {
        const result = await SalesByCategory_.fetchReports();

        if (result.status === 'Success')
        {
            setSalesByCategory(result.data)
            console.log(result.data)
        }
    }


    const fetchSalesByCategoryWithDate = async () => 
    {
        const result = await SalesByCategory_.fetchReports({
            startDate: startDate,
            endDate: endDate
        });

        if (result.status === 'Success')
        {
            setSalesByCategory(result.data)
            console.log(result.data)
        }
    }


    useEffect(() => {
        fetchSalesByCategory();
        return () => {
            setSalesByCategory([]);
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
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
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
                                            <Grid item xs={12} sm={6} md={3} lg={3}>
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
                                                    onClick={fetchSalesByCategoryWithDate}>
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
                            rowsPerPageOptions={[5, 10, 20]}
                            rows={salesByCategory} 
                            columns={columns} 
                            pageSize={5} 
                            className={classes.dataGrid}
                        />
                    </div>  
                </Grid>
            </Grid>
        </>
    )
}


export default SalesByCategory
