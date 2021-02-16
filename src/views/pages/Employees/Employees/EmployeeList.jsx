import React, {useState, useEffect} from 'react';
import * as Employees_ from '../../../../services/employees/employees'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const EmployeeList = () => 
{

    const classes = dataGridUseStyles();
    const history = useHistory();

    const [employees, setEmployees] = useState([]);

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

        return () => fetchEmployees();
    }, []);

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
                />
            </div>
        </>
    );
}

export default EmployeeList
