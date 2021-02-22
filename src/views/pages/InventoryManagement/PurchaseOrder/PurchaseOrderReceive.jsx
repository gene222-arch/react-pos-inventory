import React, { useState, useEffect } from 'react';
import EditDialog from '../../../../components/EditDialog'
import * as PurchaseOrder_ from '../../../../services/inventory-management/purchaseOrders'
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { receivePOTextFieldUseStyles } from '../../../../assets/material-styles/styles'


const purchaseOrderProps = {
    id: 0,
    purchase_order_id: 0,
    supplier_id: 0,
}

const PurchaseOrderReceive = ({match}) => 
{
    const history = useHistory();
    const classes = receivePOTextFieldUseStyles();
    const [open, setOpen] = useState(false);

    const {purchaseOrderId} = match.params;
    const [purchaseOrder, setPurchaseOrder] = useState(purchaseOrderProps);
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleOnChangeToReceive = (e, poId) =>
    {
        let value = e.target.value;
        value = parseInt(value) || 0;

        const po = purchaseOrderDetails
            .map(purchaseOrderDetail => {

                if (purchaseOrderDetail.id === poId)
                {
                    if (purchaseOrderDetail.total_ordered_quantity >= value)
                    {
                        return ({...purchaseOrderDetail, received_quantity: value});
                    }
                    else 
                    {
                        alert("Received quantity can't exceed ordered quantity");
                    }
                }
 
                    
                return purchaseOrderDetail;
            });
        
        setPurchaseOrderDetails(po);
    };

    const handleOnClickMarkAllReceived = async () =>
    {
        const result = await PurchaseOrder_.markAllAsReceivedAsync({
            purchase_order_id: purchaseOrderId,
            product_ids: purchaseOrderDetails.map(po => po.product_id)
        })

        if (result.status === 'Success')
        {
            history.push(`/inventory-mngmt/purchase-order-details/${purchaseOrderId}`)

        }
    };

    const columns = [
        { field: 'id',  hide: true, },
        { field: 'purchase_order_details_id', hide: true },
        { field: 'product_id', hide: true },
        { field: 'product_description', headerName: 'Product', width: 160 },
        { field: 'total_ordered_quantity', headerName: 'Ordered', width: 160 },
        { field: 'total_received_quantity', headerName: 'Received', width: 160 },
        { field: 'received_quantity', headerName: 'To receive', width: 160,
            renderCell: (params) => (
                <TextField
                    id=""
                    label=""
                    InputProps={{ inputProps: { min: 1, max: params.row.total_ordered_quantity } }}
                    value={params.value}
                    onChange={
                        (e) => handleOnChangeToReceive(e, params.row.id)
                    }
                    className={classes.toReceiveTextField}
                />
            ),
        },
    ];
    

    const fetchPurchaseOrders = async () => 
    {
        const result = await PurchaseOrder_.fetchToReceiveAsync({
            purchase_order_id: purchaseOrderId 
        })

        if (result.status === 'Success')
        {
            setPurchaseOrder(result.data.purchaseOrder);
            setPurchaseOrderDetails(result.data.items);
        }
    }


    const receivePurchaseOrder = async () => 
    {
        const result = await PurchaseOrder_.receiveAsync(validateDate())

        if (result.status === 'Success')
        {
            history.push(`/inventory-mngmt/purchase-order-details/${purchaseOrderId}`)
        }
    }


    const validateDate = () => 
    {
        delete purchaseOrder.id 

        const itemsReceived = purchaseOrderDetails.map(purchaseOrderDetail => ({
            product_id: purchaseOrderDetail.product_id,
            purchase_order_details_id: purchaseOrderDetail.purchase_order_details_id,
            received_quantity: purchaseOrderDetail.received_quantity
        }));

        return {
            ...purchaseOrder,
            items_received_quantities: itemsReceived
        };
    }
   

    useEffect(() => {

        fetchPurchaseOrders();

        return () => {
            setPurchaseOrder({});
            setPurchaseOrderDetails([]);
        }
    }, [])

    
    return (
        <>
            <EditDialog 
                open={open}
                handleClose={handleClose}
                handleAction={handleOnClickMarkAllReceived}
                title={'Mark all purchase as received'}
                dialogContentText={'Are you sure to mark items as received?'}
                actionName={'Receive'}
            />
            <Card>
                <CardContent>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Button variant="outlined" color="primary">
                                <NavLink to={'/products/list'} className={classes.title}>
                                    <strong>Products</strong>
                                </NavLink>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="primary"
                                onClick={handleClickOpen}
                            >
                                <strong>MARK ALL SA RECEIVED</strong>
                            </Button>
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
                    rows={purchaseOrderDetails} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button 
                        variant="contained" 
                        className={classes.cancelDeleteBtn} 
                        color="secondary"
                        onClick={() => history.push(`/inventory-mngmt/purchase-order-details/${purchaseOrderId}`)}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained" 
                        className={classes.addBtn}
                        onClick={receivePurchaseOrder}
                    >
                        Receive
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PurchaseOrderReceive
