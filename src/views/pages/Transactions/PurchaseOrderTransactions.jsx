import React from 'react'
import {useHistory} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import Typography from '@material-ui/core/Typography'


const PurchaseOrderTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

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

    
    return (
        <>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(params) => history.push(`/products/${params.row.id}/edit`)}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                    className={classes.dataGrid}
                />
            </div>
        </>
    )
}

export default PurchaseOrderTransactions
