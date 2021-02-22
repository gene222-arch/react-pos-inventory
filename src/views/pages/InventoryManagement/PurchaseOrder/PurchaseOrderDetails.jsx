import React, { useState, useEffect } from 'react';
import Loading from '../../../../components/Loading'
import * as PurchaseOrder_ from '../../../../services/inventory-management/purchaseOrders'
import { NavLink, useHistory } from 'react-router-dom'
import LinearWithValueLabel from '../../../../components/LinearWithValueLabel'
import { purchaseOrderDetailsUseStyles } from '../../../../assets/material-styles/styles'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SendMailDialog from './SendMailDialog'
import EditIcon from '@material-ui/icons/Edit';


const columns = [
    { field: 'id',  hide: true, },
    { field: 'product_id', hide: true },
    { field: 'product_description', headerName: 'Product', width: 250 },
    { field: 'ordered_quantity', headerName: 'Ordered quantity', width: 250
    },
    { field: 'purchase_cost', headerName: 'Purchase cost', width: 250,
        valueFormatter: param => param.value.toFixed(2)
    },
    { field: 'amount', headerName: 'Amount', width: 250, 
    valueFormatter: param => param.value.toFixed(2) },
];


const PurchaseOrderDetails = ({match}) => 
{
    const classes = purchaseOrderDetailsUseStyles();
    const history = useHistory();
    const purchaseOrderId = match.params.purchaseOrderId;

    const [purchaseOrder, setPurchaseOrder] = useState({
        id: 0,
        ordered_by: '',
        supplier_id: 0,
        supplier: '',
        purchase_order_date: '',
        expected_delivery_date: '',
        total_ordered_quantity: 0,
        total_received_quantity: 0
    });
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);

    const [openSendMail, setOpenSendMail] = useState(false);
    const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
    const openMobileMenu = Boolean(mobileAnchorEl);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    

    const handleClickOpen = () => setOpenSendMail(true);
    const handleClose = () => setOpenSendMail(false);

    const handleClickMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClickMobileMenu = (event) => setMobileAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleMobileMenuClose = () =>   setMobileAnchorEl(null);


    const fetchPurchaseOrder = async () => 
    {
        const result = await PurchaseOrder_.fetchAsync({
            purchase_order_id: purchaseOrderId 
        })

        if (result.status === 'Success')
        {
            setPurchaseOrder(result.data.purchaseOrder);
            setPurchaseOrderDetails(result.data.items);
        }
    }


    const cancelPurchaseOrder = async () => 
    {
        const productIds = purchaseOrderDetails.map(pod => pod.product_id);

        const result = await PurchaseOrder_.cancelOrderAsync({
            purchase_order_id: purchaseOrderId,
            product_ids: productIds
        });

        if (result.status === 'Success')
        {
            alert('Success')
        }
    }
   

    useEffect(() => {

        fetchPurchaseOrder();

        return () => {
            setPurchaseOrder({});
        }
    }, [])

    return !purchaseOrderDetails.length 
        ? <Loading />
        : (
        <>
            <Card className={classes.purchaseOrderCard}>
                <CardContent>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Typography variant="subtitle1" color="initial">
                                <Grid container>
                                    <Grid item>
                                        <NavLink to={'/inventory-mngmt/purchase-orders'}>
                                            <KeyboardArrowLeftIcon />
                                        </NavLink>
                                    </Grid>
                                    <Grid item>
                                        Purchase Orders
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid item className={classes.options}>
                            <Grid container>
                            {
                                purchaseOrder.total_ordered_quantity !== purchaseOrder.total_received_quantity && (
                                <>
                                    <Grid item>
                                        <Button variant="text" color="default">
                                            <NavLink 
                                                to={`/inventory-mngmt/receive-purchase-orders/${purchaseOrderId}`} 
                                                className={classes.links}
                                            >
                                                Receive
                                            </NavLink>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button 
                                            variant="text" 
                                            color="default"
                                            onClick={
                                                () => history.push(`/inventory-mngmt/purchase-order/${purchaseOrderId}/edit`)
                                            }
                                        >
                                            <EditIcon />
                                        </Button>
                                    </Grid>
                                </>
                                )
                            }
                                <Grid item>
                                    <SendMailDialog 
                                        open={openSendMail}
                                        handleClickOpen={handleClickOpen}
                                        handleClose={handleClose}
                                        purchaseOrderId={purchaseOrder.id}
                                        supplierId={purchaseOrder.supplier_id}
                                    />
                                </Grid>
                                {/* Desktop */}
                                <Grid item>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClickMenu}
                                    >
                                       <ExpandMore />
                                    </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={openMenu}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: '20ch',
                                            },
                                            }}
                                        >
                                        <MenuItem > Save as PDF </MenuItem>
                                        <MenuItem > Save as CSV </MenuItem>
                                        {
                                            purchaseOrder.total_ordered_quantity !== purchaseOrder.total_received_quantity 
                                            && (
                                                <MenuItem onClick={cancelPurchaseOrder}> Cancel orders </MenuItem>
                                            )
                                        }
                                        
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Mobile */}
                        <Grid item className={classes.optionsOnMobile}>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClickMobileMenu}
                            >
                                <MoreVertIcon />
                            </IconButton>
                                <Menu
                                    anchorEl={mobileAnchorEl}
                                    keepMounted
                                    open={openMobileMenu}
                                    onClose={handleMobileMenuClose}
                                    PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '20ch',
                                    },
                                    }}
                                >
                                {
                                    purchaseOrder.total_ordered_quantity !== purchaseOrder.total_received_quantity && (
                                    <>
                                        <MenuItem button onClick={
                                            () => history.push(`/inventory-mngmt/receive-purchase-orders/${purchaseOrderId}`)
                                        }>
                                            Receive
                                        </MenuItem>
                                        <MenuItem onClick={
                                            () => history.push(`/inventory-mngmt/purchase-order/${purchaseOrderId}`)
                                        }>
                                            Edit
                                        </MenuItem>
                                    </>)
                                }
                                <MenuItem 
                                    button 
                                    onClick={handleClickOpen}
                                >
                                    Send
                                </MenuItem>
                                <MenuItem >
                                    Save as PDF
                                </MenuItem>
                                <MenuItem >
                                    Save as CSV
                                </MenuItem>
                                {
                                     purchaseOrder.total_ordered_quantity !== purchaseOrder.total_received_quantity 
                                     && (
                                        <MenuItem button onClick={cancelPurchaseOrder}>
                                            Cancel orders
                                        </MenuItem>
                                     )
                                }
                            </Menu>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container justify='space-between' className={classes.purchaseOrderDetails}>
                        <Grid item>
                            <Typography variant="h3" color="initial">
                                PO{purchaseOrderId}
                            </Typography>
                            <Typography variant="subtitle2" color="initial">
                                Pending
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" color="initial">
                                <LinearWithValueLabel 
                                    label={'Received'}
                                    progress={purchaseOrder.total_received_quantity}
                                    value={purchaseOrder.total_received_quantity}
                                    minValue={1}
                                    maxValue={purchaseOrder.total_ordered_quantity}
                                />
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction='column' className={classes.purchaseOrderDetails}>
                        <Grid item>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Date</strong>: {purchaseOrder.purchase_order_date}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Expected on</strong>: {purchaseOrder.expected_delivery_date}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Ordered by</strong>: {purchaseOrder.ordered_by}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle2" color="initial" className={classes.purchaseOrderDetails}>
                        <strong>Supplier</strong>: {purchaseOrder.supplier}
                    </Typography>
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
        </>
    );
}

export default PurchaseOrderDetails
