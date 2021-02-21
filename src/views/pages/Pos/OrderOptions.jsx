import React, {useState, useEffect} from 'react'
import * as POS_ from '../../../services/pos/pos'
import ApplyDiscountDialog from './ApplyDiscountDialog'
import * as Discount from '../../../services/products/discounts'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid} from '@material-ui/core'
import {Button} from '@material-ui/core'
import {Card, CardContent} from '@material-ui/core'
import DiscountIcon from '@material-ui/icons/Loyalty';
import {RemoveShoppingCart} from '@material-ui/icons'

const OrderOptions = ({ 
    customerId, 
    orderDetails, 
    handleOnCancelOrder, 
    fetchCustomerCart}) => 
{
    const classes = posUseStyles();
    const [open, setOpen] = useState(false);

    const [discountId, setDiscountId] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [discounts, setDiscounts] = useState([]);

    /**
     * Dialog
     */
    const handleClickOpen = (discountId, percentage) => 
    {
        setDiscountId(discountId);
        setDiscountValue(percentage);
        setOpen(true)
    };

    const handleClose = () => setOpen(false);
    
    const handleApplyDiscountOnClick = async (discountId) => 
    {
        const result = await POS_.applyDiscountToAllAsync({
            customer_id: customerId,
            discount_id: discountId
        });

        if (result.status === 'Success')
        {
            await fetchCustomerCart();
            handleClose();
        }
    } 


    const fetchDiscounts = async () => 
    {
        const result = await Discount.fetchAllAsync();

        if (result.status === 'Success')
        {
            setDiscounts(result.data);
        }
    }

    useEffect(() => {

        fetchDiscounts();

        return () => {
            setDiscounts([]);
        }   

    }, [])


    return discounts.length > 0 && (
        <>
            <ApplyDiscountDialog 
                discountId={discountId}
                discountValue={discountValue}
                open={open}
                handleClose={handleClose}
                handleApplyDiscountOnClick={handleApplyDiscountOnClick}
            />
            <Grid item xs={12} sm={12} md={12} lg={12} >
                <Card>
                    <CardContent>
                        <Grid container>
                            { discounts && (
                                discounts.map(discount => (
                                    <Grid 
                                        key={discount.id}
                                        item xs={12} sm={12} md={3} lg={3}>
                                        <Button 
                                            size="contained" 
                                            color="default" 
                                            className={classes.itemListOptionsBtn}
                                            onClick={
                                                () => handleClickOpen(discount.id, discount.percentage)
                                            }
                                        >
                                            {`${discount.percentage} %`} Discount 
                                            <DiscountIcon className={classes.discountIcon}/>
                                        </Button>
                                </Grid>
                                ))
                            )

                            }
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                {
                                    (orderDetails.length > 0 )
                                        ? (
                                            <Button 
                                                size="contained" 
                                                color="default" 
                                                className={classes.itemListOptionsBtn}
                                                onClick={handleOnCancelOrder}
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
                        
        </>
    )
}

export default OrderOptions
