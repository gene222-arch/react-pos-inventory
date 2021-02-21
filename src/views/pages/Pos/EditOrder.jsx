import React,{useState, useEffect} from 'react'
import * as Discount from '../../../services/products/discounts'
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
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';



const EditOrder = ({ payload, openEditProduct, handleClose }) => 
{
    const classes = posUseStyles();

    const [discounts, setDiscounts] = useState([]);
    const [discountId, setDiscountId] = useState(payload.discount_id || 0);

    const handleDiscountOnChange = (e) => setDiscountId(!e.target.checked)

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
    }, []);


    return (
        <>
            <Dialog 
                open={openEditProduct} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                classes={{ paper: classes.productDetailDialog }}
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="subtitle1" color="initial">{payload.product_description}</Typography>
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
                                    <Button variant="contained" color="primary" className={classes.decrementBtn}>
                                        <DecrementQuantityIcon/>
                                    </Button>
                                </Grid>
                                <Grid item xs={8} sm={8} md={9} lg={9}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        value={1}
                                        type="email"
                                        fullWidth
                                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" className={classes.incrementBtn}>
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
                                        <Switch
                                            key={discount.id}
                                            checked={payload.discount_id == discount.id}
                                            onChange={handleDiscountOnChange}
                                            color="primary"
                                            name={discount.name}
                                            value={discount.id}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
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
                    >
                        <CloseIcon />
                    </Button>
                    <Button 
                        variant='contained' 
                        onClick={handleClose} 
                        color="default" 
                        className={classes.saveBtn}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditOrder
