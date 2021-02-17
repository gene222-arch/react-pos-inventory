import React, {useState, useEffect} from 'react';
import DeleteDialog from '../../../../components/DeleteDialog'
import * as Categories_ from '../../../../services/products/categories'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'


const Categories = () => 
{
    const [rowIds, setRowIds] = useState([]);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'name', headerName: 'Name', width: 270 },
    ];

    /**
     * Dialog
     */
    const handleClickOpen = () =>  setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSelectionOnChange = (params) => setRowIds(params.rowIds);
    

    const fetchCategories = async () => 
    {
        const result = await Categories_.fetchAllAsync();
        console.log(result.data);
        if (result.status === 'Success')
        {
            setCategories(result.data);
        }
    }

    const deleteCategories = async () => 
    {
        const result = await Categories_.destroyAsync({category_ids: rowIds});

        if (result.status === 'Success')
        {
            let _categories = [...categories];

            rowIds.forEach(rowId => {
                _categories = _categories.filter(category => category.id !== parseInt(rowId) )
            });

            setCategories(_categories);
            setOpen(false);
            setRowIds([]);
        }
    }
    


    useEffect(() => 
    {
        fetchCategories();

        return () =>  {
            setCategories([]);
            setRowIds([]);
        }
    }, []);

    const classes = dataGridUseStyles();
    const history = useHistory();

    return (
        <>
            <DeleteDialog 
                open={open} 
                handleClose={handleClose} 
                handleAction={deleteCategories}
                title={'Delete categories?'}
                dialogContentText={'Are you sure you want to delete the categories'}
            />
            <Card>
                <CardContent>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item>
                            <Button 
                                variant="contained"
                                color='primary' 
                                className={classes.addBtn}
                                startIcon={<AddIcon />}
                                onClick={() => history.push('/products/create-category')}    
                            >
                                Add Category
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
                                    <>
                                    </>
                                )
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ width: '100%' }}>
                <DataGrid 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(params) => history.push(`/products/categories/${params.row.id}/edit`)}
                    rows={categories} 
                    columns={columns} 
                    autoHeight
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection 
                    onSelectionChange={handleSelectionOnChange}
                />
            </div>
        </>
    );
}

export default Categories
