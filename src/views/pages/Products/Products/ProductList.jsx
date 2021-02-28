import React, {useState, useEffect, lazy} from 'react';
import * as ExcelExport from '../../../../services/exports/excel/products'
import * as CSVExport from '../../../../services/exports/csv/products'
import DeleteDialog from '../../../../components/DeleteDialog'
import clsx from 'clsx'
import * as Product_ from '../../../../services/products/products'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const ProductList = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();
    const [exportMenu, setExportMenu] = useState(null);

    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [rowIds, setRowIds] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleClickExport = (event) => setExportMenu(event.currentTarget);

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };

    const columns = [
        { field: 'id', hide:true },
        { field: 'barcode', headerName: 'Barcode', width: 150 },
        { field: 'name', headerName: 'Product description', width: 205 },
        { field: 'image', headerName: 'Image', width: 205, 
            renderCell: (param) => (
                <img src={`${param.value}`} className={classes.productImgContainer}/>
            )
        },
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'cost', headerName: 'Cost', width: 130 },
        { field: 'margin', headerName: 'Margin %', width: 130,
            valueFormatter: (params) => parseFloat(params.value).toFixed(2)
        },
        { field: 'in_stock', headerName: 'In stock', width: 130,
            cellClassName: (params) =>  clsx('super-app', {
                negative: params.value <= params.row.minimum_reorder_level 
              })
        },
        { field: 'minimum_reorder_level', headerName: 'Min stock', width: 130},
    
    ];


    /**
     * Dialog
     */
    const handleClickOpen = () =>  setOpen(true);

    const handleClose = () => setOpen(false);

    const handleOnSelectionChange = (params) => setRowIds(params.rowIds);

    const fetchProducts = async () => 
    {
        const result = await Product_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setProducts(result.data);
        }
    }

    const deleteProducts = async () => 
    {
        const result = await Product_.destroyAsync({product_ids: rowIds});

        if (result.status === 'Error')
        {
            setAlertSeverity('warning');
            setAlertMessage('Please click the button only once.');
        }
        else
        {
            let _products = [...products];

            rowIds.forEach(rowId => {
                _products = _products.filter(product => product.id !== parseInt(rowId) )
            });

            setAlertSeverity('success');
            setAlertMessage('Products deleted successfully.');

            setProducts(_products);
            setOpen(false);
            setRowIds([]);
        }

        setOpenAlert(true);
    }

    const handleExcelExport = () => 
    {
        ExcelExport.generateExcelAsync();

        setAlertSeverity('info');
        setAlertMessage('Products exporting.');
        setOpenAlert(true);
        setExportMenu(null);
    }

    const handleCSVExport = () => 
    {
        CSVExport.generateCSVAsync();

        setAlertSeverity('info');
        setAlertMessage('Products exporting.');
        setOpenAlert(true);
        setExportMenu(null);
    }
    


    useEffect(() => 
    {
        fetchProducts();

        return () => {
            setProducts([]);
        };
    }, []);


    return (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
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
                                        startIcon={<AddIcon />}
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
                                                    <Button 
                                                        variant="text" 
                                                        className={classes.btn}
                                                        onClick={
                                                            () => history.push('/products/import')
                                                        }
                                                    > 
                                                        Import 
                                                    </Button>
                                                    <Button 
                                                        aria-controls="simple-menu" 
                                                        aria-haspopup="true" 
                                                        onClick={handleClickExport}
                                                        variant="text" 
                                                        className={classes.btn}
                                                    >
                                                        Export
                                                    </Button>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={exportMenu}
                                                        keepMounted
                                                        open={Boolean(exportMenu)}
                                                        onClose={() => setExportMenu(null)}
                                                    >
                                                        <MenuItem onClick={handleExcelExport}>Excel</MenuItem>
                                                        <MenuItem onClick={handleCSVExport}>CSV</MenuItem>
                                                    </Menu>
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
                    rows={products} 
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
