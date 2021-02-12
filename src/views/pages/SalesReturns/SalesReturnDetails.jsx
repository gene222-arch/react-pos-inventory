import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField, Typography, Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import AddIcon from '@material-ui/icons/Add';


const columns = [
    { field: 'sales_return_id', hide: true},
    { field: 'cashier', headerName: 'Cashier', width: 300 },
    { field: 'sales_return', headerName: 'Sales return', width: 300 },
    { field: 'no_of_items', headerName: 'Number of items', width: 240 },
    { field: 'date_ordered', headerName: 'Date ordered', width: 282 },
];

const rows = [
  { id: 1, sales_return_id: 'Snow', cashier: 'Admin', sales_return: 100.50, no_of_items: 12, date_ordered: 'January 12, 2021' },
  { id: 2, sales_return_id: 'Lannister', cashier: 'Admin', sales_return: '2021', no_of_items: 12, date_ordered: 'January, 12 2021' },
  { id: 3, sales_return_id: 'Lannister', cashier: 'Admin', sales_return: 100.50, no_of_items: 12, date_ordered: 'January, 12 2021' },
  { id: 4, sales_return_id: 'Stark', cashier: 'Admin', sales_return: 100.50, no_of_items: 12, date_ordered: 'January, 12 2021' },
  { id: 5, sales_return_id: 'Targaryen', cashier: 'Admin', sales_return: 100.50, no_of_items: 12, date_ordered: 'January, 12 2021' },

];


const SalesReturnDetails = ({match}) => {

    const classes = dataGridUseStyles();
    const history = useHistory();

    const {salesReturnId} = match.params;

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container spacing={2} direction='column'>
                                <Typography variant="subtitle1" color="initial">
                                    <Grid container>
                                        <Grid item>
                                            <NavLink to={'/sales-returns'}>
                                                <KeyboardArrowLeftIcon />
                                            </NavLink>
                                        </Grid>
                                        <Grid item>
                                            Sales Returns
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Typography>
                                <Grid item>
                                    <Typography variant="h4" color="initial">
                                        SR{salesReturnId}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" color="initial">
                                        <strong>Created by:</strong> {'Gene Phillip'}
                                    </Typography>
                                    <Typography variant="subtitle2" color="initial">
                                        <strong>Date created:</strong> {'January 12, 2021'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
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
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default SalesReturnDetails
