import React, {useState, useEffect} from 'react';
import * as ExcelExport from '../../../../services/exports/excel/products'
import DeleteDialog from '../../../../components/DeleteDialog'
import clsx from 'clsx'
import * as Product_ from '../../../../services/products/products'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const ProductList = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowIds, setRowIds] = useState([]);

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


    /**
     * Dialog
     */
    const handleClickOpen = () =>  setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOnSelectionChange = (params) => 
    {
        console.log(params.rowIds);
        setRowIds(params.rowIds)
    }

    const fetchProducts = async () => 
    {
        const result = await Product_.fetchAllAsync();

        if (result.status = 'Success')
        {
            setRows(result.data);
        }
    }

    const deleteProducts = async () => 
    {
        const result = await Product_.destroyAsync({product_ids: rowIds});

        console.log(result)
    }

    const handleExcelExport = async () => 
    {
        const result = await ExcelExport.generateExcelAsync();

        console.log(result);
    }
    


    useEffect(() => 
    {
        fetchProducts();

        return () => {
            setRows([]);
        };
    }, []);


    return (
        <>
            <DeleteDialog 
                open={open} 
                handleClose={handleClose} 
                handleAction={deleteProducts}
                title={'Delete item?'}
                dialogContentText={'Are you sure you want to delete the item'}
            />
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
                                    {
                                        rowIds.length ? (
                                            <Button 
                                                variant="text" 
                                                color="default" 
                                                className={classes.deleteBtn}
                                                onClick={() => handleClickOpen()}
                                            >
                                                <DeleteIcon /> DELETE
                                            </Button>
                                        ) 
                                        : 
                                           (
                                                <>
                                                    <Button variant="text" className={classes.btn}> Import </Button>
                                                    <Button 
                                                        variant="text" 
                                                        className={classes.btn}
                                                        onClick={handleExcelExport}
                                                    > Export </Button>
                                                </>
                                           )
                                    }

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ width: '100%' }}>
                <DataGrid 
                    className={classes.root}
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    autoHeight
                    rows={rows} 
                    columns={columns} 
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection 
                    onSelectionChange={handleOnSelectionChange}
                    onRowClick={(params) => history.push(`/products/${params.row.id}/edit`)}
                />
            </div>
        </>
    );
}

export default ProductList
