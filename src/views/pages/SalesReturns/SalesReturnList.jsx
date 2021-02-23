import React, {useState, useEffect} from 'react';
import * as SalesReturn_ from '../../../services/sales-returns/salesReturn.js'
import { NavLink, useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';


const SalesReturnList = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [salesReturns, setSalesReturns] = useState([]);

    const columns = [
        { field: 'id', hide: true},
        { field: 'customer', headerName: 'Customer', width: 270 },
        { field: 'purchased_at', headerName: 'Date of purchase', width: 250 },
        { field: 'no_of_items', headerName: 'Number of items', width: 240 },
        { field: 'sales_return', headerName: 'Sales return', width: 240 },
        { field: 'returned_at', headerName: 'Date of return', width: 250 },
    ];


    const fetchSalesReturns = async () => 
    {
        const result = await SalesReturn_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setSalesReturns(result.data);
        }
    }


    useEffect(() => {
        fetchSalesReturns();

        return () => {
            setSalesReturns([]);
        }
    }, []);

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
                                        startIcon={<AddIcon />}  
                                        onClick={() => history.push('/create-sales-return')}  
                                    >
                                        Add Sales Return
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
            <div style={{ width: '100%' }}>
                <DataGrid 
                    autoHeight
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(param) => history.push(`/sales-return-details/${param.row.id}`)}
                    rows={salesReturns} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default SalesReturnList
