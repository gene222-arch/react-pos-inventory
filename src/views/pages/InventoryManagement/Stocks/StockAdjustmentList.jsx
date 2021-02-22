import React, { useState, useEffect } from 'react';
import * as StockAdjustment_ from '../../../../services/inventory-management/stockAdjustments'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';



const StockAdjustmentList = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [stockAdjustments, setStockAdjustments] = useState([]);
    const columns = [
        { field: 'id', headerName: 'Adjustment #', width: 240},
        { field: 'adjusted_at', headerName: 'Date', width: 300 },
        { field: 'reason', headerName: 'Reason', width: 350 },
        { field: 'quantity', headerName: 'Quantity', width: 250 },
    ];


    const fetchStockAdjustments = async () => 
    {
        const result = await StockAdjustment_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setStockAdjustments(result.data);
        }
    }


    useEffect(() => {
        fetchStockAdjustments();

        return () => {
            setStockAdjustments([]);
        }
    }, []);


    return (
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Grid container>
                                <Grid item>
                                    <Button 
                                        variant="contained"
                                        color='primary' 
                                        className={classes.addBtn}
                                        startIcon={<AddIcon />}  
                                        onClick={() => 
                                            history.push('/inventory-mngmt/create-stock-adjustment')
                                        }  
                                    >
                                        Add Stock Adjustment
                                    </Button>
                                </Grid>
                            </Grid>
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
                    onRowClick={(param) => history.push(`/inventory-mngmt/stock-adjustments/${param.row.id}/${param.row.reason}`)}
                    rows={stockAdjustments} 
                    columns={columns} 
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={5} 
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default StockAdjustmentList
