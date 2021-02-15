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
        { field: 'id', headerName: 'Order #', width: 115 },
        { field: 'purchase_date', headerName: 'Date', width: 210 },
        { field: 'status', headerName: 'Status', width: 210 },
        { field: 'supplier', headerName: 'Supplier', width: 210 },
        { field: 'received', headerName: 'Received', width: 210 },
        { field: 'ordered', headerName: 'Ordered', width: 210 },
        { field: 'expected_on', headerName: 'Date', width: 210 },
        { field: 'total', headerName: 'Total amount', width: 170 },
    
    ];
    
    const rows = [
      { id: 1, purchase_date: 'January 12, 2020 11:10 P.M', status: 'Partially Receive', supplier: 'Customer sample name', received: 120, ordered: 200, expected_on: 'January 2021, 2010', total: 12 },
      { id: 2, purchase_date: 'January 12, 2020 11:10 P.M', status: 'Partially Receive', supplier: 'Customer sample name', received: 120, ordered: 200, expected_on: 'January 2021, 2010', total: 12 },
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
