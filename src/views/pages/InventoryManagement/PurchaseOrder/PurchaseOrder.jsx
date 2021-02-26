import React, { useState, useEffect, lazy } from 'react';
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
import * as PurchaseOrder_ from '../../../../services/inventory-management/purchaseOrders'
import * as Suppliers_ from '../../../../services/inventory-management/suppliers'
import * as Product_ from '../../../../services/products/products'
import { useHistory } from 'react-router-dom'
import { purchaseOrderUseStyles } from '../../../../assets/material-styles/styles'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, TextField, Button, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import * as DateHelper from '../../../../utils/dates'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'))


const PURCHASE_ORDER_DEFAULT = {
    supplier_id: 0,
    purchase_order_date: DateHelper.currentDate,
    expected_delivery_date: DateHelper.currentDate,
};

const PURCHASE_ORDER_ERROR_DEFAULT = {
    supplier_id: '',
    purchase_order_date: '',
    expected_delivery_date: '',
    items: '',
};


const PurchaseOrder = () => 
{
    const classes = purchaseOrderUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');

    const [purchaseOrder, setPurchaseOrder] = useState(PURCHASE_ORDER_DEFAULT);
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(0);
    const [errorMessages, setErrorMessages] = useState(PURCHASE_ORDER_ERROR_DEFAULT);
 
    const columns = [
        { field: 'id', hide: true},
        { field: 'product_id', hide: true},
        { field: 'product_description', headerName: 'Product', width: 160 },
        { field: 'in_stock', headerName: 'In stock', width: 160 },
        { field: 'incoming', headerName: 'Incoming', width: 160 },
        { 
            field: 'ordered_quantity', 
            headerName: 'Quantity', 
            width: 160,
            renderCell: (params) => (
                <TextField
                    error={Boolean(params.value <= 0)}
                    value={params.value}
                    onChange={
                        (e) => handleOnChangeQuantity(e, params.row.product_id)
                    }
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                />
            ),
        },
        { 
            field: 'purchase_cost', 
            headerName: 'Cost', 
            width: 160,
            renderCell: (params) => (
                <TextField
                    error={Boolean(params.value <= 0)}
                    value={params.value}
                    onChange={
                        (e) => handleOnChangePurchaseCost(e, params.row.product_id)
                    }
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                />
            ),
        },
        { field: 'amount', headerName: 'Amount', width: 160,
            valueFormatter: (params) => {
               const po = purchaseOrderDetails.find(po => po.product_id === params.row.product_id);
               return (po.ordered_quantity * po.purchase_cost).toFixed(2);
            }
        },
        {
            field: 'delete_action', 
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <Button
                    className={classes.deleteAction} 
                    variant="text" 
                    color="default" 
                    onClick={() => handleOnRemovePurchaseOrder(params.row.product_id)}
                >
                    <DeleteForeverIcon />
                </Button>
            )
        }
    ];


    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };

    const handleOnChangeQuantity = (e, poId) => 
    {
        let value = e.target.value;
        value = parseInt(value) || 0;

        const po = purchaseOrderDetails
            .map(purchaseOrderDetail => 
                (purchaseOrderDetail.product_id === poId)
                    ? {
                        ...purchaseOrderDetail, 
                        ordered_quantity: value, 
                        amount: (value * parseFloat(purchaseOrderDetail.purchase_cost))
                    }
                    : purchaseOrderDetail
            );
        
        setPurchaseOrderDetails(po);
    };

    const handleOnChangePurchaseCost = (e, poId) => 
    {
        let value = e.target.value;
        value = parseFloat(value).toFixed(2) || 0.00;

        const po = purchaseOrderDetails
            .map(purchaseOrderDetail => 
                (purchaseOrderDetail.product_id === poId)
                    ? {
                        ...purchaseOrderDetail, 
                        purchase_cost: value,
                        amount: (value * parseInt(purchaseOrderDetail.ordered_quantity))
                    }
                    : purchaseOrderDetail
            );
        
        setPurchaseOrderDetails(po);
    };

    const handleOnRemovePurchaseOrder = async (productId) => 
    {
        const po = purchaseOrderDetails
            .filter(purchaseOrderDetail => (purchaseOrderDetail.product_id !== productId));
        
        setPurchaseOrderDetails(po);
    };

    const handleOnChangeSupplier = (e) => setPurchaseOrder({
        ...purchaseOrder, 
        supplier_id: e.target.value
    });

    const handleOnPurchaseOrderDateChange = (date) => setPurchaseOrder({
        ...purchaseOrder, 
        purchase_order_date: DateHelper.prepareExtractCurDate(date)
    })

    const handleOnExpectedDeliveryDateChange = (date) => setPurchaseOrder({
        ...purchaseOrder, 
        expected_delivery_date: DateHelper.prepareExtractCurDate(date)
    })

    const fetchProductToPurchase = async (e) => 
    {
        const id = parseInt(e.target.value);
        setProductId(id);

        const result = await Product_.fetchToPurchaseAsync({
            product_id: id
        });

        if (result.status === 'Success')
        {
            const po = purchaseOrderDetails
                .find(purchaseOrderDetail => purchaseOrderDetail.product_id === result.data.id);

            if (po)
            {
                alert('Same product exists');
            }
            else 
            {
                setPurchaseOrderDetails([...purchaseOrderDetails, result.data]);
                setProductId(0);
            }
        }
    }

    const fetchProducts = async () => 
    {
        const result = await Product_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setProducts(result.data);
        }
    }

    const fetchSuppliers = async () => 
    {
        const result = await Suppliers_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setSuppliers(result.data);
        }
    }

    const createPurchaseOrder = async () => 
    {
        setLoading(true);
        const result = await PurchaseOrder_.storeAsync(validateData());

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setOpenAlert(true);
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }
        else 
        {
            setAlertSeverity('success');
            setOpenAlert(true);
            setTimeout(() =>  history.push('/inventory-mngmt/purchase-orders'), 2000);
        }

        setTimeout(() => setLoading(false), 2000);
    }

    const validateData = () => 
    {
        const filterPurchaseOrderDetails = purchaseOrderDetails.map(purchaseOrderDetail => ({
            product_id: purchaseOrderDetail.product_id,
            ordered_quantity: purchaseOrderDetail.ordered_quantity, 
            remaining_ordered_quantity: purchaseOrderDetail.ordered_quantity,
            purchase_cost: purchaseOrderDetail.purchase_cost, 
            amount: purchaseOrderDetail.amount
        }));

        return {
            ...purchaseOrder,
            items: filterPurchaseOrderDetails
        };
    }


    useEffect(() => {
        fetchProducts();
        fetchSuppliers();

        return () => {
            setSuppliers([]);
            setProducts([]);
        }
    }, []);


    return (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                successMessage='Purchase order successfully'
                severity={alertSeverity} 
            />
            <Card className={classes.purchaseOrderCard}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl 
                                className={classes.formControl}
                                error={Boolean(errorMessages.supplier_id !== '')}
                            >
                                <InputLabel id="demo-simple-select-label">
                                    {
                                        suppliers.length <= 0 && (
                                            'Loading supplier list...'
                                        )
                                    }
                                </InputLabel>
                                <Select
                                    name='supplier_id'
                                    value={purchaseOrder.supplier_id}
                                    onChange={handleOnChangeSupplier}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    fullWidth
                                >
                                {
                                    suppliers.length > 0 && (
                                        suppliers.map(supplier => (
                                            <MenuItem
                                                key={supplier.id} 
                                                value={supplier.id}>
                                                {supplier.name}</MenuItem>
                                        ))
                                    )
                                }
                                
                                </Select>
                                <FormHelperText>
                                {
                                    errorMessages.supplier_id !== ''
                                        ? errorMessages.supplier_id
                                        : 'Select a supplier'
                                }
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container spacing={1} justify='space-between'>
                                    <Grid item xs={12} sm={6} md={5} lg={5}>
                                        <KeyboardDatePicker
                                            error={errorMessages.purchase_order_date !== ''}
                                            helperText={errorMessages.purchase_order_date}
                                            fullWidth
                                            margin="normal"
                                            name="purchase_order_date"
                                            label="Purchase order date"
                                            format="MM/dd/yyyy"
                                            maxDate={purchaseOrder.expected_delivery_date}
                                            value={purchaseOrder.purchase_order_date}
                                            onChange={handleOnPurchaseOrderDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={5} lg={5}>
                                        <KeyboardDatePicker
                                            error={errorMessages.expected_delivery_date !== ''}
                                            helperText={errorMessages.expected_delivery_date}
                                            fullWidth
                                            margin="normal"
                                            name="expected_delivery_date"
                                            label="Expected on"
                                            format="MM/dd/yyyy"
                                            minDate={purchaseOrder.purchase_order_date}
                                            value={purchaseOrder.expected_delivery_date}
                                            onChange={handleOnExpectedDeliveryDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card className={classes.purchaseOrderCard}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item>
                            <FormControl 
                                className={classes.formControl}
                                error={Boolean(errorMessages.items !== '')}
                            >
                                <InputLabel id="demo-simple-select-label">
                                    {
                                        products.length <= 0 
                                            ? 'Loading product list...'
                                            : 'Add product'
                                    }
                                </InputLabel>
                                <Select
                                    name='role'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className={classes.selectEmpty}
                                    fullWidth
                                    margin='dense'
                                    value={productId}
                                    onChange={fetchProductToPurchase}
                                >
                                    {
                                        products.length > 0 && (
                                            products.map((product) => (
                                                <MenuItem key={product.id} value={product.id}>
                                                    {product.name}
                                                </MenuItem>
                                            ))
                                        )
                                    }
                                    
                                </Select>
                                <FormHelperText>{errorMessages.items}</FormHelperText>
                            </FormControl>  
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
                        variant='contained' 
                        color="default" 
                        className={classes.cancelBtn}
                        onClick={() => history.push('/inventory-mngmt/purchase-orders')}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color="default" 
                        className={classes.addBtn}
                        onClick={createPurchaseOrder}
                        disabled={loading}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PurchaseOrder
