import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { createSalesReturnsUseStyles } from '../../../../assets/material-styles/styles'


const StockAdjustmentDetails = ({match}) => {

    const classes = createSalesReturnsUseStyles();
    const history = useHistory();
    const [reason, setReason] = useState('Received items');
    const [columns, setColumns] = useState([]);

    const {stockAdjustmentId} = match.params;

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

    return (
        <>
            <Card className={classes.selectPOContainer}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h3" color="initial">
                                SA{stockAdjustmentId}
                            </Typography>
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

export default StockAdjustmentDetails