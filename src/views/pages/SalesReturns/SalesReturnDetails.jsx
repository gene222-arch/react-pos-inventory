import React, {useState, useEffect} from 'react';
import * as SalesReturn_ from '../../../services/sales-returns/salesReturn.js'
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const DEFAULT_PROPS = {
    salesReturn: {
        id: 0,
        created_by: '',
        purchased_at: '',
        returned_at: '',
    },
    items: []
};


const SalesReturnDetails = ({match}) => 
{
    const classes = dataGridUseStyles();

    const {salesReturnId} = match.params;
    const [salesReturn, setSalesReturn] = useState(DEFAULT_PROPS);


    const columns = [
        { field: 'id', hide: true},
        { field: 'product_description', headerName: 'Product', width: 300 },
        { field: 'defect', headerName: 'Cause of return', width: 300 },
        { field: 'quantity', headerName: 'Number of items', width: 200 },
        { field: 'price', headerName: 'Price', width: 225.5 },
        { field: 'total', headerName: 'Amount', width: 225.5 },
    ];
    
    
    const fetchSalesReturn = async () => 
    {
        const result = await SalesReturn_.fetchAsync({
            sales_return_id: salesReturnId
        });

        if (result.status === 'Success')
        {
            setSalesReturn(result.data);
        }
    }


    useEffect(() => {
        fetchSalesReturn();

        return () => {
            setSalesReturn(DEFAULT_PROPS);
        }
    }, []);

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
                                        <strong>Created by:</strong> {salesReturn.salesReturn.created_by}
                                    </Typography>
                                    <Typography variant="subtitle2" color="initial">
                                        <strong>Date of purchase:</strong> {salesReturn.salesReturn.purchased_at}
                                    </Typography>
                                    <Typography variant="subtitle2" color="initial">
                                        <strong>Date created:</strong> {salesReturn.salesReturn.returned_at}
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
                    rows={salesReturn.items} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default SalesReturnDetails
