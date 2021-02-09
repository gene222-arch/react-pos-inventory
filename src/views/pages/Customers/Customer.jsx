import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search'


const columns = [
    { field: 'customer', headerName: 'Customer', width: 130 },
    { field: 'first_visit', headerName: 'First visit', width: 130 },
    { field: 'last_visit', headerName: 'Last visit', width: 130 },
    { field: 'total_visits', headerName: 'Total visits', width: 130 },
    { field: 'total_spent', headerName: 'Total spent', width: 130 },

];

const rows = [
  { id: 1, customer: 'Snow', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: 35 },
  { id: 2, customer: 'Lannister', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: 42 },
  { id: 3, customer: 'Lannister', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: 45 },
  { id: 4, customer: 'Stark', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: 16 },
  { id: 5, customer: 'Targaryen', first_visit: '2021', last_visit: '2021', total_visits: 12,  total_spent: null },
];


const useStyles = makeStyles((theme) => ({
    addCustomerBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#4caf50',
        color: '#FFF',
        fontWeight: '600'
    },
    btn: {
        margin: theme.spacing(1, 1, 1, 0),
    },
    searchField: {
        margin: theme.spacing(1),
        width: '100%'
    }
  }));



const Customers = () => {

    const classes = useStyles();

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Grid container>
                                <Grid item xs={12} sm={5} md={4} lg={4}>
                                    <Button 
                                        variant="contained"
                                        color='primary' 
                                        className={classes.addCustomerBtn}
                                        startIcon={<PersonAddIcon />}    
                                    >
                                        Add Customer
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={7} lg={8}>
                                    <Button variant="text" className={classes.btn}> Import </Button>
                                    <Button variant="text" className={classes.btn}> Export </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <SearchIcon />
                                </Grid>
                                <Grid item xs={10} sm={10} md={10} lg={10}>
                                    <TextField id="input-with-icon-grid" label="Search" className={classes.searchField}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
        </>
    );
}

export default Customers
