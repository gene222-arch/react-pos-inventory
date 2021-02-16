import React, {useState, useEffect} from 'react'
import * as CustomerOrderTransactions_ from '../../../services/transactions/customerOrders'
import {useHistory} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import Typography from '@material-ui/core/Typography'


const CustomerOrderTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [customerOrders, setCustomerOrders] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Order #', width: 115 },
        { field: 'ordered_at', headerName: 'Date', width: 210 },
        { field: 'customer', headerName: 'Customer', width: 250 },
        { field: 'customer_address', headerName: 'Address', width: 460 },
        { field: 'number_of_items', headerName: 'Number of items', width: 170 },
    
    ];


    const fetchCustomerOrdersTransac= async () => 
    {
        const result = await CustomerOrderTransactions_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setCustomerOrders(result.data);
        }
    }

    
    useEffect(() => {
        fetchCustomerOrdersTransac();

        return () => fetchCustomerOrdersTransac();
    }, []);

    
    return (
        <>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    rows={customerOrders} 
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
