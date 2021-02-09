import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const columns = [
    { field: 'role', headerName: 'Role', width: 250 },
    { field: 'access', headerName: 'Access', width: 250 },
    { field: 'employees', headerName: 'Employees', width: 250 },

];

const rows = [
  { id: 1, role: 'Snow', access: 'Back Office and POS', employees: 10 },
  { id: 2, role: 'Snow', access: 'Back Office and POS', employees: 10 },
  { id: 3, role: 'Snow', access: 'POS', employees: 5 },
  { id: 4, role: 'Snow', access: 'Back Office and POS', employees: 10 },
];


const AccessRights = () => {

    const classes = dataGridUseStyles();

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
                            >
                                Add Role
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default AccessRights
