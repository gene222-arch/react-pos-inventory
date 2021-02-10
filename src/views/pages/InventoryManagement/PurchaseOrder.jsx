import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { purchaseOrderUseStyles } from '../../../assets/material-styles/styles'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Divider, Grid, Typography, TextField, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';


const PurchaseOrder = () => 
{
    const classes = purchaseOrderUseStyles();
    const history = useHistory();

    const [supplier, setSupplier] = useState('');
    const [purchaseOrderDate, setPurchaseOrderDate] = useState(new Date('2014-08-18T21:11:54'));
    const [expectedDate, setExpectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const [ quantity, setQuantity ] = useState(0);
    const [ purchaseCost, setPurchaseCost ] = useState(0);


    const handleOnChangeQuantity = (e) => setQuantity(e.target.value);
    const handleOnChangePurchaseCost = (e) => setPurchaseCost(e.target.value);


    const columns = [
        { field: 'product', headerName: 'Date', width: 160 },
        { field: 'in_stock', headerName: 'In stock', width: 160 },
        { field: 'incoming', headerName: 'Incoming', width: 160 },
        { 
            field: 'quantity', 
            headerName: 'Quantity', 
            width: 160,
            renderCell: (params) => (
                <TextField
                    id=""
                    label=""
                    value={quantity}
                    onChange={handleOnChangeQuantity}
                />
            ),
        },
        { 
            field: 'purchase_cost', 
            headerName: 'Cost', 
            width: 160,
            renderCell: (params) => (
                <TextField
                    id=""
                    label=""
                    value={purchaseCost}
                    onChange={handleOnChangePurchaseCost}
                />
            ),
        },
        { field: 'amount', headerName: 'Amount', width: 160,
            valueFormatter: (params) => (quantity * purchaseCost)
        },
    ];
    
    const rows = [
      {id: 1, product: 'Guitar', in_stock: 10, incoming: 10, quantity: 100, purchase_cost: 12.00, amount: 0.00},
        
    ];

    const handleChange = (event) => {
        setSupplier(event.target.value);
    };

    const handlePurchaseOrderDate = (date) => {
      setPurchaseOrderDate(date);
    };

    const handleExpectedDate = (date) => {
        setExpectedDate(date);
    };
   
    return (
        <>
            <Card className={classes.purchaseOrderCard}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={supplier}
                                    onChange={handleChange}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    fullWidth
                                >
                                <MenuItem value="">Supplier</MenuItem>
                                <MenuItem value={10}>Robots</MenuItem>
                                <MenuItem value={20}>MOA</MenuItem>
                                <MenuItem value={30}>CCC</MenuItem>
                                </Select>
                                <FormHelperText>Select a supplier</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container spacing={1} justify='space-between'>
                                    <Grid item xs={12} sm={6} md={5} lg={5}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            margin="normal"
                                            id="purchase-order-date"
                                            label="Purchase order date"
                                            format="MM/dd/yyyy"
                                            value={purchaseOrderDate}
                                            onChange={handlePurchaseOrderDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={5} lg={5}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            margin="normal"
                                            id="expected-on"
                                            label="Expected on"
                                            format="MM/dd/yyyy"
                                            value={expectedDate}
                                            onChange={handleExpectedDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <div style={{ width: '100%' }}>
                <DataGrid
                    autoHeight 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(param) => history.push('/inventory-mngmt/purchase-order-details')}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                />
            </div>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button variant='text' color="default" className={classes.cancelBtn}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='text' color="default" className={classes.addBtn}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PurchaseOrder
