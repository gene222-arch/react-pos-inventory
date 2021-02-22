import React, {useState, useEffect} from 'react';
import LinearWithValueLabel from '../../../../components/LinearWithValueLabel'
import clsx from 'clsx'
import * as PurchaseOrder_ from '../../../../services/inventory-management/purchaseOrders'
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';
import * as DateHelper from '../../../../utils/dates'




const PurchaseOrderList = () => 
{

    const classes = dataGridUseStyles();
    const history = useHistory();

    const [purchaseOrders, setPurchaseOrders] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Purchase order #', width: 163 },
        { field: 'purchase_order_date', headerName: 'Date', width: 200 },
        { field: 'status', headerName: 'Status', width: 163,
            cellClassName: (params) =>  clsx('super-app', {
                grey: params.value === 'Closed',
            })
        },
        { field: 'supplier', headerName: 'Supplier', width: 163 },
        { field: 'received', headerName: 'Received', width: 200, 
            renderCell: (param) => (
                <LinearWithValueLabel 
                    label={'Received'}
                    progress={parseInt(param.value)}
                    value={parseInt(param.value)}
                    minValue={1}
                    maxValue={param.row.total_ordered_quantity}
                />
            )
        },
        { field: 'expected_on', headerName: 'Expected on', width: 200,
            cellClassName: (params) =>  clsx('super-app', {
                negative: params.value == DateHelper.currentDateWithFormat('mdy'),
            })
        },
        { field: 'total_ordered_quantity', headerName: 'Total', width: 163 },

    ];

    const fetchPurchaseOrders = async () => 
    {
        const result = await PurchaseOrder_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setPurchaseOrders(result.data);
        }
    }


    useEffect(() => {

        fetchPurchaseOrders();

        return () => {
            setPurchaseOrders([]);
        }
    }, []);

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Grid container>
                                <Grid item>
                                    <Button 
                                        variant="contained"
                                        color='primary' 
                                        className={classes.addBtn}
                                        startIcon={<AddIcon />}    
                                    >
                                        <NavLink to={'/inventory-mngmt/create-order'} className={classes.links}>
                                            Add Purchase Order
                                        </NavLink>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="text" className={classes.btn}> Export </Button>
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
                    onRowClick={(param) => history.push(`/inventory-mngmt/purchase-order-details/${param.row.id}`)}
                    rows={purchaseOrders} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.root}
                />
            </div>
        </>
    );
}

export default PurchaseOrderList
