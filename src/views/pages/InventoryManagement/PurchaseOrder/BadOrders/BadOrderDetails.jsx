import React, {useState, useEffect} from 'react';
import Loading from '../../../../../components/Loading'
import * as BadOrder_ from '../../../../../services/inventory-management/badOrders'
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import { dataGridUseStyles } from '../../../../../assets/material-styles/styles'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';


const BadOrderDetails = ({match}) => 
{
    const classes = dataGridUseStyles();
    const [loading, setLoading] = useState(true);

    const {badOrderId} = match.params;
    const [badOrderDetails, setBadOrderDetails] = useState({
        badOrder: {
            id: 0,
            created_by: '',
            status: '',
            purchase_order_date: '',
            created_at: '',
        },
        details: []
    });

    const columns = [
        { field: 'id', hide: true},
        { field: 'product_description', headerName: 'Product', width: 300 },
        { field: 'defect', headerName: 'Cause of return', width: 300 },
        { field: 'purchase_return', headerName: 'Purchase return', width: 300 },
        { field: 'number_of_items', headerName: 'Number of items', width: 240 },
    ];
    

    const fetchBadOrderDetails = async () => 
    {
        const result = await BadOrder_.fetchAsync({
            bad_order_id: badOrderId
        });

        if (result.status === 'Success')
        {
            setBadOrderDetails(result.data);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchBadOrderDetails();

        return () => {
            setBadOrderDetails({
                badOrder: {
                    id: 0,
                    created_by: '',
                    status: '',
                    purchase_order_date: '',
                    created_at: '',
                },
                details: []
            });
        }
    }, []);


    return loading 
        ? <Loading />
        :(
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container spacing={2} direction='column'>
                                <Typography variant="subtitle1" color="initial">
                                    <Grid container>
                                        <Grid item>
                                            <NavLink to={'/inventory-mngmt/bad-orders'}>
                                                <KeyboardArrowLeftIcon />
                                            </NavLink>
                                        </Grid>
                                        <Grid item>
                                            Bad orders
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </Typography>
                                <Grid item>
                                    <Typography variant="h4" color="initial">
                                        BO{badOrderId}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2" color="initial">
                                        <strong>Created by:</strong> {badOrderDetails.badOrder.created_by}
                                    </Typography>
                                    <Typography variant="subtitle2" color="initial">
                                        <strong>Date of purchase:</strong> {badOrderDetails.badOrder.purchase_order_date}
                                    </Typography>
                                    <Typography variant="subtitle2" color="initial">
                                        <strong>Date created:</strong> {badOrderDetails.badOrder.created_at}
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
                    rows={badOrderDetails.details} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default BadOrderDetails
