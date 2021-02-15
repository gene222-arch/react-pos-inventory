import React from 'react'
import {useHistory} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import Typography from '@material-ui/core/Typography'


const InvoiceTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const columns = [
        { field: 'id', headerName: 'Invoice #', width: 115 },
        { field: 'status', headerName: 'Status', width: 115 },
        { field: 'invoiced_at', headerName: 'Date', width: 210 },
        { field: 'customer_name', headerName: 'Customer', width: 210 },
        { field: 'number_of_items', headerName: 'Number of items', width: 170 },
        { field: 'subtotal', headerName: 'Subtotal', width: 170 },
        { field: 'discount', headerName: 'Discount', width: 170 },
        { field: 'tax', headerName: 'Tax', width: 170 },
        { field: 'payment_date', headerName: 'Payment Date', width: 170 },
        { field: 'total', headerName: 'Total', width: 170 },
    
    ];
    
    const rows = [
      { id: 1, status: 'Pending', invoiced_at: 'January 12, 2020 11:10 P.M', customer_name: 'Customer sample name', number_of_items: 12, subtotal: 102.50, discount: 15.00, tax: 12.50, payment_date: 'January 12, 2020', total: 1200.00},
      { id: 2, status: 'Pending', invoiced_at: 'January 12, 2020 11:10 P.M', customer_name: 'Customer sample name', number_of_items: 12, subtotal: 102.50, discount: 15.00, tax: 12.50, payment_date: 'January 12, 2020', total: 1200.00},
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

export default InvoiceTransactions
