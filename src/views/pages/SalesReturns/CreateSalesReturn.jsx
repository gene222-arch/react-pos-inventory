import React, {useState, useEffect, lazy} from 'react';
import { CURRENCY } from './../../../config/currency';
import {TAX_RATE} from '../../../config/accounting'
import Loading from '../../../components/Loading'
import * as SalesReturn_ from '../../../services/sales-returns/salesReturn'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { createBadOrdersSalesReturnUseStyles } from '../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));



const DEFECTS = [
    'Manufacturing Defects.',
    'Design Defects',
    'Marketing Defects'
];
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
    const classes = createBadOrdersSalesReturnUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const [posId, setPosId] = useState(0);
    const [customerOrderList, setCustomerOrderList] = useState([]);
    const [customerOrderDetails, setCustomerOrderDetails] = useState(DEFAULT_PROPS);
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
                <>
                    <Grid container alignItems='center'>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl 
                                className={classes.formControl}
                                error={Boolean(params.value === '')}
                            >
                                    <Select
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        fullWidth
                                        value={params.value}
                                        onChange={(e) => handleOnChangeDefect(e, params.row)}
                                    >
                                        {
                                            DEFECTS.map((defect, index) => (
                                                <MenuItem 
                                                    key={index}
                                                    value={defect}
                                                >
                                                    {defect}
                                                </MenuItem>
                                            ))
                                        }
                                </Select>
                            </FormControl>
                
                        </Grid>
                    </Grid>
                </>
            ),
        },
        { 
            field: 'quantity', 
            headerName: 'Quantity', 
            width: 150,
            renderCell: (params) => (
                <TextField
                    error={Boolean(params.value <= 0) || !Number.isInteger(params.value)}
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

        const ordered_quantity = data.ordered_quantity;
        const price = parseFloat((data.price).replaceAll(',', ''));
        const discount = parseFloat(data.discount);
        
        noOfItemsToReturn = parseInt(noOfItemsToReturn) || 0;

        if (!Number.isInteger(noOfItemsToReturn))
        {
            setAlertSeverity('error');
            setAlertMessage('Please input a valid number.');
            setOpenAlert(true);
        }
        else 
        {
            if (noOfItemsToReturn > ordered_quantity)
            {
                setAlertSeverity('error');
                setAlertMessage('Quantity can\'t exceed the ordered quantity.');
                setOpenAlert(true);
            }
            else 
            {
                const subTotal = (price * noOfItemsToReturn);
                const tax = (subTotal * TAX_RATE);
                const total = ((subTotal + tax) - discount);

                const filterData = ({
                    ...data,
                    quantity: noOfItemsToReturn,
                    sub_total: subTotal,
                    tax: tax,
                    total: total <= 0 ? 0.00 : total
                });

                const newOrderDetails = customerOrderDetails.items.map(item => 
                        item.id === filterData.id 
                            ? filterData
                            : item
                );
                
                setCustomerOrderDetails({...customerOrderDetails, items: newOrderDetails});
            }
        }
    };

    const handleOnChangeDefect = (e, data) => 
    {
        let defect = e.target.value;

        if (defect.match('/^[a-z][a-z\s]*$/'))
        {
            setAlertSeverity('error');
            setAlertMessage('Letters and spaces only');
        }
        else 
        {
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
        }
    };
    
    const handleOnRemoveProduct = (customerOrderId) => 
    {
        const newPo = customerOrderDetails.items
            .filter(orderDetail => orderDetail.id !== customerOrderId );

        setCustomerOrderDetails({...customerOrderDetails, items: newPo});
    }

    const fetchCustomerOrders = async () => 
    {
        const result = await SalesReturn_.fetchAllCustomerOrdersAsync();

        if (result.status === 'Success')
        {
            setCustomerOrderList(result.data);
        }

        setLoadingData(false);
    }

    const handleOnPurchaseOrder = async (e) => 
    {
        const id = parseInt(e.target.value);
        
        setPosId(id);

        if (!id)
        {
            setCustomerOrderDetails(DEFAULT_PROPS);
        }
        else 
        {
            const result = await SalesReturn_.fetchCustomerOrderAsync({
                pos_id: id 
            })
        
            if (result.status === 'Success')
            {
                setCustomerOrderDetails(result.data);
            }
        }
    };

    const createSalesReturn = async () => 
    {
        if (!determineIsOrderSelected())
        {
            setAlertSeverity('error');
            setAlertMessage('Please select a customer order.');
        }
        else 
        {
            setLoading(true);
            const result = await SalesReturn_.storeAsync(validateData())
    
            if (result.status === 'Error')
            {
                setAlertSeverity('error');
            }
            else 
            {
                setAlertSeverity('success');
                setAlertMessage(result.message);
                setTimeout(() => history.push('/sales-returns'), 2000);
            }
    
            setTimeout(() => setLoading(false), 2000);
        }
        setOpenAlert(true);
    }

    const validateData = () => 
    {
        const items = customerOrderDetails.items
            .map(order => ({
                pos_details_id: order.id,
                product_id: order.product_id,
                defect: order.defect,
                quantity: order.quantity,
                price: parseFloat((order.price).replaceAll(',', '')),
                tax: order.tax,
                sub_total: order.sub_total,
                total: order.total,
                discount: order.discount,
                unit_of_measurement: order.unit_of_measurement,
                amount: order.amount,
            }));

        return {
            pos_id: posId,
            posSalesReturnDetails: items
        };
    }

    const determineIsOrderSelected = () => Boolean(posId);

    useEffect(() => {
        fetchCustomerOrders();

        return () => {
            setCustomerOrderDetails(DEFAULT_PROPS);
            setCustomerOrderList([]);
            setPosId(0);
        }
    }, []);


    return loadingData
        ? <Loading />
        : (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />

            <Card className={classes.selectPOContainer}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {customerOrderList.length > 0 && !loadingData
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
                                                <MenuItem key={0} value={0}>Select customer order #</MenuItem>
                                                {
                                                    customerOrderList.map((co, index) => (
                                                        <MenuItem 
                                                            key={co.id}
                                                            value={co.id}>CO{co.id}
                                                        </MenuItem>
                                                        
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
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h4" color="initial" align='right'>{
                                            `${CURRENCY} ${
                                                !(customerOrderDetails.items.length > 0) 
                                                ? (0).toFixed(2)
                                                : (customerOrderDetails
                                                    .items
                                                    .map(co => parseFloat(co.total))
                                                    .reduce((total, cur) => total + cur, 0)).toFixed(2)
                                            }`
                                        }</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.cancelBtn}
                                    onClick={() => history.push('/sales-returns')}
                                    disabled={loading}
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
                                    disabled={loading}
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
