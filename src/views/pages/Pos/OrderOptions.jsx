import React, {useState, useEffect} from 'react'
import DeleteDialog from '../../../components/DeleteDialog'
import * as POS_ from '../../../services/pos/pos'
import ApplyDiscountDialog from './ApplyDiscountDialog'
import * as Discount from '../../../services/products/discounts'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {Card, CardContent} from '@material-ui/core'
import DiscountIcon from '@material-ui/icons/Loyalty';
import {RemoveShoppingCart} from '@material-ui/icons'
import BackspaceIcon from '@material-ui/icons/Backspace';


const OrderOptions = ({ 
    customerId, 
    orderDetails, 
    handleOnCancelOrder, 
    fetchCustomerCart,
    customerIsDiscounted,
    handleOnChangeIsCustomerDiscounted}) => 
{
    const classes = posUseStyles();
    const [openApplyDiscount, setOpenApplyDiscount] = useState(false);
    const [openRemoveDiscount, setOpenRemoveDiscount] = useState(false);
    const [discountId, setDiscountId] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [discounts, setDiscounts] = useState([]);

    /**
     * Dialog
     */
    const handleClickOpenApplyDiscount = (discountId, percentage) => 
    {
        setDiscountId(discountId);
        setDiscountValue(percentage);
        setOpenApplyDiscount(true)
    };

    const handleClickOpenRemoveDiscount = () => setOpenRemoveDiscount(true);
    const handleCloseApplyDiscount = () => setOpenApplyDiscount(false);
    const handleCloseRemoveDiscount = () => setOpenRemoveDiscount(false);
    

    const fetchDiscounts = async () => 
    {
        const result = await Discount.fetchAllAsync();

        if (result.status === 'Success')
        {
            setDiscounts(result.data);
        }
    }

    const handleApplyDiscountOnClick = async (discountId) => 
    {

        if (orderDetails.length <= 0)
        {
            alert('Can\'t apply discount on empty cart');
        }
        else 
        {
            const result = await POS_.applyDiscountToAllAsync({
                customer_id: customerId,
                discount_id: discountId
            });
    
            if (result.status === 'Success')
            {
                fetchCustomerCart();
                handleOnChangeIsCustomerDiscounted(true);
                handleCloseApplyDiscount();
            }
        }
    } 

    const handleRemoveDiscountOnClick = async () => 
    {
        if (orderDetails.length <= 0)
        {
            alert('Can\'t remove discount on empty cart');
        }
        else 
        {
            const result = await POS_.removeAllDiscountAsync({
                customer_id: customerId
            });
    
            if (result.status === 'Success')
            {
                fetchCustomerCart();
                handleOnChangeIsCustomerDiscounted(false);
                handleCloseRemoveDiscount();
            }
        }
    } 


    useEffect(() => {
        fetchDiscounts();

        return () => {
            setDiscounts([]);
        }   
    }, [])


    return (
        <>
            <ApplyDiscountDialog 
                discountId={discountId}
                discountValue={discountValue}
                open={openApplyDiscount}
                handleClose={handleCloseApplyDiscount}
                handleApplyDiscountOnClick={handleApplyDiscountOnClick}
            />

            <DeleteDialog 
                open={openRemoveDiscount}
                handleClose={handleCloseRemoveDiscount}
                handleAction={handleRemoveDiscountOnClick}
                title={'Remove discounts'}
                dialogContentText={'Are you sure to remove all customer discounts?'}
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
                                                    size="contained" 
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
                                            size="contained" 
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
                                            size="contained" 
                                            color="default" 
                                            className={classes.itemListOptionsBtn}
                                            onClick={handleOnCancelOrder}
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
