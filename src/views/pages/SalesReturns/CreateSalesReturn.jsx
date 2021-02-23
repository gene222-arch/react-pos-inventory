import React, {useState, useEffect} from 'react';
import {TAX_RATE} from '../../../config/accounting'
import Loading from '../../../components/Loading'
import * as SalesReturn_ from '../../../services/sales-returns/salesReturn'
import * as POS_ from '../../../services/pos/pos'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { createBadOrdersUseStyles } from '../../../assets/material-styles/styles'

const DEFAULT_PROPS = 
{
    pos: {
        id: 0,
        cashier: '',
        purchased_at: '',
    },
    items: []
};


const CreateSalesReturn = () => 
{
    const classes = createBadOrdersUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [posId, setPosId] = useState(0);
    const [customerOrderList, setCustomerOrderList] = useState([]);
    const [customerOrderDetails, setCustomerOrderDetails] = useState(DEFAULT_PROPS);

    const columns = [
        { field: 'id',  hide: true, },
        { field: 'product_id', hide: true },
        { field: 'product_description', headerName: 'Product', width: 200 },
        { field: 'ordered_quantity', headerName: 'Quantity ordered', width: 200
        },
        { 
            field: 'defect', 
            headerName: 'Defect', 
            width: 200,
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
            headerName: 'Quantity', 
            width: 150,
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
        {field: 'unit_of_measurement', headerName: 'Sold by', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {field: 'sub_total', headerName: 'Sub total', width: 150},
        {field: 'discount', headerName: 'Discount', width: 150},
        {field: 'tax', headerName: 'Tax', width: 150},
        { field: 'total', headerName: 'Total', width: 150},
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
        const {price, ordered_quantity, discount} = data;
        noOfItemsToReturn = parseInt(noOfItemsToReturn) || 0;

        if (noOfItemsToReturn > ordered_quantity)
        {
            alert('Quantity exceeded the number of items ordered')
        }
        else 
        {
            const subTotal = (parseFloat(price) * noOfItemsToReturn).toFixed(2);
            const tax = (subTotal * TAX_RATE).toFixed(2);
            const total = ((parseFloat(price) * noOfItemsToReturn) + ((parseFloat(price) * noOfItemsToReturn) * TAX_RATE) - discount).toFixed(2);

            const filterData = ({
                ...data,
                quantity: noOfItemsToReturn,
                sub_total: subTotal,
                tax: tax,
                total: total
            });
            console.log(filterData)

            const newOrderDetails = customerOrderDetails.items.map(item => 
                    item.id === filterData.id 
                        ? filterData
                        : item
            );
            
            setCustomerOrderDetails({...customerOrderDetails, items: newOrderDetails});
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

        const newOrderDetails = customerOrderDetails.items.map(item => 
                item.id === filterData.id 
                    ? filterData
                    : item
        );
        
        setCustomerOrderDetails({...customerOrderDetails, items: newOrderDetails});
    };
    
    const handleOnRemoveProduct = (customerOrderId) => 
    {
        const newPo = customerOrderDetails.items
            .filter(orderDetail => orderDetail.id !== customerOrderId );

        setCustomerOrderDetails({...customerOrderDetails, items: newPo});
    }

    const fetchCustomerOrders = async () => 
    {
        const result = await POS_.fetchAllFilteredAsync({
            filters: ['id']
        });

        if (result.status === 'Success')
        {
            setCustomerOrderList(result.data);
            setLoading(false);
        }

    }

    const handleOnPurchaseOrder = async (e) => 
    {
        const id = parseInt(e.target.value);
        
        setPosId(id);

        const result = await POS_.fetchToSalesReturnAsync({
            pos_id: id 
        })
    
        if (result.status === 'Success')
        {
            setCustomerOrderDetails(result.data);
        }
    };

    const createSalesReturn = async () => 
    {
        const result = await SalesReturn_.storeAsync(validateData())

        if (result.status === 'Success')
        {
            history.push('/sales-returns')
        }
    }

    const validateData = () => 
    {
        const items = customerOrderDetails.items.map(order => ({
            pos_details_id: order.id,
            product_id: order.product_id,
            defect: order.defect,
            quantity: order.quantity,
            price: order.price,
            tax: order.tax,
            sub_total: order.sub_total,
            total: order.total,
            discount: order.discount,
            unit_of_measurement: order.unit_of_measurement,
            amount: order.amount,
        }))

        return {
            pos_id: posId,
            posSalesReturnDetails: items
        };
    }


    useEffect(() => {
        fetchCustomerOrders();

        return () => {
            setCustomerOrderDetails(DEFAULT_PROPS);
            setCustomerOrderList([]);
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
                            {customerOrderList.length > 0 
                                ? (
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Customer order #</InputLabel>
                                            <Select
                                                displayEmpty
                                                className={classes.selectEmpty}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                fullWidth
                                                value={posId}
                                                onChange={handleOnPurchaseOrder}
                                            >
                                                {
                                                    customerOrderList.map(co => (
                                                        <MenuItem 
                                                            key={co.id}
                                                            value={co.id}>CO{co.id}</MenuItem>
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
                                    Customers has yet to order.
                                </Typography>

                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        {
            customerOrderList.length > 0 && (
                    <>
                        <div style={{ width: '100%' }}>
                            <DataGrid 
                                autoHeight
                                showToolbar
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                rows={customerOrderDetails.items} 
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
                                    onClick={createSalesReturn}
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

export default CreateSalesReturn
