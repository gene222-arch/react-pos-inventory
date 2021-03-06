import React, {useState, useEffect, lazy} from 'react'
import EditDialog from '../../../components/EditDialog'
import DeleteDialog from '../../../components/DeleteDialog'
import * as InvoiceTransactions_ from '../../../services/transactions/invoices'
import * as ExcelExport from '../../../services/exports/excel/invoices'
import * as CSVExport from '../../../services/exports/csv/invoices'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import {Card, CardContent, Grid, Button} from '@material-ui/core'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));



const InvoiceTransactions = () => 
{
    const classes = dataGridUseStyles();
    const [exportMenu, setExportMenu] = useState(null);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [rowIds, setRowIds] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [status, setStatus] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleClickExport = (event) => setExportMenu(event.currentTarget);

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };


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

    /**
     * Dialog
     */
    const handleEditOpen = () =>  setOpenEditDialog(true);

    const handleEditClose = () => setOpenEditDialog(false);

    const handleDeleteOpen = () =>  setOpenDeleteDialog(true);

    const handleDeleteClose = () => setOpenDeleteDialog(false);

    const handleSelectionOnChange = (params) => setRowIds(params.rowIds);

    const fetchInvoiceTransac= async () => 
    {
        const result = await InvoiceTransactions_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setInvoices(result.data);
        }
    }

    const updateInvoiceStatus = async () => 
    {
        const result = await InvoiceTransactions_.updateAsync({invoice_ids: rowIds});

        if (result.status === 'Error')
        {
            fetchInvoiceTransac();
            setOpenEditDialog(false);

            setAlertSeverity('warning');
            setAlertMessage('Please click the button only one.')
        }
        else 
        {
            setAlertSeverity('success');
            setAlertMessage(result.message)

            fetchInvoiceTransac();
            setOpenEditDialog(false);
        }

        setOpenAlert(true);
    }

    const deleteInvoices = async () => 
    {
        const result = await InvoiceTransactions_.destroyAsync({invoice_ids: rowIds});

        if (result.status === 'Error')
        {
            setAlertSeverity('warning');
            setAlertMessage(result.message);
        }
        else
        {
            let _invoices = [...invoices];

            rowIds.forEach(rowId => {
                _invoices = _invoices.filter(invoice => invoice.id !== parseInt(rowId) )
            });

            setAlertSeverity('success');
            setAlertMessage(result.message);

            setInvoices(_invoices);
            setRowIds([]);
            setOpenDeleteDialog(false);
        }

           setOpenAlert(true);
    }

    const handleExcelExport = () => 
    {
        ExcelExport.generateExcelAsync();

        setAlertSeverity('info');
        setAlertMessage('Invoices exporting.');
        setOpenAlert(true);
        setExportMenu(null);
    }

    const handleCSVExport = () => 
    {
        CSVExport.generateCSVAsync();

        setAlertSeverity('info');
        setAlertMessage('Invoices exporting.');
        setOpenAlert(true);
        setExportMenu(null);
    }


    
    useEffect(() => {
        fetchInvoiceTransac();

        return () => {
            setInvoices([]);
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
            <EditDialog 

                open={openEditDialog} 
                handleClose={handleEditClose} 
                handleAction={updateInvoiceStatus}
                title={'Update status'}
                dialogContentText={'Are you sure you want to update the invoice status?'}
            />
            <DeleteDialog 
                open={openDeleteDialog} 
                handleClose={handleDeleteClose} 
                handleAction={deleteInvoices}
                title={'Delete invoices'}
                dialogContentText={'Are you sure you want to delete the invoices?'}
            />
            <Card>
                <CardContent>
                    <Grid container alignItems='center'>
                        {
                            rowIds.length ? (
                                <>
                                    <Grid item>
                                        <Button 
                                            variant="text" 
                                            color="default" 
                                            className={classes.updateBtn}
                                            onClick={() => handleEditOpen()}
                                        >
                                            <UpdateIcon /> UPDATE STATUS
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button 
                                            variant="text" 
                                            color="default" 
                                            className={classes.deleteBtn}
                                            onClick={() => handleDeleteOpen()}
                                        >
                                            <DeleteIcon /> DELETE
                                        </Button>
                                    </Grid>
                                </>
                            ) 
                            : 
                            (
                                <Grid item>
                                    <Button 
                                        aria-controls="simple-menu" 
                                        aria-haspopup="true" 
                                        onClick={handleClickExport}
                                        variant="text" 
                                        className={classes.btn}
                                    >
                                        Export
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={exportMenu}
                                        keepMounted
                                        open={Boolean(exportMenu)}
                                        onClose={() => setExportMenu(null)}
                                    >
                                        <MenuItem onClick={handleExcelExport}>Excel</MenuItem>
                                        <MenuItem onClick={handleCSVExport}>CSV</MenuItem>
                                    </Menu>
                                </Grid>
                            )
                        }
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ width: '100%' }}>
                <DataGrid 
                    autoHeight
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}

                    rows={invoices} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection 
                    className={classes.dataGrid}
                    onSelectionChange={handleSelectionOnChange}
                />
            </div>
        </>
    )
}

export default InvoiceTransactions
