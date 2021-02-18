import React, {useState, useEffect} from 'react'
import Loading from '../../../components/Loading'
import * as POS_ from '../../../services/pos/pos'
import * as Product from '../../../services/products/products'
import * as Category from '../../../services/products/categories'
import * as Customer from '../../../services/customers/customers'
import EditOrder from './EditOrder'
import ProcessPayment from './ProcessPayment'
import {POS_DATAGRID_COLUMNS} from '../../../config/dataGrid'
import {posUseStyles} from '../../../assets/material-styles/styles'
import Grid from '@material-ui/core/Grid'
import { DataGrid } from '@material-ui/data-grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import {TextField, Card, CardContent, CardActionArea, Divider, Button} from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, Typography, } from '@material-ui/core';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import DeleteIcon from '@material-ui/icons/Delete';
import DiscountIcon from '@material-ui/icons/Loyalty';
import {RemoveShoppingCart} from '@material-ui/icons'



const Pos = () => 
{
    const classes = posUseStyles();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const [rowIds, setRowIds] = useState([]);
    const [productId, setProductId] = useState(0);
    const [customerId, setCustomerId] = useState(1);
    const [orderDetails, setOrderDetails] = useState([]);
    const [editOrderPayload, setEditOrderPayload] = useState({});
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [addToCartData, setAddToCartData] = useState({
        customer_id: customerId,
        product_id: '',
        barcode: ''
    });

    const [processPayment, setProcessPayment] = useState(false);
    const [paymentAmountDetails, setPaymentAmountDetails] = useState({
        subTotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00
    })


    /**
     * Dialog
     */
    const handleClickOpen = (object) => {
        setOpen(true);
        setEditOrderPayload(object);
    };

    const handleClose = () => setOpen(false);

    /**
     * Cart System
     */
    const handleOnChangeProductId = (e) => setProductId(e.target.value);

    const handleOnChangeCategory = async (e) => 
    {   
        setCategory(e.target.value);

        const result = await Product.fetchByCategoryAsync({
            category_id: e.target.value
        });

        if (result.status === 'Success')
        {
            setProducts(result.data)
        }
    }

    const handleOnChangeCustomerId = (e) => setCustomerId(e.target.value);


    const fetchProducts = async () => 
    {
        const result = await Product.fetchAllAsync();

        if (result.status = 'Success')
        {
            setProducts(result.data);
            setLoading(false)
        }
    }

    const fetchCustomers = async () => 
    {
        const result = await Customer.fetchAllAsync();

        if (result.status = 'Success')
        {
            setCustomers(result.data);
            console.log(result.data);
            setLoading(false)
        }
    };
    
    const fetchCustomerCart = async () => 
    {
        const result = await POS_.fetchCartDetails({customer_id: customerId});
        console.log(result);
        if (result.status = 'Success')
        {
            if (result.data.orderDetails)
            {
                const {subTotal, discount, tax, total} = result.data;

                setOrderDetails(result.data.orderDetails);
                setPaymentAmountDetails({
                    subTotal: subTotal,
                    discount: discount, 
                    tax: tax,
                    total: total
                })
            }
            else 
            {
                setOrderDetails([]);
            }
        }
    }

    const addToCart = async (productId, barcode) => 
    {
        const result = await POS_.addToCartAsync({
            customer_id: customerId,
            product_id: productId
        });

        if (result.status === 'Success')
        {
            await fetchCustomerCart();
        }
    }   

    const handleOnDeleteProduct = async (posDetailIds) => 
    {
        setOrderDetails(orderDetails.filter((order, index) => {
            return parseInt(posDetailIds[index]) !== order.pos_details_id;
        }));

        const result = await POS_.removeItemsAsync({
            customer_id: customerId,
            product_ids: rowIds
        });

        if (result.status === 'Success')
        {
            fetchCustomerCart();
        }
    }

    /**
     * Datagrid 
     */
    const handleOnTableSelectionChange = (rowIds) =>  setRowIds(rowIds);


    /**
     * Process payment
     */

    const handleOnProcessPayment = () => setProcessPayment(!processPayment);

    const fetchCategories = async () => 
    {
        const result = await Category.fetchAllAsync();

        if (result.status === 'Success')
        {
            setCategories(result.data);
        }
    }
    

    useEffect(() => {
        fetchCustomerCart();
    }, [customerId])

    useEffect(() => {
        fetchCustomers();
        fetchCategories();
        fetchProducts();

        return () => {
            setCategories([]);
            setProducts([]);
            setCustomers([]);
        }
    }, []);


    return loading 
        ? <Loading />
        : processPayment && orderDetails.length > 0 
        ? <ProcessPayment handleOnProcessPayment={handleOnProcessPayment} customerId={customerId}/>
        : (
            <>
                <EditOrder payload={editOrderPayload} open={open} handleClose={handleClose}/>
                <Grid container>
                    {/* Item List */}
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={10} lg={10}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            variant='filled'
                                            id="input-with-icon-textfield"
                                            label="Find item"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <YoutubeSearchedForIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel 
                                                id="demo-simple-select-label" 
                                                className={classes.selectLabel}>
                                                    All items
                                            </InputLabel>
                                            <Select
                                                variant='filled'
                                                className={classes.selectEmpty}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                fullWidth
                                                value={category}
                                                onChange={handleOnChangeCategory}
                                            >
                                                <MenuItem key={0} value={0}>All items</MenuItem>
                                                {
                                                    categories.map(category => (
                                                        <MenuItem  
                                                            key={category.id}
                                                            value={category.id}>{category.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Card className={classes.itemListContainer}>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            {products.map((product, index) => (
                                                <Grid 
                                                    onClick={() => addToCart(product.id)}
                                                    key={index} 
                                                    item xs={6} sm={6} md={3} lg={3}>
                                                    <Card>
                                                        <CardContent>
    
                                                        </CardContent>
                                                        <CardActionArea className={classes.itemActionArea}>
                                                            <Typography variant="subtitle2" color="initial">
                                                               {product.name}
                                                            </Typography>
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                </Card>          
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <Card>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <Button 
                                                    size="contained" 
                                                    color="default" 
                                                    className={classes.itemListOptionsBtn}
                                                >
                                                    Discount <DiscountIcon className={classes.discountIcon}/>
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                {
                                                    (orderDetails.length > 0 )
                                                        ? (
                                                            <Button 
                                                                size="contained" 
                                                                color="default" 
                                                                className={classes.itemListOptionsBtn}
                                                            >
                                                                Cancel Order <RemoveShoppingCart className={classes.cancelOrderIcon}/>
                                                            </Button>
                                                        )
                                                        : ''
                                                }
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    {/* Order Details */}
                    <Grid item xs={12} sm={12} md={4} lg={4} className={classes.orderDetails}>
                        <Grid container>
                        {/* Customer selection */}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel 
                                        id="demo-simple-select-label" 
                                        className={classes.selectLabel}>
                                            Customer
                                    </InputLabel>
                                    <Select
                                        value={customerId}
                                        onChange={handleOnChangeCustomerId}
                                        variant='filled'
                                        className={classes.selectEmpty}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        fullWidth
                                    >
                                        {customers.map(customer => (
                                            <MenuItem key={customer.id} value={customer.id}>
                                                {customer.customer}
                                            </MenuItem>
                                        ))

                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* Delete button */}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card className={classes.deleteBtnContainer}>
                                <Grid container spacing={1} justify='space-between' alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={8}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            label="Scan barcode"
                                            fullWidth
                                            value={barcode}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} lg={2}>
                                    { 
                                        rowIds.length ? (
                                            <Button 
                                                variant="text" 
                                                color="default" 
                                                className={classes.deleteBtn}
                                                onClick={() => handleOnDeleteProduct(rowIds)}
                                            >
                                            <DeleteIcon />
                                        </Button>
                                        ): ''
                                    }
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        {/* Order Details */}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={classes.dataGridContainer}>
                                <DataGrid 
                                    disableDensitySelector
                                    disableColumnSelector={true}
                                    disableColumnFilter={true}
                                    disableColumnMenu={true}
                                    hideFooterPagination={true}
                                    onCellClick={(params) => handleClickOpen(params.row)}
                                    checkboxSelection
                                    onSelectionChange={params => handleOnTableSelectionChange(params.rowIds)}
                                    rows={orderDetails} 
                                    columns={POS_DATAGRID_COLUMNS} 
                                    className={classes.dataGrid}
                                />
                            </div>
                        </Grid>
                        {/* Tax, Total, Discounts */}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card>
                                <CardContent>
                                    <Grid container direction='column'>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Grid container justify='space-between'>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="initial">
                                                        Discounts
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {paymentAmountDetails.discount}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container justify='space-between'>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="initial">
                                                        Tax
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {paymentAmountDetails.tax}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid item>
                                            <Grid container justify='space-between'>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="initial">
                                                        Total
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="initial">
                                                        <strong>{paymentAmountDetails.total}</strong>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* Process Payment Button */}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button 
                                variant="contained" 
                                color="default" 
                                className={classes.chargeBtn}
                                onClick={handleOnProcessPayment}
                            >
                                Process Payment
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
}


export default Pos
