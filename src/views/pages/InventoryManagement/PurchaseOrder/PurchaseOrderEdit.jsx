import React, { useState, useEffect } from 'react';
import ReceivedStocks from './ReceivedStocks'
import Loading from '../../../../components/Loading'
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
import AddIcon from '@material-ui/icons/Add';
import * as DateHelper from '../../../../utils/dates'



const PurchaseOrderEdit = ({match}) => 
{
    const classes = purchaseOrderUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true)

    const {purchaseOrderId} = match.params;

    const [purchaseOrder, setPurchaseOrder] = useState({
        purchase_order_id: purchaseOrderId,
        supplier_id: 0,
        purchase_order_date: '',
        expected_delivery_date: '',
    });

    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);

    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState({});
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
                    id=""
                    label=""
                    value={params.value}
                    onChange={
                        (e) => handleOnChangeQuantity(e, params.row.id)
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
                    id=""
                    label=""
                    value={params.value}
                    onChange={
                        (e) => handleOnChangePurchaseCost(e, params.row.id)
                    }
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                />
            ),
        },
        { field: 'amount', headerName: 'Amount', width: 160,
            valueFormatter: (params) => {
               const po = purchaseOrderDetails.find(po => po.id === params.row.id);
               return po.ordered_quantity * po.purchase_cost;
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
                    onClick={() => handleOnRemovePurchaseOrder(params.row.id)}
                >
                    <DeleteForeverIcon />
                </Button>
            )
        }
    ];

    const handleOnChangeProductId = (e) => setProductId(e.target.value);

    const handleOnChangeQuantity = (e, poId) => 
    {
        let value = e.target.value;
        value = parseInt(value) || 0;

        const po = purchaseOrderDetails
            .map(purchaseOrderDetail => 
                (purchaseOrderDetail.id === poId)
                    ? {
                        ...purchaseOrderDetail, 
                        ordered_quantity: value, 
                        amount: (value * parseFloat(purchaseOrderDetail.purchase_cost))}
                    : purchaseOrderDetail
            );
        
        setPurchaseOrderDetails(po);
    };

    const handleOnChangePurchaseCost = (e, poId) => 
    {
        let value = e.target.value;
        value = parseFloat(value) || 0.00;

        const po = purchaseOrderDetails
            .map(purchaseOrderDetail => 
                (purchaseOrderDetail.id === poId)
                    ? {
                        ...purchaseOrderDetail, 
                        purchase_cost: value,
                        amount: (value * parseInt(purchaseOrderDetail.ordered_quantity))
                    }
                    : purchaseOrderDetail
            );
        
        setPurchaseOrderDetails(po);
    };

    const handleOnRemovePurchaseOrder = async (poId) => 
    {
        const po = purchaseOrderDetails
            .filter(purchaseOrderDetail => (purchaseOrderDetail.id !== poId));
        
        setPurchaseOrderDetails(po);

        const result = await PurchaseOrder_.destroyPurchaseProductsAsync({
            purchase_order_detail_id: poId
        });
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

    const fetchPurchaseOrder = async () => 
    {
        const result = await PurchaseOrder_.fetchAsync({
            purchase_order_id: purchaseOrderId 
        })

        if (result.status === 'Success')
        {
            const {purchaseOrder, items} = result.data
            setPurchaseOrder(purchaseOrder);
            setPurchaseOrderDetails(items);
            setLoading(false);
        }
    }

    const fetchProductToPurchase = async () => 
    {
        const result = await Product_.fetchToPurchaseAsync({
            product_id: productId
        });

        if (result.status === 'Success')
        {
            const po = purchaseOrderDetails.find(purchaseOrderDetail => purchaseOrderDetail.id === result.data.id);

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
            console.log(result.data)
            setProducts(result.data);
        }
    }

    const fetchSuppliers = async () => 
    {
        const result = await Suppliers_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setSuppliers(result.data);
            console.log(result.data)
        }
    }
    
    const upsertPurchaseOrder = async () => 
    {
        const result = await PurchaseOrder_.upsertAsync(validateData());

        if (result.status === 'Success')
        {
            history.push('/inventory-mngmt/purchase-orders')
        }
    }

    const validateData = () => 
    {

        const filterPurchaseOrder = {
            purchase_order_id: parseInt(purchaseOrderId),
            supplier_id: purchaseOrder.supplier_id,
            purchase_order_date:  purchaseOrder.purchase_order_date,
            expected_delivery_date:  purchaseOrder.expected_delivery_date,
        }

        const filterPurchaseOrderDetails = purchaseOrderDetails.map(purchaseOrderDetail => ({
            product_id: purchaseOrderDetail.product_id,
            ordered_quantity: purchaseOrderDetail.ordered_quantity, 
            remaining_ordered_quantity: purchaseOrderDetail.ordered_quantity,
            purchase_cost: purchaseOrderDetail.purchase_cost, 
            amount: purchaseOrderDetail.amount
        }));

        return {
            ...filterPurchaseOrder,
            items: filterPurchaseOrderDetails
        };
    }

    useEffect(() => {
        fetchPurchaseOrder();
        fetchProducts();
        fetchSuppliers();

        return () => {
            setPurchaseOrder({});
            setPurchaseOrderDetails([]);
            setSuppliers([]);
            setProducts([]);
        }
    }, []);

    return loading ? <Loading />
        : (
        <>
            <Card className={classes.purchaseOrderCard}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl className={classes.formControl}>
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
                                    suppliers.map(supplier => (
                                        <MenuItem
                                            key={supplier.id} 
                                            value={supplier.id}>
                                            {supplier.name}</MenuItem>
                                    ))
                                }
                                
                                </Select>
                                <FormHelperText>Select a supplier</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container spacing={1} justify='space-between'>
                                    <Grid item xs={12} sm={6} md={5} lg={5}>
                                        <KeyboardDatePicker
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
                    <Grid container spacing={1} alignItems='center' justify='space-between'>
                        <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Add product</InputLabel>
                                    <Select
                                        name='role'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        className={classes.selectEmpty}
                                        fullWidth
                                        margin='dense'
                                        value={productId}
                                        onChange={handleOnChangeProductId}
                                    >
                                        {
                                            products.map((product) => (
                                                <MenuItem key={product.id} value={product.id}>
                                                    {product.name}
                                                </MenuItem>
                                            ))
                                        }
                                        
                                    </Select>
                                </FormControl>  
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='outlined' 
                                    color="default" 
                                    className={classes.addBtn}
                                    onClick={fetchProductToPurchase}
                                >
                                    <AddIcon />
                                </Button>
                            </Grid>
                        
                        </Grid>
                        
                        </Grid>
                        <Grid item>
                            <ReceivedStocks purchaseOrderId={purchaseOrderId}/>
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
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color="default" 
                        className={classes.addBtn}
                        onClick={upsertPurchaseOrder}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PurchaseOrderEdit
