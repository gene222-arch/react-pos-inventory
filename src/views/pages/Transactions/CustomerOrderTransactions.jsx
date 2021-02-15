import React from 'react'
import {useHistory} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import Typography from '@material-ui/core/Typography'


const CustomerOrderTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const columns = [
        { field: 'id', headerName: 'Order #', width: 115 },
        { field: 'ordered_at', headerName: 'Date', width: 210 },
        { field: 'customer', headerName: 'Customer', width: 250 },
        { field: 'customer_address', headerName: 'Address', width: 460 },
        { field: 'number_of_items', headerName: 'Number of items', width: 170 },
    
    ];
    
    const rows = [
      { id: 1, ordered_at: 'January 12, 2020 11:10 P.M', customer: 'Customer sample name', customer_address: '134 Daisy St. Brgy. Lingga Calamba City Laguna, 4027, Philippines', number_of_items: 12 },
      { id: 1, ordered_at: 'January 12, 2020 11:10 P.M', customer: 'Customer sample name', customer_address: '134 Daisy St. Brgy. Lingga Calamba City Laguna, 4027, Philippines', number_of_items: 12 },
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

export default CustomerOrderTransactions
