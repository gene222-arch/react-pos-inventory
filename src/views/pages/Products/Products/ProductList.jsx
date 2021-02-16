import React, {useState, useEffect} from 'react';
import clsx from 'clsx'
import * as Product from '../../../../services/products/products'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const ProductList = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', hide:true },
        { field: 'barcode', headerName: 'Barcode', width: 150 },
        { field: 'name', headerName: 'Product description', width: 205 },
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'cost', headerName: 'Cost', width: 130 },
        { field: 'margin', headerName: 'Margin', width: 130 },
        { field: 'in_stock', headerName: 'In stock', width: 130,
            cellClassName: (params) =>  clsx('super-app', {
                negative: params.value < params.row.minimum_reorder_level 
              })
        },
        { field: 'minimum_reorder_level', headerName: 'Min stock', width: 130},
    
    ];

    const fetchProducts = async () => 
    {
        const result = await Product.fetchAllAsync();

        if (result.status = 'Success')
        {
            setRows(result.data);
        }
    }


    useEffect(() => {
        fetchProducts();

        return () => {
            fetchProducts();
            setRows([]);
        };
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
                                        startIcon={<PersonAddIcon />}
                                        onClick={() => history.push('/create-product')}
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
                    className={classes.root}
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(params) => history.push(`/products/${params.row.id}/edit`)}
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
