import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const columns = [
    { field: 'po_id', headerName: 'Purchase order #', width: 200 },
    { field: 'po_date', headerName: 'Date', width: 165 },
    { field: 'supplier', headerName: 'Supplier', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'received', headerName: 'Received', width: 150 },
    { field: 'expected_on', headerName: 'Expected on', width: 165 },
    { field: 'total', headerName: 'Total', width: 150 },

];

const rows = [
  { id: 1, po_id: 'Snow', po_date: 'January 12, 2021', supplier: '2021', status: 12,  received: '35%', expected_on: 100 },
  { id: 2, po_id: 'Lannister', po_date: '2021', supplier: '2021', status: 12,  received: '42%', expected_on: 100 },
  { id: 3, po_id: 'Lannister', po_date: '2021', supplier: '2021', status: 12,  received: '45%', expected_on: 100 },
  { id: 4, po_id: 'Stark', po_date: '2021', supplier: '2021', status: 12,  received: '16%', expected_on: 100 },
  { id: 5, po_id: 'Targaryen', po_date: '2021', supplier: '2021', status: 12,  received: null, expected_on: 100 },
];


const PurchaseOrderDetails = () => {

    const classes = dataGridUseStyles();

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Grid container>
                                <Grid item xs={12} sm={5} md={4} lg={4}>
                                    <Button 
                                        variant="contained"
                                        color='primary' 
                                        className={classes.addBtn}
                                        startIcon={<PersonAddIcon />}    
                                    >
                                        Add Purchase Order
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={7} lg={8}>
                                    <Button variant="text" className={classes.btn}> Import </Button>
                                    <Button variant="text" className={classes.btn}> Export </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default PurchaseOrderDetails
