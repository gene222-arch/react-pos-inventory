import React, {useState, useEffect} from 'react'
import * as POTransactions_ from '../../../services/transactions/purchaseOrders'
import {useHistory} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import Typography from '@material-ui/core/Typography'


const PurchaseOrderTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [po, setPo] = useState([]);

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
    

    const purchaseOrderTransac = async () => 
    {
        const result = await POTransactions_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setPo(result.data);
        }
    }

    
    useEffect(() => {
        purchaseOrderTransac();

        return () => purchaseOrderTransac();
    }, []);
    
    
    return (
        <>
            <div style={{ width: '100%' }}>
                <DataGrid 
                    autoHeight
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(params) => history.push(`/products/${params.row.id}/edit`)}
                    rows={po} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
        </>
    )
}

export default PurchaseOrderTransactions
