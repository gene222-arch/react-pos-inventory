import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { receivePOTextFieldUseStyles } from '../../../../assets/material-styles/styles'


const PurchaseOrderReceive = () => {

    const classes = receivePOTextFieldUseStyles();
    const [ toReceive, setToReceive ] = useState(0);

    const handleOnChangeToReceive = (e) => setToReceive(e.target.value);

    const columns = [
        { field: 'po_id',  hide: true, },
        { field: 'po_details_id', hide: true },
        { field: 'product_id', hide: true },
        { field: 'product', headerName: 'Product', width: 160 },
        { field: 'ordered_quantity', headerName: 'Ordered', width: 160 },
        { field: 'received_quantity', headerName: 'Received', width: 160 },
        { field: 'to_receive', headerName: 'To receive', width: 160,
            renderCell: (params) => (
                <TextField
                    id=""
                    label=""
                    value={toReceive}
                    onChange={handleOnChangeToReceive}
                    className={classes.toReceiveTextField}
                />
            ),
        },
    ];
    
    const rows = [
      { id: 1, po_id: 1, po_details_id: 1, product_id: 19, product: 'Guitar', ordered_quantity: 100, received_quantity: 1},
      { id: 1, po_id: 1, po_details_id: 2, product_id: 20, product: 'Guitar', ordered_quantity: 100, received_quantity: 1},
      { id: 1, po_id: 1, po_details_id: 3, product_id: 21, product: 'Guitar', ordered_quantity: 100, received_quantity: 1},
      { id: 1, po_id: 1, po_details_id: 4, product_id: 22, product: 'Guitar', ordered_quantity: 100, received_quantity: 1},
    
    ];


    return (
        <>
            <Card>
                <CardContent>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Button variant="filled" color="primary">
                                <NavLink to={'/products/list'} className={classes.title}>
                                    <strong>Products</strong>
                                </NavLink>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="filled" color="primary">
                                <strong>MARK ALL SA RECEIVED</strong>
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                />
            </div>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button variant="contained" className={classes.cancelDeleteBtn} color="secondary">
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" className={classes.addBtn}>
                        Receive
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default PurchaseOrderReceive
