import React, { useState } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import { salesByUseStyles } from '../../../assets/material-styles/styles'
import * as DateHelper from '../../../utils/dates'


const SalesByCategory = () => 
{
    const classes = salesByUseStyles();
    const [ salesType, setSalesType ] = useState('Monthly');

    const [purchaseOrderDate, setPurchaseOrderDate] = useState(DateHelper.currentDate);
    const [expectedDate, setExpectedDate] = useState(DateHelper.currentDate);

    const columns = [
        { field: 'item', headerName: 'Item', width: 320 },
        { field: 'items_sold', headerName: 'Items sold', width: 217 },
        { field: 'net_sales', headerName: 'Net sales', width: 217 },
        { field: 'cost_of_goods', headerName: 'Cost of goods', width: 217 },
        { field: 'gross_profit', headerName: 'Gross profit', width: 217 },
    ];

    const rows = [
    { id: 1, item: 'Snow', items_sold: 10, net_sales: 200.50, cost_of_goods: 150.00, gross_profit: 50.50},
    { id: 2, item: 'Nike', items_sold: 10, net_sales: 200.50, cost_of_goods: 150.00, gross_profit: 50.50},
    { id: 3, item: 'Adidas', items_sold: 10, net_sales: 200.50, cost_of_goods: 150.00, gross_profit: 50.50},
    ];

     const handlePurchaseOrderDate = (date) => {
        setPurchaseOrderDate(date);
    };

    const handleExpectedDate = (date) => {
        setExpectedDate(date);
    };

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
                                            <Grid item xs={12} sm={5} md={4} lg={4}>
                                                <KeyboardDatePicker
                                                    fullWidth
                                                    margin="normal"
                                                    id="From"
                                                    label="From"
                                                    format="MM/dd/yyyy"
                                                    value={purchaseOrderDate}
                                                    onChange={handlePurchaseOrderDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={5} md={4} lg={4}>
                                                <KeyboardDatePicker
                                                    fullWidth
                                                    margin="normal"
                                                    id="to"
                                                    label="To"
                                                    format="MM/dd/yyyy"
                                                    value={expectedDate}
                                                    onChange={handleExpectedDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={3} lg={3}>
                                                <Button variant="contained" color="primary">
                                                    Apply
                                                </Button>
                                            </Grid>
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
                            rows={rows} 
                            columns={columns} 
                            pageSize={5} 
                        />
                    </div>  
                </Grid>
            </Grid>
        </>
    )
}


export default SalesByCategory
