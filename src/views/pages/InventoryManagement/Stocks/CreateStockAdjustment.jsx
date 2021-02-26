import React, { useState, useEffect, lazy } from 'react';
import * as Product_ from '../../../../services/products/products'
import * as StockAdjustment_ from '../../../../services/inventory-management/stockAdjustments'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { createPageUseStyles } from '../../../../assets/material-styles/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const CreateStockAdjustment = () => 
{
    const classes = createPageUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [reason, setReason] = useState('Received items');
    const [productId, setProductId] = useState(0);
    const [products, setProducts] = useState([]);
    const [stockAdjustmentDetails, setStockAdjustmentDetails] = useState([]);
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
    
    let columns = [];

    switch (reason) 
    {
        case 'Received items':
            columns = [
                { field: 'id', hide: true },
                { field: 'stock_id', hide: true },
                { field: 'product_id', hide: true },
                { field: 'product_description', headerName: 'Product', width: 200 },
                { field: 'in_stock', headerName: 'In stock', width: 150 },
                { 
                    field: 'added_stock', 
                    headerName: 'Added stock', 
                    width: 250,
                    renderCell: (params) => (
                        <TextField
                            error={Boolean(params.value <= 0)}
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
                { field: 'product_id', hide: true },
                { field: 'product_description', headerName: 'Product', width: 200 },
                { field: 'in_stock', headerName: 'In stock', width: 150 },
                { 
                    field: 'counted_stock', 
                    headerName: 'Counted stock', 
                    width: 150,
                    renderCell: (params) => (
                        <TextField
                            error={Boolean(params.value <= 0)}
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
                    hide: true,
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
                { field: 'product_id', hide: true },
                { field: 'product_description', headerName: 'Product', width: 200 },
                { field: 'in_stock', headerName: 'In stock', width: 200 },
                { 
                    field: 'removed_stock', 
                    headerName: 'Removed stock', 
                    width: 200,
                    renderCell: (params) => (
                        <TextField
                            error={Boolean(params.value <= 0)}
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
                    width: 200,
                },
                {
                    field: 'delete_action', 
                    headerName: 'Action',
                    width: 200,
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
            stock_after: value
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
    
    const fetchStockToAdjust = async (e) => 
    {
        const id = parseInt(e.target.value);
        setProductId(parseInt(e.target.value));

        const isProductInList = stockAdjustmentDetails.find(stockAdjustment => parseInt(stockAdjustment.product_id) === id);
        console.log(stockAdjustmentDetails)
        if (isProductInList)
        {
            alert('Product already exist.')
        }
        else 
        {
            const result = await StockAdjustment_.fetchStockToAdjustAsync({
                product_id: id
            });
    
            if (result.status === 'Success')
            {
                setStockAdjustmentDetails([...stockAdjustmentDetails, result.data]);
                setProductId(0);
            }
        }

    }

    const createStockAdjustment = async () => 
    {
        setLoading(true);
        const result = await StockAdjustment_.storeAsync(validateData());

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
        }
        else 
        {
            setAlertSeverity('success');
            setAlertMessage(result.message);
            setTimeout(() => history.push('/inventory-mngmt/stock-adjustments'), 2000);
        }

        setOpenAlert(true);
        setTimeout(() => setLoading(false), 2000);
    }


    const validateData = () => 
    {
        const stockAdjustmentDetails_ = stockAdjustmentDetails.map(stock => ({
            stock_id: stock.id,
            added_stock: stock.added_stock,
            removed_stock: stock.removed_stock,
            counted_stock: stock.counted_stock,
            stock_after: stock.stock_after
        }))

        return {
            reason: reason,
            stockAdjustmentDetails: stockAdjustmentDetails_
        };
    }


    useEffect(() => {
        fetchProducts();

        return () => {
            setProducts([]);
        }
    }, [])

    return (
        <>

            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
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
                                            onChange={fetchStockToAdjust}
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
                        disabled={loading}
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
                        disabled={loading}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateStockAdjustment
