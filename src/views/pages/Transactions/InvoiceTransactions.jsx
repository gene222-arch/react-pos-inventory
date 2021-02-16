import React, {useState, useEffect} from 'react'
import * as InvoiceTransactions_ from '../../../services/transactions/invoices'
import {useHistory} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import Typography from '@material-ui/core/Typography'


const InvoiceTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [invoices, setInvoices] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Invoice #', width: 115 },
        { field: 'status', headerName: 'Status', width: 220 },
        { field: 'invoiced_at', headerName: 'Date', width: 220 },
        { field: 'customer_name', headerName: 'Customer', width: 220 },
        { field: 'number_of_items', headerName: 'Number of items', width: 170 },
        { field: 'sub_total', headerName: 'Subtotal', width: 170 },
        { field: 'discount', headerName: 'Discount', width: 170 },
        { field: 'tax', headerName: 'Tax', width: 170 },
        { field: 'payment_date', headerName: 'Payment Date', width: 170 },
        { field: 'total', headerName: 'Total', width: 170 },
    
    ];


    const fetchInvoiceTransac= async () => 
    {
        const result = await InvoiceTransactions_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setInvoices(result.data);
        }
    }

    
    useEffect(() => {
        fetchInvoiceTransac();

        return () => fetchInvoiceTransac();
    }, []);
    
    return (
        <>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(params) => history.push(`/products/${params.row.id}/edit`)}
                    rows={invoices} 
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
