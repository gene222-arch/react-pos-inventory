import React, {useState, useEffect, lazy} from 'react';
import * as ExcelExport from '../../../services/exports/excel/payments'
import * as CSVExport from '../../../services/exports/csv/payments'
import * as CustomerOrderTransactions_ from '../../../services/transactions/customerOrders'
import {useHistory} from 'react-router-dom'
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const CustomerOrderTransactions = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [customerOrders, setCustomerOrders] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };

    const columns = [
        { field: 'id', headerName: 'Order #', width: 115 },
        { field: 'ordered_at', headerName: 'Date', width: 210 },
        { field: 'customer', headerName: 'Customer', width: 250 },
        { field: 'customer_address', headerName: 'Address', width: 460 },
        { field: 'number_of_items', headerName: 'Number of items', width: 170 },
    
    ];


    const handleExcelExport = () => 
    {
        ExcelExport.generateExcelAsync();

        setAlertSeverity('info');
        setAlertMessage('Products exporting.');
        setOpenAlert(true);
    }

    const handleCSVExport = () => 
    {
        CSVExport.generateCSVAsync();

        setAlertSeverity('info');
        setAlertMessage('Products exporting.');
        setOpenAlert(true);
    }



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

        return () => {
            setCustomerOrders([]);
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
            <div style={{ width: '100%' }}>
                <DataGrid 
                    autoHeight
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    rows={customerOrders} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
        </>
    )
}

export default CustomerOrderTransactions
