import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';


const columns = [
    { field: 'bo_id', hide: true},
    { field: 'supplier', headerName: 'Supplier', width: 300 },
    { field: 'purchase_return', headerName: 'Purchase return', width: 300 },
    { field: 'no_of_items', headerName: 'Number of items', width: 240 },
    { field: 'po_date', headerName: 'Purchase order date', width: 300 },
];

const rows = [
  { id: 1, bo_id: 'Snow', supplier: 12, purchase_return: 100.50, no_of_items: 12, po_date: 'January 12, 2021' },
  { id: 2, bo_id: 'Lannister', supplier: 12, purchase_return: '2021', no_of_items: 12, po_date: 'January, 12 2021' },
  { id: 3, bo_id: 'Lannister', supplier: 12, purchase_return: 100.50, no_of_items: 12, po_date: 'January, 12 2021' },
  { id: 4, bo_id: 'Stark', supplier: 12, purchase_return: 100.50, no_of_items: 12, po_date: 'January, 12 2021' },
  { id: 5, bo_id: 'Targaryen', supplier: 12, purchase_return: 100.50, no_of_items: 12, po_date: 'January, 12 2021' },

];


const BadOrderList = () => {

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
                                        onClick={() => history.push('/inventory-mngmt/create-bad-order')}  
                                    >
                                        Add Bad Order
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="text" className={classes.btn}> Export </Button>
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
                    onRowClick={(param) => history.push(`/inventory-mngmt/bad-order-details/${param.row.id}`)}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default BadOrderList
