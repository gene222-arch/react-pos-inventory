import React, {useState, useEffect, lazy} from 'react';
import DeleteDialog from '../../../../components/DeleteDialog'
import * as Employees_ from '../../../../services/employees/employees'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));



const EmployeeList = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [rowIds, setRowIds] = useState([]);
    const [open, setOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
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


    const handleClickOpen = () =>  setOpen(true);

    const handleClose = () => setOpen(false);

    const handleSelectionOnChange = (params) => setRowIds(params.rowIds);
    
    const deleteEmployees = async () => 
    {
        const result = await Employees_.destroyAsync({employee_ids: rowIds});

        if (result.status === 'Error')
        {
            setAlertSeverity('warning');
            setAlertMessage('Please click the button only once.');
        }
        else
        {
            let _employees = [...employees];

            rowIds.forEach(rowId => {
                _employees = _employees.filter(employee => employee.id !== parseInt(rowId) )
            });

            setAlertSeverity('success');
            setAlertMessage(result.message);

            setEmployees(_employees);
            setOpen(false);
            setRowIds([]);
        }

        setOpenAlert(true);
    }


    const columns = [
        { field: 'id', hide: true },
        { field: 'name', headerName: 'Name', width: 270 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 250 },
        { field: 'role', headerName: 'Role', width: 200 },
    ];


    const fetchEmployees = async () => 
    {
        const result = await Employees_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setEmployees(result.data);
        }
    }



    useEffect(() => {
        fetchEmployees();

        return () => {
            setEmployees([]);
            setRowIds([]);
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
            <DeleteDialog 
                open={open} 
                handleClose={handleClose} 
                handleAction={deleteEmployees}
                title={'Delete employees?'}
                dialogContentText={'Are you sure you want to delete the employees'}
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
                                onClick={() => history.push('/create-employee')}
                            >
                                Add Employee
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
                                    <Button variant="text" className={classes.btn}> Export </Button>
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
                    onRowClick={(params) => history.push(`/employees/${params.row.id}/edit`)}
                    rows={employees} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                    rowsPerPageOptions={[5, 10, 20]}
                    onSelectionChange={handleSelectionOnChange}
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default EmployeeList
