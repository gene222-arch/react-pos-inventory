import React, {useState, useEffect, lazy} from 'react'
import DeleteDialog from '../../../components/DeleteDialog'
import * as POS_ from '../../../services/pos/pos'
import ApplyDiscountDialog from './ApplyDiscountDialog'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {Card, CardContent} from '@material-ui/core'
import DiscountIcon from '@material-ui/icons/Loyalty';
import {RemoveShoppingCart} from '@material-ui/icons'
import BackspaceIcon from '@material-ui/icons/Backspace';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));



const ALERT_MESSAGES = {
    CUSTOMER_HAS_YET_TO_ORDER: 'Customer has yet to order, cannot process payment.',
    CANT_APPLY_DISCOUNT: 'Can\'t apply discount on an empty cart.',
    CANT_APPLY_DISCOUNT_MULTIPLE_EVENTS: 'Please click the button only once.',
    DISCOUNT_APPLY_SUCCESS: 'Discount successfully applied.',
    CANT_REMOVE_DISCOUNT: 'Can\'t remove discount on an empty cart.',
    DISCOUNT_REMOVE_SUCCESS: 'Discount successfully removed.',
    CANT_CANCEL_ORDER: 'Can\'t cancel customer\'s order on an empty cart.',
}


const OrderOptions = ({ 
    customerId, 
    orderDetails, 
    fetchCustomerCart,
    customerIsDiscounted,
    handleOnChangeIsCustomerDiscounted 
    }) => 
{
    const classes = posUseStyles();
    const [openApplyDiscountDialog, setOpenApplyDiscountDialog] = useState(false);
    const [openRemoveDiscount, setOpenRemoveDiscount] = useState(false);
    const [openCancelOrderDialog, setOpenCancelOrderDialog] = useState(false);
    const [discountId, setDiscountId] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [discounts, setDiscounts] = useState([]);

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
    const handleClickOpenCancelOrderDialog = () => setOpenCancelOrderDialog(true);

    const handleClickOpenApplyDiscount = (discountId, percentage) => 
    {
        setDiscountId(discountId);
        setDiscountValue(percentage);
        setOpenApplyDiscountDialog(true)
    };

    const handleClickOpenRemoveDiscount = () => setOpenRemoveDiscount(true);

    const handleCloseApplyDiscount = () => setOpenApplyDiscountDialog(false);

    const handleCloseRemoveDiscount = () => setOpenRemoveDiscount(false);

    const handleCloseCancelOrderDialog = () => setOpenCancelOrderDialog(false);
    
    const fetchDiscounts = async () => 
    {
        const result = await POS_.fetchAllDiscountsAsync();

        if (result.status === 'Success')
        {
            setDiscounts(result.data);
        }
    }

    const handleApplyDiscountOnClick = async (discountId) => 
    {

        if (orderDetails.length <= 0)
        {
            setAlertSeverity('error');
            setAlertMessage(ALERT_MESSAGES.CANT_APPLY_DISCOUNT);
        }
        else 
        {
            const result = await POS_.applyDiscountToAllAsync({
                customer_id: customerId,
                discount_id: discountId
            });
    
            if (result.status === 'Error')
            {
                setAlertSeverity('warning');
                setAlertMessage(result.message);
            }
            else
            {
                setAlertSeverity('success');
                setAlertMessage(result.message)

                fetchCustomerCart();
                handleOnChangeIsCustomerDiscounted(true);
                handleCloseApplyDiscount();
            }
        }

        setOpenAlert(true);
    } 

    const handleRemoveDiscountOnClick = async () => 
    {
        if (orderDetails.length <= 0)
        {
            setAlertSeverity('error');
            setAlertMessage(ALERT_MESSAGES.CANT_REMOVE_DISCOUNT);
        }
        else 
        {
            const result = await POS_.removeAllDiscountAsync({
                customer_id: customerId
            });
    
            if (result.status === 'Error')
            {
                setAlertSeverity('error');
                setAlertMessage(result.message);
            }
            else 
            {
                setAlertSeverity('success');
                setAlertMessage(result.message)

                fetchCustomerCart();
                handleOnChangeIsCustomerDiscounted(false);
                handleCloseRemoveDiscount();
            }
        }

        setOpenAlert(true);
    } 



    const handleOnCancelOrder = async () => 
    {
        const result = await POS_.cancelOrdersAsync({customer_id: customerId});

        if (orderDetails.length <= 0)
        {
            setAlertSeverity('error');
            setAlertMessage(ALERT_MESSAGES.CANT_REMOVE_DISCOUNT);
        }
        else 
        {
            if (result.status === 'Error')
            {
                setAlertSeverity('error');
                setAlertMessage(result.message);
            }
            else 
            {
                setAlertSeverity('success');
                setAlertMessage(result.message);

                fetchCustomerCart();
            }
        }

        setOpenAlert(true);
        handleCloseCancelOrderDialog();
    }


    useEffect(() => {
        fetchDiscounts();

        return () => {
            setDiscounts([]);
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

            <ApplyDiscountDialog 
                discountId={discountId}
                discountValue={discountValue}
                open={openApplyDiscountDialog}
                handleClose={handleCloseApplyDiscount}
                handleApplyDiscountOnClick={handleApplyDiscountOnClick}
                actionName='APPLY'
            />

            <DeleteDialog 
                open={openRemoveDiscount}
                handleClose={handleCloseRemoveDiscount}
                handleAction={handleRemoveDiscountOnClick}
                title={'Remove discounts'}
                dialogContentText={'Are you sure to remove all customer discounts?'}
                actionName='REMOVE'
            />

            <DeleteDialog 
                open={openCancelOrderDialog}
                handleClose={handleCloseCancelOrderDialog}
                handleAction={handleOnCancelOrder}
                title={'Cancel order'}
                dialogContentText={'Are you sure to cancel customer\'s order?'}
                actionName='CONTINUE'
            />

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card className={classes.orderOptionsCardCOntainer}>
                    <CardContent>
                        <Grid container>
                            { discounts.length > 0 && (
                                discounts.map(discount => 
                                    !customerIsDiscounted && (
                                        (
                                            <Grid 
                                                key={discount.id}
                                                item xs={12} sm={12} md={3} lg={3}>
                                                <Button 
                                                    color="default" 
                                                    className={classes.itemListOptionsBtn}
                                                    onClick={
                                                        () => handleClickOpenApplyDiscount(discount.id, discount.percentage)
                                                    }
                                                >
                                                    {`${discount.percentage} %`} Discount 
                                                    <DiscountIcon className={classes.discountIcon} />
                                                </Button>
                                            </Grid>
                                        )
                                    )
                                )
                            )}
                            {
                                customerIsDiscounted && (
                                    <Grid 
                                        item xs={12} sm={12} md={3} lg={3}>
                                        <Button 
                                            color="default" 
                                            className={classes.itemListOptionsBtn}
                                            onClick={handleClickOpenRemoveDiscount}
                                        >
                                            Remove Discount
                                            <BackspaceIcon className={classes.discountIcon}/>
                                        </Button>
                                    </Grid>
                                )
                            }
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                {
                                    (orderDetails.length > 0 ) && (
                                        <Button 
                                            color="default" 
                                            className={classes.itemListOptionsBtn}
                                            onClick={handleClickOpenCancelOrderDialog}
                                        >
                                            Cancel Order <RemoveShoppingCart className={classes.cancelOrderIcon}/>
                                        </Button>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
                        
        </>
    )
}

export default OrderOptions
