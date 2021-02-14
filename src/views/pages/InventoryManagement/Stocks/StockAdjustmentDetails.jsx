import React, { useState, useEffect, useReducer } from 'react';
import { useHistory, NavLink } from 'react-router-dom'
import { columnsReducer } from '../../../../hooks/useReducer/reducerHooks'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Typography, Divider } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const StockAdjustmentDetails = ({match}) => {

    const classes = dataGridUseStyles();
    const history = useHistory();

    const [columnsState, dispatchColumnsState] = useReducer(columnsReducer,
        [
            {
                field: '',
                headerName: '',
                width: ''
            }
        ]
    );
    const [stockAdjustments, setStockAdjustments] = useState({
        id: 1,
        reason: 'Received items',
        adjusted_by: 'Admin',
        stockAdjustmentDetails: [
            {
                id: 1,
                stock_adjustment_id: 1,
                stock_id: 1,
                product_description: 'Bag',
                in_stock: 100,
                added_stock: 0,
                removed_stock: 0,
                counted_stock: 0,
                stock_after: 0,
            },
            {
                id: 2,
                stock_adjustment_id: 1,
                stock_id: 2,
                product_description: 'Shoes',
                in_stock: 100,
                added_stock: 0,
                removed_stock: 0,
                counted_stock: 0,
                stock_after: 0,
            }
        ]
    });
    const {stockAdjustmentId} = match.params;


    useEffect(() => {
        dispatchColumnsState({ type: stockAdjustments.reason })
    }, []);

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="subtitle1" color="initial" gutterBottom={true}>
                                <Grid container>
                                    <Grid item>
                                        <NavLink to={'/inventory-mngmt/stock-adjustments'}>
                                            <KeyboardArrowLeftIcon />
                                        </NavLink>
                                    </Grid>
                                    <Grid item>
                                        Stock adjustments
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h3" color="initial">
                                SA{stockAdjustmentId}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Date:</strong> {'January 12, 2021'}
                            </Typography>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Reason:</strong> {'Received items'}
                            </Typography>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Adjusted by:</strong> {'Gene Phillip'}
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
                            rows={stockAdjustments.stockAdjustmentDetails} 
                            columns={columnsState} 
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
