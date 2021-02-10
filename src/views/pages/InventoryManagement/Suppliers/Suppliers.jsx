import React from 'react';
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';

const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'contact', headerName: 'Contact', width: 270 },
    { field: 'phone_number', headerName: 'Phone Number', width: 270 },
    { field: 'email', headerName: 'Email', width: 270 },
];

const rows = [
  { id: 1, name: 'Snow', contact: '2%', phone_number: '2%', email: '2%'},
  { id: 2, name: 'Snow', contact: '2%', phone_number: '2%', email: '2%'},
  { id: 3, name: 'Snow', contact: '2%', phone_number: '2%', email: '2%'},
  { id: 4, name: 'Snow', contact: '2%', phone_number: '2%', email: '2%'},
];


const Suppliers = () => {

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
                                startIcon={<AddIcon />}  
                                onClick={() => history.push('/inventory-mngmt/create-supplier')}  
                            >
                                Add Supplier
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
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default Suppliers
