import React, {useState, useEffect} from 'react';
import * as ProductCategories from '../../../../services/products/categories'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const Categories = () => 
{
    const [categories, setCategories] = useState([]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'name', headerName: 'Name', width: 270 },
    ];
    

    const fetchCategories = async () => 
    {
        const result = await ProductCategories.fetchAllAsync();

        if (result.status === 'Success')
        {
            setCategories(result.data);
        }
    }


    useEffect(() => 
    {
        fetchCategories();

        return () =>  fetchCategories();
    }, []);

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
                                startIcon={<PersonAddIcon />}
                                onClick={() => history.push('/products/create-category')}    
                            >
                                Add Category
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
                    onRowClick={(params) => history.push(`/products/categories/${params.row.id}/edit`)}
                    rows={categories} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default Categories
