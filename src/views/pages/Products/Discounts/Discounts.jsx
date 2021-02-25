import React, {useState, useEffect} from 'react';
import DeleteDialog from '../../../../components/DeleteDialog'
import * as ProductDiscounts from '../../../../services/products/discounts'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataGridUseStyles } from '../../../../assets/material-styles/styles'



const Discounts = () => 
{

    const classes = dataGridUseStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [rowIds, setRowIds] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    const columns = [
        { field: 'name', headerName: 'Percentage', width: 300 },
        { field: 'percentage', headerName: 'Percentage', width: 270 }
    ];

    /**
     * Dialog
     */
    const handleClickOpen = () =>  setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSelectionOnChange = (params) => setRowIds(params.rowIds);

    const fetchDiscounts = async () => 
    {
        const result = await ProductDiscounts.fetchAllAsync();

        if (result.status === 'Success')
        {
            setDiscounts(result.data);
        }
    }


    const deleteDiscounts = async () => 
    {
        const result = await ProductDiscounts.destroyAsync({discount_ids: rowIds});

        if (result.status === 'Success')
        {
            let _discounts = [...discounts];

            rowIds.forEach(rowId => {
                _discounts = _discounts.filter(discount => discount.id !== parseInt(rowId) )
            });

            setDiscounts(_discounts);
            setOpen(false);
            setRowIds([]);
        }
    }


    useEffect(() => {
        fetchDiscounts();

        return () => {
            setDiscounts([]);
            setRowIds([]);
        };
    }, []);


    return (
        <>
            <DeleteDialog 
                open={open} 
                handleClose={handleClose} 
                handleAction={deleteDiscounts}
                title={'Delete discounts?'}
                dialogContentText={'Are you sure you want to delete the discounts'}
            />
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item>
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
                    onRowClick={(params) => history.push(`/products/discounts/${params.row.id}/edit`)}
                    rows={discounts} 
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

export default Discounts
