import React from 'react';
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField, FormHelperText } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { createSalesReturnsUseStyles } from '../../../assets/material-styles/styles'


const CreateSalesReturn = () => {

    const classes = createSalesReturnsUseStyles();
    const history = useHistory();

    const columns = [
        { field: 'purchase_order_id', hide: true },
        { field: 'purchase_order_details_id', hide: true },
        { field: 'product_id', hide: true },
        { field: 'product_description', headerName: 'Product name', width: 250 },
        { 
            field: 'defect', 
            headerName: 
            'Defect', 
            width: 250,
            renderCell: (params) => (
                <TextField
                    id=""
                    label=""
                />
            ),
        },
        { field: 'price', headerName: 'Price', width: 150 },
        { 
            field: 'quantity', 
            headerName: 'Quantity', 
            width: 140,
            renderCell: (params) => (
                <TextField
                    id=""
                    label=""
                />
            ),
        },
        { field: 'unit_of_measurement', headerName: 'Unit of Measurement', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 150 },
    ];
    
    const rows = [
        { 
            id: 1, 
            purchase_order_id: 1,
            purchase_order_details_id: 1,
            product_id: 1,
            product_description: 'Snow', 
            defect: '', 
            price: '20.00', 
            quantity: 2,
            unit_of_measurement: 'pcs',  
            amount: '3500', 
        },
    ];

    return (
        <>
            <Card className={classes.selectPOContainer}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                                    Order id
                                </InputLabel>
                                <Select
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    fullWidth
                                >
                                    <MenuItem value="">CO1</MenuItem>
                                    <MenuItem value={10}>CO2</MenuItem>
                                    <MenuItem value={20}>CO3</MenuItem>
                                    <MenuItem value={30}>CO4</MenuItem>
                                </Select>
                                <FormHelperText>Select order id from Customer order transactions</FormHelperText>
                            </FormControl>
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
                    onRowClick={(params) => console.log(params.row.defect)}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color="default" 
                        className={classes.cancelBtn}
                        onClick={() => history.push('/inventory-mngmt/sales-returns')}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' color="default" className={classes.addBtn}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateSalesReturn
