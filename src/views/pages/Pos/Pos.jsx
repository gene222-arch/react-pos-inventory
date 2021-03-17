import React, {useState, useEffect, lazy} from 'react'
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
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const PAYMENT_DETAILS = {
    subTotal: 0.00,
    discount: 0.00,
    tax: 0.00,
    total: 0.00
};


const ALERT_MESSAGES = {
    CUSTOMER_HAS_YET_TO_ORDER: 'Customer has yet to order, cannot process payment.'
}


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
    const [customerIsDiscounted, setCustomerIsDiscounted] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };



    /**
     * Dialog
     */
    const handleClickEditOrder = (object) => 
    {
        setEditOrderPayload(object);
        setOpenEditProduct(true);
    };

    const handleCloseEditOrder = () => {
        setOpenEditProduct(false)
        setEditOrderPayload({});
    };

    const handleOnChangeCustomerId = (e) => setCustomerId(e.target.value);

    const handleOnChangeIsCustomerDiscounted = (boolval) => setCustomerIsDiscounted(boolval);

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

            setCustomerIsDiscounted(Boolean(parseFloat(discount) > 0));
        }
        else 
        {
            setOrderDetails([]);
            setPaymentAmountDetails(PAYMENT_DETAILS);
            setCustomerIsDiscounted(false)
        }

        setLoading(false);
    }

    const handleAddToCartOnClick = async (productId) => 
    {
        const result = await POS_.addToCartAsync({
            customer_id: customerId,
            product_id: productId
        });

        if (result.status === 'Error')
        {
            setAlertSeverity('warning');
            setAlertMessage(result.message);
            setOpenAlert(true);
        }
        else 
        {
            fetchCustomerCart();
        }
    }   

    const handleAddToCartOnKeyPress = async (e) => 
    {
        if (e.keyCode === 13 && customerId)
        {
            const result = await POS_.addToCartAsync({
                customer_id: customerId,
                barcode: e.target.value
            });

            if (result.status === 'Error')
            {
                setAlertSeverity('warning');
                setAlertMessage(result.message);
            }
            else 
            {
                fetchCustomerCart();
            }
        }
        else 
        {

            setAlertSeverity('error');
            setAlertMessage('No customer is selected.');
        }

        setOpenAlert(true);
    }       

    const handleOnDeleteProduct = async (posDetailIds) => 
    {
        let _orderDetails = [...orderDetails];

        posDetailIds.forEach((id) => {
            _orderDetails = _orderDetails.filter((order) => id != order.pos_details_id)
        });

        setOrderDetails(_orderDetails);

        const result = await POS_.removeItemsAsync({
            customer_id: customerId,
            product_ids: rowIds
        });

        if (result.status === 'Success')
        {
            setRowIds([]);
        }
    }


    const handleOnProcessPayment = () => 
    {
        if (!orderDetails.length)
        {
            setAlertSeverity('error');
            setAlertMessage(ALERT_MESSAGES.CUSTOMER_HAS_YET_TO_ORDER);
            setOpenAlert(true);
        }
        else
        {
            setProcessPayment(!processPayment)
        }
    };
    

    useEffect(() => {
        fetchCustomerCart();

        return () => {
            setRowIds([]);
            setOrderDetails([]);
            setPaymentAmountDetails(PAYMENT_DETAILS);
        }
    }, [customerId]);


    return loading 
        ? <Loading />   
        : (processPayment && orderDetails.length > 0) 
            ?   <ProcessPayment 
                    handleOnProcessPayment={handleOnProcessPayment} 
                    customerId={customerId}
                    orderDetails={orderDetails}
                    paymentAmountDetails={paymentAmountDetails}
                    fetchCustomerCart={fetchCustomerCart}
                />
            : (
                <>
                    <AlertPopUpMessage 
                        open={openAlert}
                        handleClose={handleCloseAlert}
                        globalMessage={alertMessage}
                        severity={alertSeverity} 
                    />
                    {
                        Object.keys(editOrderPayload).length > 0 && (
                            <EditOrder 
                                customerId={customerId}
                                payload={editOrderPayload} 
                                openEditProduct={openEditProduct} 
                                handleClose={handleCloseEditOrder}
                                fetchCustomerCart={fetchCustomerCart}
                            />
                        )
                    }
                    <Grid container spacing={1}>
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
                                    fetchCustomerCart={fetchCustomerCart}
                                    customerIsDiscounted={customerIsDiscounted}
                                    handleOnChangeIsCustomerDiscounted={handleOnChangeIsCustomerDiscounted}
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
                            
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <OrderDetails 
                                    handleClickOpen={handleClickEditOrder}
                                    handleOnTableSelectionChange={handleOnTableSelectionChange}
                                    orderDetails={orderDetails}
                                    paymentAmountDetails={paymentAmountDetails}
                                    handleOnProcessPayment={handleOnProcessPayment}
                                />
                            </Grid> 
                        </Grid>
                    </Grid>
                </>
            );
}


export default Pos
