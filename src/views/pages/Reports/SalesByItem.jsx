import React, { useState, useEffect } from 'react'
import {CURRENCY} from '../../../config/currency'
import Loading from '../../../components/Loading'
import * as SalesByItem_ from '../../../services/reports/salesByItem'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, ListItemSecondaryAction } from '@material-ui/core'
import { List, ListItem, ListItemText, Avatar, CardHeader, Button, Typography, TextField } from '@material-ui/core'
import {Select, FormControl, Divider, InputLabel, MenuItem} from '@material-ui/core';
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
    const [loading, setLoading] = useState(true);
    const [componentKey, setComponentKey] = useState((new Date()).toISOString());
    const [chartType, setChartType] = useState('line')

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [salesByItem, setSalesByItem] = useState({
        tableData: [],
        chartData: []
    });
    const [chartXLabel, setChartXLabel] = useState([]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'product_description', headerName: 'Item', width: 270 },
        { field: 'category', headerName: 'Category', width: 270 },
        { field: 'items_sold', headerName: 'Items sold', width: 170 },
        { field: 'sales', headerName: 'Sales', width: 170 },
        { field: 'net_sales', headerName: 'Net sales', width: 170 },
        { field: 'cost_of_goods_sold', headerName: 'Cost of goods sold', width: 200 },
        { field: 'gross_profit', headerName: 'Gross profit', width: 170,
            valueFormatter: params => params.value.toFixed(2)
        },
    ];

    const salesByItemChartOptions = {
        chart: {
            type: chartType,
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
            text: `Sales`
        },
        yAxis: {
            title: {
                text: 'Sales'
            }
        },
        xAxis: {
            categories: chartXLabel
        },
        tooltip: {
            formatter: function() {
                return `Sales in <strong>${this.x}:</strong> ${CURRENCY}${this.y}`
            }
        },
        series: [{
            name: 'Sales',
            data: salesByItem.chartData
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    };

    const handleStartDate = (date) => setStartDate(DateHelper.prepareExtractCurDate(date));
    const handleEndDate = (date) => setEndDate(DateHelper.prepareExtractCurDate(date));
    const handleRemoveDate = () => {
        setStartDate(null);
        setEndDate(null);
        fetchSalesByItemReports();
    }

    const fetchSalesByItemReports = async () => 
    {
        const result = await SalesByItem_.fetchReports();

        console.log(result);
        if (result.status === 'Success')
        {
            setSalesByItem(result.data);
            handleChartXLabel(result.data);
            setLoading(false);
        }
    }   


    const fetchSalesByItemReportsWithDate = async () => 
    {
        const result = await SalesByItem_.fetchReports({
            startDate: startDate,
            endDate: endDate
        });

        console.log(result);
        if (result.status === 'Success')
        {
            setSalesByItem(result.data);
            handleChartXLabel(result.data);
            setLoading(false);
        }
    }   


    const handleChartXLabel = (data) => 
    {
        const xAxis = [];
        data.tableData.map(item => {
            xAxis.push(item.product_description)
        })

        setChartXLabel(xAxis);
    }


    useEffect(() => 
    {
        fetchSalesByItemReports();

        window.addEventListener('resize', () => {
            setComponentKey((new Date()).toISOString());
        });

        return () => {
            setSalesByItem([]);
            setChartXLabel([]);
        }
    }, []);

    
    return loading 
        ? <Loading />
        : (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container spacing={1} justify='flex-start' alignItems='center'>
                                            <Grid item xs={12} sm={5} md={4} lg={3}>
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
                                            <Grid item xs={12} sm={5} md={4} lg={3}>
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
                                                    onClick={fetchSalesByItemReportsWithDate}
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
                                            <Grid item xs={12} sm={4} md={3} lg={3} className={classes.gridFlexGrow}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                                    <Select
                                                        name='supplier_id'
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                        fullWidth
                                                        value={chartType}
                                                        onChange={(e) => setChartType(e.target.value)}
                                                    >
                                                        {
                                                            ['line', 'column', 'bar'].map((type, index) => (
                                                                <MenuItem 
                                                                    key={index}
                                                                    value={type}
                                                                >
                                                                    {type}
                                                                </MenuItem>
                                                            ))
                                                        }
                                                    
                                                    </Select>
                                                </FormControl>
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
                                    title="Top 5 item's net sales"
                                    subheader=''
                                    titleTypographyProps={{ 
                                        variant: 'h5'
                                    }}
                                />
                                <CardContent>
                                    <Grid item>
                                        <List>
                                            {
                                                salesByItem.tableData.map((item, index) => (
                                                    <ListItem key={index}>
                                                        <ListItemText 
                                                            primary={`${item.product_description}`}
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <Typography variant="h5" color="initial">
                                                                {`${CURRENCY}${item.net_sales}`}
                                                            </Typography>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Grid>
                                </CardContent>    
                            </Card>
                
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Card>
                                <CardContent>
                                    <HighchartsReact                                
                                        key={componentKey} 
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
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            rows={salesByItem.tableData} 
                            columns={columns} 
                            className={classes.dataGrid}
                        />
                    </div>  
                </Grid>
            </Grid>
        </>
    )
}


export default SalesByItem
