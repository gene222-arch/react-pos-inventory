import React, { useState, useEffect, lazy } from 'react';
import EditDialog from '../../../../components/EditDialog'
import * as PurchaseOrder_ from '../../../../services/inventory-management/purchaseOrders'
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { receivePOTextFieldUseStyles } from '../../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'))


const PURCHASE_ORDER_PROPS = {
    id: 0,
    purchase_order_id: 0,
    supplier_id: 0,
}

const PurchaseOrderReceive = ({match}) => 
{
    const history = useHistory();
    const classes = receivePOTextFieldUseStyles();
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const {purchaseOrderId} = match.params;
    const [purchaseOrder, setPurchaseOrder] = useState(PURCHASE_ORDER_PROPS);
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);


    const columns = [
        { field: 'id',  hide: true, },
        { field: 'purchase_order_details_id', hide: true },
        { field: 'product_id', hide: true },
        { field: 'product_description', headerName: 'Product', width: 160 },
        { field: 'total_ordered_quantity', headerName: 'Ordered', width: 160 },
        { field: 'total_received_quantity', headerName: 'Received', width: 160 },
        { field: 'remaining_total_ordered_quantity', headerName: 'Remaining order', width: 160 },
        { field: 'received_quantity', headerName: 'To receive', width: 160,
            renderCell: (params) => (
                <TextField
                    error={Boolean(params.value <= 0) || !Number.isInteger(params.value)}
                    InputProps={{ inputProps: { min: 1, max: params.row.total_ordered_quantity, style: { textAlign: 'right' } } }}
                    value={params.value}
                    onChange={
                        (e) => handleOnChangeToReceive(e, params.row.id)
                    }
                    className={classes.toReceiveTextField}
                />
            ),
        },
    ];
    

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };

    const handleOnChangeToReceive = (e, poId) =>
    {
        let value = e.target.value;
        value = parseInt(value) || 0;

        if (!Number.isInteger(value))
        {
            setAlertSeverity('error');
            setAlertMessage('Please input a valid number');
            setOpenAlert(true);
        }
        else 
        {
            const po = purchaseOrderDetails
            .map(purchaseOrderDetail => {

                if (purchaseOrderDetail.id === poId)
                {
                    if (purchaseOrderDetail.remaining_total_ordered_quantity >= value)
                    {
                        return ({...purchaseOrderDetail, received_quantity: value});
                    }
                    else 
                    {
                        setAlertSeverity('error');
                        setAlertMessage('Received quantity can\'t exceed the remaining ordered quantity');
                        setOpenAlert(true);
                    }
                }
 
                    
                return purchaseOrderDetail;
            });
        
            setPurchaseOrderDetails(po);
        }
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


    const fetchPurchaseOrders = async () => 
    {
        const result = await PurchaseOrder_.fetchToReceiveAsync({
            purchase_order_id: purchaseOrderId,
            do_filter: true,
            table_to_filter: 'purchase_order_details',
            filter_by: 'remaining_ordered_quantity',
            operator: '>',
            filter: 0
        })

        if (result.status === 'Success')
        {
            setPurchaseOrder(result.data.purchaseOrder);
            setPurchaseOrderDetails(result.data.items);
        }
    }


    const handleOnReceivePurchase = async () => 
    {
        setLoading(true);
        const result = await PurchaseOrder_.receiveAsync(validateDate());

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setAlertMessage('Unable to save changes. Please fix the errors and try again');
        }
        else 
        {
            const hasReceivedItems = validateDate()
                .items_received_quantities
                .find(item => item.received_quantity > 0);
            
            if (!hasReceivedItems) 
            {
                setAlertSeverity('warning');
                setAlertMessage('No items received');
            }
            else 
            {
                setAlertSeverity('success');
                setAlertMessage('Purchase order received');
            }

            setOpenAlert(true);
        
            setTimeout(() =>  history.push(`/inventory-mngmt/purchase-order-details/${purchaseOrderId}`), 2000);
        }

        setTimeout(() => setLoading(false), 2000);
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
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />

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
                            <Button variant="text" color="primary">
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
                                disabled={loading}
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
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained" 
                        className={classes.addBtn}
                        onClick={handleOnReceivePurchase}
                        disabled={loading}
                    >
                        Receive
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PurchaseOrderReceive
