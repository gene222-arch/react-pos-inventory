import React from 'react';
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'value', headerName: 'Value', width: 270 }

];

const rows = [
  { id: 1, name: 'Snow', value: '2%'},
  { id: 2, name: 'Snow', value: '2%'},
  { id: 3, name: 'Snow', value: '2%'},
  { id: 4, name: 'Snow', value: '2%'},
];


const Discounts = () => {

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
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default Discounts
