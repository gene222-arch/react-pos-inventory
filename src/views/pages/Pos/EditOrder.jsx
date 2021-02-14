import React from 'react'
import { posUseStyles } from '../../../assets/material-styles/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
import {TextField, Divider, Button} from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, Typography, } from '@material-ui/core';
import IncrementQuantityIcon from '@material-ui/icons/ExposurePlus1';
import DecrementQuantityIcon from '@material-ui/icons/ExposureNeg1';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';



const EditOrder = ({ payload, open, handleClose }) => 
{
    const classes = posUseStyles();

    return (
        <>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                classes={{ paper: classes.productDetailDialog }}
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h4" color="initial">{payload.product_description}</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Divider />
                    </DialogContentText>
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
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            className={classes.selectEmpty}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            fullWidth
                                        >
                                            <MenuItem value={1}>10%</MenuItem>
                                            <MenuItem value={2}>20%</MenuItem>
                                            <MenuItem value={3}>30%</MenuItem>
                                        </Select>
                                    </FormControl>
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
