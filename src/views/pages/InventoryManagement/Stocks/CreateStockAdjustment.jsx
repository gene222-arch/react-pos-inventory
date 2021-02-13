import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { createSalesReturnsUseStyles } from '../../../../assets/material-styles/styles'


const CreateStockAdjustment = () => {

    const classes = createSalesReturnsUseStyles();
    const history = useHistory();
    const [reason, setReason] = useState('Received items');
    const [columns, setColumns] = useState([]);

    const [stockAdjustments, setStockAdjustments] = useState([
        {
            id: 1,
            product_id: 1,
            product_description: 'Bag',
            in_stock: 10,
            added_stock: 0,
            remove_stock: 0,
            counted_stock: 0,
            stock_after: 0,
        },
        {
            id: 2,
            product_id: 2,
            product_description: 'Shoes',
            in_stock: 20,
            added_stock: 0,
            remove_stock: 0,
            counted_stock: 0,
            stock_after: 0,
        }
    ]);

    const handleOnChangeSelect = (e) => setReason(e.target.value);

    const handleOnReceivedItems = (e, productId) => 
    {
        const quantity = parseInt(e.target.value) || 0;
        const newAdjustment = stockAdjustments.find(stock => (stock.product_id === productId));
        newAdjustment.added_stock = quantity;
        newAdjustment.stock_after = (newAdjustment.in_stock + quantity);

        const newAdjustments = stockAdjustments.map(stock => 
            stock.product_id === productId 
                ? newAdjustment 
                : stock
        )

        setStockAdjustments(newAdjustments);
    };

    const handleOnDamagedLossItems = (e, productId) => 
    {
        const quantity = parseInt(e.target.value) || 0; 
        
        const newAdjustment = stockAdjustments.find(stock => (stock.product_id === productId));
        newAdjustment.remove_stock = quantity; 
        newAdjustment.stock_after = (newAdjustment.in_stock - quantity);

        const newAdjustments = stockAdjustments.map(stock => 
            stock.product_id === productId 
                ? newAdjustment 
                : stock
        )

        setStockAdjustments(newAdjustments);
    };

    const handleOnInventoryCount = (e, productId) => 
    {
        const newAdjustment = stockAdjustments.find(stock => (stock.product_id === productId));
        newAdjustment.counted_stock = parseInt(e.target.value);

        const newAdjustments = stockAdjustments.map(stock => 
            stock.product_id === productId 
                ? newAdjustment 
                : stock
        )

        setStockAdjustments(newAdjustments);
    }

    const receivedItemColumns = () => [
        { field: 'id', hide: true },
        { field: 'product_id', hide: true },
        { field: 'product_description', headerName: 'Product', width: 150 },
        { field: 'in_stock', headerName: 'In stock', width: 150 },
        { 
            field: 'added_stock', 
            headerName: 
            'Added stock', 
            width: 250,
            renderCell: (params) => (
                <TextField
                    name={params.row.product_description}
                    onChange={(e) => handleOnReceivedItems(
                            e, 
                            params.row.product_id
                        )}
                />
            ),
        },
        { 
            field: 'stock_after', 
            headerName: 'Stock after', 
            width: 140,
        },
    ];


    const inventoryCountColumns = () => [
        { field: 'product_id', hide: true },
        { field: 'product_description', headerName: 'Product', width: 150 },
        { field: 'in_stock', headerName: 'Expected stock', width: 150 },
        { 
            field: 'counted_stock', 
            headerName: 
            'Counted stock', 
            width: 250,
            renderCell: (params) => (
                <TextField
                    name={params.row.field}
                    onChange={(e) => handleOnInventoryCount(
                        e, 
                        params.row.product_id)}
                />
            ),
        },
    ];

    const lossDamagedColumns = () => [
        { field: 'product_id', hide: true },
        { field: 'product_description', headerName: 'Product', width: 150 },
        { field: 'in_stock', headerName: 'In stock', width: 150 },
        { 
            field: 'remove_stock', 
            headerName: 'Remove stock', 
            width: 250,
            renderCell: (params) => (
                <TextField
                    name={params.row.field}
                    onChange={(e) => handleOnDamagedLossItems(
                        e, 
                        params.row.product_id)}
                />
            ),
        },
        { 
            field: 'stock_after', 
            headerName: 'Stock after', 
            width: 140,
            valueGetter: (params) => 1
        },
    ];

    const handleOnChangeReason = () => {
        switch (reason) {
            case 'Received items':
                setColumns(receivedItemColumns())
                break;
            
            case 'Inventory count': 
                setColumns(inventoryCountColumns());
                break;
            
            default: 
                setColumns(lossDamagedColumns());
                break;
        }
        const resetStockAdustments = stockAdjustments.map(stock => (
            {...stock, added_stock:0, counted_stock: 0, remove_stock: 0, stock_after: 0}
        ));

        setStockAdjustments(resetStockAdustments);
    }


    useEffect(() => {
        handleOnChangeReason();
    }, [reason])

    return (
        <>
            <Card className={classes.selectPOContainer}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                                    Reason
                                </InputLabel>
                                <Select
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    fullWidth
                                    value={reason}
                                    onChange={handleOnChangeSelect}
                                >
                                    <MenuItem value='Received items'>Received items</MenuItem>
                                    <MenuItem value='Inventory count'>Inventory count</MenuItem>
                                    <MenuItem value='Loss'>Loss</MenuItem>
                                    <MenuItem value='Damaged'>Damaged</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <div style={{ width: '100%' }}>
                        <DataGrid 
                            autoHeight
                            showToolbar
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            rows={stockAdjustments} 
                            columns={columns} 
                            pageSize={5} 
                        />
                    </div>
                </CardContent>
            </Card>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color="default" 
                        className={classes.cancelBtn}
                        onClick={() => history.push('/inventory-mgnmt/stock-adjustments')}
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

export default CreateStockAdjustment
