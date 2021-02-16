import React, {useState, useEffect} from 'react';
import * as Customers_ from '../../../services/customers/customers'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const Customers = () => 
{

    const classes = dataGridUseStyles();
    const history = useHistory();

    const [customers, setCustomers] = useState([]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'customer', headerName: 'Customer', width: 335 },
        { field: 'first_visit', headerName: 'First visit', width: 200 },
        { field: 'last_visit', headerName: 'Last visit', width: 200 },
        { field: 'total_visits', headerName: 'Total visits', width: 200 },
        { field: 'total_spent', headerName: 'Total spent', width: 200,
            valueFormatter: (params) => `P ${params.value}`,
        },
    ];

        
    const fetchCustomers = async () => 
    {
        const result = await Customers_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setCustomers(result.data);
        }
    }


    useEffect(() => {
        fetchCustomers();

        return () => fetchCustomers();
    }, [])

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
                    onRowClick={ (param) => history.push(`/customers/${param.row.id}/edit`)}
                    rows={customers} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default Customers
