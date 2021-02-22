import React, {useState, useEffect} from 'react';
import * as BadOrder_ from '../../../../../services/inventory-management/badOrders'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { dataGridUseStyles } from '../../../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';


const BadOrderList = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();

    const [badOrders, setBadOrders] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Bad order #', width: 173},
        { field: 'created_by', headerName: 'Created by', width: 230},
        { field: 'supplier', headerName: 'Supplier', width: 230 },
        { field: 'purchase_return', headerName: 'Purchase return', width: 210 },
        { field: 'no_of_items', headerName: 'Number of items', width: 210 },
        { field: 'purchase_order_date', headerName: 'Purchase order date', width: 200 },
    ];


    const fetchAllBadOrders = async () => 
    {
        const result = await BadOrder_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setBadOrders(result.data);
        }
    }


    useEffect(() => {
        fetchAllBadOrders();
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
                                        onClick={() => history.push('/inventory-mngmt/create-bad-order')}  
                                    >
                                        Add Bad Order
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
                    onRowClick={(param) => history.push(`/inventory-mngmt/bad-order-details/${param.row.id}`)}
                    rows={badOrders} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default BadOrderList
