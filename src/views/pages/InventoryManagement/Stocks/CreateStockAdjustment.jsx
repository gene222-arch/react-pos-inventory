import React, { useState, useEffect } from 'react';
import * as Product_ from '../../../../services/products/products'
import * as StockAdjustment_ from '../../../../services/inventory-management/stockAdjustments'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { createPageUseStyles } from '../../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const CreateStockAdjustment = () => 
{
    const classes = createPageUseStyles();
    const history = useHistory();

    const [reason, setReason] = useState('Received items');
    const [productId, setProductId] = useState(0);
    const [products, setProducts] = useState([]);
    const [stockAdjustmentDetails, setStockAdjustmentDetails] = useState([]);

    let columns = [];

    switch (reason) 
    {
        case 'Received items':
            columns = [
                { field: 'id', hide: true },
                { field: 'stock_id', hide: true },
                { field: 'product_description', headerName: 'Product', width: 200 },
                { field: 'in_stock', headerName: 'In stock', width: 150 },
                { 
                    field: 'added_stock', 
                    headerName: 'Added stock', 
                    width: 250,
                    renderCell: (params) => (
                        <TextField
                            id=""
                            label=""
                            value={params.value}
                            onChange={
                                (e) => handleOnReceivedItems(e, params.row)
                            }
                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                        />
                    ),
                },
                { 
                    field: 'stock_after', 
                    headerName: 'Stock after', 
                    width: 150,
                },
                {
                    field: 'delete_action', 
                    headerName: 'Action',
                    width: 150,
                    renderCell: (params) => (
                        <Button
                            className={classes.deleteAction} 
                            variant="text" 
                            color="default" 
                            onClick={() => handleOnRemoveProduct(params.row.stock_id)}
                        >
                            <DeleteForeverIcon />
                        </Button>
                    )
                }
            ];
            break;

        case 'Inventory count': 
            columns = [
                { field: 'id', hide: true },
                { field: 'stock_id', hide: true },
                { field: 'product_description', headerName: 'Product', width: 200 },
                { field: 'in_stock', headerName: 'In stock', width: 150 },
                { 
                    field: 'counted_stock', 
                    headerName: 'Counted stock', 
                    width: 150,
                    renderCell: (params) => (
                        <TextField
                            id=""
                            label=""
                            value={params.value}
                            onChange={
                                (e) => handleOnInventoryCount(e, params.row)
                            }
                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                        />
                    ),
                },
                { 
                    field: 'stock_after', 
                    headerName: 'Stock after',
                    width: 150,
                },
                {
                    field: 'delete_action', 
                    headerName: 'Action',
                    width: 150,
                    renderCell: (params) => (
                        <Button
                            className={classes.deleteAction} 
                            variant="text" 
                            color="default" 
                            onClick={() => handleOnRemoveProduct(params.row.stock_id)}
                        >
                            <DeleteForeverIcon />
                        </Button>
                    )
                }
            ]
        break;
        
        default:
            columns = [
                { field: 'id', hide: true },
                { field: 'stock_id', hide: true },
                { field: 'product_description', headerName: 'Product', width: 200 },
                { field: 'in_stock', headerName: 'In stock', width: 150 },
                { 
                    field: 'removed_stock', 
                    headerName: 'Removed stock', 
                    width: 150,
                    renderCell: (params) => (
                        <TextField
                            id=""
                            label=""
                            value={params.value}
                            onChange={
                                (e) => handleOnLossDamage(e, params.row)
                            }
                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                        />
                    ),
                },
                { 
                    field: 'stock_after', 
                    headerName: 'Stock after',
                    width: 150,
                },
                {
                    field: 'delete_action', 
                    headerName: 'Action',
                    width: 150,
                    renderCell: (params) => (
                        <Button
                            className={classes.deleteAction} 
                            variant="text" 
                            color="default" 
                            onClick={() => handleOnRemoveProduct(params.row.stock_id)}
                        >
                            <DeleteForeverIcon />
                        </Button>
                    )
                }
            ]
            break;
    }

    const handleOnChangeReason = (e) => setReason(e.target.value);

    const handleOnChangeProductId = (e) => setProductId(parseInt(e.target.value));

    const handleOnReceivedItems = (e, data) => 
    {
        let value = e.target.value;
        value = parseInt(value) || 0;

        let filterData = ({
            ...data,
            added_stock: value,
            stock_after: value + data.in_stock
        });

        const newAdjustments = stockAdjustmentDetails.map(stockAdjustmentDetail => {
            return stockAdjustmentDetail.stock_id === filterData.stock_id 
                ? filterData
                : stockAdjustmentDetail
        });

        setStockAdjustmentDetails(newAdjustments);
    };

    const handleOnInventoryCount = (e, data) => 
    {
        let value = e.target.value;
        value = parseInt(value) || 0;

        let filterData = ({
            ...data,
            counted_stock: value,
            stock_after: value + data.in_stock
        });

        const newAdjustments = stockAdjustmentDetails.map(stockAdjustmentDetail => {
            return stockAdjustmentDetail.stock_id === filterData.stock_id 
                ? filterData
                : stockAdjustmentDetail
        });

        setStockAdjustmentDetails(newAdjustments);
    };

    const handleOnLossDamage = (e, data) => 
    {
        let value = e.target.value;
        value = parseInt(value) || 0;

        let filterData = ({
            ...data,
            removed_stock: value,
            stock_after: data.in_stock - value
        });

        const newAdjustments = stockAdjustmentDetails.map(stockAdjustmentDetail => {
            return stockAdjustmentDetail.stock_id === filterData.stock_id 
                ? filterData
                : stockAdjustmentDetail
        });

        setStockAdjustmentDetails(newAdjustments);
    };

    const handleOnRemoveProduct = (stockId) => 
    {
        const newAdjustments = stockAdjustmentDetails
            .filter(stockAdjustmentDetail => stockAdjustmentDetail.stock_id !== stockId );
        setStockAdjustmentDetails(newAdjustments);
    }

    const fetchProducts = async () => 
    {
        const result = await Product_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setProducts(result.data);
        }
    }
    
    const fetchStockToAdjust = async () => 
    {
        const result = await StockAdjustment_.fetchStockToAdjustAsync({
            product_id: productId
        });

        if (result.status === 'Success')
        {
            setStockAdjustmentDetails([...stockAdjustmentDetails, result.data]);
            setProductId(0);
        }

    }

    const createStockAdjustment = async () => 
    {
        stockAdjustmentDetails.map(stock => {
            delete stock.id
            delete stock.product_description
        })

        const data = {
            reason: reason,
            stockAdjustmentDetails: stockAdjustmentDetails
        };

        const result = await StockAdjustment_.storeAsync(data);

        if (result.status === 'Success')
        {
            history.push('/inventory-mngmt/stock-adjustments')
        }
    }


    useEffect(() => {
        fetchProducts();

        return () => {
            setProducts([]);
        }
    }, [])

    return (
        <>
            <Card className={classes.selectPOContainer}>
                <CardContent>
                    <Grid container spacing={3} alignItems='center' justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
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
                                    onChange={handleOnChangeReason}
                                >
                                    <MenuItem value='Received items'>Received items</MenuItem>
                                    <MenuItem value='Inventory count'>Inventory count</MenuItem>
                                    <MenuItem value='Loss'>Loss</MenuItem>
                                    <MenuItem value='Damage'>Damage</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Grid container justify='center' alignItems='center'>
                                <Grid item xs={12} sm={12} md={5} lg={5}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Add product</InputLabel>
                                        <Select
                                            name='role'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            className={classes.selectEmpty}
                                            fullWidth
                                            margin='dense'
                                            value={productId}
                                            onChange={handleOnChangeProductId}
                                        >
                                            {
                                                products.map((product) => (
                                                    <MenuItem key={product.id} value={product.id}>
                                                        {product.name}
                                                    </MenuItem>
                                                ))
                                            }
                                            
                                        </Select>
                                    </FormControl>  
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant='outlined' 
                                        color="default" 
                                        className={classes.addBtn}
                                        onClick={fetchStockToAdjust}
                                    >
                                        <AddIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                
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
                            rows={stockAdjustmentDetails} 
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
                        onClick={() => history.push('/inventory-mngmt/stock-adjustments')}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color="default" 
                        className={classes.addBtn}
                        onClick={createStockAdjustment}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateStockAdjustment
