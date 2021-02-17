import React, { useState, useEffect } from 'react'
import * as SalesByCategory_ from '../../../services/reports/salesByCategory'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import * as DateHelper from '../../../utils/dates'


const SalesByCategory = () => 
{
    const [startDate, setStartDate] = useState(DateHelper.currentDate);
    const [endDate, setEndDate] = useState(DateHelper.currentDate);

    const [salesByCategory, setSalesByCategory] = useState([]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'category', headerName: 'Category', width: 320 },
        { field: 'items_sold', headerName: 'Items sold', width: 217 },
        { field: 'sales', headerName: 'Sales', width: 217 },
        { field: 'cost_of_goods_sold', headerName: 'Cost of goods sold', width: 217 },
        { field: 'gross_profit', headerName: 'Gross profit', width: 217 },
        { field: 'net_sales', headerName: 'Net sales', width: 217 },
    ];

    const handleStartDate = (dataParam) => setStartDate(dataParam);
    const handleEndDate = (dataParam) => setEndDate(dataParam);

    const fetchSalesByCategory = async () => 
    {
        const result = await SalesByCategory_.fetchAllAsync({
            startDate,
            endDate
        });

        if (result.status === 'Success')
        {
            console.log(result)
        }
    }


    useEffect(() => {
        fetchSalesByCategory();
        return () => fetchSalesByCategory();
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
                                            <Grid item xs={12} sm={5} md={4} lg={4}>
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
                                            <Grid item xs={12} sm={5} md={4} lg={4}>
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
                                            <Grid item xs={12} sm={4} md={3} lg={3}>
                                                <Button variant="contained" color="primary" onClick={fetchSalesByCategory}>
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
                            rows={salesByCategory} 
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
