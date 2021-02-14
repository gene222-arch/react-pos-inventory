import React, {useState} from 'react'
import EditOrder from './EditOrder'
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



const Pos = () => 
{
    const classes = posUseStyles();

    const [open, setOpen] = useState(false);
    const [rowIds, setRowIds] = useState([]);

    const [editOrderPayload, setEditOrderPayload] = useState({});
    const [orderDetails, setOrderDetails] = useState([
        { id: 1, pos_details_id: 1, product_description: 'Bag', quantity: 1, price: 12, discounts: 0.00 },
        { id: 2, pos_details_id: 2, product_description: 'Shoes', quantity: 1, price: 12, discounts: 0.00 },
        { id: 3, pos_details_id: 3, product_description: 'Wew', quantity: 1, price: 12, discounts: 0.00 },
        { id: 4, pos_details_id: 4, product_description: 'Shoes', quantity: 1, price: 12, discounts: 1.00 },
    ]);


    /**
     * Dialog
     */
    const handleClickOpen = (object) => {
        setOpen(true);
        setEditOrderPayload(object);
    };

    const handleClose = () => setOpen(false);

    /**
     * 
     */

    const handleAddToCart = (productId) => 
    {

    }

    const handleOnDeleteProduct = (posDetailIds) => 
    {
        setOrderDetails(orderDetails.filter((order, index) => {
            return parseInt(posDetailIds[index]) !== order.pos_details_id;
        }));
    }

    const handleOnSelectionChange = (rowIds) =>  setRowIds(rowIds);


    return (
        <>
            <EditOrder payload={editOrderPayload} open={open} handleClose={handleClose}/>
            <Grid container>
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
                                        >
                                            <MenuItem value="">Supplier</MenuItem>
                                            <MenuItem value={10}>Robots</MenuItem>
                                            <MenuItem value={20}>MOA</MenuItem>
                                            <MenuItem value={30}>CCC</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card className={classes.itemListContainer}>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        {[1, 2, 3, 4, 5].map((data, index) => (
                                            <Grid key={index} item xs={6} sm={6} md={3} lg={3}>
                                                <Card onClick={() => handleAddToCart(index)}>
                                                    <CardContent>

                                                    </CardContent>
                                                    <CardActionArea className={classes.itemActionArea}>
                                                        <Typography variant="subtitle2" color="initial">
                                                            Item name
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
                                                orderDetails.length > 0 
                                                    ? (
                                                        <Button 
                                                            size="contained" 
                                                            color="default" 
                                                            className={classes.itemListOptionsBtn}
                                                        >
                                                            Cancel Order
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
                                    variant='filled'
                                    className={classes.selectEmpty}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    fullWidth
                                >
                                    <MenuItem value="">Supplier</MenuItem>
                                    <MenuItem value={10}>Robots</MenuItem>
                                    <MenuItem value={20}>MOA</MenuItem>
                                    <MenuItem value={30}>CCC</MenuItem>
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
                                    onSelectionChange={params => handleOnSelectionChange(params.rowIds)}
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
                                                P0.23
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
                                                P0.23
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
                                                    <strong>P0.23</strong>
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
                        >
                            Process Payment
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}


export default Pos
