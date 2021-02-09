import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const columns = [
    { field: 'name', headerName: 'Name', width: 270 },
    { field: 'products', headerName: 'Products', width: 270 }

];

const rows = [
  { id: 1, name: 'Snow', products: 2},
  { id: 2, name: 'Snow', products: 2},
  { id: 3, name: 'Snow', products: 2},
  { id: 4, name: 'Snow', products: 2},
];


const Categories = () => {

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
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default Categories
