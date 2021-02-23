import React, {useState, useEffect} from 'react'
import * as POS_ from '../../../services/pos/pos'
import Loading from '../../../components/Loading'
import OrderDetails from './OrderDetails'
import OrderOptions from './OrderOptions'
import OrderDetailsSearchField from './OrderDetailsSearchField'
import CustomerSearchField from './CustomerSearchField'
import ProductList from './ProductList'
import EditOrder from './EditOrder'
import ProcessPayment from './ProcessPayment'
import {posUseStyles} from '../../../assets/material-styles/styles'
import Grid from '@material-ui/core/Grid'

const PAYMENT_DETAILS = {
    subTotal: 0.00,
    discount: 0.00,
    tax: 0.00,
    total: 0.00
};

const Pos = () => 
{
    const classes = posUseStyles();
    const [loading, setLoading] = useState(true);
    const [openEditProduct, setOpenEditProduct] = useState(false);

    const [rowIds, setRowIds] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [editOrderPayload, setEditOrderPayload] = useState({});

    const [processPayment, setProcessPayment] = useState(false);
    const [paymentAmountDetails, setPaymentAmountDetails] = useState(PAYMENT_DETAILS)

    const [customerId, setCustomerId] = useState(1);


    /**
     * Dialog
     */
    const handleClickOpen = (object) => 
    {
        setEditOrderPayload(object);
        setOpenEditProduct(true);
    };

    const handleClose = () => setOpenEditProduct(false);

    const handleOnChangeCustomerId = (e) => setCustomerId(e.target.value);
    const handleOnTableSelectionChange = (rowIds) =>  setRowIds(rowIds);
    /**
     * Cart
     */
    
    const fetchCustomerCart = async () => 
    {
        const result = await POS_.fetchCartDetails({customer_id: customerId});

        if (result.status === 'Success')
        {
            const {subTotal, discount, tax, total, orderDetails} = result.data;
            
            setOrderDetails(orderDetails);
            setPaymentAmountDetails({
                subTotal: subTotal,
                discount: discount, 
                tax: tax,
                total: total
            });
        }
        else 
        {
            setOrderDetails([]);
            setPaymentAmountDetails({
                subTotal: 0.00,
                discount: 0.00, 
                tax: 0.00,
                total: 0.00
            });
        }
        setLoading(false)
    }

    const handleAddToCartOnClick = async (productId) => 
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

    const handleAddToCartOnKeyPress = async (e) => 
    {
        if (e.keyCode === 13)
        {
            const result = await POS_.addToCartAsync({
                customer_id: customerId,
                barcode: e.target.value
            });
            console.log()
            if (result.status === 'Success')
            {
                fetchCustomerCart();
            }
        }
    }       

    const handleOnDeleteProduct = async (posDetailIds) => 
    {
        const result = await POS_.removeItemsAsync({
            customer_id: customerId,
            product_ids: rowIds
        });

        if (result.status === 'Success')
        {
            let _orderDetails = [...orderDetails];

            posDetailIds.forEach((id) => {
                _orderDetails = _orderDetails.filter((order) => id != order.pos_details_id)
            })

            setOrderDetails(_orderDetails);
        }
    }

    const handleOnCancelOrder = async () => 
    {
        const result = await POS_.cancelOrdersAsync({customer_id: customerId});

        if (result.status === 'Success')
        {
            await fetchCustomerCart();
        }
    }

    const handleOnProcessPayment = () => setProcessPayment(!processPayment);
    

    useEffect(() => {
        fetchCustomerCart();
    }, [customerId]);




    return loading ? <Loading /> 
        : processPayment && orderDetails.length > 0 
            ? <ProcessPayment 
                handleOnProcessPayment={handleOnProcessPayment} 
                customerId={customerId}
                orderDetails={orderDetails}
                paymentAmountDetails={paymentAmountDetails}
            />
            : (
                <>
                    {
                        Object.keys(editOrderPayload).length > 0 && (
                            <EditOrder 
                                customerId={customerId}
                                payload={editOrderPayload} 
                                openEditProduct={openEditProduct} 
                                handleClose={handleClose}
                                fetchCustomerCart={fetchCustomerCart}
                            />
                        )
                    }
                    <Grid container>
                        {/* Item List */}
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Grid container>
                                <ProductList 
                                    handleAddToCartOnClick={handleAddToCartOnClick}
                                /> 
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <OrderOptions 
                                    customerId={customerId}
                                    orderDetails={orderDetails}
                                    handleOnCancelOrder={handleOnCancelOrder}
                                    fetchCustomerCart={fetchCustomerCart}
                                />
                            </Grid>
                            </Grid>
                        </Grid>
                        
                        {/* Order Details */}
                        <Grid item xs={12} sm={12} md={4} lg={4} className={classes.orderDetails}>
                            <Grid container>
                            
                            {/* Customer selection */}
                                <CustomerSearchField 
                                    customerId={customerId}
                                    handleOnChangeCustomerId={handleOnChangeCustomerId}
                                />
                            </Grid>
                            
                            {/* Delete button */}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <OrderDetailsSearchField 
                                    rowIds={rowIds}
                                    handleAddToCartOnKeyPress={handleAddToCartOnKeyPress}
                                    handleOnDeleteProduct={handleOnDeleteProduct}
                                />
                            </Grid>
                            
                            <OrderDetails 
                                handleClickOpen={handleClickOpen}
                                handleOnTableSelectionChange={handleOnTableSelectionChange}
                                orderDetails={orderDetails}
                                paymentAmountDetails={paymentAmountDetails}
                                handleOnProcessPayment={handleOnProcessPayment}
                            />
                        </Grid>
                    </Grid>
                </>
            );
}


export default Pos
