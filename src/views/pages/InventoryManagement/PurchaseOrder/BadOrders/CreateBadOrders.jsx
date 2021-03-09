import React, {useState, useEffect, lazy} from 'react';
import Loading from '../../../../../components/Loading'
import * as BadOrder_ from '../../../../../services/inventory-management/badOrders'
import * as PurchaseOrder_ from '../../../../../services/inventory-management/purchaseOrders'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { createBadOrdersSalesReturnUseStyles } from '../../../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../../../components/AlertMessages/AlertPopUpMessage'));



const DEFECTS = [
    'Manufacturing Defects.',
    'Design Defects',
    'Marketing Defects'
];

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
    const classes = createBadOrdersSalesReturnUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const [purchaseOrderId, setPurchaseOrderId] = useState(0);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [purchaseOrderDetails, setPurchaseOrderDetails] = useState(DEFAULT_PROPS);
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
        { field: 'received_quantity', headerName: 'Received quantity', width: 200
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
            headerName: 'Quantity of bad orders', 
            width: 200,
            renderCell: (params) => (
                <TextField
                    margin='none'
                    error={Boolean(params.value <= 0) || !Number.isInteger(params.value)}
                    value={params.value}
                    onChange={
                        (e) => handleOnChangeQuantity(e, params.row)
                    }
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                />
            ),
        },
        { field: 'purchase_cost', headerName: 'Purchase cost', width: 160,
            valueFormatter: param => param.value.toFixed(2)
        },
        { field: 'amount', headerName: 'Amount', width: 150, 
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

        if (!Number.isInteger(noOfItemsToReturn))
        {
            setAlertSeverity('error');
            setAlertMessage('Please input a valid number.');
            setOpenAlert(true);
        }
        else 
        {
            if (noOfItemsToReturn > data.received_quantity)
            {
                setAlertSeverity('error');
                setAlertMessage('Quantity can\'t exceed the received quantity.');
                setOpenAlert(true);
            }
            else 
            {
                const filterData = ({
                    ...data,
                    quantity: noOfItemsToReturn,
                    amount: data.purchase_cost * noOfItemsToReturn
                });
    
                const po = purchaseOrderDetails.items.map(item => 
                        item.id === filterData.id 
                            ? filterData
                            : item
                );
                
                setPurchaseOrderDetails({...purchaseOrderDetails, items: po});
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
    
            const po = purchaseOrderDetails.items.map(item => 
                    item.id === filterData.id 
                        ? filterData
                        : item
            );
            
            setPurchaseOrderDetails({...purchaseOrderDetails, items: po});
        }
    };
    
    const handleOnRemoveProduct = (poId) => 
    {
        const newPo = purchaseOrderDetails.items
            .filter(purchaseOrderDetail => purchaseOrderDetail.id !== poId );
        setPurchaseOrderDetails({...purchaseOrderDetails, items: newPo});
    }

    const fetchPurchaseOrders = async () => 
    {
        const result = await BadOrder_.fetchPurchaseOrdersAsync();

        if (result.status === 'Success')
        {
            setPurchaseOrders(result.data);
        }

        setLoadingData(false);
    }

    
    const handleOnPurchaseOrder = async (e) => 
    {
        const id = parseInt(e.target.value);
        
        setPurchaseOrderId(id);

        const result = await BadOrder_.fetchPurchaseOrderAsync({
            purchase_order_id: id 
        })
    
        if (result.status === 'Success')
        {
            setPurchaseOrderDetails(result.data);
        }
    };


    const createBadOrder = async () => 
    {
        if (purchaseOrderDetails.items.length <= 0)
        {
            setAlertSeverity('error');
            setAlertMessage('Please add at least one item to the purchase order');
        }
        else 
        {
            setLoading(true);
            const result = await BadOrder_.storeAsync(validateData())

            if (result.status === 'Error')
            {
                setAlertSeverity('error');
            }
            else 
            {
                setAlertSeverity('success');
                setAlertMessage(result.message);
                setTimeout(() => history.push('/inventory-mngmt/bad-orders'), 2000);
            }

            setTimeout(() => setLoading(false), 2000);
        }

        setOpenAlert(true);
    }


    const validateData = () => 
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

        return {
            purchase_order_id: purchaseOrderId,
            badOrderDetails: items
        };
    }


    useEffect(() => {
        fetchPurchaseOrders();

        return () => {
            setPurchaseOrderDetails(DEFAULT_PROPS);
            setPurchaseOrders([]);
            setPurchaseOrderId(0);
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
                                    onClick={createBadOrder}
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

export default CreateBadOrders
