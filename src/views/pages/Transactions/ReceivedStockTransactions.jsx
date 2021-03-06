import React, {useState, useEffect} from 'react'
import * as RSTransactions_ from '../../../services/transactions/receivedStocks'
import {useHistory} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const ReceivedStockTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [receivedStocks, setReceivedStocks] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Order #', width: 200 },
        { field: 'received_at', headerName: 'Date', width: 295 },
        { field: 'po_id', headerName: 'Purchase order #', width: 210 },
        { field: 'supplier', headerName: 'Supplier', width: 250 },
        { field: 'received', headerName: 'Received', width: 250 },
    
    ];
    
    const receivedStocksTransac = async () => 
    {
        const result = await RSTransactions_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setReceivedStocks(result.data);
        }
    }

    
    useEffect(() => {
        receivedStocksTransac();

        return () => receivedStocksTransac();
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
                    rows={receivedStocks} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
        </>
    )
}

export default ReceivedStockTransactions
