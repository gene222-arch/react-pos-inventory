import React, {useState, useEffect} from 'react';
import DeleteDialog from '../../../components/DeleteDialog'
import * as Customers_ from '../../../services/customers/customers'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const Customers = () => 
{

    const classes = dataGridUseStyles();
    const history = useHistory();

    const [rowIds, setRowIds] = useState([]);
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'customer', headerName: 'Customer', width: 335 },
        { field: 'first_visit', headerName: 'First visit', width: 200 },
        { field: 'last_visit', headerName: 'Last visit', width: 200 },
        { field: 'total_visits', headerName: 'Total visits', width: 200 },
        { field: 'total_spent', headerName: 'Total spent', width: 200,
            valueFormatter: (params) => `P ${params.value.toFixed(2)}`,
        },
    ];

    const handleClickOpen = () =>  setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSelectionOnChange = (params) => setRowIds(params.rowIds);

    const fetchCustomers = async () => 
    {
        const result = await Customers_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setCustomers(result.data);
        }
    }

    const deleteCustomers = async () => 
    {
        const result = await Customers_.destroyAsync({customer_ids: rowIds});

        if (result.status === 'Success')
        {
            let _customers = [...customers];

            rowIds.forEach(rowId => {
                _customers = _customers.filter(customer => customer.id !== parseInt(rowId) )
            });

            setCustomers(_customers);
            setOpen(false);
            setRowIds([]);
        }
    }

    useEffect(() => {
        fetchCustomers();

        return () => {
            setCustomers([]);
        }
    }, [])

    return (
        <>
            <DeleteDialog 
                open={open} 
                handleClose={handleClose} 
                handleAction={deleteCustomers}
                title={'Delete customers?'}
                dialogContentText={'Are you sure you want to delete the customers'}
            />
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
                                        startIcon={<AddIcon />}
                                        onClick={() => history.push('/create-customer')}    
                                    >
                                        Add Customer
                                    </Button>
                                </Grid>
                                <Grid item>
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
                            </Grid>
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
                    onRowClick={ (param) => history.push(`/customers/${param.row.id}/edit`)}
                    rows={customers} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection 
                    onSelectionChange={handleSelectionOnChange}
                />
            </div>
        </>
    );
}

export default Customers
