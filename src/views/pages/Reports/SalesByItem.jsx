import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import { List, ListItem, ListItemText, Avatar, CardHeader, IconButton, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import StarIcon from '@material-ui/icons/Star';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import { salesByUseStyles } from '../../../assets/material-styles/styles'
import * as DateHelper from '../../../utils/dates'

HighchartsExporting(Highcharts)

const SalesByItem = () => 
{
    const classes = salesByUseStyles();
    const [ salesType, setSalesType ] = useState('Monthly');

    const [purchaseOrderDate, setPurchaseOrderDate] = useState(DateHelper.currentDate);
    const [expectedDate, setExpectedDate] = useState(DateHelper.currentDate);

    const columns = [
        { field: 'item', headerName: 'Item', width: 270 },
        { field: 'category', headerName: 'Category', width: 222 },
        { field: 'items_sold', headerName: 'Items sold', width: 170 },
        { field: 'net_sales', headerName: 'Net sales', width: 170 },
        { field: 'cost_of_goods', headerName: 'Cost of goods', width: 170 },
        { field: 'gross_profit', headerName: 'Gross profit', width: 170 },
    ];

    const rows = [
    { id: 1, item: 'Snow', category: 'Bag', items_sold: 10, net_sales: 200.50, cost_of_goods: 150.00, gross_profit: 50.50},
    { id: 2, item: 'Nike', category: 'Shoes', items_sold: 10, net_sales: 200.50, cost_of_goods: 150.00, gross_profit: 50.50},
    { id: 3, item: 'Adidas', category: 'Shoes', items_sold: 10, net_sales: 200.50, cost_of_goods: 150.00, gross_profit: 50.50},
    ];

    const salesByItemChartOptions = {
        chart: {
            style: {
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }
        },
        credits: {
            enabled: false,
        },
        responsive: {  
            rules: [{  
              condition: {  
                maxWidth: 500  
              },  
              chartOptions: {  
                legend: {  
                  enabled: false  
                }  
              }  
            }]  
        },
        title: {
            text: `${salesType} Sales`
        },
        yAxis: {
            title: {
                text: 'Sales'
            }
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        series: [{
            data: [100, 200, 300, 400, 500, 600, 100, 200, 300, 400, 500, 600]
        }]
    };

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
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar className={classes.topFiveItemAvatar}>
                                            <StarIcon className={classes.topFiveItemIcon}/>
                                        </Avatar>
                                    }
                                    title="Top 5 items"
                                    subheader=''
                                    titleTypographyProps={{ 
                                        variant: 'h5'
                                    }}
                                />
                                <CardContent>
                                    <Grid item>
                                        <List>
                                            {[
                                                'Banana', 'Apple', 'Orange', 'Kiwi', 'Strawberry'
                                            ].map((fruit, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Grid>
                                </CardContent>    
                            </Card>
                
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Card>
                                <CardContent>
                                    <HighchartsReact 
                                        highcharts={Highcharts} 
                                        options={salesByItemChartOptions} 
                                        
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
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


export default SalesByItem
