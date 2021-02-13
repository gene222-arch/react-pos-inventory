import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';


const columns = [
    { field: 'sa_id', headerName: 'Adjustment #', width: 240},
    { field: 'adjusted_at', headerName: 'Date', width: 300 },
    { field: 'reason', headerName: 'Reason', width: 350 },
    { field: 'quantity', headerName: 'Quantity', width: 250 },
];

const rows = [
  { id: 1, sa_id: 1, adjusted_at: 12, reason: 'Received items', quantity: 12 },
  { id: 2, sa_id: 2, adjusted_at: 12, reason: 'Received items', quantity: 12},
  { id: 3, sa_id: 3, adjusted_at: 12, reason: 'Received items', quantity: 12},
  { id: 4, sa_id: 4, adjusted_at: 12, reason: 'Received items', quantity: 12},
  { id: 5, sa_id: 5, adjusted_at: 12, reason: 'Damaged', quantity: 100},
];


const StockAdjustmentList = () => {

    const classes = dataGridUseStyles();
    const history = useHistory();

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
                                        onClick={() => history.push('/inventory-mngmt/create-stock-adjustment')}  
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
                    onRowClick={(param) => history.push(`/inventory-mngmt/stock-adjustments/${param.row.id}`)}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default StockAdjustmentList
