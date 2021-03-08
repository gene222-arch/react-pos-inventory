import React, {useState, useEffect, lazy} from 'react';
import DeleteDialog from '../../../../components/DeleteDialog'
import {useHistory} from 'react-router-dom'
import * as AccessRights_ from '../../../../services/employees/accessRights'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const columns = [
    { field: 'id', hide: true, },
    { field: 'role', headerName: 'Role', width: 250, },
    { field: 'access', headerName: 'Access', width: 250, },
    { field: 'employees', headerName: 'Employees', width: 250, },
];



const AccessRights = () => 
{
    const history = useHistory();
    const classes = dataGridUseStyles();

    const [rowIds, setRowIds] = useState([]);
    const [accessRights, setAccessRights] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
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

    const handleClickOpen = () =>  setOpenDialog(true);

    const handleClose = () => setOpenDialog(false);

    const handleSelectionOnChange = (params) => setRowIds(params.rowIds);


    const fetchAccessRights = async () => 
    {
        const result = await AccessRights_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setAccessRights(result.data);
            console.log(result.data)
        }
    }


    const deleteAccessRights = async () => 
    {
        handleClose();
        const roleHasEmployees = accessRights.filter(accessRight => accessRight.emloyees > 0);

        if (roleHasEmployees)
        {
            setAlertSeverity('warning');
            setAlertMessage('Unable to delete a role if at least one employee was assigned to it.');
        }
        else 
        {
            const result = await AccessRights_.destroyAsync({access_right_ids: rowIds});

            if (result.status === 'Error')
            {
                setAlertSeverity('warning');
                setAlertMessage(result.message['access_right_ids.0'][0]);
            }
            else
            {
                let _accessRights = [...accessRights];
    
                rowIds.forEach(rowId => {
                    _accessRights = _accessRights.filter(accessRight => accessRight.id !== parseInt(rowId) )
                });
    
                setAlertSeverity('success');
                setAlertMessage(result.message);
    
                setAccessRights(_accessRights);
                setRowIds([]);
            }
        }

        setOpenAlert(true);
    }


    useEffect(() => {
        fetchAccessRights();

        return () => {
            setAccessRights([]);
        };
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
                open={openDialog} 
                handleClose={handleClose} 
                handleAction={deleteAccessRights}
                title={'Delete access rights'}
                dialogContentText={'Are you sure you want to delete the access rights?'}
            />
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Button 
                                variant="contained"
                                color='primary' 
                                className={classes.addBtn}
                                startIcon={<AddIcon />}  
                                onClick={() => history.push('/employees/create-access-right')}  
                            >
                                Add Role
                            </Button>
                            {
                                rowIds.length > 0 && (
                                    <Button 
                                        variant="text" 
                                        color="default" 
                                        className={classes.deleteBtn}
                                        onClick={() => handleClickOpen()}
                                    >
                                        <DeleteIcon /> DELETE
                                    </Button>
                                ) 
                            }
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
                    onRowClick={(params) => history.push(`/employees/access-right/${params.row.id}/edit`)}
                    rows={accessRights} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                    onSelectionChange={handleSelectionOnChange}
                />
            </div>
        </>
    );
}

export default AccessRights
