import React, {useState, useEffect, lazy} from 'react';
import * as ExcelExport from '../../../services/exports/excel/customers'
import * as CSVExport from '../../../services/exports/csv/customers'
import DeleteDialog from '../../../components/DeleteDialog'
import * as Customers_ from '../../../services/customers/customers'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));



const Customers = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();
    const [exportMenu, setExportMenu] = useState(null);

    const [rowIds, setRowIds] = useState([]);
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
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
        { field: 'id', hide: true },
        { field: 'customer', headerName: 'Customer', width: 242.5 },
        { field: 'first_visit', headerName: 'First visit', width: 242.5 },
        { field: 'last_visit', headerName: 'Last visit', width: 242.5 },
        { field: 'total_visits', headerName: 'Total visits', width: 242.5 },
        { field: 'total_spent', headerName: 'Total spent', width: 242.5,
            valueFormatter: (params) => params.value.toFixed(2),
        },
    ];

    const handleExcelExport = () => 
    {
        ExcelExport.generateExcelAsync();

        setAlertSeverity('info');
        setAlertMessage('Customer list exporting.');
        setOpenAlert(true);
        setExportMenu(null);
    }

    const handleCSVExport = () => 
    {
        CSVExport.generateCSVAsync();

        setAlertSeverity('info');
        setAlertMessage('Customer list exporting.');
        setOpenAlert(true);
        setExportMenu(null);
    }


    const handleClickOpen = () =>  setOpen(true);

    const handleClose = () => setOpen(false);

    const handleSelectionOnChange = (params) => setRowIds(params.rowIds);

    const fetchCustomers = async () => 
    {
        const result = await Customers_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setCustomers(result.data);
        }
    }

    const deleteCustomers = async () => 
    {
        handleClose();
        const result = await Customers_.destroyAsync({customer_ids: rowIds});

        if (result.status === 'Error')
        {
            setAlertSeverity('warning');
            setAlertMessage('Please click the button only once.');
        }
        else
        {
            let _customers = [...customers];

            rowIds.forEach(rowId => {
                _customers = _customers.filter(customer => customer.id !== parseInt(rowId) )
            });

            setAlertSeverity('success');
            setAlertMessage(result.message);

            setCustomers(_customers);
            setOpen(false);
            setRowIds([]);
        }

        setOpenAlert(true);
    }

    useEffect(() => {
        fetchCustomers();

        return () => {
            setCustomers([]);
            setRowIds([]);
        }
    }, [])

    return (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
            <DeleteDialog 
                open={open} 
                handleClose={handleClose} 
                handleAction={deleteCustomers}
                title={'Delete customers?'}
                dialogContentText={'Are you sure you want to delete the customers'}
            />
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Grid container>
                                <Grid item>
                                    <Button 
                                        variant="contained"
                                        color='primary' 
                                        className={classes.addBtn}
                                        startIcon={<AddIcon />}
                                        onClick={() => history.push('/create-customer')}    
                                    >
                                        Add Customer
                                    </Button>
                                </Grid>
                                <Grid item>
                                {
                                    rowIds.length ? (
                                        <Button 
                                            variant="text" 
                                            color="default" 
                                            className={classes.deleteBtn}
                                            onClick={() => handleClickOpen()}
                                        >
                                            <DeleteIcon /> DELETE
                                        </Button>
                                        ) 
                                        : 
                                        (
                                            <>
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
                                            </>
                                        )
                                }
                                </Grid>
                            </Grid>
                        </Grid>
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
                    onRowClick={ (param) => history.push(`/customers/${param.row.id}/edit`)}
                    rows={customers} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection 
                    onSelectionChange={handleSelectionOnChange}
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default Customers
