import React, { useState, useEffect, useReducer } from 'react';
import * as StockAdjustment_ from '../../../../services/inventory-management/stockAdjustments'
import { useHistory, NavLink } from 'react-router-dom'
import { columnsReducer } from '../../../../hooks/useReducer/reducerHooks'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Typography, Divider } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const StockAdjustmentDetails = ({match}) => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const {stockAdjustmentId, stockAdjustmentReason} = match.params;
    const [stockAdjustmentState, dispatchStockAdjustmentState] = useReducer(columnsReducer, []);
    
    const [stockAdjustment, setStockAdjustments] = useState({
        stockAdjustment: {
            id: 0,
            reason: '',
            adjusted_by: '',
            adjusted_at: ''
        },
        stockAdjustmentDetails: []
    });


    const fetchStockAdjustmentDetails = async () => 
    {
        const result = await StockAdjustment_.fetchAsync({
            stock_adjustment_id: stockAdjustmentId
        });

        if (result.status === 'Success')
        {
            setStockAdjustments(result.data);
        }
    }


    useEffect(() => {
        fetchStockAdjustmentDetails();
        dispatchStockAdjustmentState({ type: stockAdjustmentReason })

        return () => {
            setStockAdjustments({});
        }
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
                                <strong>Date:</strong> {stockAdjustment.stockAdjustment.adjusted_at}
                            </Typography>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Reason:</strong> {stockAdjustment.stockAdjustment.reason}
                            </Typography>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Adjusted by:</strong> {stockAdjustment.stockAdjustment.adjusted_by}
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
                            rows={stockAdjustment.stockAdjustmentDetails} 
                            columns={stockAdjustmentState} 
                            rowsPerPageOptions={[5, 10, 20]}
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
