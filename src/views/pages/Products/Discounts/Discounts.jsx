import React, {useState, useEffect} from 'react';
import * as ProductDiscounts from '../../../../services/products/discounts'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'



const Discounts = () => 
{

    const classes = dataGridUseStyles();
    const history = useHistory();

    const [discounts, setDiscounts] = useState([]);

    const columns = [
        { field: 'name', headerName: 'Percentage', width: 300 },
        { field: 'percentage', headerName: 'Percentage', width: 270 }
    ];


    
    const fetchDiscounts = async () => 
    {
        const result = await ProductDiscounts.fetchAllAsync();

        if (result.status === 'Success')
        {
            setDiscounts(result.data);
        }
    }


    useEffect(() => {
        fetchDiscounts();

        return () => fetchDiscounts();
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
                                startIcon={<AddIcon />}    
                                onClick={() => history.push('/products/create-discount')}
                            >
                                Add Discount
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
                    onRowClick={(params) => history.push(`/products/discounts/${params.row.id}/edit`)}
                    rows={discounts} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default Discounts
