import React, { useState, useEffect } from 'react'
import Loading from '../../../components/Loading'
import * as CURRENCY from '../../../config/currency'
import * as Dashboard_ from '../../../services/dashboard/dashboard'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import Typography from '@material-ui/core/Typography'
import { Card, CardContent, CardHeader, CardActions } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { Grid, Divider } from '@material-ui/core'
import {List, ListItem, ListItemText, ListItemAvatar} from '@material-ui/core';
import RevenueIcon from '@material-ui/icons/Storefront';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import GrossProfitIcon from '@material-ui/icons/ShowChart';
import SalesReturnIcon from '@material-ui/icons/RemoveShoppingCart';
import NetSalesIcon from '@material-ui/icons/MultilineChart';
import InvoiceIcon from '@material-ui/icons/Receipt';
import PurchaseOrdersIcon from '@material-ui/icons/AddShoppingCart';
import { dashboardUseStyles } from '../../../assets/material-styles/styles'
import NO_DATA_IMG from '../../../assets/storage/images/dashboard/no_data.svg'

HighchartsExporting(Highcharts)

const Dashboard = () => 
{
    const classes = dashboardUseStyles();
    const [loading, setLoading] = useState(true);

    const [ salesType, setSalesType ] = useState('Monthly');
    const [componentKey, setComponentKey] = useState((new Date()).toISOString());
    const [dashboardData, setDashboardData] = useState({
        salesSummary: {
            gross_sales: 0.00,
            gross_profit: 0.00,
            sales_return: 0.00,
            net_sales: 0.00,
        }
    });

    const salesChartOptions = {
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
            text: `${(new Date()).getFullYear()} ${salesType} Sales`
        },
        yAxis: {
            title: {
                text: 'Sales'
            }
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        tooltip: {
            formatter: function() {
                return `Sales in <strong>${this.x}:</strong> ${CURRENCY.CURRENCY} ${this.y}`
            }
        },
        series: [{
            name: 'Sales',
            data: dashboardData.monthlySales
        }]
    };
    

    const fetchDashboardData = async () => 
    {
        const result = await Dashboard_.fetchDashboardData();

        if (result.status === 'Success')
        {
            if (result.data)
            {
                setDashboardData(result.data);
            }
            setLoading(false);
        }
    }


    useEffect(() => 
    {
        fetchDashboardData();
        window.addEventListener('resize', () => {
            setComponentKey((new Date()).toISOString());
        });

        return () => {
            fetchDashboardData();
        };
    }, []);


    return loading
        ? <Loading />
        : (    
            <div className={classes.root}> 
            <Grid container spacing={4} justify='center'>
                <Grid item xs={12} sm={12} md={6} lg={3} className={classes.reportCardContainer}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar 
                                    variant='rounded' 
                                    className={`${classes.cardHeaderIcon} ${classes.revenueContainer}`}>
                                    <RevenueIcon className={classes.salesReportIcons}/>
                                </Avatar>
                            }
                            title={`${CURRENCY.CURRENCY} ${(dashboardData.salesSummary.gross_sales).toFixed(2)}`}
                            subheader="Revenue"
                            titleTypographyProps={{ 
                                variant: 'h4',
                                className: classes.title
                            }}
                            subheaderTypographyProps={{ 
                                className: classes.subheader
                            }}
                        />
                        <CardContent>
                            <Divider />
                        </CardContent>
                        <CardActions className={classes.cardActionsContainer}>
                            <Typography variant="subtitle2" color="initial" className={classes.additionalInfo}>
                                <TrendingUpIcon /> {'$2000'} Last month
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>                
                
                <Grid item xs={12} sm={12} md={6} lg={3} className={classes.reportCardContainer}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar 
                                    variant='rounded' 
                                    className={`${classes.cardHeaderIcon} ${classes.grossProfitContainer}`}>
                                    <GrossProfitIcon className={classes.salesReportIcons}/>
                                </Avatar>
                            }
                            title={`${CURRENCY.CURRENCY} ${(dashboardData.salesSummary.gross_profit).toFixed(2)}`}
                            subheader="Gross profit"
                            titleTypographyProps={{ 
                                variant: 'h4',
                                className: classes.title
                            }}
                            subheaderTypographyProps={{ 
                                className: classes.subheader
                            }}
                        />
                        <CardContent>
                            <Divider />
                        </CardContent>
                        <CardActions className={classes.cardActionsContainer}>
                            <Typography variant="subtitle2" color="initial" className={classes.additionalInfo}>
                                <TrendingUpIcon /> {'$2000'} Last month
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>                

                <Grid item xs={12} sm={12} md={6} lg={3} className={classes.reportCardContainer}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar 
                                    variant='rounded' 
                                    className={`${classes.cardHeaderIcon} ${classes.salesReturnContainer}`}>
                                    <SalesReturnIcon className={classes.salesReportIcons}/>
                                </Avatar>
                            }
                            title={`${CURRENCY.CURRENCY} ${(dashboardData.salesSummary.sales_return).toFixed(2)}`}
                            subheader="Sales return"
                            titleTypographyProps={{ 
                                variant: 'h4',
                                className: classes.title
                            }}
                            subheaderTypographyProps={{ 
                                className: classes.subheader
                            }}
                        />
                        <CardContent>
                            <Divider />
                        </CardContent>
                        <CardActions className={classes.cardActionsContainer}>
                            <Typography variant="subtitle2" color="initial" className={classes.additionalInfo}>
                                <TrendingDownIcon /> {'-$2000'} Last month
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>                

                <Grid item xs={12} sm={12} md={6} lg={3} className={classes.reportCardContainer}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar 
                                    variant='rounded' 
                                    className={`${classes.cardHeaderIcon} ${classes.netSalesContainer}`}>
                                    <NetSalesIcon className={classes.salesReportIcons}/>
                                </Avatar>
                            }
                            title={`${CURRENCY.CURRENCY} ${(dashboardData.salesSummary.net_sales).toFixed(2)}`}
                            subheader="Net sales"
                            titleTypographyProps={{ 
                                variant: 'h4',
                                className: classes.title
                            }}
                            subheaderTypographyProps={{ 
                                className: classes.subheader
                            }}
                        />
                        <CardContent>
                            <Divider />
                        </CardContent>
                        <CardActions className={classes.cardActionsContainer}>
                            <Typography variant="subtitle2" color="initial" className={classes.additionalInfo}>
                                <TrendingUpIcon /> {'$2000'} Last month
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>                
            
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card className={classes.chartContainer}>
                        <CardContent className={classes.chartContainer}>
                            <HighchartsReact
                                key={componentKey}
                                highcharts={Highcharts} 
                                options={salesChartOptions} 
                                
                            />
                        </CardContent>
                    </Card>
                </Grid>
            
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar className={classes.pendingOrdersIcon}bel="">
                                   <InvoiceIcon />
                                </Avatar>
                            }
                            title="Invoices"
                            subheader="Pending"
                            titleTypographyProps={{ 
                                variant: 'h4'
                             }}
                        />
                    <Divider />
                        <CardContent>
                            <List>
                                {
                                    dashboardData.pendingInvoices.length > 0 
                                    ? dashboardData.pendingInvoices.map((invoice, index) => (
                                        <ListItem 
                                            key={index}
                                            button
                                        >
                                            <ListItemAvatar>
                                                <Avatar />
                                            </ListItemAvatar>
                                            <ListItemText 
                                                primary={`${invoice.invoice_date}`} 
                                                secondary={`name: ${invoice.name}`} />
                                        </ListItem>
                                    ))
                                    : (
                                        <Grid container justify='center'>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <img src={NO_DATA_IMG} className={classes.noDataImg}/>
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            </List>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar className={classes.pendingOrdersIcon}>
                                   <PurchaseOrdersIcon />
                                </Avatar>
                            }
                            title="Purchase orders"
                            subheader="Pending"
                            titleTypographyProps={{ 
                                variant: 'h4'
                             }}
                        />
                    <Divider />
                        <CardContent>
                            <List>
                                {
                                    dashboardData.inProcessPurchaseOrders.length > 0 
                                    ? dashboardData.inProcessPurchaseOrders.map((purchaseOrders, index) => (
                                        <ListItem 
                                            key={index}
                                            button
                                        >
                                            <ListItemAvatar>
                                                <Avatar />
                                            </ListItemAvatar>
                                            <ListItemText 
                                                primary={`${purchaseOrders.po_date}`}
                                                secondary={`supplier: ${purchaseOrders.supplier}`} />
                                        </ListItem>
                                    ))
                                    : (
                                        <Grid container justify='center'>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <img src={NO_DATA_IMG} className={classes.noDataImg}/>
                                            </Grid>
                                        </Grid>
                                    )
                                    
                                }
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        
        </div>
        );
}


export default Dashboard