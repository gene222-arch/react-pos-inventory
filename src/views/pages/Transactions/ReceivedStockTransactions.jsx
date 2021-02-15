import React from 'react'
import {useHistory} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import Typography from '@material-ui/core/Typography'


const ReceivedStockTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const columns = [
        { field: 'id', headerName: 'Order #', width: 200 },
        { field: 'received_at', headerName: 'Date', width: 295 },
        { field: 'po_id', headerName: 'Status', width: 210 },
        { field: 'supplier', headerName: 'Supplier', width: 250 },
        { field: 'received', headerName: 'Received', width: 250 },
    
    ];
    
    const rows = [
      { id: 1, received_at: 'January 12, 2020 11:10 P.M', po_id: 'Partially Receive', supplier: 'Customer sample name', received: 120 },
      { id: 2, received_at: 'January 12, 2020 11:10 P.M', po_id: 'Partially Receive', supplier: 'Customer sample name', received: 120 },
    ];

    
    return (
        <>
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
                    className={classes.dataGrid}
                />
            </div>
        </>
    )
}

export default ReceivedStockTransactions
