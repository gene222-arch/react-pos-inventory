import React from 'react';
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const columns = [
    { field: 'name', headerName: 'Name', width: 270 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 200 },

];

const rows = [
  { id: 1, name: 'Snow', email: 'test@yahoo.com', role: 'Administrator' },
  { id: 2, name: 'Snow', email: 'test@yahoo.com', role: 'Cashier' },
  { id: 3, name: 'Snow', email: 'test@yahoo.com', role: 'Administrator' },
  { id: 4, name: 'Snow', email: 'test@yahoo.com', role: 'Administrator' },
];


const EmployeeList = () => {

    const classes = dataGridUseStyles();
    const history = useHistory();

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Button 
                                variant="contained"
                                color='primary' 
                                className={classes.addBtn}
                                startIcon={<PersonAddIcon />} 
                                onClick={() => history.push('/create-employee')}
                            >
                                Add Employee
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(params) => history.push(`/employees/${params.row.id}/edit`)}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default EmployeeList
