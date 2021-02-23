import React, {useState, useEffect} from 'react';
import Loading from '../../../../../components/Loading'
import * as BadOrder_ from '../../../../../services/inventory-management/badOrders'
import * as PurchaseOrder_ from '../../../../../services/inventory-management/purchaseOrders'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { createBadOrdersUseStyles } from '../../../../../assets/material-styles/styles'

const DEFAULT_PROPS = 
{
    purchaseOrder: {
        id: 0,
        ordered_by: '',
        supplier_id: 0,
        supplier: '',
        purchase_order_date: '',
        expected_delivery_date: '',
        total_ordered_quantity: 0,
        total_received_quantity: 0
    },
    items: []
};


const CreateBadOrders = () => 
{
    const classes = createBadOrdersUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const [purchaseOrderId, setPurchaseOrderId] = useState(0);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState(DEFAULT_PROPS);

    const columns = [
        { field: 'id',  hide: true, },
        { field: 'product_id', hide: true },
        { field: 'product_description', headerName: 'Product', width: 250 },
        { field: 'received_quantity', headerName: 'Received quantity', width: 250
        },
        { 
            field: 'defect', 
            headerName: 'Defect', 
            width: 250,
            renderCell: (params) => (
                <TextField
                    value={params.value}
                    onChange={
                        (e) => handleOnChangeDefect(e, params.row)
                    }
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                />
            ),
        },
        { 
            field: 'quantity', 
            headerName: 'Quantity of bad orders', 
            width: 250,
            renderCell: (params) => (
                <TextField
                    value={params.value}
                    onChange={
                        (e) => handleOnChangeQuantity(e, params.row)
                    }
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                />
            ),
        },
        { field: 'purchase_cost', headerName: 'Purchase cost', width: 250,
            valueFormatter: param => param.value.toFixed(2)
        },
        { field: 'amount', headerName: 'Amount', width: 250, 
        valueFormatter: param => param.value.toFixed(2) },
        {
            field: 'delete_action', 
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <Button
                    className={classes.deleteAction} 
                    variant="text" 
                    color="default" 
                    onClick={() => handleOnRemoveProduct(params.row.id)}
                >
                    <DeleteForeverIcon />
                </Button>
            )
        }
    ];
    

    const handleOnChangeQuantity = (e, data) => 
    {
        let noOfItemsToReturn = e.target.value;
        noOfItemsToReturn = parseInt(noOfItemsToReturn) || 0;

        if (noOfItemsToReturn > data.received_quantity)
        {
            alert('Quantity exceeded the received quantity')
        }
        else 
        {
            console.log(data)
            
            const filterData = ({
                ...data,
                quantity: noOfItemsToReturn,
                amount: data.purchase_cost * noOfItemsToReturn
            });

            console.log(filterData);
    
            const po = purchaseOrderDetails.items.map(item => 
                    item.id === filterData.id 
                        ? filterData
                        : item
            );
            
            setPurchaseOrderDetails({...purchaseOrderDetails, items: po});
        }
    };


    const handleOnChangeDefect = (e, data) => 
    {
        let defect = e.target.value;

        console.log(data)
            
        const filterData = ({
            ...data,
            defect: defect
        });

        console.log(filterData);

        const po = purchaseOrderDetails.items.map(item => 
                item.id === filterData.id 
                    ? filterData
                    : item
        );
        
        setPurchaseOrderDetails({...purchaseOrderDetails, items: po});
    };
    
    const handleOnRemoveProduct = (poId) => 
    {
        const newPo = purchaseOrderDetails.items
            .filter(purchaseOrderDetail => purchaseOrderDetail.id !== poId );
        setPurchaseOrderDetails({...purchaseOrderDetails, items: newPo});
    }

    const fetchPurchaseOrders = async () => 
    {
        const result = await PurchaseOrder_.fetchAllFilteredAsync({
            filterBy: 'status',
            operator: '!=',
            filters: [
                'Pending'
            ]
        });

        if (result.status === 'Success')
        {
            setPurchaseOrders(result.data);
            setLoading(false);
        }
    }

    
    const handleOnPurchaseOrder = async (e) => 
    {
        const id = parseInt(e.target.value);
        
        setPurchaseOrderId(id);

        const result = await PurchaseOrder_.fetchToBadOrderAsync({
            purchase_order_id: id 
        })
    
        if (result.status === 'Success')
        {
            setPurchaseOrderDetails(result.data);
        }
    };


    const createBadOrder = async () => 
    {
        const items = purchaseOrderDetails.items.map(purchaseOrderDetail => ({
            purchase_order_details_id: purchaseOrderDetail.id,
            product_id: purchaseOrderDetail.product_id,
            defect: purchaseOrderDetail.defect,
            quantity: purchaseOrderDetail.quantity,
            price: purchaseOrderDetail.purchase_cost,
            unit_of_measurement: purchaseOrderDetail.unit_of_measurement,
            amount: purchaseOrderDetail.amount,
        }))

        const data = {
            purchase_order_id: purchaseOrderId,
            badOrderDetails: items
        };

        const result = await BadOrder_.storeAsync(data)

        if (result.status === 'Success')
        {
            history.push('/inventory-mngmt/bad-orders')
        }
    }

    useEffect(() => {
        fetchPurchaseOrders();

        return () => {
            setPurchaseOrderDetails(DEFAULT_PROPS);
            setPurchaseOrders([]);
        }
    }, []);


    return loading
        ? <Loading />
        : (
        <>
            <Card className={classes.selectPOContainer}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {purchaseOrders.length > 0 
                                ? (
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Purchase order #</InputLabel>
                                            <Select
                                                displayEmpty
                                                className={classes.selectEmpty}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                fullWidth
                                                value={purchaseOrderId}
                                                onChange={handleOnPurchaseOrder}
                                            >
                                                {
                                                    purchaseOrders.map(po => (
                                                        <MenuItem 
                                                            key={po.id}
                                                            value={po.id}>PO{po.id}</MenuItem>
                                                    ))
                                                }
                                        </Select>
                                    </FormControl>
                                )
                                : <Typography
                                    variant="h5" 
                                    color="initial"
                                    className={classes.emptyPurchaseOrdersMessage}
                                >
                                    Purchase order with received items is empty
                                </Typography>

                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        {
            purchaseOrders.length > 0 && (
                    <>
                        <div style={{ width: '100%' }}>
                            <DataGrid 
                                autoHeight
                                showToolbar
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                rows={purchaseOrderDetails.items} 
                                columns={columns} 
                                pageSize={5} 
                                className={classes.dataGrid}
                                rowsPerPageOptions={[5, 10, 20]}
                            />
                        </div>
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.cancelBtn}
                                    onClick={() => history.push('/inventory-mngmt/purchase-orders')}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.addBtn}
                                    onClick={createBadOrder}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
       
                    </>
                )
        }
        </>
    );
}

export default CreateBadOrders
