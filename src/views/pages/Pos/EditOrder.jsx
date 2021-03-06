import React,{useState, useEffect, useReducer, lazy} from 'react'
import * as POS_ from '../../../services/pos/pos'
import { posUseStyles } from '../../../assets/material-styles/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
import {TextField, Divider, Button} from '@material-ui/core';
import { Typography, } from '@material-ui/core';
import IncrementQuantityIcon from '@material-ui/icons/ExposurePlus1';
import DecrementQuantityIcon from '@material-ui/icons/ExposureNeg1';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const editOrderReducer = (state, action) => 
{
    switch (action.type) {
        case 'input-quantity':
            return {
                ...state, 
                quantity: action.payload.value
            };
            break;
            
        case 'increment':
            return {
                ...state, 
                quantity: state.quantity + 1
            };
            break;  
            
        case 'decrement':
            if (state.quantity === 1)
            {
                return {
                    ...state, 
                    quantity: 1
                };
            }

            return {
                ...state, 
                quantity: state.quantity - 1
            };
            break;   
            
        case 'add-discount': 
            return {
                ...state, 
                hasDiscount: action.payload.hasDiscount, 
                discount_id: action.payload.discountId
            };
            break;
        default:
            return state;
            break;
    }
}



const EditOrder = ({ customerId, payload, openEditProduct, handleClose, fetchCustomerCart }) => 
{
    const classes = posUseStyles();
    const [loading, setLoading] = useState(false);

    const EDIT_ORDER_INITIAL_STATE = {
        customer_id: customerId,
        product_id: payload.product_id,
        hasDiscount: Boolean(payload.discount_id),
        discount_id: payload.discount_id,
        quantity: payload.quantity,
    };

    const [discounts, setDiscounts] = useState([]);
    const [editOrderState, dispatchEditOrderState] = useReducer(editOrderReducer, EDIT_ORDER_INITIAL_STATE);
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



    const handleDiscountOnChange = (e, discount_id) => 
    {
        e.target.checked 
            ? dispatchEditOrderState({type: 'add-discount', payload: {
                hasDiscount: true,
                discountId: discount_id
            }})
            : dispatchEditOrderState({type: 'add-discount', payload: {
                hasDiscount: false,
                discountId: 0
            }});
    }

    const handleQuantityOnChange = (e) => {

        const quantity = parseInt(e.target.value) || 0;

        if (Number.isInteger(quantity) === false)
        {
            setAlertSeverity('error');
            setAlertMessage('Please input a valid number');
            setOpenAlert(true);
        }
        else 
        {
            dispatchEditOrderState({
                type: 'input-quantity', 
                payload: {
                    value: quantity
            }})
        }
    };

    const handleIncrementQty = () =>  dispatchEditOrderState({type: 'increment'});
    
    const handleDecrementQty = () =>  dispatchEditOrderState({type: 'decrement'});


    const fetchDiscounts = async () => 
    {
        const result = await POS_.fetchAllDiscountsAsync();

        if (result.status === 'Success')
        {
            setDiscounts(result.data);
        }
    }


    const updateOrderDiscountQty = async () => 
    {
        setLoading(true);
        if (!editOrderState.discount_id)
        {
            delete editOrderState.discount_id
        }

        const result = await POS_.applyDiscountAddQuantityAsync(editOrderState);

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setAlertMessage(result.message.quantity)
        }
        else 
        {
            setAlertSeverity('Success');
            setAlertMessage(result.message);

            fetchCustomerCart();
            handleClose();
        }

        setOpenAlert(true);
        setLoading(false);
    }


    useEffect(() => {
        fetchDiscounts();

        return () => {
            setDiscounts([]);
        }   
    }, []);


    return discounts.length > 0 && (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
            <Dialog 
                open={openEditProduct} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                classes={{ paper: classes.productDetailDialog }}
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h4" color="initial">{payload.product_description}</Typography>
                </DialogTitle>
                <DialogContent>
                <Divider />
                    <Grid container spacing={4} justify='center' className={classes.modifyOrderContainerDialog}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="subtitle1" color="initial">
                                <strong>Quantity</strong>
                            </Typography>
                            <Grid container spacing={3} alignItems='flex-end' justify='flex-start'>
                                <Grid item>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        className={classes.decrementBtn}
                                        onClick={handleDecrementQty}
                                    >
                                        <DecrementQuantityIcon/>
                                    </Button>
                                </Grid>
                                <Grid item xs={8} sm={8} md={9} lg={9}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        value={editOrderState.quantity}
                                        fullWidth
                                        onChange={handleQuantityOnChange}
                                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        className={classes.incrementBtn}
                                        onClick={handleIncrementQty}
                                    >
                                        <IncrementQuantityIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="subtitle1" color="initial">
                                <strong>Discounts</strong>
                            </Typography>
                            <Grid container spacing={1} alignItems='flex-end' justify='flex-start'>
                                <Grid item xs={8} sm={8} md={4} lg={4}>
                                {
                                    discounts.map(discount => (
                                        <FormControlLabel
                                            key={discount.id}
                                            control={
                                                <Switch
                                                    checked={editOrderState.discount_id == discount.id}
                                                    onChange={(e) => handleDiscountOnChange(e, discount.id)}
                                                    color="primary"
                                                    name={discount.name}
                                                    value={editOrderState.hasDiscount}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            }
                                            label={`${discount.percentage}%`}
                                        />
                                    ))
                                }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="subtitle1" color="initial">
                                <strong>VAT</strong>
                            </Typography>
                            <Grid container spacing={1} alignItems='flex-end' justify='flex-start'>
                                <Grid item xs={8} sm={8} md={4} lg={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch 
                                                checked={true} 
                                                name="checkedA" 
                                                color='primary'
                                        />
                                        }
                                        label="12%"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.productDetailDialogActions}>
                    <Button 
                        onClick={handleClose} 
                        color="default" 
                        className={classes.closeBtn}
                        disabled={loading}
                    >
                        <CloseIcon />
                    </Button>
                    <Button 
                        variant='contained' 
                        onClick={handleClose} 
                        color="default" 
                        className={classes.saveBtn}
                        onClick={updateOrderDiscountQty}
                        disabled={loading}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditOrder
