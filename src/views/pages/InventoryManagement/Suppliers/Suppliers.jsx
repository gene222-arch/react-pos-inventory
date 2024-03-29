import React, {useState, useEffect, lazy} from 'react';
import DeleteDialog from '../../../../components/DeleteDialog'
import * as Suppliers_ from '../../../../services/inventory-management/suppliers'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'contact', headerName: 'Contact', width: 301 },
    { field: 'phone', headerName: 'Phone Number', width: 301 },
    { field: 'email', headerName: 'Email', width: 301 },
];


const Suppliers = () => 
{

    const classes = dataGridUseStyles();
    const history = useHistory();

    const [rowIds, setRowIds] = useState([]);
    const [open, setOpen] = useState(false);

    const[suppliers, setSuppliers] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    }

    /**
     * Dialog
     */
    const handleClickOpen = () =>  setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSelectionOnChange = (params) => setRowIds(params.rowIds);
    

    const fetchSuppliers= async () => 
    {
        const result = await Suppliers_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setSuppliers(result.data);
        }
    }


    const deleteSuppliers = async () => 
    {
        handleClose();

        let _suppliers = [...suppliers];

        rowIds.forEach(rowId => {
            _suppliers = _suppliers.filter(supplier => supplier.id !== parseInt(rowId) )
        });
        
        setSuppliers(_suppliers);

        const result = await Suppliers_.destroyAsync({supplier_ids: rowIds});

        if (result.status === 'Error')
        {
            setAlertSeverity('warning');
            setAlertMessage('Please click the button only once.');
        }
        else
        {
            setAlertSeverity('success');
            setAlertMessage(result.message);

            setOpen(false);
            setRowIds([]);
        }

        setOpenAlert(true);
    }


    useEffect(() => 
    {
        fetchSuppliers();

        return () =>  {
            setSuppliers([]);
            setRowIds([]);
        }
    }, []);


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
                handleAction={deleteSuppliers}
                title={'Delete supplier?'}
                dialogContentText={'Are you sure you want to delete the suppliers'}
            />
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button 
                                variant="contained"
                                color='primary' 
                                className={classes.addBtn}
                                startIcon={<AddIcon />}  
                                onClick={() => history.push('/inventory-mngmt/create-supplier')}  
                            >
                                Add Supplier
                            </Button>
                        </Grid>
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
                                </>
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
                    onRowClick={(params) => history.push(`/inventory-mngmt/suppliers/${params.row.id}/edit`)}
                    rows={suppliers} 
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

export default Suppliers
