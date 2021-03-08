import React, {useState, useEffect, lazy} from 'react';
import DeleteDialog from '../../../../components/DeleteDialog'
import * as Categories_ from '../../../../services/products/categories'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));



const Categories = () => 
{
    const [rowIds, setRowIds] = useState([]);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };


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

        if (result.status === 'Success')
        {
            setCategories(result.data);
        }
    }

    const deleteCategories = async () => 
    {
        handleClose();
        const result = await Categories_.destroyAsync({category_ids: rowIds});

        if (result.status === 'Error')
        {
            setAlertSeverity('warning');
            setAlertMessage('Please click the button only once.');
        }
        else
        {
            let _categories = [...categories];

            rowIds.forEach(rowId => {
                _categories = _categories.filter(category => category.id !== parseInt(rowId) )
            });

            setAlertSeverity('success');
            setAlertMessage('Products deleted successfully.');

            setCategories(_categories);
            setOpen(false);
            setRowIds([]);
        }

        setOpenAlert(true);
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
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
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
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default Categories
