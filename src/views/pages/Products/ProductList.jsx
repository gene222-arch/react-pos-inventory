import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const columns = [
    { field: 'product_description', headerName: 'Product name', width: 367 },
    { field: 'category', headerName: 'Category', width: 250 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'cost', headerName: 'Cost', width: 130 },
    { field: 'margin', headerName: 'Margin', width: 130 },
    { field: 'in_stock', headerName: 'In stock', width: 130 },

];

const rows = [
  { id: 1, product_description: 'Snow', category: '2021', price: '2021', cost: 12,  margin: '35%', in_stock: 100 },
  { id: 2, product_description: 'Lannister', category: '2021', price: '2021', cost: 12,  margin: '42%', in_stock: 100 },
  { id: 3, product_description: 'Lannister', category: '2021', price: '2021', cost: 12,  margin: '45%', in_stock: 100 },
  { id: 4, product_description: 'Stark', category: '2021', price: '2021', cost: 12,  margin: '16%', in_stock: 100 },
  { id: 5, product_description: 'Targaryen', category: '2021', price: '2021', cost: 12,  margin: null, in_stock: 100 },
];


const ProductList = () => {

    const classes = dataGridUseStyles();

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
                                        startIcon={<PersonAddIcon />}    
                                    >
                                        Add Product
                                    </Button>
                                </Grid>
                                <Grid item>
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

export default ProductList
