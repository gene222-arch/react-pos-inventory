import React from 'react';
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const columns = [
    { field: 'customer', headerName: 'Customer', width: 335 },
    { field: 'first_visit', headerName: 'First visit', width: 200 },
    { field: 'last_visit', headerName: 'Last visit', width: 200 },
    { field: 'total_visits', headerName: 'Total visits', width: 200 },
    { field: 'total_spent', headerName: 'Total spent', width: 200 },
];

const rows = [
  { id: 1, customer: 'Snow', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: 35 },
  { id: 2, customer: 'Lannister', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: 42 },
  { id: 3, customer: 'Lannister', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: 45 },
  { id: 4, customer: 'Stark', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: 16 },
  { id: 5, customer: 'Targaryen', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: null },
];


const Customers = () => {

    const classes = dataGridUseStyles();
    const history = useHistory();

    return (
        <>
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
                                        startIcon={<PersonAddIcon />}
                                        onClick={() => history.push('/create-customer')}    
                                    >
                                        Add Customer
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="text" className={classes.btn}> Import </Button>
                                    <Button variant="text" className={classes.btn}> Export </Button>
                                </Grid>
                            </Grid>
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

export default Customers
